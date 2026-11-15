import styles from './notes.module.css';
export function Section({
  id,
  number,
  title,
  minutes,
  children,
}: {
  id: string;
  number: number;
  title: string;
  minutes?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      <header className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>{String(number).padStart(2, '0')}</span>
        <h2>{title}</h2>
        {minutes && <span className={styles.minutes}>{minutes}</span>}
      </header>
      <div className={styles.prose}>{children}</div>
    </section>
  );
}
export function Note({
  title,
  children,
  kind = 'insight',
}: {
  title: string;
  children: React.ReactNode;
  kind?: 'insight' | 'warning';
}) {
  return (
    <aside className={`${styles.note} ${kind === 'warning' ? styles.warning : ''}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}
export function KnowledgeTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly React.ReactNode[])[];
}) {
  return (
    <div className={styles.tableScroll} role="region" aria-label={caption} tabIndex={0}>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Review({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <details>
      <summary>{question}</summary>
      <div>{children}</div>
    </details>
  );
}
