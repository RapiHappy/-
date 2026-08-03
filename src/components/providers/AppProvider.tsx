"use client";

import { useEffect, useState } from 'react';
import { seedDatabase } from '@/db/seed';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { usePathname } from 'next/navigation';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function init() {
      try {
        await seedDatabase();
      } catch (err) {
        console.error("Failed to seed database:", err);
      } finally {
        setIsInitializing(false);
      }
    }
    
    init();
  }, []);

  const isFocusMode = pathname === '/focus';

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">Запуск ЕГЭ OS...</p>
      </div>
    );
  }

  return (
    <>
      <main className={`flex-1 overflow-x-hidden ${!isFocusMode ? 'pb-20' : ''}`}>
        {children}
      </main>
      {!isFocusMode && <MobileNavigation />}
    </>
  );
}
