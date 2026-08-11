window.plannerSystem = {
  tasks: [],
  currentTaskIndex: 0,
  
  ntoSchedule: {
    1: { title: 'НТО: BPMN', action: () => { window.location.hash = 'nto'; setTimeout(()=>document.querySelector('[data-tab="bpmn"]').click(), 100); } },
    2: { title: 'НТО: SQL', action: () => { window.location.hash = 'nto'; setTimeout(()=>document.querySelector('[data-tab="sql"]').click(), 100); } },
    3: { title: 'НТО: Python', action: () => { window.location.hash = 'nto'; } },
    4: { title: 'НТО: API', action: () => { window.location.hash = 'nto'; } },
    5: { title: 'НТО: Excel/Google Sheets', action: () => { window.location.hash = 'nto'; } },
    6: { title: 'НТО: Решение кейса', action: () => { window.location.hash = 'nto'; setTimeout(()=>document.querySelector('[data-tab="cases"]').click(), 100); } },
    0: { title: 'НТО: Отдых', action: () => { app.showNotification('Сегодня отдых по НТО!', 'success'); } }
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
    this.tasks = [];
    
    const failedLessons = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
    if (failedLessons.length > 0) {
      const failedId = failedLessons[0];
      this.tasks.push({
        id: 'plan-repeat', title: 'Повторение темы (Работа над ошибками)', duration: 20, subject: 'Смешанное',
        icon: 'fa-brain', action: () => { window.location.hash = `lesson/${failedId}`; }, completed: false
      });
    }

    const dayOfWeek = new Date().getDay();

    if (dayOfWeek === 0) {
      this.tasks.push({
        id: 'plan-rest-sunday', title: 'Полный отдых и восстановление', duration: 0, subject: 'Отдых',
        icon: 'fa-bed', action: () => { app.showNotification('Сегодня воскресенье — день отдыха!', 'success'); }, completed: false
      });
      this.renderPlan();
      return;
    }

    if (window.LessonsInformatics) {
      const infLesson = this.getNextLesson('informatics', window.LessonsInformatics);
      this.tasks.push({
        id: `plan-inf-${infLesson.id}`, title: `Информатика: ${infLesson.title}`, duration: 55, subject: 'Информатика',
        icon: 'fa-laptop-code', action: () => window.location.hash = `lesson/${infLesson.id}`, completed: false
      });
    }

    this.tasks.push({
      id: 'plan-rest-1', title: 'Короткий отдых', duration: 5, subject: 'Отдых',
      icon: 'fa-coffee', action: () => { window.location.hash = 'timer'; timerSystem.setDuration(5); timerSystem.toggleTimer(); }, completed: false
    });

    if (window.LessonsRussian) {
      const rusLesson = this.getNextLesson('russian', window.LessonsRussian);
      this.tasks.push({
        id: `plan-rus-${rusLesson.id}`, title: `Русский: ${rusLesson.title}`, duration: 30, subject: 'Русский язык',
        icon: 'fa-book', action: () => window.location.hash = `lesson/${rusLesson.id}`, completed: false
      });
    }

    this.tasks.push({
      id: 'plan-rest-2', title: 'Короткий отдых', duration: 5, subject: 'Отдых',
      icon: 'fa-coffee', action: () => { window.location.hash = 'timer'; timerSystem.setDuration(5); timerSystem.toggleTimer(); }, completed: false
    });

    if (window.LessonsMath) {
      const mathLesson = this.getNextLesson('math', window.LessonsMath);
      this.tasks.push({
        id: `plan-math-${mathLesson.id}`, title: `Математика: ${mathLesson.title}`, duration: 50, subject: 'Математика',
        icon: 'fa-square-root-variable', action: () => window.location.hash = `lesson/${mathLesson.id}`, completed: false
      });
    }

    const ntoTask = this.ntoSchedule[dayOfWeek];
    if (ntoTask) {
      this.tasks.push({
        id: 'plan-nto', title: ntoTask.title, duration: 30, subject: 'НТО',
        icon: 'fa-robot', action: ntoTask.action, completed: false
      });
    }

    this.renderPlan();
  },

  renderPlan() {
    const container = document.getElementById('daily-plan-container');
    const timeSummary = document.getElementById('plan-summary-time');
    if (!container) return;

    let totalDuration = 0;
    container.innerHTML = '';
    
    this.tasks.forEach((task, idx) => {
      totalDuration += task.duration;
      
      const el = document.createElement('div');
      el.className = 'plan-task';
      el.style.cssText = `
        background: #1e293b; border-radius: 10px; padding: 12px 16px; margin-bottom: 12px;
        display: flex; align-items: center; justify-content: space-between;
        border: 1px solid ${task.completed ? '#10b981' : '#334155'}; transition: all 0.2s;
      `;
      
      el.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; cursor: pointer; flex: 1;" onclick="plannerSystem.executeTask(${idx})">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: ${task.completed ? '#10b981' : '#334155'}; display: flex; align-items: center; justify-content: center; color: #fff;">
            <i class="fas ${task.completed ? 'fa-check' : task.icon}"></i>
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
  },

  toggleTask(idx) {
    if (this.tasks[idx]) {
      this.tasks[idx].completed = !this.tasks[idx].completed;
      this.renderPlan();
      
      if (this.tasks[idx].completed) {
        app.showNotification(`Выполнено: ${this.tasks[idx].title}`, 'success');
        
        if (this.tasks.every(t => t.completed)) {
          app.showNotification('Все задачи на сегодня выполнены! План на завтра будет сформирован.', 'success');
          setTimeout(() => this.generatePlan(), 2000);
        }
      }
    }
  },
  
  executeTask(idx) {
    if (this.tasks[idx] && typeof this.tasks[idx].action === 'function') {
      this.currentTaskIndex = idx;
      this.tasks[idx].action();
    }
  },

  startLearningNow() {
    const firstIncompleteIdx = this.tasks.findIndex(t => !t.completed);
    if (firstIncompleteIdx !== -1) {
      this.executeTask(firstIncompleteIdx);
    } else {
      app.showNotification('На сегодня всё выполнено!', 'success');
    }
  }
};
