import { notFound } from 'next/navigation';
import { findLesson } from '@/curriculum/catalog';
import { LessonFrame } from '@/components/lesson/lesson-frame';
import { lessonRegistry } from './registry';
export function lessonMetadata(id: string) {
  return { title: findLesson(id)?.title ?? '课程不存在' };
}
export function LessonPage({ lessonId }: { lessonId: string }) {
  const lesson = findLesson(lessonId);
  if (!lesson) notFound();
  const Content = lessonRegistry[lesson.id];
  if (Content) return <Content lesson={lesson} />;
  return (
    <LessonFrame lesson={lesson} sections={[]}>
      <p>本节内容暂时留白。</p>
    </LessonFrame>
  );
}
