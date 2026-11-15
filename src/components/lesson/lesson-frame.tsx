import type { Lesson, LessonSection } from '@/curriculum/types';
import styles from './lesson-frame.module.css';
export function LessonFrame({
  lesson,
  sections,
  children,
}: {
  lesson: Lesson;
  sections: readonly LessonSection[];
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <article className={styles.article}>
        <header className={styles.hero}>
          <div className={styles.eyebrow}>
            第 {String(lesson.id).padStart(2, '0')} 课<span>编程基础 / SeniorCare</span>
          </div>
          <h1>{lesson.title}</h1>
          <p className={styles.subtitle}>{lesson.presentation?.subtitle ?? '内容待编写'}</p>
          <div className={styles.meta}>
            <span>60 分钟</span>
            <span>项目：SeniorCare</span>
            <span>{lesson.presentation?.progression ?? '待编写'}</span>
          </div>
          {lesson.presentation && (
            <>
              <p className={styles.intro}>{lesson.presentation.intro}</p>
              <div className={styles.heroActions}>
                <a href={`#${sections[0]?.id ?? 'mission'}`}>开始阅读 ↓</a>
                <a href="#case-study">查看完整案例 ↗</a>
              </div>
            </>
          )}
        </header>
        {sections.length > 0 && (
          <details className={styles.mobileToc}>
            <summary>本课章节 · 快速跳转</summary>
            <nav>
              {sections.map((s) => (
                <a href={`#${s.id}`} key={s.id}>
                  {s.title}
                </a>
              ))}
            </nav>
          </details>
        )}
        <div id="lesson-content">{children}</div>
      </article>
      {sections.length > 0 && (
        <aside className={styles.toc}>
          <span className={styles.tocLabel}>本课目录</span>
          <nav aria-label="本课章节">
            {sections.map((s, i) => (
              <a href={`#${s.id}`} key={s.id}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </a>
            ))}
          </nav>
          <div className={styles.tocGoal}>
            本课案例<strong>{lesson.presentation?.goal}</strong>
            <span>{lesson.presentation?.goalDescription}</span>
          </div>
        </aside>
      )}
    </div>
  );
}
