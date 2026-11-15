import type { ComponentType } from 'react';
import type { LessonContentProps } from './types';
import { LessonOne } from './lesson-01/content';
import { LessonTwo } from './lesson-02/content';
export const lessonRegistry: Partial<Record<number, ComponentType<LessonContentProps>>> = {
  1: LessonOne,
  2: LessonTwo,
};
