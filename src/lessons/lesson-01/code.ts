export const examples = {
  first: 'console.log("你好，SeniorCare！");\nconsole.log("今天，我们来生成一条打卡消息。");',
  variables:
    'const name = "王奶奶";\nlet hasCheckedIn = false;\n\nhasCheckedIn = true;\nconsole.log(name, hasCheckedIn);',
  types:
    'const name: string = "王奶奶";\nlet age: number = 77;\nlet hasCheckedIn: boolean = false;\n\nconsole.log(`${name}今年 ${age} 岁。`);',
  inference:
    'let age = 77;\nage = 78;       // 仍然是数字，可以赋值\n// age = "78"; // 文字不能赋给数字变量',
  expressions: 'const age = 77;\nconsole.log(age + 1);\nconsole.log(`明年年龄： ${age + 1}`);',
  logical:
    'const hasCheckedIn = true;\nconst needsHelp = false;\n\nconsole.log(!hasCheckedIn);\nconsole.log(hasCheckedIn && !needsHelp);\nconsole.log(!hasCheckedIn || needsHelp);',
  condition:
    'const hasCheckedIn = false;\n\nif (hasCheckedIn) {\n  console.log("今日已打卡。");\n} else {\n  console.log("今日尚未打卡。");\n}',
  comparison:
    'let age: number = 77;\nconsole.log(age >= 65);  // true\nconsole.log(age === 65); // false\nconsole.log(age !== 65); // true',
  branches:
    'const name = "王奶奶";\nconst hasCheckedIn = true;\nconst needsHelp = false;\nlet message: string;\n\nif (!hasCheckedIn) {\n  message = `${name}今日尚未打卡。`;\n} else if (needsHelp) {\n  message = `${name}表示需要帮助，请联系确认。`;\n} else {\n  message = `${name}今日已报平安。`;\n}\n\nconsole.log(message);',
  simpleFunction:
    'function greet(name: string): string {\n  return `你好，${name}！`;\n}\n\nconst message = greet("王奶奶");\nconsole.log(message);\nconsole.log(greet("李爷爷"));',
  complete:
    'function getDailyMessage(\n  name: string, // 第 1 个参数：姓名\n  hasCheckedIn: boolean, // 第 2 个参数：今天是否打卡\n  needsHelp: boolean // 第 3 个参数：本次打卡是否需要帮助\n): string {\n  if (!hasCheckedIn) {\n    return `${name}今日尚未打卡。`;\n  }\n  if (needsHelp) {\n    return `${name}表示需要帮助，请联系确认。`;\n  }\n  return `${name}今日已报平安。`;\n}\n\nconsole.log(getDailyMessage(\n  "王奶奶", // name：姓名\n  false, // hasCheckedIn：今天尚未打卡\n  false // needsHelp：未打卡时不读取此值\n));\nconsole.log(getDailyMessage(\n  "王奶奶", // name：姓名\n  true, // hasCheckedIn：今天已经打卡\n  false // needsHelp：这次没有表示需要帮助\n));\nconsole.log(getDailyMessage(\n  "王奶奶", // name：姓名\n  true, // hasCheckedIn：今天已经打卡\n  true // needsHelp：这次表示需要帮助\n));',
};
