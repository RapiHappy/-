"use client";

import { useEffect, useState } from 'react';
import { useFocusStore } from '@/store/useFocusStore';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, SkipForward } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@/components/ui/circular-progress'; // We will create this

export default function FocusMode() {
  const router = useRouter();
  const { status, timeLeft, activeTaskId, startFocus, pauseFocus, resumeFocus, stopFocus, tick } = useFocusStore();
  
  const [mounted, setMounted] = useState(false);
  
  // Tick every second if running
  useEffect(() => {
    setMounted(true);
    let interval: NodeJS.Timeout;
    if (status === 'running' || status === 'break') {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, tick]);

  if (!mounted) return null;

  // Initialize a default 50-minute session if idle
  if (status === 'idle') {
    return (
      <div className="flex flex-col h-screen items-center justify-center p-6 bg-background">
        <h1 className="text-3xl font-black text-center mb-2">Режим Фокуса</h1>
        <p className="text-muted-foreground text-center mb-8">Готов сконцентрироваться?</p>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
          <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl" onClick={() => startFocus('custom', 25 * 60)}>
            <span className="text-2xl font-bold">25</span>
            <span className="text-xs text-muted-foreground uppercase">минут</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-primary text-primary" onClick={() => startFocus('custom', 50 * 60)}>
            <span className="text-2xl font-bold">50</span>
            <span className="text-xs uppercase opacity-80">минут</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl col-span-2" onClick={() => startFocus('custom', 90 * 60)}>
            <span className="text-2xl font-bold">90</span>
            <span className="text-xs text-muted-foreground uppercase">минут (Deep Work)</span>
          </Button>
        </div>
        
        <Button variant="ghost" onClick={() => router.back()}>
          Вернуться назад
        </Button>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isBreak = status === 'break';
  const totalDuration = isBreak ? 10 * 60 : 50 * 60; // We should ideally store the total duration in the store to calculate progress properly
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className={`flex flex-col h-screen p-6 transition-colors duration-1000 ${isBreak ? 'bg-green-950/30' : 'bg-background'}`}>
      <header className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full animate-pulse ${isBreak ? 'bg-green-500' : 'bg-primary'}`} />
          <span className="font-medium text-sm tracking-widest uppercase opacity-70">
            {isBreak ? 'Отдых' : 'Фокус'}
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => { stopFocus(); router.back(); }}>
          <Square className="w-5 h-5 text-muted-foreground" />
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          <CircularProgress 
            value={progress} 
            size={256} 
            strokeWidth={8} 
            color={isBreak ? '#22C55E' : '#38BDF8'} 
            className="absolute inset-0"
          />
          <div className="text-center z-10 flex flex-col items-center">
            <span className="text-6xl font-black tabular-nums tracking-tighter">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-xl font-bold">{activeTaskId === 'custom' ? 'Самостоятельная работа' : `Задача ${activeTaskId}`}</h2>
          <p className="text-muted-foreground mt-1">Оставайся сфокусированным</p>
        </div>

        <div className="flex items-center gap-6">
          <Button 
            size="icon" 
            variant="outline" 
            className="w-16 h-16 rounded-full border-2"
            onClick={status === 'running' ? pauseFocus : resumeFocus}
          >
            {status === 'running' ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="w-12 h-12 rounded-full opacity-60 hover:opacity-100"
            onClick={stopFocus} // Later this would trigger 'Skip to Break'
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
      </main>
    </div>
  );
}
