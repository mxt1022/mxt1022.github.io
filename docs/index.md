# 欢迎来到mxt的wiki主页

## 目前正在逐步完善当中

## 日拱一卒！

#### 每日一题链接：
https://docs.qq.com/sheet/DWXRHeWhHakRRbHNo?tab=BB08J2&u=2b0239ec9d1d45908d5989d7a8501587

#### 每日一题代码：
https://github.com/mxt1022/algorithmcode

#### 其他：

#### AI与编程竞赛


<div id="contest-list">
  <p>加载中……</p>
</div>

<script>
async function loadContests() {
  const container = document.getElementById('contest-list');
  try {
    // 注意：路径直接写 'contests.json'，因为它在同一目录下
    const resp = await fetch('contests.json');
    if (!resp.ok) throw new Error('数据加载失败');
    const data = await resp.json();
    if (data.length === 0) {
      container.innerHTML = '<p>暂无即将开始的比赛。</p>';
      return;
    }
    let html = '<ul style="list-style: none; padding: 0;">';
    data.forEach(c => {
      const start = new Date(c.start_time).toLocaleString('zh-CN');
      html += `
        <li style="border:1px solid #ddd; margin-bottom:10px; padding:10px; border-radius:5px;">
          <strong><a href="${c.url}" target="_blank">${c.name}</a></strong><br>
          <span style="color:#007bff;">${c.platform}</span> |
          🕒 ${start} | ⏱️ ${c.duration}
        </li>
      `;
    });
    html += '</ul>';
    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = `<p style="color:red;">加载失败：${e.message}</p>`;
  }
}
// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadContests);
</script>

