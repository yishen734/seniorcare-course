import { curriculum } from '@/curriculum/catalog';
import { LessonPage, lessonMetadata } from '@/lessons/lesson-page';
export const dynamicParams = false;
export function generateStaticParams() {
  return curriculum.map((lesson) => ({ lessonId: String(lesson.id) }));
}
type Props = { params: Promise<{ lessonId: string }> };
export async function generateMetadata({ params }: Props) {
  return lessonMetadata((await params).lessonId);
}
export default async function Page({ params }: Props) {
  return <LessonPage lessonId={(await params).lessonId} />;
}
