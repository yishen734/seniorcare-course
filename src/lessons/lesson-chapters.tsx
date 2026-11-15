import type { ReactNode } from 'react';
import type { Lesson, LessonSection } from '@/curriculum/types';
import { LessonFrame } from '@/components/lesson/lesson-frame';
import { Section } from '@/components/lesson/primitives';

export function LessonChapters({
  lesson,
  sections,
  schedule,
  chapters,
}: {
  lesson: Lesson;
  sections: readonly LessonSection[];
  schedule: readonly (readonly [number, number])[];
  chapters: ReactNode[];
}) {
  return (
    <LessonFrame lesson={lesson} sections={sections}>
      {sections.map((section, i) => (
        <Section
          key={section.id}
          id={section.id}
          number={i + 1}
          title={section.title}
          minutes={`${schedule[i][0]}–${schedule[i][1]} 分钟`}
        >
          {chapters[i]}
        </Section>
      ))}
    </LessonFrame>
  );
}
