"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();
  const courses = useLiveQuery(() => db.courses.toArray());

  if (!courses) return null;

  return (
    <div className="flex flex-col gap-6 p-4 pt-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Курсы</h1>
        <p className="text-sm text-muted-foreground">Твоя программа подготовки</p>
      </header>

      <div className="space-y-4">
        {courses.map(course => {
          const progress = course.totalTasks > 0 ? (course.completedTasks / course.totalTasks) * 100 : 0;
          return (
            <Card key={course.id} className="border-slate-800 bg-card active:scale-[0.98] transition-transform cursor-pointer" onClick={() => router.push(`/courses/${course.id}`)}>
              <CardContent className="p-5 flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" 
                  style={{ backgroundColor: `${course.color}20`, color: course.color }}
                >
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">{course.title}</h3>
                  <div className="flex justify-between text-xs mt-2 mb-1.5 text-muted-foreground">
                    <span>Прогресс</span>
                    <span>{course.completedTasks} / {course.totalTasks}</span>
                  </div>
                  <Progress value={progress} className="h-1.5 bg-slate-800" indicatorColor={course.color} />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
