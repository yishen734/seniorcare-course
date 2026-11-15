import Link from 'next/link';
import { curriculum } from './catalog';
import { lessonHref } from '@/lib/course-routes';
import styles from '@/components/lesson/lesson-frame.module.css';
export function CurriculumOverview() {
  return (
    <article className={styles.widePage}>
      <div className={styles.eyebrow}>TypeScript Senior Care Project</div>
      <h1>先学会编程，再把想法做出来。</h1>
      <p className={styles.subtitle}>用 2–3 节课补齐项目需要的基础，再进入 SeniorCare。</p>
      <p>当前开放第一、二节。第三节保留空白，按学生的学习情况继续安排。</p>
      <div className={styles.curriculumGrid}>
        {curriculum.map((lesson) => (
          <section key={lesson.id} className={styles.lessonCard}>
            <span className={styles.cardNumber}>第 {String(lesson.id).padStart(2, '0')} 课</span>
            <h2>{lesson.title}</h2>
            <p>{lesson.summary ?? '内容暂时留白。'}</p>
            <Link href={lessonHref(lesson.id)}>
              {lesson.status === 'ready'
                ? `开始第${lesson.id === 1 ? '一' : '二'}节 →`
                : '查看占位页 →'}
            </Link>
          </section>
        ))}
      </div>
    </article>
  );
}
