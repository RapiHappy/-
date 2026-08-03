"use client";

import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flame, Target, BookOpen, Clock, Play } from "lucide-react";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EGE_DATE = new Date("2027-05-25");

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const stats = useLiveQuery(() => db.userStats.get("stats"));
  const courses = useLiveQuery(() => db.courses.toArray());
  const todaySessionTasks = 0; // We can track this later from dailyGoals

  const daysLeft = differenceInDays(EGE_DATE, new Date());
  
  if (!mounted || !stats || !courses) return null;

  const totalTasks = courses.reduce((acc, c) => acc + c.totalTasks, 0);
  const completedTasks = courses.reduce((acc, c) => acc + c.completedTasks, 0);
  const readiness = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const pieData = [
    { name: "Выполнено", value: completedTasks, color: "#22C55E" },
    { name: "Осталось", value: totalTasks - completedTasks, color: "#334155" }
  ];

  return (
    <div className="flex flex-col gap-6 p-4 pt-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ЕГЭ OS</h1>
          <p className="text-sm text-muted-foreground">Твой личный план подготовки</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1.5 text-orange-500">
          <Flame className="h-4 w-4 fill-orange-500" />
          <span className="font-bold">{stats.currentStreak} дн.</span>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50 shadow-md">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full gap-1">
            <Clock className="h-6 w-6 text-sky-400 mb-1" />
            <span className="text-3xl font-black text-sky-400">{daysLeft}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Дней до ЕГЭ</span>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50 shadow-md">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full gap-1">
            <Target className="h-6 w-6 text-green-500 mb-1" />
            <span className="text-3xl font-black text-green-500">{readiness}%</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Готовность</span>
          </CardContent>
        </Card>
      </section>

      <Card className="border-slate-800 bg-slate-900 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <CardHeader className="pb-2">
          <CardTitle>Общий прогресс</CardTitle>
          <CardDescription>Выполнено {completedTasks} из {totalTasks} заданий</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className="h-24 w-24 relative flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-sm font-bold">{readiness}%</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Сегодняшняя цель</span>
                <span className="font-medium text-sky-400">0 / 20</span>
              </div>
              <Progress value={5} className="h-1.5 bg-slate-800" indicatorClassName="bg-sky-400" />
            </div>
            <Button 
              className="w-full h-10 shadow-lg shadow-sky-500/20 rounded-xl"
              onClick={() => router.push('/focus')}
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Начать занятие
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold px-1">Твои предметы</h2>
        {courses.map(course => {
          const progress = course.totalTasks > 0 ? (course.completedTasks / course.totalTasks) * 100 : 0;
          return (
            <Card key={course.id} className="border-slate-800 bg-card active:scale-[0.98] transition-transform cursor-pointer" onClick={() => router.push(`/courses/${course.id}`)}>
              <CardContent className="p-4 flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" 
                  style={{ backgroundColor: `${course.color}20`, color: course.color }}
                >
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Progress value={progress} className="h-1 flex-1 bg-slate-800" indicatorColor={course.color} />
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{Math.round(progress)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
