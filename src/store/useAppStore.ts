import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BrainEnergy } from '@/types';

interface AppState {
  hasCompletedOnboarding: boolean;
  currentBrainEnergy: BrainEnergy | null;
  activeCourseId: string | null;
  
  setHasCompletedOnboarding: (val: boolean) => void;
  setBrainEnergy: (level: number) => void;
  setActiveCourseId: (id: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      currentBrainEnergy: null,
      activeCourseId: null,
      
      setHasCompletedOnboarding: (val) => set({ hasCompletedOnboarding: val }),
      setBrainEnergy: (level) => set({ currentBrainEnergy: { level, timestamp: Date.now() } }),
      setActiveCourseId: (id) => set({ activeCourseId: id }),
    }),
    {
      name: 'ege-os-app-store',
    }
  )
);
