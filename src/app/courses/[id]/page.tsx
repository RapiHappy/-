import CourseDetailClient from "./client";

export function generateStaticParams() {
  return [
    { id: 'info-jedi' },
    { id: 'rus-norm' },
    { id: 'rus-100' },
    { id: 'rus-prep' },
    { id: 'info-python' }
  ];
}

export default function Page() {
  return <CourseDetailClient />;
}
