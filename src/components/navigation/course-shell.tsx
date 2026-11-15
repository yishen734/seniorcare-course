'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { curriculum } from '@/curriculum/catalog';
import { lessonHref, parseCourseRoute } from '@/lib/course-routes';
import styles from './course-shell.module.css';
export function CourseShell({ children }: { children: React.ReactNode }) {
  const { lessonId, isCurriculum } = parseCourseRoute(usePathname());
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#main">
        跳到正文
      </a>
      <header className={styles.mobileHeader}>
        <strong>EASON / 编程课程</strong>
        <button
          aria-expanded={open}
          aria-controls="course-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? '收起目录' : '课程目录'}
        </button>
      </header>
      <aside id="course-navigation" className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <Link className={styles.brand} href={lessonHref(1)} onClick={() => setOpen(false)}>
          <span className={styles.tsMark} aria-hidden="true">
            TS
          </span>
          <span>
            EASON<small>编程 / 项目课程</small>
          </span>
        </Link>
        <div className={styles.courseLabel}>TypeScript Senior Care Project</div>
        <nav aria-label="课程导航">
          <Link
            className={`${styles.overview} ${isCurriculum ? styles.active : ''}`}
            href="/curriculum/"
            onClick={() => setOpen(false)}
          >
            <span>▦</span>
            <span>
              课程路线<small>基础 → 项目</small>
            </span>
          </Link>
          <div className={styles.group}>
            <h2>01 / 编程基础</h2>
            {curriculum.map((lesson) => (
              <Link
                key={lesson.id}
                href={lessonHref(lesson.id)}
                aria-current={!isCurriculum && lessonId === lesson.id ? 'page' : undefined}
                className={`${styles.lesson} ${!isCurriculum && lessonId === lesson.id ? styles.active : ''}`}
                onClick={() => setOpen(false)}
              >
                <span className={styles.number}>{String(lesson.id).padStart(2, '0')}</span>
                <span>
                  {lesson.title}
                  {lesson.status === 'planned' && <small>待编写</small>}
                </span>
                {lesson.status === 'ready' && (
                  <span className={styles.ready} aria-label="讲义已制作">
                    ●
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <span className={styles.crumb}>
            Eason 的课程
            <span className={styles.crumbDetail}>
              <span className={styles.divider}>/</span>TypeScript
            </span>
          </span>
          <span className={styles.topLabel}>SeniorCare · 项目启航</span>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className={styles.footer}>
          <span>© Eason · 课程与讲义</span>
          <span>SeniorCare · 从想法到程序</span>
        </footer>
      </div>
    </div>
  );
}
