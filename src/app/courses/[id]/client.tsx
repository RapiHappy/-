"use client";

import { useRef, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronLeft, Filter, CheckCircle2, Circle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskStatus } from "@/types";

export default function CourseDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

  const course = useLiveQuery(() => db.courses.get(id), [id]);
  const allTasks = useLiveQuery(() => db.tasks.where('courseId').equals(id).sortBy('number'), [id]);

  const tasks = useMemo(() => {
    if (!allTasks) return [];
    if (filter === 'all') return allTasks;
    return allTasks.filter(t => t.status === filter);
  }, [allTasks, filter]);

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64, // estimated height of each task row
    overscan: 10,
  });

  const toggleTaskStatus = async (taskId: string, currentStatus: TaskStatus) => {
    let newStatus: TaskStatus = 'completed';
    if (currentStatus === 'completed') newStatus = 'error';
    else if (currentStatus === 'error') newStatus = 'not_started';
    
    await db.tasks.update(taskId, { status: newStatus });
    
    // Update course counts
    if (course) {
      let completedDiff = 0;
      let errorDiff = 0;
      
      if (currentStatus === 'completed') completedDiff = -1;
      if (newStatus === 'completed') completedDiff = 1;
      
      if (currentStatus === 'error') errorDiff = -1;
      if (newStatus === 'error') errorDiff = 1;

      await db.courses.update(id, {
        completedTasks: course.completedTasks + completedDiff,
        errorTasks: course.errorTasks + errorDiff
      });
    }
  };

  if (!course) return null;

  const getStatusIcon = (status: TaskStatus) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-500/20" />;
      case 'error': return <XCircle className="w-6 h-6 text-red-500 fill-red-500/20" />;
      case 'review': return <Clock className="w-6 h-6 text-amber-500 fill-amber-500/20" />;
      default: return <Circle className="w-6 h-6 text-slate-600" />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <header className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 -ml-2">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-base font-bold truncate">{course.title}</h1>
            <p className="text-xs text-muted-foreground">{course.completedTasks} / {course.totalTasks} выполнено</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Filter className="w-4 h-4" />
        </Button>
      </header>

      <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar shrink-0 border-b border-border/50">
        <Button 
          variant={filter === 'all' ? 'default' : 'secondary'} 
          size="sm" 
          className="rounded-full text-xs h-7 px-3"
          onClick={() => setFilter('all')}
        >
          Все
        </Button>
        <Button 
          variant={filter === 'not_started' ? 'default' : 'secondary'} 
          size="sm" 
          className="rounded-full text-xs h-7 px-3"
          onClick={() => setFilter('not_started')}
        >
          Новые
        </Button>
        <Button 
          variant={filter === 'completed' ? 'default' : 'secondary'} 
          size="sm" 
          className="rounded-full text-xs h-7 px-3"
          onClick={() => setFilter('completed')}
        >
          Решённые
        </Button>
        <Button 
          variant={filter === 'error' ? 'default' : 'secondary'} 
          size="sm" 
          className="rounded-full text-xs h-7 px-3"
          onClick={() => setFilter('error')}
        >
          Ошибки
        </Button>
      </div>

      <div ref={parentRef} className="flex-1 overflow-y-auto w-full p-2">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const task = tasks[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="px-2 py-1"
              >
                <div 
                  className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 active:scale-[0.98] transition-transform cursor-pointer"
                  onClick={() => toggleTaskStatus(task.id, task.status)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-300">
                      #{task.number}
                    </div>
                    <span className="text-sm font-medium">Задача {task.number}</span>
                  </div>
                  {getStatusIcon(task.status)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
