"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Calendar, Target } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AnalyticsPage() {
  const stats = useLiveQuery(() => db.userStats.get("stats"));

  const dummyData = [
    { name: "Пн", tasks: 45 },
    { name: "Вт", tasks: 52 },
    { name: "Ср", tasks: 38 },
    { name: "Чт", tasks: 65 },
    { name: "Пт", tasks: 48 },
    { name: "Сб", tasks: 12 },
    { name: "Вс", tasks: 0 },
  ];

  if (!stats) return null;

  return (
    <div className="flex flex-col gap-6 p-4 pt-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Успехи</h1>
        <p className="text-sm text-muted-foreground">Твоя статистика и аналитика</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <div>
              <div className="text-2xl font-black">{stats.currentStreak}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Стрик</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <Target className="h-6 w-6 text-green-500" />
            <div>
              <div className="text-2xl font-black">{stats.totalTasksCompleted}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Решено задач</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Активность за неделю
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip 
                  cursor={{ fill: '#1E293B' }}
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="tasks" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-border mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            Heatmap (GitHub style)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8 border border-dashed border-border rounded-xl mt-2">
            Здесь будет график активности как в GitHub
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
