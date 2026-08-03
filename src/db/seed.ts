import { db } from './index';

// The requested data:
// Информатика ЕГЭ 2027 — Набор Джедая — 593
// ЕГЭ по русскому: нормальные варианты — 643
// СОТОЧКА ПО РУССКОМУ — 2647
// Подготовка к ЕГЭ по русскому языку — 1164
// Python для ЕГЭ по Информатике — 567

const COURSES = [
  { id: 'info-jedi', title: 'Информатика ЕГЭ 2027 — Набор Джедая', totalTasks: 593, color: '#38BDF8' },
  { id: 'rus-norm', title: 'ЕГЭ по русскому: нормальные варианты', totalTasks: 643, color: '#F59E0B' },
  { id: 'rus-100', title: 'СОТОЧКА ПО РУССКОМУ', totalTasks: 2647, color: '#EF4444' },
  { id: 'rus-prep', title: 'Подготовка к ЕГЭ по русскому языку', totalTasks: 1164, color: '#10B981' },
  { id: 'info-python', title: 'Python для ЕГЭ по Информатике', totalTasks: 567, color: '#8B5CF6' }
];

export async function seedDatabase() {
  const existingCourses = await db.courses.count();
  
  if (existingCourses === 0) {
    console.log('Seeding database with courses and tasks...');
    
    // Create courses
    const courseObjects = COURSES.map(c => ({
      id: c.id,
      title: c.title,
      totalTasks: c.totalTasks,
      completedTasks: 0,
      errorTasks: 0,
      color: c.color,
      createdAt: Date.now()
    }));
    
    await db.courses.bulkAdd(courseObjects);
    
    // Create tasks for each course
    for (const course of COURSES) {
      const tasksToInsert = [];
      for (let i = 1; i <= course.totalTasks; i++) {
        tasksToInsert.push({
          id: `${course.id}-${i}`,
          courseId: course.id,
          number: i,
          status: 'not_started' as const
        });
        
        // Batch insert every 1000 items to avoid blocking the main thread too long
        if (tasksToInsert.length === 1000) {
          await db.tasks.bulkAdd(tasksToInsert);
          tasksToInsert.length = 0;
        }
      }
      if (tasksToInsert.length > 0) {
        await db.tasks.bulkAdd(tasksToInsert);
      }
    }
    
    // Initialize UserStats
    await db.userStats.add({
      id: 'stats',
      currentStreak: 0,
      bestStreak: 0,
      totalTasksCompleted: 0,
      totalStudyHours: 0
    });
    
    console.log('Database seeded successfully');
  }
}
