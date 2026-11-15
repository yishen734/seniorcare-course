/** A missing check-in is absence of a report, not evidence of an emergency. */
export function getDailyMessage(name: string, hasCheckedIn: boolean, needsHelp: boolean): string {
  if (!hasCheckedIn) return `${name}今日尚未打卡。`;
  if (needsHelp) return `${name}表示需要帮助，请联系确认。`;
  return `${name}今日已报平安。`;
}
export function getBranch(hasCheckedIn: boolean, needsHelp: boolean) {
  return !hasCheckedIn ? 'pending' : needsHelp ? 'help' : 'ok';
}
export const variableSteps = [
  { line: 'const name = "王奶奶";', variables: { name: '王奶奶' }, output: '' },
  {
    line: 'let hasCheckedIn = false;',
    variables: { name: '王奶奶', hasCheckedIn: false },
    output: '',
  },
  {
    line: 'hasCheckedIn = true;',
    variables: { name: '王奶奶', hasCheckedIn: true },
    output: '',
  },
  {
    line: 'console.log(name, hasCheckedIn);',
    variables: { name: '王奶奶', hasCheckedIn: true },
    output: '王奶奶 true',
  },
] as const;
