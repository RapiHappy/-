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

  getNextLesson(subject, lessons, offset = 0) {
    const completed = JSON.parse(localStorage.getItem(`completed_lessons_${subject}`) || '[]');
    let uncompleted = lessons.filter(l => !completed.includes(l.id));
    if (uncompleted.length === 0) uncompleted = lessons; // fallback if all done
    return uncompleted[Math.min(offset, uncompleted.length - 1)];
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

    // Generate strict new plan (10 steps)
    this.tasks = [];
    
    // 1. Informatics #1
    if (window.informaticsLessons && window.informaticsLessons.length > 0) {
      const inf1 = this.getNextLesson('informatics', window.informaticsLessons, 0);
      this.tasks.push({
        id: `plan-inf-${inf1.id}`, title: `Информатика: ${inf1.title}`, duration: 25, subject: 'Информатика',
        icon: 'fa-laptop-code', type: 'lesson', lessonId: inf1.id, completed: false
      });
    }
    
    // 2. Break
    this.tasks.push({
      id: 'plan-rest-1', title: 'Короткий отдых', duration: 5, subject: 'Отдых',
      icon: 'fa-coffee', type: 'timer', durationMins: 5, completed: false
    });
    
    // 3. Informatics #2
    if (window.informaticsLessons && window.informaticsLessons.length > 1) {
      const inf2 = this.getNextLesson('informatics', window.informaticsLessons, 1);
      this.tasks.push({
        id: `plan-inf2-${inf2.id}`, title: `Информатика: ${inf2.title}`, duration: 25, subject: 'Информатика',
        icon: 'fa-laptop-code', type: 'lesson', lessonId: inf2.id, completed: false
      });
    }
    
    // 4. Break
    this.tasks.push({
      id: 'plan-rest-2', title: 'Короткий отдых', duration: 5, subject: 'Отдых',
      icon: 'fa-coffee', type: 'timer', durationMins: 5, completed: false
    });
    
    // 5. Russian
    if (window.russianLessons && window.russianLessons.length > 0) {
      const rus = this.getNextLesson('russian', window.russianLessons, 0);
      this.tasks.push({
        id: `plan-rus-${rus.id}`, title: `Русский: ${rus.title}`, duration: 25, subject: 'Русский язык',
        icon: 'fa-book', type: 'lesson', lessonId: rus.id, completed: false
      });
    }
    
    // 6. Break
    this.tasks.push({
      id: 'plan-rest-3', title: 'Короткий отдых', duration: 5, subject: 'Отдых',
      icon: 'fa-coffee', type: 'timer', durationMins: 5, completed: false
    });
    
    // 7. Math
    if (window.mathLessons && window.mathLessons.length > 0) {
      const math = this.getNextLesson('math', window.mathLessons, 0);
      this.tasks.push({
        id: `plan-math-${math.id}`, title: `Математика: ${math.title}`, duration: 35, subject: 'Математика',
        icon: 'fa-square-root-variable', type: 'lesson', lessonId: math.id, completed: false
      });
    }
    
    // 8. Break
    this.tasks.push({
      id: 'plan-rest-4', title: 'Короткий отдых', duration: 5, subject: 'Отдых',
      icon: 'fa-coffee', type: 'timer', durationMins: 5, completed: false
    });
    
    // 9. NTO
    this.tasks.push({
      id: 'plan-nto', title: 'Олимпиада НТО', duration: 20, subject: 'НТО',
      icon: 'fa-robot', type: 'nto', tab: 'bpmn', completed: false
    });
    
    // 10. Summary
    this.tasks.push({
      id: 'plan-summary', title: 'Итог дня', duration: 5, subject: 'Рефлексия',
      icon: 'fa-clipboard-check', type: 'summary', completed: false
    });

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
