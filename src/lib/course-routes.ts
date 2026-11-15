export function lessonHref(id: number) {
  return `/lessons/${id}/`;
}
export function parseCourseRoute(path: string) {
  const parts = path.split('/').filter(Boolean);
  return {
    lessonId: parts[0] === 'lessons' ? Number(parts[1]) : 1,
    isCurriculum: parts[0] === 'curriculum',
  };
}
