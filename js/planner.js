window.plannerSystem = {
  tasks: [],

  generatePlan(energyLevel) {
    this.tasks = [];
    
    // Check spaced repetition
    const dueItems = typeof spacedRepetition !== 'undefined' && spacedRepetition.getDueItems ? spacedRepetition.getDueItems().length : 0;
    if (dueItems > 0) {
      this.tasks.push({
        id: 'plan-rep', title: 'Повторение ошибок', duration: 15, subject: 'Смешанное',
        icon: 'fa-brain', action: () => { window.location.hash = 'errors'; }, completed: false
      });
    }

    if (energyLevel === 'high') {
      this.tasks.push(
        { id: 'p1', title: 'Информатика: Программирование', duration: 55, subject: 'Информатика', icon: 'fa-laptop-code', action: () => window.location.hash = 'courses', completed: false },
        { id: 'p2', title: 'Математика: Профиль', duration: 60, subject: 'Математика', icon: 'fa-square-root-variable', action: () => window.location.hash = 'trainer', completed: false },
        { id: 'p3', title: 'Русский: Орфография', duration: 35, subject: 'Русский язык', icon: 'fa-book', action: () => window.location.hash = 'trainer', completed: false },
        { id: 'p4', title: 'НТО: Решение кейса', duration: 30, subject: 'НТО', icon: 'fa-robot', action: () => window.location.hash = 'nto', completed: false }
      );
    } else if (energyLevel === 'medium') {
      this.tasks.push(
        { id: 'p1', title: 'Информатика: Теория', duration: 45, subject: 'Информатика', icon: 'fa-laptop-code', action: () => window.location.hash = 'courses', completed: false },
        { id: 'p3', title: 'Русский: Практика', duration: 30, subject: 'Русский язык', icon: 'fa-book', action: () => window.location.hash = 'trainer', completed: false },
        { id: 'p4', title: 'НТО: SQL', duration: 15, subject: 'НТО', icon: 'fa-database', action: () => window.location.hash = 'nto', completed: false }
      );
    } else {
      this.tasks.push(
        { id: 'p0', title: 'Легкое повторение (карточки)', duration: 15, subject: 'Общее', icon: 'fa-layer-group', action: () => window.location.hash = 'errors', completed: false }
      );
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

    if (timeSummary) timeSummary.textContent = `${totalDuration} мин`;
  },

  toggleTask(idx) {
    if (this.tasks[idx]) {
      this.tasks[idx].completed = !this.tasks[idx].completed;
      this.renderPlan();
      
      if (this.tasks[idx].completed) {
        app.showNotification(`Выполнено: ${this.tasks[idx].title}`, 'success');
      }
    }
  },
  
  executeTask(idx) {
    if (this.tasks[idx] && typeof this.tasks[idx].action === 'function') {
      this.tasks[idx].action();
    }
  }
};
