export interface Lesson {
  id: number;
  title: string;
  status: 'ready' | 'planned';
  summary?: string;
  presentation?: {
    subtitle: string;
    progression: string;
    intro: string;
    goal: string;
    goalDescription: string;
  };
}
export interface LessonSection {
  id: string;
  title: string;
}
