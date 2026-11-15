export const schedule = [
  [0, 5],
  [5, 10],
  [10, 16],
  [16, 21],
  [21, 34],
  [34, 47],
  [47, 55],
  [55, 60],
] as const;

export const lessonSections = [
  { id: 'recap', title: '先把上一课接起来' },
  { id: 'mission', title: '从一份资料到一组资料' },
  { id: 'objects', title: '对象：把一个人的资料放在一起' },
  { id: 'object-types', title: '类型：约定资料的样子' },
  { id: 'arrays', title: '数组：把多个人放进列表' },
  { id: 'loops', title: '循环：每个人都处理一次' },
  { id: 'case-study', title: '完整案例：返回一组消息' },
  { id: 'review', title: '知识串联与常见误区' },
];
