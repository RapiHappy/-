"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Clock, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Сейчас' },
    { href: '/courses', icon: BookOpen, label: 'Курсы' },
    { href: '/focus', icon: Clock, label: 'Фокус' },
    { href: '/analytics', icon: BarChart3, label: 'Успехи' },
    { href: '/settings', icon: Settings, label: 'Настройки' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around bg-card/90 px-2 pb-4 pt-2 backdrop-blur-lg border-t border-border">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-2xl transition-all active:scale-95",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn("w-6 h-6", isActive && "fill-primary/20")} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
