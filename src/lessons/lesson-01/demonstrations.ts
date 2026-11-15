import type { DemonstrationCase } from '../types';
import { dailyMessageCode } from '../shared-code';

export const typeCases: DemonstrationCase[] = [
  {
    id: 'number',
    title: '正确：数字加法',
    code: 'let age: number = 77;\nconsole.log(age + 1);',
    explanation: '77 是数字，加 1 得到数字 78。类型检查通过，运行结果也符合年龄增长的含义。',
    expectedOutput: ['78'],
  },
  {
    id: 'wrong-type',
    title: '类型错误：把文字放进 number',
    code: 'let age: number = "77";\nconsole.log(age + 1);',
    explanation:
      '带引号的 "77" 是文字。左边要求 number，右边却是 string，因此类型检查会阻止这个案例运行。',
    expectedDiagnostic: 2322,
  },
  {
    id: 'text',
    title: '能运行：文字拼接',
    code: 'let age: string = "77";\nconsole.log(age + 1);',
    explanation:
      '这次左右两边都是文字，类型检查可以通过；加号把文字连在一起，得到 "771"。能运行，不表示它适合计算年龄。',
    expectedOutput: ['771'],
  },
];

export const variableCases: DemonstrationCase[] = [
  {
    id: 'let',
    title: '正确：let 重新赋值',
    code: 'let count = 0;\ncount = count + 1;\nconsole.log(count);',
    explanation: '先读取旧的 count，把 0 + 1 算成 1，再把结果放回 count。重新赋值时不再写 let。',
    expectedOutput: ['1'],
  },
  {
    id: 'const',
    title: '类型错误：重写 const',
    code: 'const count = 0;\ncount = 1;\nconsole.log(count);',
    explanation: 'const 声明的变量不能重新赋值。需要记录会变化的计数时，这里应使用 let。',
    expectedDiagnostic: 2588,
  },
];

export const functionCases: DemonstrationCase[] = [
  {
    id: 'three-states',
    title: '正确：三种输入，三种状态',
    code: `${dailyMessageCode}\n\nconsole.log(getDailyMessage("王奶奶", false, false));\nconsole.log(getDailyMessage("李爷爷", true, false));\nconsole.log(getDailyMessage("陈奶奶", true, true));`,
    explanation:
      '三次调用分别使用自己的参数。同一套判断规则生成未打卡、已报平安和需要帮助三种消息。',
    expectedOutput: [
      '王奶奶今日尚未打卡。',
      '李爷爷今日已报平安。',
      '陈奶奶表示需要帮助，请联系确认。',
    ],
  },
  {
    id: 'missing-first',
    title: '正确：先确认有没有打卡',
    code: `${dailyMessageCode}\n\nconsole.log(getDailyMessage("王奶奶", false, true));`,
    explanation:
      '没有收到打卡时，第一个 return 就结束本次调用。此时不能把 needsHelp 当成今天已经收到的报告。',
    expectedOutput: ['王奶奶今日尚未打卡。'],
  },
  {
    id: 'only-definition',
    title: '只有定义：不会自动执行',
    code: 'function greet(name: string): string {\n  console.log("函数开始执行");\n  return `你好，${name}！`;\n}',
    explanation:
      '这段代码只保存了函数的规则，没有 greet(...) 这样的调用，所以函数体没有执行，控制台也没有输出。',
    expectedOutput: [],
  },
  {
    id: 'print-only',
    title: '类型错误：打印不能代替返回',
    code: 'function greet(name: string): string {\n  console.log(`你好，${name}！`);\n}\n\nconst message = greet("王奶奶");\nconsole.log(message);',
    explanation:
      '声明说这个函数会交回 string，但函数体只有打印，没有 return。TypeScript 会报告缺少返回值。',
    expectedDiagnostic: 2355,
  },
];
