'use client';
import { useEffect, useRef, useState } from 'react';
import type { DemonstrationCase } from '@/lessons/types';
import { CodeBlock } from '@/components/lesson/code-block';
import styles from './demos.module.css';

interface Diagnostic {
  code: number;
  line?: number;
  message: string;
}
interface Result {
  diagnostics?: Diagnostic[];
  output?: string[];
  error?: string;
}

function CaseRun({ example }: { example: DemonstrationCase }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const compiler = useRef<Worker | null>(null);
  const runner = useRef<Worker | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function clearTimer() {
    if (timer.current) clearTimeout(timer.current);
  }
  useEffect(
    () => () => {
      compiler.current?.terminate();
      runner.current?.terminate();
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function run() {
    clearTimer();
    compiler.current?.terminate();
    runner.current?.terminate();
    setBusy(true);
    setResult(null);
    const worker = new Worker('/compiler-worker.js');
    compiler.current = worker;
    timer.current = setTimeout(() => {
      worker.terminate();
      setBusy(false);
      setResult({ error: '编译器加载超时，可重新运行此案例。' });
    }, 20000);
    worker.onerror = () => {
      clearTimer();
      worker.terminate();
      setBusy(false);
      setResult({ error: '编译器加载失败，可刷新页面后重新演示。' });
    };
    worker.onmessage = (event) => {
      clearTimer();
      worker.terminate();
      const { diagnostics, javascript, error } = event.data as {
        diagnostics?: Diagnostic[];
        javascript?: string;
        error?: string;
      };
      if (error || diagnostics?.length || javascript === undefined) {
        setResult({
          diagnostics,
          error: error ?? (javascript === undefined ? '编译器未返回可运行代码。' : undefined),
        });
        setBusy(false);
        return;
      }
      const execution = new Worker('/runner-worker.js');
      runner.current = execution;
      timer.current = setTimeout(() => {
        execution.terminate();
        setBusy(false);
        setResult({ diagnostics: [], error: '运行超过 2 秒，演示已停止。' });
      }, 2000);
      execution.onerror = () => {
        clearTimer();
        execution.terminate();
        setBusy(false);
        setResult({ diagnostics: [], error: '此案例运行失败。' });
      };
      execution.onmessage = (response) => {
        clearTimer();
        execution.terminate();
        setBusy(false);
        setResult({ diagnostics: [], ...response.data });
      };
      execution.postMessage({ javascript });
    };
    worker.postMessage({ id: 1, code: example.code });
  }

  return (
    <>
      <CodeBlock title={example.title} code={example.code} />
      <p>{example.explanation}</p>
      <div className={styles.buttons}>
        <button className={styles.primary} disabled={busy} onClick={run}>
          {busy ? '正在演示…' : '运行此案例'}
        </button>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {result && (
          <>
            {result.diagnostics && (
              <div className={styles.feedback}>
                <strong>类型检查</strong>
                {result.diagnostics.length ? (
                  <>
                    <p>类型检查未通过，此案例没有进入运行。</p>
                    <ul>
                      {result.diagnostics.map((diagnostic, i) => (
                        <li key={i}>
                          <code>TS{diagnostic.code}</code> · 第 {diagnostic.line ?? '—'} 行
                          <p>{diagnostic.message}</p>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>类型检查通过，再看实际运行结果。</p>
                )}
              </div>
            )}
            {result.output && (
              <div className={styles.console}>
                <small>控制台输出</small>
                <pre>{result.output.join('\n') || '没有打印内容。'}</pre>
              </div>
            )}
            {result.error && <p className={styles.error}>运行或加载反馈：{result.error}</p>}
          </>
        )}
      </div>
    </>
  );
}

export function CodeDemonstration({
  title,
  cases,
}: {
  title: string;
  cases: readonly DemonstrationCase[];
}) {
  const [selected, setSelected] = useState(0);
  const example = cases[selected];
  return (
    <figure className={styles.demo}>
      <figcaption>
        {title}
        <span>完整案例演示</span>
      </figcaption>
      <div className={styles.demoBody}>
        <div className={styles.buttons} role="group" aria-label={`${title}：案例选择`}>
          {cases.map((item, i) => (
            <button key={item.id} aria-pressed={i === selected} onClick={() => setSelected(i)}>
              {item.title}
            </button>
          ))}
        </div>
        <CaseRun key={example.id} example={example} />
      </div>
    </figure>
  );
}
