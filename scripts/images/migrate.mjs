import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFile } from 'node:process';

const root = fileURLToPath(new URL('../../', import.meta.url));
const manifestPath = path.join(root, 'src/data/image-manifest.json');
const envPath = path.join(root, '.env.local');
if (existsSync(envPath)) loadEnvFile(envPath);

const types = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
};
const hash = (body) => createHash('sha256').update(body).digest('hex');
const objectUrl = (base, key) => `${base.replace(/\/$/, '')}/${key.split('/').map(encodeURIComponent).join('/')}`;
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function filesIn(directory) {
  if (!existsSync(directory)) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(filename) : [filename];
  }));
  return groups.flat().sort();
}

function publicBase(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash
    || url.hostname.endsWith('.r2.cloudflarestorage.com')) {
    throw new Error('PUBLIC_IMAGE_BASE_URL 必须是图片的 HTTPS 公开访问地址，不能是 S3 上传接口。');
  }
  return url.href.replace(/\/$/, '');
}

async function fetchImage(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) {
    await response.body?.cancel();
    throw Object.assign(new Error(`图片请求失败，HTTP ${response.status}`), { status: response.status });
  }
  const contentType = (response.headers.get('content-type') ?? '').split(';')[0].trim();
  if (!contentType.startsWith('image/')) throw new Error(`响应不是图片：${contentType || '缺少 Content-Type'}`);
  const chunks = [];
  let length = 0;
  for await (const chunk of response.body) {
    length += chunk.length;
    if (length > 20 * 1024 * 1024) {
      await response.body.cancel().catch(() => {});
      throw new Error('图片超过本脚本的 20 MiB 限制。');
    }
    chunks.push(chunk);
  }
  return { body: Buffer.concat(chunks), contentType };
}

async function verifyImage(url, asset) {
  let failure;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const image = await fetchImage(url);
      if (image.body.length !== asset.bytes || hash(image.body) !== asset.sha256) {
        throw new Error('公开访问返回的图片与原文件哈希不一致。');
      }
      if (image.contentType !== asset.contentType) throw new Error('公开访问返回的 Content-Type 不正确。');
      return;
    } catch (error) {
      failure = error;
      if (error.status >= 400 && error.status < 500) throw error;
      if (attempt < 2) await pause(500 * (attempt + 1));
    }
  }
  throw failure;
}

async function saveJson(filename, data) {
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(`${filename}.tmp`, `${JSON.stringify(data, null, 2)}\n`);
  await rename(`${filename}.tmp`, filename);
}

async function main() {
  const flags = new Set(process.argv.slice(2));
  if ([...flags].some((flag) => !['--dry-run', '--check', '--verify'].includes(flag)) || flags.size > 1) {
    throw new Error('用法：node scripts/images/migrate.mjs [--dry-run | --check | --verify]');
  }
  const previous = existsSync(manifestPath)
    ? JSON.parse(await readFile(manifestPath, 'utf8'))
    : { version: 1, publicBaseUrl: '', assets: {} };
  const base = publicBase(process.env.PUBLIC_IMAGE_BASE_URL || previous.publicBaseUrl);

  if (flags.has('--verify')) {
    const assets = Object.entries(previous.assets);
    if (!assets.length) throw new Error('迁移清单为空，请先执行迁移。');
    for (const [source, asset] of assets) {
      await verifyImage(objectUrl(base, asset.key), asset);
      console.log(`VERIFIED ${source}`);
    }
    console.log(`公开访问校验通过：${assets.length} 个对象，类型、大小、SHA-256 全部匹配。`);
    return;
  }

  const localFiles = (await filesIn(path.join(root, 'public/assets')))
    .filter((filename) => types[path.extname(filename).toLowerCase()]);
  const documents = (await Promise.all(['docs', 'src/content'].map((dir) => filesIn(path.join(root, dir)))))
    .flat().filter((filename) => /\.mdx?$/i.test(filename));
  const texts = new Map(await Promise.all(documents.map(async (filename) => [filename, await readFile(filename, 'utf8')])));
  // 保存原始外链，重复运行时即使 Markdown 已替换，仍可验证其 R2 对象。
  const remoteSources = new Set(Object.keys(previous.assets).filter((source) => source.startsWith('https://')));
  for (const content of texts.values()) {
    for (const match of content.matchAll(/!\[[^\]]*\]\((https:\/\/[^\s)]+)(?:\s+["'][^\n]*?["'])?\)/g)) {
      const source = match[1];
      const alreadyMigrated = Object.values(previous.assets).some((asset) => objectUrl(previous.publicBaseUrl, asset.key) === source);
      if (!alreadyMigrated && !source.startsWith(`${base}/`)) remoteSources.add(source);
    }
  }
  console.log(`迁移范围：${localFiles.length} 个本地图片、${remoteSources.size} 个文档外链图片。`);
  if (flags.has('--dry-run')) {
    localFiles.forEach((filename) => console.log(`LOCAL ${path.relative(root, filename).replaceAll('\\', '/')}`));
    remoteSources.forEach((source) => console.log(`REMOTE ${source}`));
    return;
  }

  for (const name of ['IMGBED_API_URL', 'R2_PREFIX']) {
    if (!process.env[name]?.trim() || /本地填写|你的|账户ID/.test(process.env[name])) {
      throw new Error(`请先在 .env.local 中填写 ${name}。`);
    }
  }
  const endpoint = new URL(process.env.IMGBED_API_URL);
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || endpoint.search || endpoint.hash
    || endpoint.pathname !== '/') {
    throw new Error('IMGBED_API_URL 应为图床应用的 HTTPS 站点地址，不包含 /upload 或 /file 路径。');
  }
  const prefix = process.env.R2_PREFIX.trim().replace(/^\/+|\/+$/g, '');
  if (!prefix || prefix.split('/').some((part) => !part || part === '.' || part === '..')) {
    throw new Error('R2_PREFIX 应为有效的对象目录前缀，例如 blog。');
  }
  if (base !== `${endpoint.origin}/file`) {
    throw new Error('通过图床应用迁移时，PUBLIC_IMAGE_BASE_URL 应为 IMGBED_API_URL 加 /file。');
  }
  const headers = {};
  if (process.env.IMGBED_API_TOKEN) headers.Authorization = `Bearer ${process.env.IMGBED_API_TOKEN.trim()}`;
  const channelsResponse = await fetch(new URL('/api/channels', endpoint), {
    headers, signal: AbortSignal.timeout(20_000),
  });
  if (!channelsResponse.ok) throw new Error(`读取图床渠道失败，HTTP ${channelsResponse.status}`);
  const channels = (await channelsResponse.json()).cfr2 ?? [];
  const channelName = process.env.IMGBED_CHANNEL_NAME?.trim() || (channels.length === 1 ? channels[0].name : '');
  if (!channelName || !channels.some((channel) => channel.name === channelName)) {
    throw new Error('未找到唯一的 R2 渠道，请在 .env.local 中填写 IMGBED_CHANNEL_NAME。');
  }
  console.log(`图床 API 与 R2 渠道连接通过：${channelName}。`);
  const assets = { ...previous.assets };
  let uploaded = 0;
  let skipped = 0;
  const migrate = async (source, body, contentType, group, name) => {
    const sha256 = hash(body);
    const extension = path.extname(name).toLowerCase();
    const safeName = path.basename(name, extension).replace(/[^a-zA-Z0-9_-]/g, '-') || 'image';
    const filename = `${safeName}-${sha256.slice(0, 16)}${extension}`;
    let key = `${prefix}/${group}/${filename}`;
    let asset = { key, sha256, bytes: body.length, contentType };
    let exists = false;
    try {
      await verifyImage(objectUrl(base, key), asset);
      exists = true;
    } catch (error) {
      if (error.status !== 404) throw error;
    }
    if (!exists) {
      const uploadUrl = new URL('/upload', endpoint);
      for (const [name, value] of Object.entries({
        uploadChannel: 'cfr2', channelName, uploadFolder: `${prefix}/${group}`,
        uploadNameType: 'origin', autoRetry: 'false', serverCompress: 'false', returnFormat: 'full',
      })) uploadUrl.searchParams.set(name, value);
      if (process.env.IMGBED_AUTH_CODE) uploadUrl.searchParams.set('authCode', process.env.IMGBED_AUTH_CODE);
      const form = new FormData();
      form.append('file', new Blob([body], { type: contentType }), filename);
      const response = await fetch(uploadUrl, {
        method: 'POST', headers, body: form, redirect: 'error', signal: AbortSignal.timeout(30_000),
      });
      if (response.status === 401 || response.status === 403) {
        throw new Error('图床拒绝上传，请在 .env.local 中填写 IMGBED_API_TOKEN（需 upload 权限）或 IMGBED_AUTH_CODE。');
      }
      if (!response.ok) throw new Error(`上传失败，HTTP ${response.status}：${filename}`);
      const result = await response.json();
      if (!Array.isArray(result) || !result[0]?.src) throw new Error(`上传接口未返回文件地址：${filename}`);
      const returned = new URL(result[0].src, endpoint);
      if (returned.origin !== endpoint.origin || !returned.pathname.startsWith('/file/') || returned.search || returned.hash) {
        throw new Error('上传接口返回了预期外的文件地址，请检查图床配置。');
      }
      key = returned.pathname.slice('/file/'.length).split('/').map(decodeURIComponent).join('/');
      asset = { ...asset, key };
      await verifyImage(objectUrl(base, key), asset);
      uploaded++;
    } else skipped++;
    assets[source] = asset;
    console.log(`${exists ? 'SKIPPED' : 'UPLOADED'} + VERIFIED ${key}`);
  };

  const selected = flags.has('--check')
    ? localFiles.filter((filename) => filename.endsWith(`${path.sep}logo-64.png`)).slice(0, 1)
    : localFiles;
  if (!selected.length) throw new Error('未找到待上传的本地图片。');
  for (const filename of selected) {
    const source = `/${path.relative(path.join(root, 'public'), filename).replaceAll('\\', '/')}`;
    await migrate(source, await readFile(filename), types[path.extname(filename).toLowerCase()],
      path.dirname(source).replace('/assets/', ''), path.basename(filename));
  }
  if (flags.has('--check')) {
    console.log('图床测试通过：实际图片上传成功，公开 GET 返回与原图一致的内容。尚未切换项目引用。');
    return;
  }
  for (const source of remoteSources) {
    const imported = previous.assets[source];
    if (imported && previous.publicBaseUrl === base && imported.key.startsWith(`${prefix}/imports/`)) {
      await verifyImage(objectUrl(base, imported.key), imported);
      assets[source] = imported;
      skipped++;
      console.log(`SKIPPED + VERIFIED ${imported.key}`);
      continue;
    }
    const image = await fetchImage(source);
    const extension = Object.keys(types).find((ext) => types[ext] === image.contentType);
    if (!extension) throw new Error(`不支持的外链图片类型：${image.contentType}`);
    const sourceName = path.basename(new URL(source).pathname);
    const name = types[path.extname(sourceName).toLowerCase()] === image.contentType
      ? sourceName : `${sourceName || 'image'}${extension}`;
    await migrate(source, image.body, image.contentType, 'imports', name);
  }

  // 所有对象均验证成功后，才写清单和切换文档外链。
  const manifest = { version: 1, publicBaseUrl: base, assets: Object.fromEntries(Object.entries(assets).sort(([a], [b]) => a.localeCompare(b))) };
  await saveJson(manifestPath, manifest);
  let rewritten = 0;
  for (const [filename, original] of texts) {
    let updated = original;
    for (const source of remoteSources) {
      const url = objectUrl(base, assets[source].key);
      updated = updated.replaceAll(source, url);
      if (previous.assets[source]) updated = updated.replaceAll(objectUrl(previous.publicBaseUrl, previous.assets[source].key), url);
    }
    if (updated !== original) {
      await writeFile(filename, updated);
      rewritten++;
    }
  }
  console.log(`迁移完成：上传 ${uploaded}、跳过 ${skipped}、更新 ${rewritten} 篇文档。清单已保存，本地原图保留。`);
}

main().catch((error) => {
  let message = `${error.name ?? 'Error'}: ${error.message ?? '操作失败'}`;
  for (const name of ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'IMGBED_API_TOKEN', 'IMGBED_AUTH_CODE']) {
    if (process.env[name]) message = message.replaceAll(process.env[name], '[REDACTED]');
  }
  console.error(message);
  process.exitCode = 1;
});
