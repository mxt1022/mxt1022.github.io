export function withBase(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}` || '/';
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export const siteMeta = {
  title: 'mxt.log',
  description: 'mxt 的学习记录、算法竞赛与 AI 竞赛实践笔记。',
  author: 'mxt',
};
