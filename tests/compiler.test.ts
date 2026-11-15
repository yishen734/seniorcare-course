import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import path from 'node:path';
import ts from 'typescript';
import { examples } from '../src/lessons/lesson-01/code';
import { examples as collectionExamples, buildMessagesCode } from '../src/lessons/lesson-02/code';
import { typeCases, variableCases, functionCases } from '../src/lessons/lesson-01/demonstrations';
import {
  conceptExamples,
  objectCases,
  arrayCases,
  loopCases,
  messageCases,
} from '../src/lessons/lesson-02/demonstrations';
import { exercises, type ExerciseId } from '../src/lib/exercises';
interface Diagnostic {
  code: number;
  line?: number;
}
interface CompileResult {
  id: number;
  diagnostics: Diagnostic[];
  javascript: string;
  error?: string;
}
async function compile(code: string): Promise<CompileResult> {
  const source = await readFile('public/compiler-worker.js', 'utf8');
  return new Promise((resolve, reject) => {
    const self: {
      onmessage?: (event: { data: { id: number; code: string } }) => Promise<void>;
      postMessage: (result: CompileResult) => void;
    } = { postMessage: resolve };
    runInNewContext(source, {
      ts,
      importScripts: () => {},
      fetch: async (url: string) => ({
        ok: true,
        text: () => readFile(path.join('public', url), 'utf8'),
      }),
      self,
      Map,
      Promise,
    });
    self.onmessage?.({ data: { id: 1, code } }).catch(reject);
  });
}
async function execute(
  javascript: string,
  exercise: ExerciseId | false = false,
): Promise<{ output: string[]; cases?: { passed: boolean }[]; error?: string }> {
  const source = await readFile('public/runner-worker.js', 'utf8');
  return new Promise((resolve) => {
    const self: {
      onmessage?: (event: { data: { javascript: string; exercise: unknown } }) => void;
      postMessage: typeof resolve;
    } = { postMessage: resolve };
    runInNewContext(source, { self });
    self.onmessage?.({
      data: { javascript, exercise: exercise ? structuredClone(exercises[exercise]) : undefined },
    });
  });
}
test('the browser compiler performs semantic checking, not only transpilation', async () => {
  const bad = await compile('let age: number = "77"; console.log(age);');
  assert.equal(bad.error, undefined);
  assert.ok(bad.diagnostics.some((d) => d.code === 2322 && d.line === 1));
  assert.equal(bad.javascript, '');
});
test('the browser compiler reports syntax and missing return errors', async () => {
  const syntax = await compile('const value = ;');
  assert.ok(syntax.diagnostics.length > 0);
  const missing = await compile('function answer(): string { console.log("hello"); }');
  assert.ok(missing.diagnostics.some((d) => d.code === 2355));
});
test('every runnable teaching example compiles using the exact browser compiler host', async () => {
  for (const [name, code] of Object.entries(examples)) {
    const result = await compile(code);
    assert.equal(result.error, undefined, name);
    assert.equal(result.diagnostics.length, 0, `${name}: ${JSON.stringify(result.diagnostics)}`);
  }
});
test('the complete single-person case passes behavior checks while a fixed message does not', async () => {
  const correct = await compile(examples.complete);
  const result = await execute(correct.javascript, 'daily-message');
  assert.equal(result.error, undefined);
  assert.equal(result.cases?.length, 5);
  assert.ok(result.cases?.every((c) => c.passed));
  assert.equal(result.output.length, 3);
  const starter = await compile(
    'function getDailyMessage(name: string, hasCheckedIn: boolean, needsHelp: boolean): string { return "固定消息"; }',
  );
  assert.equal(starter.diagnostics.length, 0);
  const incomplete = await execute(starter.javascript, 'daily-message');
  assert.ok(incomplete.cases?.every((c) => !c.passed));
});
test('runtime errors remain separate from type checks', async () => {
  const code = await compile('throw new Error("运行失败");');
  assert.equal(code.diagnostics.length, 0);
  const result = await execute(code.javascript);
  assert.match(result.error ?? '', /运行失败/);
});

test('every lesson two example compiles and produces its intended output', async () => {
  const outputs: Record<keyof typeof collectionExamples, string[]> = {
    recap: ['李爷爷今日已报平安。'],
    object: ['王奶奶', 'false'],
    update: ['true'],
    typedObject: ['王奶奶'],
    arrays: ['3', '王奶奶', '陈奶奶'],
    push: ['2', '["王奶奶今日尚未打卡。","李爷爷今日已报平安。"]'],
    loop: ['王奶奶今日尚未打卡。', '李爷爷今日已报平安。', '陈奶奶表示需要帮助，请联系确认。'],
    complete: [
      '["王奶奶今日尚未打卡。","李爷爷今日已报平安。","陈奶奶表示需要帮助，请联系确认。"]',
      '[]',
    ],
  };
  for (const name of Object.keys(collectionExamples) as (keyof typeof collectionExamples)[]) {
    const result = await compile(collectionExamples[name]);
    assert.equal(result.error, undefined, name);
    assert.deepEqual(result.diagnostics, [], `${name}: ${JSON.stringify(result.diagnostics)}`);
    const execution = await execute(result.javascript);
    assert.equal(execution.error, undefined, name);
    assert.deepEqual(Array.from(execution.output), outputs[name], name);
  }
});

test('object exercises report real wrong-property-type and missing-property diagnostics', async () => {
  const wrongType = await compile(
    collectionExamples.typedObject.replace('hasCheckedIn: false', 'hasCheckedIn: "false"'),
  );
  assert.ok(wrongType.diagnostics.some((d) => d.code === 2322));
  assert.equal(wrongType.javascript, '');
  const missing = await compile(
    collectionExamples.typedObject.replace('  needsHelp: false,\n', ''),
  );
  assert.ok(missing.diagnostics.some((d) => d.code === 2741));
  assert.equal(missing.javascript, '');
});

test('lesson two checks array return values independently from printed output', async () => {
  const complete = await compile(collectionExamples.complete);
  assert.deepEqual(complete.diagnostics, []);
  const correct = await execute(complete.javascript, 'daily-messages');
  assert.equal(correct.error, undefined);
  assert.equal(correct.cases?.length, 5);
  assert.ok(correct.cases?.every((c) => c.passed));

  const starter = await compile(
    collectionExamples.complete.replace(
      buildMessagesCode,
      'function buildDailyMessages(residents: Resident[]): string[] { return []; }',
    ),
  );
  assert.deepEqual(starter.diagnostics, []);
  const incomplete = await execute(starter.javascript, 'daily-messages');
  assert.equal(incomplete.cases?.filter((c) => c.passed).length, 1);

  const printsOnly = await compile(
    collectionExamples.complete.replace(
      '  return messages;',
      '  console.log(messages);\n  return [];',
    ),
  );
  assert.deepEqual(printsOnly.diagnostics, []);
  const printed = await execute(printsOnly.javascript, 'daily-messages');
  assert.ok(printed.output.some((line) => line.includes('王奶奶今日尚未打卡。')));
  assert.equal(printed.cases?.filter((c) => c.passed).length, 1);
});

test('lesson two rejects early returns, fixed-size results, wrong ordering and strings pretending to be arrays', async () => {
  const variants = [
    collectionExamples.complete.replace(
      '    messages.push(message);',
      '    messages.push(message);\n    return messages;',
    ),
    collectionExamples.complete.replace('  return messages;', '  return messages.slice(0, 3);'),
    collectionExamples.complete.replace('  return messages;', '  return messages.reverse();'),
    collectionExamples.complete.replace(
      buildMessagesCode,
      'function buildDailyMessages(residents: Resident[]): string { return "[]"; }',
    ),
  ];
  for (const code of variants) {
    const result = await compile(code);
    assert.deepEqual(result.diagnostics, []);
    const executed = await execute(result.javascript, 'daily-messages');
    assert.equal(executed.error, undefined);
    assert.ok(executed.cases?.some((c) => !c.passed));
  }
});

test('out-of-range object access is a runtime error even after successful type checking', async () => {
  const code = await compile('const people: { name: string }[] = []; console.log(people[0].name);');
  assert.deepEqual(code.diagnostics, []);
  const execution = await execute(code.javascript);
  assert.match(execution.error ?? '', /TypeError/);
});

test('every complete demonstration matches its real diagnostic, output or runtime error', async () => {
  for (const example of [
    ...typeCases,
    ...variableCases,
    ...functionCases,
    ...objectCases,
    ...arrayCases,
    ...loopCases,
    ...messageCases,
  ]) {
    const compiled = await compile(example.code);
    assert.equal(compiled.error, undefined, example.title);
    if (example.expectedDiagnostic !== undefined) {
      assert.ok(
        compiled.diagnostics.some((item) => item.code === example.expectedDiagnostic),
        `${example.title}: ${JSON.stringify(compiled.diagnostics)}`,
      );
      assert.equal(compiled.javascript, '', example.title);
      continue;
    }
    assert.deepEqual(compiled.diagnostics, [], example.title);
    const execution = await execute(compiled.javascript);
    if (example.expectedError) {
      assert.ok(
        execution.error?.includes(example.expectedError),
        `${example.title}: ${execution.error}`,
      );
    } else {
      assert.equal(execution.error, undefined, example.title);
      assert.deepEqual(Array.from(execution.output), example.expectedOutput, example.title);
    }
  }
});

test('simple object, array and loop examples have the outputs explained in the lesson', async () => {
  const expected: Record<keyof typeof conceptExamples, string[]> = {
    manualResidents: ['王奶奶今日尚未打卡。', '李爷爷今日已报平安。'],
    thirdResident: ['陈奶奶表示需要帮助，请联系确认。'],
    repeatedBranches: ['王奶奶今日尚未打卡。', '李爷爷今日已报平安。'],
    studentVariables: ['小林', '16', '高一三班'],
    studentCard: ['小林', '16', '高一三班'],
    names: ['3', '小林', '小陈'],
    updateArray: ['["小林","小陈","小李"]', '3'],
    simpleLoop: ['你好，小林！', '你好，小周！', '你好，小陈！', '全部问候完毕'],
    sum: ['270'],
    collect: ['["你好，小林！","你好，小周！"]'],
  };
  for (const name of Object.keys(conceptExamples) as (keyof typeof conceptExamples)[]) {
    const compiled = await compile(conceptExamples[name]);
    assert.deepEqual(compiled.diagnostics, [], name);
    const execution = await execute(compiled.javascript);
    assert.equal(execution.error, undefined, name);
    assert.deepEqual(Array.from(execution.output), expected[name], name);
  }
});
