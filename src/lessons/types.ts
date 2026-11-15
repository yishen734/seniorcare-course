import type { Lesson } from '@/curriculum/types';
export interface LessonContentProps {
  lesson: Lesson;
}

export interface DemonstrationCase {
  id: string;
  title: string;
  code: string;
  explanation: string;
  expectedOutput?: string[];
  expectedDiagnostic?: number;
  expectedError?: string;
}
