import Dexie, { type Table } from 'dexie';
import { Course, Task, StudySession, DailyGoal, UserStats } from '@/types';

export class EgeOsDatabase extends Dexie {
  courses!: Table<Course, string>;
  tasks!: Table<Task, string>;
  sessions!: Table<StudySession, string>;
  dailyGoals!: Table<DailyGoal, string>;
  userStats!: Table<UserStats, string>;

  constructor() {
    super('EgeOsDatabase');
    
    this.version(1).stores({
      courses: 'id, title',
      tasks: 'id, courseId, status, nextReviewAt',
      sessions: 'id, startTime, endTime',
      dailyGoals: 'date, isMet',
      userStats: 'id'
    });
  }
}

export const db = new EgeOsDatabase();
