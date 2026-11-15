export const dailyMessageCode = `function getDailyMessage(
  name: string,
  hasCheckedIn: boolean,
  needsHelp: boolean
): string {
  if (!hasCheckedIn) {
    return \`\${name}今日尚未打卡。\`;
  }
  if (needsHelp) {
    return \`\${name}表示需要帮助，请联系确认。\`;
  }
  return \`\${name}今日已报平安。\`;
}`;
