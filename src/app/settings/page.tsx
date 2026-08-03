"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings2, Download, Upload, Trash2, Bell } from "lucide-react";
import { db } from "@/db";

export default function SettingsPage() {
  
  const handleExport = async () => {
    // Basic export logic
    const data = {
      courses: await db.courses.toArray(),
      tasks: await db.tasks.toArray(),
      stats: await db.userStats.toArray(),
    };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ege-os-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-6 p-4 pt-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Настройки</h1>
        <p className="text-sm text-muted-foreground">Управление ЕГЭ OS</p>
      </header>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">Уведомления</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">Push-уведомления</div>
                <div className="text-xs text-muted-foreground">Напоминания об отдыхе</div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => Notification.requestPermission()}>
              Включить
            </Button>
          </CardContent>
        </Card>

        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1 mt-6">Данные</h2>
        
        <Card className="bg-card border-border">
          <CardContent className="p-0 divide-y divide-border/50">
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors" onClick={handleExport}>
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Экспорт прогресса (Бэкап)</span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Импорт резервной копии</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-destructive/10 border-destructive/20 mt-8">
          <CardContent className="p-4 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              <span className="font-semibold">Опасная зона</span>
            </div>
            <p className="text-xs text-destructive/80">Это действие безвозвратно удалит весь ваш прогресс, задачи и настройки из памяти устройства.</p>
            <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => {
              if (confirm('Точно удалить все данные? Это действие нельзя отменить.')) {
                db.delete().then(() => window.location.reload());
              }
            }}>
              Сбросить весь прогресс
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
