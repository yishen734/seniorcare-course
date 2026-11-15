import type { Lesson } from './types';
export const curriculum: Lesson[] = [
  {
    id: 1,
    title: '编程基础：从变量到打卡判断',
    status: 'ready',
    summary: '通过完整案例理解变量、类型、表达式、条件与函数，读懂打卡消息的生成过程。',
    presentation: {
      subtitle: '从小例子看懂 TypeScript 的第一段逻辑。',
      progression: '变量 → 判断 → 函数',
      intro:
        '老人点一下“报平安”，家人就能读到今天的状态。这节课，通过完整案例讲清数据、判断和函数怎样配合。',
      goal: '今日打卡状态判断',
      goalDescription: '输入数据，得到一句清楚的状态。',
    },
  },
  {
    id: 2,
    title: '编程基础：对象、数组与循环',
    status: 'ready',
    summary: '用对象组织资料，用数组保存多人数据，用循环生成每个人的打卡消息。',
    presentation: {
      subtitle: '从一个人的状态，到一组人的消息。',
      progression: '对象 → 数组 → 循环',
      intro:
        '上一课讲清了一个人的打卡判断。这节课，从姓名、成绩等小例子出发，理解对象、数组和循环，再看多人消息的完整案例。',
      goal: '多人打卡消息列表',
      goalDescription: '输入一组资料，返回每个人的状态消息。',
    },
  },
  { id: 3, title: '第三节课', status: 'planned' },
];
export function findLesson(id: string | number) {
  return curriculum.find((lesson) => String(lesson.id) === String(id));
}
