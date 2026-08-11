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
          <button class="btn ${this.currentTab === 'bpmn' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('bpmn')">BPMN</button>
          <button class="btn ${this.currentTab === 'sql' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('sql')">SQL</button>
          <button class="btn ${this.currentTab === 'python' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('python')">Python</button>
          <button class="btn ${this.currentTab === 'api' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('api')">API</button>
          <button class="btn ${this.currentTab === 'excel' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('excel')">Excel</button>
          <button class="btn ${this.currentTab === 'cases' ? 'btn-primary' : 'btn-secondary'}" onclick="ntoSystem.switchTab('cases')">Кейсы</button>
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
      case 'python': this.renderPython(area); break;
      case 'api': this.renderAPI(area); break;
      case 'excel': this.renderExcel(area); break;
      case 'portfolio': this.renderPortfolio(area); break;
    }
  },
  
  renderOverview(container) {
    container.innerHTML = `
      <div class="card" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9)); border: 1px solid var(--accent-glow);">
        <h3 style="font-size: 20px; color: var(--color-cyan); margin-bottom: 16px;"><i class="fas fa-rocket"></i> НТО "Автоматизация бизнес-процессов"</h3>
        <p style="color: #cbd5e1; font-size: 15px; margin-bottom: 20px;">Это профиль Национальной технологической олимпиады, направленный на решение реальных бизнес-задач с помощью IT-инструментов.</p>
        
        <h4 style="color: #f8fafc; margin-bottom: 12px; font-size: 16px;"><i class="fas fa-tools"></i> Необходимые навыки:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 20px;">
          <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;"><strong style="color: var(--color-yellow);">Python</strong> <br/><span style="font-size: 12px; color: #94a3b8;">Автоматизация рутины</span></div>
          <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;"><strong style="color: var(--color-green);">Таблицы</strong> <br/><span style="font-size: 12px; color: #94a3b8;">Данные и отчётность</span></div>
          <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;"><strong style="color: var(--color-purple);">BPMN</strong> <br/><span style="font-size: 12px; color: #94a3b8;">Бизнес-процессы</span></div>
          <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;"><strong style="color: var(--color-blue);">SQL</strong> <br/><span style="font-size: 12px; color: #94a3b8;">Базы данных</span></div>
        </div>
        
        <div style="background: rgba(59, 130, 246, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid var(--color-blue);">
          <h4 style="margin: 0 0 5px 0; color: #f8fafc;">Связь с ЕГЭ:</h4>
          <p style="margin: 0; color: #cbd5e1; font-size: 14px;">Задачи ЕГЭ по информатике отлично готовят к НТО: программирование, логика, работа с электронными таблицами.</p>
        </div>
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
    container.innerHTML = '<div id="bpmn-trainer-area"></div><div style="margin-top:20px; text-align:center;"><button onclick="plannerSystem.markCurrentTaskCompleted()" class="btn btn-primary btn-large">Завершить этап НТО 🚀</button></div>';
    if (window.bpmnTrainer) {
      bpmnTrainer.render(document.getElementById('bpmn-trainer-area'));
    }
  },
  
  renderSQL(container) {
    container.innerHTML = '<div id="sql-sandbox-area"></div><div style="margin-top:20px; text-align:center;"><button onclick="plannerSystem.markCurrentTaskCompleted()" class="btn btn-primary btn-large">Завершить этап НТО 🚀</button></div>';
    if (window.sqlSandbox) {
      sqlSandbox.render(document.getElementById('sql-sandbox-area'));
    }
  },
  
  renderPython(container) {
    container.innerHTML = `
      <div class="card" style="background: #1e293b; border: 1px solid #334155; margin-bottom: 20px;">
        <h3 style="color: #f8fafc;">Python для автоматизации</h3>
        <p style="color: #cbd5e1; margin-bottom: 15px;">Создай скрипт для парсинга данных из CSV. (Интерактивная среда в разработке).</p>
        <pre style="background: #0f172a; padding: 15px; border-radius: 8px; color: #10b981;">
import pandas as pd
df = pd.read_csv('data.csv')
print(df.groupby('category')['price'].sum())
        </pre>
      </div>
      <div style="text-align:center;"><button onclick="plannerSystem.markCurrentTaskCompleted()" class="btn btn-primary btn-large">Завершить этап НТО 🚀</button></div>
    `;
  },

  renderAPI(container) {
    container.innerHTML = `
      <div class="card" style="background: #1e293b; border: 1px solid #334155; margin-bottom: 20px;">
        <h3 style="color: #f8fafc;">Интеграция по API</h3>
        <p style="color: #cbd5e1; margin-bottom: 15px;">Отправь GET запрос и получи JSON. (Симулятор POSTMAN в разработке).</p>
        <pre style="background: #0f172a; padding: 15px; border-radius: 8px; color: #10b981;">
import requests
res = requests.get('https://api.example.com/data')
data = res.json()
        </pre>
      </div>
      <div style="text-align:center;"><button onclick="plannerSystem.markCurrentTaskCompleted()" class="btn btn-primary btn-large">Завершить этап НТО 🚀</button></div>
    `;
  },

  renderExcel(container) {
    container.innerHTML = `
      <div class="card" style="background: #1e293b; border: 1px solid #334155; margin-bottom: 20px;">
        <h3 style="color: #f8fafc;">Excel / Google Sheets</h3>
        <p style="color: #cbd5e1; margin-bottom: 15px;">Сложные формулы и сводные таблицы. (Интерактивный тренажер ВПР и сводных таблиц в разработке).</p>
        <pre style="background: #0f172a; padding: 15px; border-radius: 8px; color: #10b981;">
=ВПР(A2; 'Прайс'!A:C; 3; ЛОЖЬ)
        </pre>
      </div>
      <div style="text-align:center;"><button onclick="plannerSystem.markCurrentTaskCompleted()" class="btn btn-primary btn-large">Завершить этап НТО 🚀</button></div>
    `;
  },
  
  projectState: {
    active: false,
    currentCaseId: null,
    currentStage: 0,
    answers: {}
  },
  
  renderProjects(container) {
    if (!this.projectState.active) {
      const cases = window.NTOContent?.cases || [];
      
      let html = `
        <div class="card">
          <h3>Мини-проекты</h3>
          <p>Выполни полный цикл: Анализ → Схема → БД → Автоматизация → Отчёт</p>
          <div class="project-list" style="margin-top: 15px; display: grid; gap: 15px;">
      `;
      
      cases.forEach(c => {
        html += `
            <div class="card" style="background: #1e293b; border: 1px solid #334155;">
              <h4>Проект "${c.title}"</h4>
              <p style="color: #94a3b8; font-size: 14px; margin-bottom: 10px;">${c.description}</p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #94a3b8; font-size: 14px;">Этапов: ${c.stages.length}</span>
                <button class="btn btn-primary btn-sm" onclick="ntoSystem.startProject('${c.id}')">Начать проект</button>
              </div>
            </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
      container.innerHTML = html;
    } else {
      const currentCase = (window.NTOContent?.cases || []).find(c => c.id === this.projectState.currentCaseId);
      if (!currentCase) { this.cancelProject(); return; }
      
      const stage = currentCase.stages[this.projectState.currentStage];
      
      let html = `
        <div class="card" style="background: #1e293b; border: 1px solid #3b82f6;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #f8fafc;">${stage.title}</h3>
            <span style="color: #3b82f6; font-weight: bold;">Шаг ${this.projectState.currentStage + 1} из ${currentCase.stages.length}</span>
          </div>
          
          <div style="color: #cbd5e1; line-height: 1.6; margin-bottom: 20px; font-size: 15px;">
            ${stage.content}
          </div>
      `;
      
      if (!stage.isFinal) {
        html += `
          <div style="background: #000; border: 1px solid #334155; border-radius: 8px; padding: 15px; margin-bottom: 15px; font-family: monospace;">
            <div style="color: #64748b; margin-bottom: 8px; font-size: 12px;">> Терминал выполнения задачи</div>
            <input type="text" id="project-input" placeholder="${stage.inputPlaceholder || 'Ваш ответ...'}" style="width: 100%; box-sizing: border-box; background: transparent; border: none; border-bottom: 1px solid #334155; color: #22c55e; padding: 8px 0; font-size: 15px; margin-bottom: 15px; outline: none; font-family: monospace;">
            <div id="project-error" style="color: #ef4444; font-size: 13px; margin-bottom: 10px; min-height: 20px;"></div>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" onclick="ntoSystem.checkProjectStage()"><i class="fas fa-play"></i> Выполнить</button>
            <button class="btn btn-secondary" onclick="ntoSystem.cancelProject()">Прервать</button>
          </div>
        `;
      } else {
        html += `
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" onclick="ntoSystem.finishProject('${currentCase.title}')" style="background: #10b981;"><i class="fas fa-trophy"></i> Завершить проект</button>
          </div>
        `;
      }
      
      html += `</div>`;
      container.innerHTML = html;
    }
  },
  
  startProject(caseId) {
    this.projectState.active = true;
    this.projectState.currentCaseId = caseId || (window.NTOContent?.cases[0]?.id);
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
    
    const currentCase = (window.NTOContent?.cases || []).find(c => c.id === this.projectState.currentCaseId);
    if (!currentCase) return;
    const stage = currentCase.stages[this.projectState.currentStage];
    
    const val = input.value.trim().toLowerCase();
    
    if (!val) {
      err.textContent = "Введите ответ";
      return;
    }
    
    let isCorrect = false;
    if (stage.expectedKeywords && stage.expectedKeywords.length > 0) {
      isCorrect = stage.expectedKeywords.some(kw => val.includes(kw));
    } else {
      isCorrect = true; // Fallback if no keywords defined
    }
    
    if (isCorrect) {
      this.projectState.answers[this.projectState.currentStage] = val;
      this.projectState.currentStage++;
      this.renderCurrentTab();
    } else {
      err.textContent = "Ответ неполный или неверный. Подумайте ещё раз (см. подсказки в примере).";
    }
  },
  
  finishProject(caseTitle) {
    this.projectState.active = false;
    
    // Save to portfolio
    const progress = StorageManager.getNtoProgress() || {completedCases: [], sqlSolutions: [], bpmnSolutions: []};
    if (!progress.completedCases.includes(caseTitle)) {
      progress.completedCases.push(caseTitle);
      StorageManager.saveNtoProgress(progress);
    }
    
    app.showNotification('Поздравляем! Проект успешно завершен и добавлен в ваше Портфолио НТО.', 'success');
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
