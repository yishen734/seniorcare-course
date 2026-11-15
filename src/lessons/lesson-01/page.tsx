import type { ReactNode } from 'react';
import type { Lesson } from '@/curriculum/types';
import { LessonChapters } from '../lesson-chapters';
import { lessonSections, schedule } from './sections';
export function LessonOnePage({ lesson, chapters }: { lesson: Lesson; chapters: ReactNode[] }) {
  return (
    <LessonChapters
      lesson={lesson}
      sections={lessonSections}
      schedule={schedule}
      chapters={chapters}
    />
  );
}
