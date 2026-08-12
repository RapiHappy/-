window.plannerSystem = {
  tasks: [],
  currentTaskIndex: 0,

  getNextLessonByCourse(courseId) {
    if (!window.AppData || !window.AppData.allLessons) return null;
    const courseLessons = window.AppData.allLessons.filter(l => l.courseId === courseId);
    const completed = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    const failed = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
    
    const nextLesson = courseLessons.find(l => !completed.includes(l.id));
    if (!nextLesson) return null;
    
    // If this lesson is in failed list, force review
    if (failed.includes(nextLesson.id)) {
      return { ...nextLesson, isReview: true };
    }
    
    return nextLesson;
  },

  generatePlan() {
    localStorage.clear();
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('daily_plan_date');
    
    if (savedDate === today) {
      const savedTasks = localStorage.getItem('daily_plan_tasks');
      if (savedTasks) {
        try {
          const parsed = JSON.parse(savedTasks);
          // Quick validation
          let isValid = true;
          for (const task of parsed) {
            if (task.type === 'lesson' && (!window.AppData || !window.AppData.findLesson(task.lessonId))) {
              isValid = false;
              break;
            }
          }
          if (isValid) {
            this.tasks = parsed;
            this.renderPlan();
            return;
          }
        } catch (e) { console.error("Error parsing tasks", e); }
      }
    }

    this.tasks = [];
    const dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday...
    
    const addRest = (duration = 5) => {
      this.tasks.push({
        id: `plan-rest-${this.tasks.length}`, title: 'Короткий отдых', duration: duration, subject: 'Отдых',
        icon: '<i class="fas fa-coffee"></i>', type: 'timer', durationMins: duration, completed: false
      });
    };

    const addLesson = (courseId) => {
      const lesson = this.getNextLessonByCourse(courseId);
      if (lesson) {
        // Calculate practice components
        let hasVideo = !!lesson.videoUrl;
        let pCount = (lesson.easyPractice?.length || 0) + (lesson.mainPractice?.length || 0);
        let cCount = lesson.control?.length || 0;

        this.tasks.push({
          id: `plan-${courseId}-${lesson.id}`, 
          title: lesson.courseTitle, 
          duration: lesson.durationMins || 45, 
          subject: lesson.courseTitle,
          icon: lesson.courseIcon || '<i class="fas fa-book"></i>', 
          type: 'lesson', 
          lessonId: lesson.id, 
          completed: false,
          
          topicTitle: lesson.topicTitle,
          lessonTitle: lesson.title,
          lessonIndex: lesson.lessonIndex,
          totalLessons: lesson.totalLessons,
          isReview: lesson.isReview,
          
          hasVideo,
          practiceCount: pCount,
          controlCount: cCount
        });
      }
    };

    if (dayOfWeek === 0) {
      this.tasks.push({
        id: 'plan-rest-sunday', title: 'Полный отдых и восстановление', duration: 0, subject: 'Отдых',
        icon: '<i class="fas fa-bed"></i>', type: 'rest', completed: false
      });
    } else {
      // Normal schedule
      if (dayOfWeek === 1) { 
         addLesson('course_inf'); addRest();
         addLesson('course_math'); addRest();
         addLesson('course_nto');
      } else if (dayOfWeek === 2) {
         addLesson('course_rus'); addRest();
         addLesson('course_inf');
      } else if (dayOfWeek === 3) {
         addLesson('course_math'); addRest();
         addLesson('course_nto');
      } else if (dayOfWeek === 4) {
         addLesson('course_inf'); addRest();
         addLesson('course_rus');
      } else if (dayOfWeek === 5) {
         addLesson('course_math'); addRest();
         addLesson('course_nto');
      } else if (dayOfWeek === 6) {
         addLesson('course_inf'); addRest();
         addLesson('course_math'); addRest();
         addLesson('course_rus');
      }
      
      addRest(5);
      this.tasks.push({
        id: 'plan-summary', title: 'Итог дня', duration: 5, subject: 'Рефлексия',
        icon: '<i class="fas fa-clipboard-check"></i>', type: 'summary', completed: false
      });
    }

    localStorage.setItem('daily_plan_date', today);
    this.saveTasks();
    this.renderPlan();
  },

  saveTasks() {
    localStorage.setItem('daily_plan_tasks', JSON.stringify(this.tasks));
    this.updateDailyProgress();
  },
  
  updateDailyProgress() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    const bar = document.getElementById('daily-progress-bar');
    const text = document.getElementById('daily-progress-text');
    if (bar) bar.style.width = `${pct}%`;
    if (text) text.textContent = `${pct}% выполнено`;
  },

  renderPlan() {
    const container = document.getElementById('daily-plan-container');
    const timeSummary = document.getElementById('plan-summary-time');
    if (!container) return;

    let totalDuration = 0;
    container.innerHTML = '';
    
    this.tasks.forEach((task, idx) => {
      totalDuration += task.duration;
      
      const firstIncompleteIdx = this.tasks.findIndex(t => !t.completed);
      const isLocked = !task.completed && idx > firstIncompleteIdx;
      
      const el = document.createElement('div');
      el.className = 'plan-task';
      el.style.cssText = `
        background: #1e293b; border-radius: 10px; padding: 16px; margin-bottom: 16px;
        border: 1px solid ${task.completed ? '#10b981' : '#334155'}; transition: all 0.2s;
        opacity: ${isLocked ? '0.5' : '1'};
        pointer-events: ${isLocked ? 'none' : 'auto'};
        position: relative;
      `;
      
      // Top header part
      let content = `
        <div style="display: flex; align-items: flex-start; justify-content: space-between;">
          <div style="display: flex; gap: 12px; cursor: pointer; flex: 1;" onclick="plannerSystem.executeTask(${idx})">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: ${task.completed ? '#10b981' : '#334155'}; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; flex-shrink: 0;">
              ${task.completed ? '<i class="fas fa-check"></i>' : task.icon}
            </div>
            <div style="flex: 1;">
              <div style="color: ${task.completed ? '#94a3b8' : '#f8fafc'}; font-size: 16px; font-weight: 600; text-decoration: ${task.completed ? 'line-through' : 'none'}; margin-bottom: 4px;">
                ${task.title} — ${task.duration} мин
              </div>
      `;
      
      // Extended body for lessons
      if (task.type === 'lesson') {
        const reviewBadge = task.isReview ? `<span style="background: rgba(239,68,68,0.2); color: #ef4444; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 8px;">Работа над ошибками</span>` : '';
        content += `
              <div style="color: #cbd5e1; font-size: 13px; margin-bottom: 2px;">
                Тема: ${task.topicTitle}
              </div>
              <div style="color: #94a3b8; font-size: 13px; margin-bottom: 12px;">
                Занятие ${task.lessonIndex} из ${task.totalLessons}: ${task.lessonTitle} ${reviewBadge}
              </div>
              <div style="display: flex; gap: 16px; font-size: 13px; color: #cbd5e1;">
                ${task.hasVideo ? `<div><i class="fas fa-video" style="color: #fca5a5; margin-right: 4px;"></i> Видео</div>` : ''}
                ${task.practiceCount > 0 ? `<div><i class="fas fa-pencil-alt" style="color: #93c5fd; margin-right: 4px;"></i> Практика (${task.practiceCount})</div>` : ''}
                ${task.controlCount > 0 ? `<div><i class="fas fa-bullseye" style="color: #fcd34d; margin-right: 4px;"></i> Контроль (${task.controlCount})</div>` : ''}
              </div>
        `;
      } else {
        content += `<div style="color: #64748b; font-size: 13px;">${task.subject}</div>`;
      }
      
      content += `
            </div>
          </div>
          <button onclick="plannerSystem.toggleTask(${idx})" style="background: none; border: none; color: ${task.completed ? '#10b981' : '#64748b'}; font-size: 24px; cursor: pointer; padding: 8px;">
            <i class="fa-${task.completed ? 'solid' : 'regular'} fa-circle-check"></i>
          </button>
        </div>
      `;
      
      el.innerHTML = content;
      container.appendChild(el);
    });

    if (timeSummary) {
      const hours = Math.floor(totalDuration / 60);
      const mins = totalDuration % 60;
      timeSummary.textContent = hours > 0 ? `${hours} ч ${mins} мин` : `${mins} мин`;
    }
    
    this.updateDailyProgress();
  },

  toggleTask(idx) {
    if (this.tasks[idx]) {
      this.tasks[idx].completed = !this.tasks[idx].completed;
      this.saveTasks();
      this.renderPlan();
      
      if (this.tasks[idx].completed) {
        app.showNotification(`Выполнено: ${this.tasks[idx].title}`, 'success');
        
        if (this.tasks.every(t => t.completed)) {
          app.showNotification('Все задачи на сегодня выполнены! Отличная работа!', 'success');
        } else {
          setTimeout(() => this.startLearningNow(), 1500);
        }
      }
    }
  },
  
  markCurrentTaskCompleted() {
    const firstIncompleteIdx = this.tasks.findIndex(t => !t.completed);
    if (firstIncompleteIdx !== -1) {
      this.tasks[firstIncompleteIdx].completed = true;
      this.saveTasks();
      this.renderPlan();
      app.showNotification(`Этап завершен! Переходим к следующему.`, 'success');
      
      if (this.tasks.every(t => t.completed)) {
        app.showNotification('Все задачи на сегодня выполнены!', 'success');
        app.navigateTo('dashboard');
      } else {
        setTimeout(() => this.startLearningNow(), 1500);
      }
    }
  },
  
  executeTask(idx) {
    const task = this.tasks[idx];
    if (!task) return;
    
    this.currentTaskIndex = idx;
    
    if (task.type === 'lesson') {
      window.location.hash = `lesson/${task.lessonId}`;
    } else if (task.type === 'timer') {
      window.location.hash = 'timer';
      setTimeout(() => {
        timerSystem.setDuration(task.durationMins);
        timerSystem.toggle();
        const origComplete = timerSystem.completeSession;
        timerSystem.completeSession = function() {
          origComplete.call(timerSystem);
          plannerSystem.markCurrentTaskCompleted();
          timerSystem.completeSession = origComplete; // restore
        };
      }, 100);
    } else if (task.type === 'nto') {
      window.location.hash = 'nto';
    } else if (task.type === 'rest') {
      app.showNotification('Сегодня отдыхаем!', 'success');
    } else if (task.type === 'summary') {
      app.showNotification('День завершен! Отличная работа.', 'success');
      setTimeout(() => this.markCurrentTaskCompleted(), 2000);
    }
  },

  startLearningNow() {
    const firstIncompleteIdx = this.tasks.findIndex(t => !t.completed);
    if (firstIncompleteIdx !== -1) {
      this.executeTask(firstIncompleteIdx);
    } else {
      app.showNotification('На сегодня всё выполнено!', 'success');
      app.navigateTo('dashboard');
    }
  }
};
