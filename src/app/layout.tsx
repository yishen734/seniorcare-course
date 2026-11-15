import type { Metadata } from 'next';
import './globals.css';
import { CourseShell } from '@/components/navigation/course-shell';
export const metadata: Metadata = {
  title: { default: 'Eason · TypeScript Senior Care Project', template: '%s | Eason' },
  description: '从 SeniorCare 项目出发，学习变量、类型、条件和函数。Eason 的 TypeScript 互动课程。',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <CourseShell>{children}</CourseShell>
      </body>
    </html>
  );
}
