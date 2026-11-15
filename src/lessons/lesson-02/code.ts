import { dailyMessageCode } from '../shared-code';

export const residentTypeCode = `type Resident = {
  name: string;
  hasCheckedIn: boolean;
  needsHelp: boolean;
};`;

export const residentListCode = `const residents: Resident[] = [
  { name: "王奶奶", hasCheckedIn: false, needsHelp: false },
  { name: "李爷爷", hasCheckedIn: true, needsHelp: false },
  { name: "陈奶奶", hasCheckedIn: true, needsHelp: true },
];`;

export const buildMessagesCode = `function buildDailyMessages(residents: Resident[]): string[] {
  const messages: string[] = [];

  for (const person of residents) {
    const message = getDailyMessage(
      person.name,
      person.hasCheckedIn,
      person.needsHelp
    );
    messages.push(message);
  }

  return messages;
}`;

const setupCode = `${residentTypeCode}\n\n${dailyMessageCode}`;
const callsCode = `${residentListCode}

console.log(buildDailyMessages(residents));
console.log(buildDailyMessages([]));`;

export const examples = {
  recap: `${dailyMessageCode}

const message = getDailyMessage("李爷爷", true, false);
console.log(message);`,
  object: `const person = {
  name: "王奶奶",
  hasCheckedIn: false,
  needsHelp: false,
};

console.log(person.name);
console.log(person.hasCheckedIn);`,
  update: `const person = {
  name: "王奶奶",
  hasCheckedIn: false,
  needsHelp: false,
};

person.hasCheckedIn = true;
console.log(person.hasCheckedIn);
// person = { name: "李爷爷", hasCheckedIn: true, needsHelp: false };
// 上面这一行重新给 person 赋值，const 不允许。`,
  typedObject: `${residentTypeCode}

const person: Resident = {
  name: "王奶奶",
  hasCheckedIn: false,
  needsHelp: false,
};

console.log(person.name);`,
  arrays: `${residentTypeCode}\n\n${residentListCode}

console.log(residents.length);
console.log(residents[0].name);
console.log(residents[2].name);`,
  push: `const messages: string[] = [];
messages.push("王奶奶今日尚未打卡。");
messages.push("李爷爷今日已报平安。");

console.log(messages.length);
console.log(messages);`,
  loop: `${setupCode}\n\n${residentListCode}

for (const person of residents) {
  const message = getDailyMessage(
    person.name,
    person.hasCheckedIn,
    person.needsHelp
  );
  console.log(message);
}`,
  complete: `${setupCode}\n\n${buildMessagesCode}\n\n${callsCode}`,
};
