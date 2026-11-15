import assert from 'node:assert/strict';
import test from 'node:test';
import { getBranch, getDailyMessage, variableSteps } from '../src/lib/check-in';
import { curriculum } from '../src/curriculum/catalog';
import { lessonSections, schedule } from '../src/lessons/lesson-01/sections';
import { lessonHref, parseCourseRoute } from '../src/lib/course-routes';
import {
  lessonSections as secondSections,
  schedule as secondSchedule,
} from '../src/lessons/lesson-02/sections';
import { buildDailyMessages, sampleResidents } from '../src/lib/residents';
test('check-in messages distinguish missing reports, OK reports and help requests', () => {
  assert.equal(getDailyMessage('王奶奶', false, false), '王奶奶今日尚未打卡。');
  assert.equal(getDailyMessage('王奶奶', true, false), '王奶奶今日已报平安。');
  assert.equal(getDailyMessage('王奶奶', true, true), '王奶奶表示需要帮助，请联系确认。');
  assert.equal(getDailyMessage('李爷爷', false, true), '李爷爷今日尚未打卡。');
  assert.equal(getBranch(false, true), 'pending');
});
test('a name is a parameter rather than a hard-coded person', () => {
  assert.equal(getDailyMessage('李爷爷', true, false), '李爷爷今日已报平安。');
  assert.equal(getDailyMessage('', true, false), '今日已报平安。');
});
test('lesson timing covers exactly one hour, with ten opening minutes', () => {
  assert.equal(schedule[0][0], 0);
  assert.equal(schedule[1][1], 10);
  assert.equal(schedule.at(-1)?.[1], 60);
  schedule.slice(1).forEach((range, i) => assert.equal(range[0], schedule[i][1]));
  assert.equal(lessonSections.length, schedule.length);
  assert.equal(new Set(lessonSections.map((s) => s.id)).size, lessonSections.length);
});
test('lessons one and two are available while lesson three remains planned', () => {
  assert.deepEqual(
    curriculum.map((l) => l.status),
    ['ready', 'ready', 'planned'],
  );
  assert.equal(lessonHref(2), '/lessons/2/');
  assert.deepEqual(parseCourseRoute('/'), { lessonId: 1, isCurriculum: false });
  assert.deepEqual(parseCourseRoute('/curriculum/'), { lessonId: 1, isCurriculum: true });
});

test('lesson two has ten opening minutes and fifty core minutes with matching chapters', () => {
  assert.equal(secondSchedule[0][0], 0);
  assert.equal(secondSchedule[1][1], 10);
  assert.equal(secondSchedule.at(-1)?.[1], 60);
  secondSchedule.slice(1).forEach((range, i) => assert.equal(range[0], secondSchedule[i][1]));
  assert.equal(secondSections.length, secondSchedule.length);
  assert.equal(new Set(secondSections.map((section) => section.id)).size, secondSections.length);
});

test('collection logic preserves names, order, missing-report priority and independent calls', () => {
  const before = structuredClone(sampleResidents);
  assert.deepEqual(buildDailyMessages(sampleResidents), [
    '王奶奶今日尚未打卡。',
    '李爷爷今日已报平安。',
    '陈奶奶表示需要帮助，请联系确认。',
  ]);
  assert.deepEqual(buildDailyMessages([]), []);
  assert.deepEqual(buildDailyMessages([{ name: '周奶奶', hasCheckedIn: false, needsHelp: true }]), [
    '周奶奶今日尚未打卡。',
  ]);
  assert.deepEqual(sampleResidents, before);
});
test('the variable trace prints only after the console statement executes', () => {
  assert.equal(variableSteps[1].variables.hasCheckedIn, false);
  assert.equal(variableSteps[2].variables.hasCheckedIn, true);
  assert.equal(variableSteps[2].output, '');
  assert.equal(variableSteps[3].output, '王奶奶 true');
});
