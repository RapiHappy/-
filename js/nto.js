window.ntoSystem = {
  currentTab: 'overview',
  
  render() {
    const container = document.getElementById('nto-container');
    if (!container) return;
    
    container.innerHTML = `
      <div class="nto-header">
        <h2>НТО "Автоматизация бизнес-процессов"</h2>
        <div class="tabs-nav">
          <button class="btn ${this.currentTab === 'overview' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('overview')">Обзор</button>
          <button class="btn ${this.currentTab === 'roadmap' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('roadmap')">Карта</button>
          <button class="btn ${this.currentTab === 'cases' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('cases')">Кейсы</button>
          <button class="btn ${this.currentTab === 'bpmn' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('bpmn')">BPMN</button>
          <button class="btn ${this.currentTab === 'sql' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('sql')">SQL</button>
          <button class="btn ${this.currentTab === 'projects' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('projects')">Проекты</button>
          <button class="btn ${this.currentTab === 'portfolio' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('portfolio')">Портфолио</button>
        </div>
      </div>
      <div id="nto-content-area" class="nto-content"></div>
    `;
    
    this.renderCurrentTab();
  },
  
  switchTab(tab) {
    this.currentTab = tab;
    this.render();
  },
  
  renderCurrentTab() {
    const area = document.getElementById('nto-content-area');
    if (!area) return;
    
    area.innerHTML = '';
    
    switch(this.currentTab) {
      case 'overview': this.renderOverview(area); break;
      case 'roadmap': this.renderRoadmap(area); break;
      case 'cases': this.renderCases(area); break;
      case 'bpmn': this.renderBPMN(area); break;
      case 'sql': this.renderSQL(area); break;
      case 'projects': this.renderProjects(area); break;
      case 'portfolio': this.renderPortfolio(area); break;
    }
  },
  
  renderOverview(container) {
    container.innerHTML = `
      <div class="card">
        <h3>Что такое НТО "Автоматизация бизнес-процессов"</h3>
        <p>Это профиль Национальной технологической олимпиады, направленный на решение реальных бизнес-задач с помощью IT-инструментов.</p>
        
        <h4>Необходимые навыки:</h4>
        <ul>
          <li><strong>Python</strong> → автоматизация рутины</li>
          <li><strong>Таблицы</strong> → работа с данными и отчётность</li>
          <li><strong>BPMN</strong> → моделирование и логика бизнес-процессов</li>
          <li><strong>SQL</strong> → работа с базами данных</li>
          <li><strong>Алгоритмы</strong> → оптимизация процессов</li>
        </ul>
        
        <h4>Связь с ЕГЭ:</h4>
        <p>Задачи ЕГЭ по информатике отлично готовят к НТО: программирование, логика, работа с электронными таблицами.</p>
      </div>
    `;
  },
  
  renderRoadmap(container) {
    // Basic roadmap UI
    let html = '<div class="card"><h3>План подготовки</h3><div class="timeline">';
    
    const weeks = window.NTOContent?.roadmap || [
      {title: 'Неделя 1-2', description: 'Основы BPMN', status: 'completed'},
      {title: 'Неделя 3-4', description: 'Базы данных и SQL', status: 'current'},
      {title: 'Неделя 5-8', description: 'Программирование на Python', status: 'pending'},
      {title: 'Неделя 9-12', description: 'Решение комплексных кейсов', status: 'pending'}
    ];
    
    weeks.forEach(w => {
      let icon = w.status === 'completed' ? 'fa-check-circle' : (w.status === 'current' ? 'fa-dot-circle' : 'fa-circle');
      let color = w.status === 'completed' ? '#10b981' : (w.status === 'current' ? '#3b82f6' : '#64748b');
      html += `
        <div class="timeline-item" style="display: flex; gap: 15px; margin-bottom: 20px;">
          <div style="color: ${color}; font-size: 24px;"><i class="fa-solid ${icon}"></i></div>
          <div>
            <h4 style="margin: 0 0 5px 0;">${w.title}</h4>
            <p style="margin: 0; color: #94a3b8;">${w.description}</p>
          </div>
        </div>
      `;
    });
    
    html += '</div></div>';
    container.innerHTML = html;
  },
  
  renderCases(container) {
    let cases = window.NTOContent?.cases || [
      {id: 1, title: 'Кейс 1: Автоматизация склада', description: 'Оптимизация процессов приемки и отгрузки.'},
      {id: 2, title: 'Кейс 2: Система бронирования', description: 'Разработка модели данных для гостиницы.'}
    ];
    
    let html = '<div class="cases-grid" style="display: grid; gap: 15px;">';
    cases.forEach(c => {
      html += `
        <div class="card">
          <h3>${c.title}</h3>
          <p>${c.description}</p>
          <button class="btn btn-primary" onclick="ntoSystem.openCase(${c.id})">Решать</button>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  },
  
  openCase(caseId) {
    const area = document.getElementById('nto-content-area');
    area.innerHTML = `
      <div class="card">
        <h3>Кейс #${caseId}</h3>
        <p>Раздел в разработке. Здесь будет пошаговое прохождение стадий кейса.</p>
        <button class="btn btn-secondary" onclick="ntoSystem.renderCurrentTab()">Назад к кейсам</button>
      </div>
    `;
  },
  
  renderBPMN(container) {
    container.innerHTML = '<div id="bpmn-trainer-area"></div>';
    if (window.bpmnTrainer) {
      bpmnTrainer.render(document.getElementById('bpmn-trainer-area'));
    }
  },
  
  renderSQL(container) {
    container.innerHTML = '<div id="sql-sandbox-area"></div>';
    if (window.sqlSandbox) {
      sqlSandbox.render(document.getElementById('sql-sandbox-area'));
    }
  },
  
  projectState: {
    active: false,
    currentStage: 0,
    answers: {}
  },
  
  projectStages: [
    {
      title: "Этап 1: Анализ процесса",
      content: `Вам поручили автоматизировать магазин. Сейчас заказы принимаются по телефону, записываются на бумажке, а потом менеджер вручную вбивает их в таблицу. 
                <br><br><b>Вопрос:</b> Какая главная проблема в текущем бизнес-процессе?`,
      inputPlaceholder: "Например: ручной ввод данных",
      validate: (ans) => ans.toLowerCase().includes('ручн') || ans.toLowerCase().includes('бумаж') || ans.toLowerCase().includes('человеческ')
    },
    {
      title: "Этап 2: Схема процесса (BPMN)",
      content: `Каким должен быть первый элемент (событие) на схеме BPMN при поступлении заказа?`,
      inputPlaceholder: "Например: Стартовое событие",
      validate: (ans) => ans.toLowerCase().includes('старт') || ans.toLowerCase().includes('начал') || ans.toLowerCase().includes('start')
    },
    {
      title: "Этап 3: Структура БД",
      content: `Вам нужна таблица для хранения заказов. Какие 3 обязательных поля (колонки) должны быть в таблице <b>orders</b>?`,
      inputPlaceholder: "Например: id, клиент, товар",
      validate: (ans) => ans.toLowerCase().includes('id') && (ans.toLowerCase().includes('клиент') || ans.toLowerCase().includes('покупател') || ans.toLowerCase().includes('имя'))
    },
    {
      title: "Этап 4: SQL Запрос",
      content: `Напишите SQL запрос, который выберет все заказы (все колонки) из таблицы <b>orders</b>, где статус заказа равен 'new'.`,
      inputPlaceholder: "SELECT ...",
      validate: (ans) => {
        const a = ans.toLowerCase().replace(/\s+/g, ' ');
        return a.includes('select * from orders') && a.includes("status = 'new'");
      }
    },
    {
      title: "Этап 5: Псевдокод автоматизации",
      content: `Напишите условие (if) на Python: если сумма заказа (total) больше 1000, сделать скидку 10%.`,
      inputPlaceholder: "if ... :",
      validate: (ans) => ans.toLowerCase().includes('if total > 1000') || ans.toLowerCase().includes('if total>1000') || ans.toLowerCase().includes('if total >= 1000')
    },
    {
      title: "Этап 6: Отчёт и внедрение",
      content: `Вы успешно спроектировали систему. Нажмите кнопку ниже, чтобы завершить проект и добавить его в портфолио!`,
      isFinal: true
    }
  ],

  renderProjects(container) {
    if (!this.projectState.active) {
      container.innerHTML = `
        <div class="card">
          <h3>Мини-проекты</h3>
          <p>Выполни полный цикл: Анализ → Схема → БД → Автоматизация → Отчёт</p>
          <div class="project-list" style="margin-top: 15px;">
            <div class="card" style="background: #1e293b; border: 1px solid #334155;">
              <h4>Проект "Магазин электроники"</h4>
              <div style="display: flex; justify-content: space-between; margin-top: 10px; align-items: center;">
                <span style="color: #94a3b8; font-size: 14px;">Длительность: ~15 мин</span>
                <button class="btn btn-primary btn-sm" onclick="ntoSystem.startProject()">Начать проект</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      const stage = this.projectStages[this.projectState.currentStage];
      
      let html = `
        <div class="card" style="background: #1e293b; border: 1px solid #3b82f6;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #f8fafc;">${stage.title}</h3>
            <span style="color: #3b82f6; font-weight: bold;">Шаг ${this.projectState.currentStage + 1} из ${this.projectStages.length}</span>
          </div>
          
          <div style="color: #cbd5e1; line-height: 1.6; margin-bottom: 20px; font-size: 15px;">
            ${stage.content}
          </div>
      `;
      
      if (!stage.isFinal) {
        html += `
          <input type="text" id="project-input" placeholder="${stage.inputPlaceholder}" style="width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #334155; color: #f8fafc; padding: 12px; border-radius: 8px; font-size: 15px; margin-bottom: 15px; outline: none;">
          <div id="project-error" style="color: #ef4444; font-size: 13px; margin-bottom: 15px; min-height: 20px;"></div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" onclick="ntoSystem.checkProjectStage()">Проверить и продолжить</button>
            <button class="btn btn-secondary" onclick="ntoSystem.cancelProject()">Прервать</button>
          </div>
        `;
      } else {
        html += `
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" onclick="ntoSystem.finishProject()" style="background: #10b981;">Завершить проект 🏆</button>
          </div>
        `;
      }
      
      html += `</div>`;
      container.innerHTML = html;
    }
  },
  
  startProject() {
    this.projectState.active = true;
    this.projectState.currentStage = 0;
    this.projectState.answers = {};
    this.renderCurrentTab();
  },
  
  cancelProject() {
    this.projectState.active = false;
    this.renderCurrentTab();
  },
  
  checkProjectStage() {
    const input = document.getElementById('project-input');
    const err = document.getElementById('project-error');
    if (!input || !err) return;
    
    const stage = this.projectStages[this.projectState.currentStage];
    const val = input.value.trim();
    
    if (!val) {
      err.textContent = "Введите ответ";
      return;
    }
    
    if (stage.validate(val)) {
      this.projectState.answers[this.projectState.currentStage] = val;
      this.projectState.currentStage++;
      this.renderCurrentTab();
    } else {
      err.textContent = "Ответ неполный или неверный. Подумайте ещё раз (см. подсказки в примере).";
    }
  },
  
  finishProject() {
    this.projectState.active = false;
    
    // Save to portfolio
    const progress = StorageManager.getNtoProgress() || {completedCases: [], sqlSolutions: [], bpmnSolutions: []};
    if (!progress.completedCases.includes('Магазин электроники')) {
      progress.completedCases.push('Магазин электроники');
      StorageManager.saveNtoProgress(progress);
    }
    
    alert('Поздравляем! Проект успешно завершен и добавлен в ваше Портфолио НТО.');
    this.switchTab('portfolio');
  },
  
  renderPortfolio(container) {
    const progress = StorageManager.getNtoProgress() || {completedCases: [], sqlSolutions: [], bpmnSolutions: []};
    
    container.innerHTML = `
      <div class="card">
        <h3>Ваше портфолио</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
          <div class="card" style="background: #1e293b; border: 1px solid #334155;">
            <h4>Решено кейсов</h4>
            <div style="font-size: 32px; font-weight: bold; color: #3b82f6;">${progress.completedCases.length}</div>
          </div>
          <div class="card" style="background: #1e293b; border: 1px solid #334155;">
            <h4>SQL скриптов</h4>
            <div style="font-size: 32px; font-weight: bold; color: #10b981;">${progress.sqlSolutions.length}</div>
          </div>
          <div class="card" style="background: #1e293b; border: 1px solid #334155;">
            <h4>BPMN схем</h4>
            <div style="font-size: 32px; font-weight: bold; color: #f59e0b;">${progress.bpmnSolutions.length}</div>
          </div>
        </div>
      </div>
    `;
  }
};

window.ntoSystem = ntoSystem;
