'use client';
import { useState } from 'react';
import { CodeBlock } from '@/components/lesson/code-block';
import { getDailyMessage } from '@/lib/check-in';
import { buildDailyMessages, sampleResidents, type Resident } from '@/lib/residents';
import styles from './demos.module.css';

export function ObjectExplorer() {
  const [person, setPerson] = useState<Resident>({ ...sampleResidents[0] });
  return (
    <figure className={styles.demo}>
      <figcaption>属性变化演示：从未打卡到收到报告</figcaption>
      <div className={styles.demoBody}>
        <CodeBlock
          title="person 此刻的资料"
          code={`const person = {\n  name: "王奶奶",\n  hasCheckedIn: ${person.hasCheckedIn},\n  needsHelp: ${person.needsHelp},\n};`}
        />
        <div className={styles.buttons}>
          <button
            onClick={() => setPerson({ ...person, hasCheckedIn: true })}
            disabled={person.hasCheckedIn}
          >
            标记已打卡
          </button>
          <button
            onClick={() => setPerson({ ...person, needsHelp: true })}
            disabled={!person.hasCheckedIn || person.needsHelp}
          >
            标记需要帮助
          </button>
          <button onClick={() => setPerson({ ...sampleResidents[0] })}>重置资料</button>
        </div>
        <div className={styles.result} aria-live="polite">
          <small>用当前属性调用上一课的函数</small>
          <p>{getDailyMessage(person.name, person.hasCheckedIn, person.needsHelp)}</p>
        </div>
        <p className={styles.caption}>
          两步状态变化分别对应 hasCheckedIn 和 needsHelp。资料的姓名保持不变。
        </p>
      </div>
    </figure>
  );
}

export function ArrayExplorer() {
  const [residents, setResidents] = useState<Resident[]>(sampleResidents);
  return (
    <figure className={styles.demo}>
      <figcaption>数组演示：人数改变时，下标怎样对应</figcaption>
      <div className={styles.demoBody}>
        <div className={styles.flags} aria-live="polite">
          <code>residents.length = {residents.length}</code>
          <code>最后一项的下标：{residents.length ? residents.length - 1 : '没有元素'}</code>
        </div>
        <ol className={styles.arrayItems} aria-label="资料列表和下标">
          {residents.map((person, i) => (
            <li key={i}>
              <code>residents[{i}]</code>
              <span>{person.name}</span>
            </li>
          ))}
        </ol>
        {residents.length === 0 && (
          <p>现在是空数组 []，没有第一项，因此 residents[0] 不是一份可读取姓名的对象。</p>
        )}
        <div className={styles.buttons}>
          <button
            disabled={residents.length >= 4}
            onClick={() =>
              setResidents([...residents, { name: '赵爷爷', hasCheckedIn: true, needsHelp: false }])
            }
          >
            在末尾加入一人
          </button>
          <button
            disabled={residents.length === 0}
            onClick={() => setResidents(residents.slice(0, -1))}
          >
            移除最后一人
          </button>
          <button onClick={() => setResidents(sampleResidents)}>重置列表</button>
        </div>
        <p className={styles.caption}>
          人数从 1 开始数，下标从 0 开始。加入一人后，原来各项的下标保持不变。
        </p>
      </div>
    </figure>
  );
}

export function LoopExplorer() {
  const [step, setStep] = useState(0);
  const [empty, setEmpty] = useState(false);
  const residents = empty ? [] : sampleResidents;
  const processed = Math.min(step, residents.length);
  const finished = step > residents.length;
  const person = step > 0 && !finished ? residents[step - 1] : undefined;
  const messages = buildDailyMessages(residents.slice(0, processed));
  return (
    <figure className={styles.demo}>
      <figcaption>
        逐轮执行：这一轮正在处理谁？
        <span>
          {processed} / {residents.length} 人
        </span>
      </figcaption>
      <div className={styles.demoBody}>
        <label className={styles.emptyToggle}>
          <input
            type="checkbox"
            checked={empty}
            onChange={(event) => {
              setEmpty(event.target.checked);
              setStep(0);
            }}
          />
          演示空数组 []
        </label>
        <CodeBlock
          title="buildDailyMessages 函数内部的循环片段"
          code={
            'for (const person of residents) {\n  const message = getDailyMessage(\n    person.name, person.hasCheckedIn, person.needsHelp\n  );\n  messages.push(message);\n}\nreturn messages;'
          }
        />
        <div className={styles.traceGrid} aria-live="polite">
          <div className={styles.memory}>
            <small>
              {finished ? '循环已结束' : person ? `第 ${step} 轮：当前 person` : '尚未进入循环'}
            </small>
            {person ? (
              <>
                <pre>{JSON.stringify(person, null, 2)}</pre>
                <small>本轮 getDailyMessage 的返回值</small>
                <p>{messages[processed - 1]}</p>
              </>
            ) : (
              <p>
                {finished
                  ? '没有下一项了，执行循环后面的 return messages。'
                  : '先准备空消息数组，随后将按顺序处理每份资料。'}
              </p>
            )}
          </div>
          <div className={styles.memory}>
            <small>{finished ? '最终返回的 string[]' : 'messages 目前保存的内容'}</small>
            <pre>{JSON.stringify(messages, null, 2)}</pre>
            <p>已保存 {messages.length} 条消息。</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <button disabled={step === 0} onClick={() => setStep(step - 1)}>
            上一步
          </button>
          <button className={styles.primary} disabled={finished} onClick={() => setStep(step + 1)}>
            {processed === residents.length ? '结束循环并返回' : '下一轮'}
          </button>
          <button onClick={() => setStep(0)}>重置执行</button>
        </div>
        <p className={styles.caption}>
          {empty
            ? '空数组没有元素，循环体执行 0 次，最后仍然返回 []。'
            : '循环体中的每次调用只返回一条消息；循环外的 return 才返回整个列表。'}
        </p>
      </div>
    </figure>
  );
}
