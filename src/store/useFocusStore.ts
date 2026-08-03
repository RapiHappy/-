import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FocusModeStatus = 'idle' | 'running' | 'paused' | 'break';

interface FocusState {
  status: FocusModeStatus;
  timeLeft: number; // in seconds
  activeTaskId: string | null;
  durationCompleted: number; // seconds spent focusing so far today/session
  
  startFocus: (taskId: string, durationSeconds: number) => void;
  pauseFocus: () => void;
  resumeFocus: () => void;
  stopFocus: () => void;
  startBreak: (durationSeconds: number) => void;
  tick: () => void;
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set, get) => ({
      status: 'idle',
      timeLeft: 0,
      activeTaskId: null,
      durationCompleted: 0,
      
      startFocus: (taskId, durationSeconds) => set({ 
        status: 'running', 
        activeTaskId: taskId, 
        timeLeft: durationSeconds 
      }),
      
      pauseFocus: () => {
        const { status } = get();
        if (status === 'running') set({ status: 'paused' });
      },
      
      resumeFocus: () => {
        const { status } = get();
        if (status === 'paused') set({ status: 'running' });
      },
      
      stopFocus: () => set({ status: 'idle', timeLeft: 0, activeTaskId: null }),
      
      startBreak: (durationSeconds) => set({
        status: 'break',
        timeLeft: durationSeconds,
        activeTaskId: null
      }),
      
      tick: () => {
        const { status, timeLeft, durationCompleted } = get();
        if (status === 'running' || status === 'break') {
          if (timeLeft > 0) {
            set({ 
              timeLeft: timeLeft - 1,
              durationCompleted: status === 'running' ? durationCompleted + 1 : durationCompleted
            });
          } else {
            // Timer ended
            set({ status: 'idle', activeTaskId: null });
            // Usually we would trigger a notification or event here
          }
        }
      }
    }),
    {
      name: 'ege-os-focus-store',
      // Don't persist timer running state exactly as is unless we handle background time diffing
      partialize: (state) => ({ durationCompleted: state.durationCompleted }),
    }
  )
);
