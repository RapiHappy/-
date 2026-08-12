window.plannerSystem = {
  tasks: [],
  currentTaskIndex: 0,
  
  ntoSchedule: {
    1: { title: 'НТО: BPMN', type: 'nto', tab: 'bpmn' },
    2: { title: 'НТО: SQL', type: 'nto', tab: 'sql' },
    3: { title: 'НТО: Python', type: 'nto', tab: 'projects' },
    4: { title: 'НТО: API', type: 'nto', tab: 'projects' },
    5: { title: 'НТО: Excel/Google Sheets', type: 'nto', tab: 'projects' },
    6: { title: 'НТО: Решение кейса', type: 'nto', tab: 'cases' },
    0: { title: 'НТО: Отдых', type: 'nto', tab: 'overview' }
  },

  getNextLesson(subject, lessons) {
    const completed = JSON.parse(localStorage.getItem(`completed_lessons_${subject}`) || '[]');
    for (let lesson of lessons) {
      if (!completed.includes(lesson.id)) {
        return lesson;
      }
    }
    return lessons[0];
  },

  generatePlan() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('daily_plan_date');
    
    if (savedDate === today) {
      const savedTasks = localStorage.getItem('daily_plan_tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
        this.renderPlan();
        return;
      }
    }

    // Generate new plan
    this.tasks = [];
    const dayOfWeek = new Date().getDay();

    if (dayOfWeek === 0) {
      this.tasks.push({
        id: 'plan-rest-sunday', title: 'Полный отдых и восстановление', duration: 0, subject: 'Отдых',
        icon: 'fa-bed', type: 'rest', completed: false
      });
    } else {
      // 1. Repeat failed
      const failedLessons = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
      if (failedLessons.length > 0) {
        this.tasks.push({
          id: `plan-repeat-${failedLessons[0]}`, title: 'Работа над ошибками', duration: 20, subject: 'Смешанное',
          icon: 'fa-brain', type: 'lesson', lessonId: failedLessons[0], completed: false
        });
      }

      // 2. Informatics
      if (window.informaticsLessons && window.informaticsLessons.length > 0) {
        const infLesson = this.getNextLesson('informatics', window.informaticsLessons);
        this.tasks.push({
          id: `plan-inf-${infLesson.id}`, title: `Информатика: ${infLesson.title}`, duration: 55, subject: 'Информатика',
          icon: 'fa-laptop-code', type: 'lesson', lessonId: infLesson.id, completed: false
        });
      }

      // 3. Break
      this.tasks.push({
        id: 'plan-rest-1', title: 'Короткий отдых', duration: 5, subject: 'Отдых',
        icon: 'fa-coffee', type: 'timer', durationMins: 5, completed: false
      });

      // 4. Russian
      if (window.russianLessons && window.russianLessons.length > 0) {
        const rusLesson = this.getNextLesson('russian', window.russianLessons);
        this.tasks.push({
          id: `plan-rus-${rusLesson.id}`, title: `Русский: ${rusLesson.title}`, duration: 30, subject: 'Русский язык',
          icon: 'fa-book', type: 'lesson', lessonId: rusLesson.id, completed: false
        });
      }

      // 5. Break
      this.tasks.push({
        id: 'plan-rest-2', title: 'Короткий отдых', duration: 5, subject: 'Отдых',
        icon: 'fa-coffee', type: 'timer', durationMins: 5, completed: false
      });

      // 6. Math
      if (window.mathLessons && window.mathLessons.length > 0) {
        const mathLesson = this.getNextLesson('math', window.mathLessons);
        this.tasks.push({
          id: `plan-math-${mathLesson.id}`, title: `Математика: ${mathLesson.title}`, duration: 50, subject: 'Математика',
          icon: 'fa-square-root-variable', type: 'lesson', lessonId: mathLesson.id, completed: false
        });
      }

      // 7. NTO
      const ntoTask = this.ntoSchedule[dayOfWeek];
      if (ntoTask) {
        this.tasks.push({
          id: 'plan-nto', title: ntoTask.title, duration: 30, subject: 'НТО',
          icon: 'fa-robot', type: 'nto', tab: ntoTask.tab, completed: false
        });
      }
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
        background: #1e293b; border-radius: 10px; padding: 12px 16px; margin-bottom: 12px;
        display: flex; align-items: center; justify-content: space-between;
        border: 1px solid ${task.completed ? '#10b981' : '#334155'}; transition: all 0.2s;
        opacity: ${isLocked ? '0.5' : '1'};
        pointer-events: ${isLocked ? 'none' : 'auto'};
      `;
      
      el.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; cursor: pointer; flex: 1;" onclick="plannerSystem.executeTask(${idx})">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: ${task.completed ? '#10b981' : '#334155'}; display: flex; align-items: center; justify-content: center; color: #fff;">
            <i class="fas ${isLocked ? 'fa-lock' : (task.completed ? 'fa-check' : task.icon)}"></i>
          </div>
          <div>
            <div style="color: ${task.completed ? '#94a3b8' : '#f8fafc'}; font-size: 14px; font-weight: 500; text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.title}</div>
            <div style="color: #64748b; font-size: 12px;">${task.subject} • ${task.duration} мин</div>
          </div>
        </div>
        <button onclick="plannerSystem.toggleTask(${idx})" style="background: none; border: none; color: ${task.completed ? '#10b981' : '#64748b'}; font-size: 20px; cursor: pointer; padding: 8px;">
          <i class="fa-${task.completed ? 'solid' : 'regular'} fa-circle-check"></i>
        </button>
      `;
      
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
          // Auto start next task
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
        // Override timer complete
        const origComplete = timerSystem.completeSession;
        timerSystem.completeSession = function() {
          origComplete.call(timerSystem);
          plannerSystem.markCurrentTaskCompleted();
          timerSystem.completeSession = origComplete; // restore
        };
      }, 100);
    } else if (task.type === 'nto') {
      window.location.hash = 'nto';
      if (task.tab) {
        setTimeout(() => {
          const btn = document.querySelector(`[data-tab="${task.tab}"]`);
          if (btn) btn.click();
        }, 100);
      }
    } else if (task.type === 'rest') {
      app.showNotification('Сегодня отдыхаем!', 'success');
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
