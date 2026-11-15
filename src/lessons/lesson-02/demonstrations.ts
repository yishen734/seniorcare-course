import type { DemonstrationCase } from '../types';
import { examples, residentTypeCode, buildMessagesCode } from './code';
import { dailyMessageCode } from '../shared-code';

export const manualResidentsCode = `const name1 = "王奶奶";
const hasCheckedIn1 = false;
const needsHelp1 = false;

const name2 = "李爷爷";
const hasCheckedIn2 = true;
const needsHelp2 = false;

console.log(getDailyMessage(name1, hasCheckedIn1, needsHelp1));
console.log(getDailyMessage(name2, hasCheckedIn2, needsHelp2));`;

export const thirdResidentCode = `const name3 = "陈奶奶";
const hasCheckedIn3 = true;
const needsHelp3 = true;

console.log(getDailyMessage(name3, hasCheckedIn3, needsHelp3));`;

export const conceptExamples = {
  manualResidents: `${dailyMessageCode}\n\n${manualResidentsCode}`,
  thirdResident: `${dailyMessageCode}\n\n${thirdResidentCode}`,
  repeatedBranches: `const name1 = "王奶奶";
const hasCheckedIn1 = false;
const needsHelp1 = false;

// 第一份判断：处理王奶奶。
if (!hasCheckedIn1) {
  console.log(\`\${name1}今日尚未打卡。\`);
} else if (needsHelp1) {
  console.log(\`\${name1}表示需要帮助，请联系确认。\`);
} else {
  console.log(\`\${name1}今日已报平安。\`);
}

const name2 = "李爷爷";
const hasCheckedIn2 = true;
const needsHelp2 = false;

// 第二份判断：规则相同，只换成第二个人的变量。
if (!hasCheckedIn2) {
  console.log(\`\${name2}今日尚未打卡。\`);
} else if (needsHelp2) {
  console.log(\`\${name2}表示需要帮助，请联系确认。\`);
} else {
  console.log(\`\${name2}今日已报平安。\`);
}`,
  studentVariables:
    'const name = "小林";\nconst age = 16;\nconst className = "高一三班";\n\nconsole.log(name);\nconsole.log(age);\nconsole.log(className);',
  studentCard:
    'const student = {\n  name: "小林",\n  age: 16,\n  className: "高一三班",\n};\n\nconsole.log(student.name);\nconsole.log(student.age);\nconsole.log(student.className);',
  names:
    'const names: string[] = ["小林", "小周", "小陈"];\nconsole.log(names.length);\nconsole.log(names[0]);\nconsole.log(names[2]);',
  updateArray:
    'const names: string[] = ["小林", "小周"];\nnames[1] = "小陈";\nnames.push("小李");\nconsole.log(names);\nconsole.log(names.length);',
  simpleLoop:
    'const names: string[] = ["小林", "小周", "小陈"];\n\nfor (const name of names) {\n  console.log(`你好，${name}！`);\n}\n\nconsole.log("全部问候完毕");',
  sum: 'const scores: number[] = [80, 90, 100];\nlet total = 0;\n\nfor (const score of scores) {\n  total = total + score;\n}\n\nconsole.log(total);',
  collect:
    'const names: string[] = ["小林", "小周"];\nconst greetings: string[] = [];\n\nfor (const name of names) {\n  const message = `你好，${name}！`;\n  greetings.push(message);\n}\n\nconsole.log(greetings);',
};

export const objectCases: DemonstrationCase[] = [
  {
    id: 'valid',
    title: '正确：字段完整、类型一致',
    code: examples.typedObject,
    explanation:
      'Resident 约定三个必需字段。这个对象提供了姓名和两个布尔值，符合约定，可以读取 person.name。',
    expectedOutput: ['王奶奶'],
  },
  {
    id: 'wrong-boolean',
    title: '类型错误：布尔值加了引号',
    code: examples.typedObject.replace('hasCheckedIn: false', 'hasCheckedIn: "false"'),
    explanation: '"false" 是 string，false 才是 boolean。看起来相似，但不能互相替代。',
    expectedDiagnostic: 2322,
  },
  {
    id: 'missing',
    title: '类型错误：少了必需字段',
    code: examples.typedObject.replace('  needsHelp: false,\n', ''),
    explanation: '这份约定要求每个人都有 needsHelp。漏写字段不是默认填 false，而是资料不完整。',
    expectedDiagnostic: 2741,
  },
  {
    id: 'property',
    title: '类型错误：属性名大小写不同',
    code: examples.typedObject.replace('console.log(person.name)', 'console.log(person.Name)'),
    explanation: '对象约定的是小写 name，没有大写 Name。属性名区分大小写，读取时必须一致。',
    expectedDiagnostic: 2551,
  },
];

export const arrayCases: DemonstrationCase[] = [
  {
    id: 'valid',
    title: '正确：替换和追加',
    code: conceptExamples.updateArray,
    explanation:
      'names[1] = ... 替换第二项；push(...) 在末尾追加第三项。数组内容改变了，但没有给 names 变量重新赋值。',
    expectedOutput: ['["小林","小陈","小李"]', '3'],
  },
  {
    id: 'wrong-element',
    title: '类型错误：文字数组加入数字',
    code: 'const names: string[] = ["小林", "小周"];\nnames.push(77);\nconsole.log(names);',
    explanation: 'string[] 要求每一项都是文字。77 是 number，不能直接加入这个文字数组。',
    expectedDiagnostic: 2345,
  },
  {
    id: 'out-of-range',
    title: '越界读取：得到 undefined',
    code: 'const names: string[] = ["小林", "小周", "小陈"];\nconsole.log(names[3]);',
    explanation:
      '三个元素的下标是 0、1、2。下标 3 不存在，读取结果是 undefined，表示这里没有值；它不是姓名，也不是文字 "undefined"。',
    expectedOutput: ['undefined'],
  },
  {
    id: 'missing-person',
    title: '运行错误：继续读取不存在的对象',
    code: `${residentTypeCode}\n\nconst residents: Resident[] = [];\nconsole.log(residents[0].name);`,
    explanation:
      '空数组没有第一项，residents[0] 得到 undefined，再读取它的 name 会在运行时出错。当前类型检查配置不会拦下所有越界读取。',
    expectedError: 'TypeError',
  },
  {
    id: 'push-result',
    title: '容易混淆：push 返回新长度',
    code: 'const names: string[] = ["小林"];\nconst lengthAfterPush = names.push("小周");\nconsole.log(lengthAfterPush);\nconsole.log(names);',
    explanation:
      'push 改变原数组，同时返回加入后的长度 2。lengthAfterPush 是数字，完整列表仍然保存在 names 里。',
    expectedOutput: ['2', '["小林","小周"]'],
  },
];

export const loopCases: DemonstrationCase[] = [
  {
    id: 'names',
    title: '逐项处理：三个人，三轮',
    code: conceptExamples.simpleLoop,
    explanation: '每轮只取一个名字。console.log 在循环体内执行三次，循环外的最后一句只执行一次。',
    expectedOutput: ['你好，小林！', '你好，小周！', '你好，小陈！', '全部问候完毕'],
  },
  {
    id: 'empty',
    title: '空数组：循环体执行零次',
    code: 'const names: string[] = [];\nfor (const name of names) {\n  console.log(name);\n}\nconsole.log("循环结束");',
    explanation:
      '空数组没有元素，循环体一次也不执行；程序仍然继续执行循环后面的语句，打印“循环结束”。',
    expectedOutput: ['循环结束'],
  },
  {
    id: 'total',
    title: '正确：循环外准备累计值',
    code: conceptExamples.sum,
    explanation:
      'total 在循环开始前准备一次，三轮依次从 0 变为 80、170、270。每轮都在上一轮的结果上继续加。',
    expectedOutput: ['270'],
  },
  {
    id: 'reset',
    title: '逻辑错误：每轮重新清零',
    code: 'const scores: number[] = [80, 90, 100];\nfor (const score of scores) {\n  let total = 0;\n  total = total + score;\n  console.log(total);\n}',
    explanation:
      '这段代码可以运行，但每轮都创建新的 total，依次打印 80、90、100，没有累计到 270。变量放在哪里，会改变程序的含义。',
    expectedOutput: ['80', '90', '100'],
  },
];

export const messageCases: DemonstrationCase[] = [
  {
    id: 'all',
    title: '正确：处理全部资料',
    code: examples.complete,
    explanation:
      '先准备空消息数组，每轮追加一条，循环结束后返回完整列表。第二次传空数组时，得到新的 []。',
    expectedOutput: [
      '["王奶奶今日尚未打卡。","李爷爷今日已报平安。","陈奶奶表示需要帮助，请联系确认。"]',
      '[]',
    ],
  },
  {
    id: 'early',
    title: '逻辑错误：第一轮就 return',
    code: examples.complete.replace(
      '    messages.push(message);',
      '    messages.push(message);\n    return messages;',
    ),
    explanation:
      '类型可以正确，但第一轮就结束了整个 buildDailyMessages，所以三个人只得到王奶奶的一条消息。return 不只是结束这一轮。',
    expectedOutput: ['["王奶奶今日尚未打卡。"]', '[]'],
  },
  {
    id: 'wrong-return',
    title: '类型错误：返回文字而不是数组',
    code: examples.complete.replace(
      buildMessagesCode,
      'function buildDailyMessages(residents: Resident[]): string[] {\n  return "没有消息";\n}',
    ),
    explanation:
      '返回类型 string[] 约定交回文字列表，单独一句文字属于 string，不能替代数组。即使只有一条消息，也应该放在 [] 里。',
    expectedDiagnostic: 2322,
  },
];
