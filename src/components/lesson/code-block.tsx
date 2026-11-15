'use client';
import { useState } from 'react';
import styles from './code.module.css';
export function CodeBlock({
  title = 'TypeScript',
  code,
  output,
}: {
  title?: string;
  code: string;
  output?: string;
}) {
  const [copied, setCopied] = useState('');
  const tokens = code.split(
    /(\/\/[^\n]*|`[^`]*`|"[^"\n]*"|'[^'\n]*'|\b(?:const|let|var|type|for|of|function|return|if|else|true|false|string|number|boolean)\b|\b\d+\b)/g,
  );
  return (
    <figure className={styles.code}>
      <figcaption>
        <span>{title}</span>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied('已复制');
            } catch {
              setCopied('请手动复制');
            }
          }}
        >
          {'复制'}
        </button>
      </figcaption>
      <pre tabIndex={0} aria-label={title}>
        <code>
          {tokens.map((token, i) => (
            <span
              key={i}
              className={
                token.startsWith('//')
                  ? styles.comment
                  : /^["'`]/.test(token)
                    ? styles.string
                    : /^(const|let|var|type|for|of|function|return|if|else|true|false|string|number|boolean)$/.test(
                          token,
                        )
                      ? styles.keyword
                      : /^\d+$/.test(token)
                        ? styles.number
                        : undefined
              }
            >
              {token}
            </span>
          ))}
        </code>
      </pre>
      {output !== undefined && (
        <div className={styles.output}>
          <small>{'控制台输出'}</small>
          <pre>{output}</pre>
        </div>
      )}
      <span className={styles.status} role="status">
        {copied}
      </span>
    </figure>
  );
}
