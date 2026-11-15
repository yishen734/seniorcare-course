'use client';
import { useState } from 'react';
import { getBranch, getDailyMessage, variableSteps } from '@/lib/check-in';

import styles from './demos.module.css';
export function ProjectFlow() {
  return (
    <ol className={styles.projectFlow} aria-label={'SeniorCare 打卡流程'}>
      {[
        ['老人端', '点一下，报平安'],
        ['程序', '读取数据，选择消息'],
        ['家人端', '看到今天的状态'],
      ].map(([label, text], i) => (
        <li key={label}>
          <span className={styles.flowNumber}>0{i + 1}</span>
          <small>{label}</small>
          <strong>{text}</strong>
        </li>
      ))}
    </ol>
  );
}
export function VariableExplorer() {
  const [step, setStep] = useState(0);
  const current = step > 0 ? variableSteps[step - 1] : undefined;
  return (
    <figure className={styles.demo}>
      <figcaption>
        {'逐行执行：数据什么时候改变？'}
        <span>{step} / 4</span>
      </figcaption>
      <div className={styles.demoBody}>
        <div className={styles.traceGrid}>
          <ol className={styles.traceCode} aria-label={'执行步骤'}>
            {variableSteps.map((item, i) => (
              <li key={item.line} data-active={step === i + 1} data-complete={step > i + 1}>
                <code>{item.line}</code>
              </li>
            ))}
          </ol>
          <div className={styles.memory} aria-live="polite">
            <small>{'变量此刻的值'}</small>
            {current ? (
              Object.entries(current.variables).map(([name, value]) => (
                <div key={name}>
                  <code>{name}</code>
                  <strong>{JSON.stringify(value)}</strong>
                </div>
              ))
            ) : (
              <p>{'演示起点：尚未执行任何语句。'}</p>
            )}
            <small>{'控制台'}</small>
            <pre>{current?.output || '暂无输出'}</pre>
          </div>
        </div>
        <div className={styles.buttons}>
          <button disabled={step === 0} onClick={() => setStep(step - 1)}>
            {'上一步'}
          </button>
          <button
            className={styles.primary}
            disabled={step === 4}
            onClick={() => setStep(step + 1)}
          >
            {'下一步'}
          </button>
          <button onClick={() => setStep(0)}>{'重置'}</button>
        </div>
        <p className={styles.caption}>{'第 3 行改变变量；第 4 行才把当时的值打印出来。'}</p>
      </div>
    </figure>
  );
}
export function BranchExplorer() {
  const [checked, setChecked] = useState(false),
    [help, setHelp] = useState(false);
  const branch = getBranch(checked, help);
  const choices = [
    {
      id: 'pending',
      condition: '!hasCheckedIn',
      label: '还没有打卡',
      text: '今日尚未打卡',
    },
    {
      id: 'help',
      condition: 'needsHelp',
      label: '打卡并表示需要帮助',
      text: '表示需要帮助，请联系确认',
    },
    {
      id: 'ok',
      condition: 'else',
      label: '打卡并表示平安',
      text: '今日已报平安',
    },
  ];
  return (
    <figure className={styles.demo}>
      <figcaption>{'分支演示：三种资料对应三条执行路径'}</figcaption>
      <div className={styles.demoBody}>
        <div className={styles.buttons}>
          {choices.map((choice) => (
            <button
              key={choice.id}
              aria-pressed={branch === choice.id}
              onClick={() => {
                setChecked(choice.id !== 'pending');
                setHelp(choice.id === 'help');
              }}
            >
              {choice.label}
            </button>
          ))}
        </div>
        <div className={styles.flags}>
          <code>hasCheckedIn = {String(checked)}</code>
          <code>needsHelp = {String(help)}</code>
        </div>
        <ol className={styles.branchList}>
          {choices.map((choice, i) => (
            <li key={choice.id} data-selected={branch === choice.id}>
              <span>{branch === choice.id ? '→' : '·'}</span>
              <code>
                {i === 0
                  ? 'if (' + choice.condition + ')'
                  : i === 1
                    ? 'else if (' + choice.condition + ')'
                    : 'else'}
              </code>
              <span>{choice.text}</span>
            </li>
          ))}
        </ol>
        <div className={styles.result} aria-live="polite">
          <small>{'函数返回的文字'}</small>
          <p>{getDailyMessage('王奶奶', checked, help)}</p>
        </div>
        <button
          onClick={() => {
            setChecked(false);
            setHelp(false);
          }}
        >
          {'重置'}
        </button>
      </div>
    </figure>
  );
}
