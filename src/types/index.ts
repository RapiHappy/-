export type TaskStatus = 'not_started' | 'completed' | 'error' | 'review';

export interface Course {
  id: string;
  title: string;
  totalTasks: number;
  completedTasks: number;
  errorTasks: number;
  icon?: string;
  color?: string; // Hex color for the course
  createdAt: number;
}

export interface Task {
  id: string; // e.g., 'courseId-taskNumber'
  courseId: string;
  number: number; // Task number in the course
  status: TaskStatus;
  notes?: string;
  completedAt?: number;
  nextReviewAt?: number; // Timestamp for spaced repetition
  reviewInterval?: number; // Current interval in days
}

export interface StudySession {
  id: string;
  startTime: number;
  endTime: number;
  durationMinutes: number;
  tasksCompleted: number;
  brainEnergyBefore: number; // 1-5
  brainEnergyAfter?: number; // 1-5
  mood?: string;
  comments?: string;
}

export interface DailyGoal {
  date: string; // YYYY-MM-DD
  targetTasks: number;
  completedTasks: number;
  isMet: boolean;
  tasks: string[]; // List of task IDs planned for the day
}

export interface UserStats {
  id: string; // Singleton, usually 'stats'
  currentStreak: number;
  bestStreak: number;
  totalTasksCompleted: number;
  totalStudyHours: number;
  lastStudyDate?: string;
}

export interface BrainEnergy {
  level: number; // 1-5
  timestamp: number;
}

export interface NotificationRule {
  id: string;
  type: 'pomodoro' | 'hydration' | 'break' | 'course_switch';
  enabled: boolean;
  intervalMinutes: number;
}
