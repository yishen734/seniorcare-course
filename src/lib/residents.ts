import { getDailyMessage } from './check-in';

export type Resident = {
  name: string;
  hasCheckedIn: boolean;
  needsHelp: boolean;
};

export const sampleResidents: Resident[] = [
  { name: '王奶奶', hasCheckedIn: false, needsHelp: false },
  { name: '李爷爷', hasCheckedIn: true, needsHelp: false },
  { name: '陈奶奶', hasCheckedIn: true, needsHelp: true },
];

export function buildDailyMessages(residents: Resident[]): string[] {
  const messages: string[] = [];
  for (const person of residents) {
    const message = getDailyMessage(person.name, person.hasCheckedIn, person.needsHelp);
    messages.push(message);
  }
  return messages;
}
