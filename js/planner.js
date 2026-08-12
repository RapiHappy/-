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
    if (uncompleted.length === 0) return null; 
    return uncompleted[Math.min(offset, uncompleted.length - 1)];
  },

  generatePlan() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('daily_plan_date');
    
    if (savedDate === today) {
      const savedTasks = localStorage.getItem('daily_plan_tasks');
      if (savedTasks) {
        try {
          const parsed = JSON.parse(savedTasks);
          // Validate if all lessons in the cached plan still exist in the current data
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
    const dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Check Burnout / Errors
    const failedLessons = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
    const isBurnout = failedLessons.length > 2;

    const addRest = (duration = 5) => {
      this.tasks.push({
        id: `plan-rest-${this.tasks.length}`, title: 'Короткий отдых', duration: duration, subject: 'Отдых',
        icon: 'fa-coffee', type: 'timer', durationMins: duration, completed: false
      });
    };

    const addLesson = (subject, dataArray, duration = 30) => {
      if (!dataArray) return;
      const lesson = this.getNextLesson(subject, dataArray, 0);
      if (lesson) {
        this.tasks.push({
          id: `plan-${subject}-${lesson.id}`, title: lesson.title, duration: duration, subject: subject.toUpperCase(),
          icon: subject === 'informatics' ? 'fa-laptop-code' : (subject === 'math' ? 'fa-square-root-variable' : 'fa-book'), 
          type: 'lesson', lessonId: lesson.id, completed: false
        });
      }
    };

    if (dayOfWeek === 0) { // Sunday - Rest
      this.tasks.push({
        id: 'plan-rest-sunday', title: 'Полный отдых и восстановление', duration: 0, subject: 'Отдых',
        icon: 'fa-bed', type: 'rest', completed: false
      });
    } else if (isBurnout) {
      // Burnout mode: Light review and rest
      this.tasks.push({
        id: `plan-repeat`, title: 'Работа над ошибками', duration: 30, subject: 'Смешанное',
        icon: 'fa-brain', type: 'lesson', lessonId: failedLessons[0], completed: false
      });
      addRest(15);
      this.tasks.push({
        id: 'plan-summary', title: 'Итог дня (Облегченный)', duration: 5, subject: 'Рефлексия',
        icon: 'fa-clipboard-check', type: 'summary', completed: false
      });
    } else {
      // Normal schedule based on day
      if (dayOfWeek === 1) { // Mon: Inf + Math + NTO
         addLesson('informatics', window.informaticsLessons, 40); addRest();
         addLesson('math', window.mathLessons, 40); addRest();
         addLesson('nto', window.ntoLessons, 30);
      } else if (dayOfWeek === 2) { // Tue: Rus + Inf
         addLesson('russian', window.russianLessons, 35); addRest();
         addLesson('informatics', window.informaticsLessons, 45);
      } else if (dayOfWeek === 3) { // Wed: Math + NTO + Light
         addLesson('math', window.mathLessons, 40); addRest();
         addLesson('nto', window.ntoLessons, 30);
      } else if (dayOfWeek === 4) { // Thu: Inf + Rus
         addLesson('informatics', window.informaticsLessons, 40); addRest();
         addLesson('russian', window.russianLessons, 35);
      } else if (dayOfWeek === 5) { // Fri: Math + NTO
         addLesson('math', window.mathLessons, 45); addRest();
         addLesson('nto', window.ntoLessons, 30);
      } else if (dayOfWeek === 6) { // Sat: Control (Inf + Math + Rus)
         addLesson('informatics', window.informaticsLessons, 30); addRest();
         addLesson('math', window.mathLessons, 30); addRest();
         addLesson('russian', window.russianLessons, 30);
      }
      
      addRest(5);
      this.tasks.push({
        id: 'plan-summary', title: 'Итог дня', duration: 5, subject: 'Рефлексия',
        icon: 'fa-clipboard-check', type: 'summary', completed: false
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
