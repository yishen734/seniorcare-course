import { sampleResidents } from './residents';

export type ExerciseId = 'daily-message' | 'daily-messages';
export interface ExerciseCase {
  label: string;
  args: unknown[];
  expected: string | string[];
}
export interface ExerciseDefinition {
  functionName: 'getDailyMessage' | 'buildDailyMessages';
  cases: ExerciseCase[];
}

export const exercises: Record<ExerciseId, ExerciseDefinition> = {
  'daily-message': {
    functionName: 'getDailyMessage',
    cases: [
      { label: '尚未打卡', args: ['王奶奶', false, false], expected: '王奶奶今日尚未打卡。' },
      { label: '打卡并报平安', args: ['王奶奶', true, false], expected: '王奶奶今日已报平安。' },
      {
        label: '打卡并表示需要帮助',
        args: ['王奶奶', true, true],
        expected: '王奶奶表示需要帮助，请联系确认。',
      },
      { label: '使用传入的姓名', args: ['李爷爷', true, false], expected: '李爷爷今日已报平安。' },
      {
        label: '未打卡时不读取求助状态',
        args: ['李爷爷', false, true],
        expected: '李爷爷今日尚未打卡。',
      },
    ],
  },
  'daily-messages': {
    functionName: 'buildDailyMessages',
    cases: [
      {
        label: '三个人，三种状态',
        args: [sampleResidents],
        expected: [
          '王奶奶今日尚未打卡。',
          '李爷爷今日已报平安。',
          '陈奶奶表示需要帮助，请联系确认。',
        ],
      },
      { label: '空列表也要返回数组', args: [[]], expected: [] },
      {
        label: '换一个姓名，只有一个人',
        args: [[{ name: '赵爷爷', hasCheckedIn: true, needsHelp: false }]],
        expected: ['赵爷爷今日已报平安。'],
      },
      {
        label: '四个人，保持输入顺序',
        args: [[sampleResidents[2], sampleResidents[0], sampleResidents[1], sampleResidents[2]]],
        expected: [
          '陈奶奶表示需要帮助，请联系确认。',
          '王奶奶今日尚未打卡。',
          '李爷爷今日已报平安。',
          '陈奶奶表示需要帮助，请联系确认。',
        ],
      },
      {
        label: '未打卡时先返回未打卡消息',
        args: [[{ name: '周奶奶', hasCheckedIn: false, needsHelp: true }]],
        expected: ['周奶奶今日尚未打卡。'],
      },
    ],
  },
};
