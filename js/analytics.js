window.analyticsSystem = {
  currentTab: 'progress',
  
  render() {
    const container = document.getElementById('analytics-container');
    if (!container) return;
    
    container.innerHTML = `
      <div class="card">
        <div class="tabs-nav" style="margin-bottom: 20px;">
          <button class="btn ${this.currentTab === 'progress' ? 'btn-primary' : 'btn-secondary'}" onclick="analyticsSystem.switchTab('progress')">Прогресс</button>
          <button class="btn ${this.currentTab === 'time' ? 'btn-primary' : 'btn-secondary'}" onclick="analyticsSystem.switchTab('time')">Время</button>
          <button class="btn ${this.currentTab === 'forecast' ? 'btn-primary' : 'btn-secondary'}" onclick="analyticsSystem.switchTab('forecast')">Прогноз</button>
        </div>
        <div id="analytics-content-area"></div>
      </div>
    `;
    
    this.renderCurrentTab();
  },
  
  switchTab(tab) {
    this.currentTab = tab;
    this.render();
  },
  
  renderCurrentTab() {
    const area = document.getElementById('analytics-content-area');
    if (!area) return;
    
    switch(this.currentTab) {
      case 'progress': this.renderProgress(area); break;
      case 'time': this.renderTime(area); break;
      case 'forecast': this.renderForecast(area); break;
    }
  },
  
  renderProgress(container) {
    const progress = StorageManager.getProgress() || {};
    const infoTasks = progress.informatics?.completedTasks || 0;
    const mathTasks = progress.math?.completedTasks || 0;
    const rusTasks = progress.russian?.completedTasks || 0;
    const errors = StorageManager.getErrors() || [];
    
    const total = infoTasks + mathTasks + rusTasks;
    
    container.innerHTML = `
      <h3>Общий прогресс</h3>
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px; text-align: center;">
          <div style="width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#3b82f6 ${Math.min(100, total)}%, #334155 0); margin: 0 auto; display: flex; align-items: center; justify-content: center;">
            <div style="width: 120px; height: 120px; border-radius: 50%; background: #1e293b; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <span style="font-size: 24px; font-weight: bold;">${total}</span>
              <span style="font-size: 12px; color: #94a3b8;">задач решено</span>
            </div>
          </div>
        </div>
        <div style="flex: 2; min-width: 250px;">
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span>Информатика</span>
              <span>${infoTasks}</span>
            </div>
            <div style="height: 10px; background: #334155; border-radius: 5px; overflow: hidden;">
              <div style="height: 100%; width: ${Math.min(100, infoTasks * 5)}%; background: #3b82f6;"></div>
            </div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span>Математика</span>
              <span>${mathTasks}</span>
            </div>
            <div style="height: 10px; background: #334155; border-radius: 5px; overflow: hidden;">
              <div style="height: 100%; width: ${Math.min(100, mathTasks * 5)}%; background: #10b981;"></div>
            </div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span>Русский язык</span>
              <span>${rusTasks}</span>
            </div>
            <div style="height: 10px; background: #334155; border-radius: 5px; overflow: hidden;">
              <div style="height: 100%; width: ${Math.min(100, rusTasks * 5)}%; background: #f59e0b;"></div>
            </div>
          </div>
          <div style="margin-top: 20px; padding: 10px; background: #334155; border-radius: 4px;">
            <strong>Ошибок в банке:</strong> ${errors.length}
          </div>
        </div>
      </div>
    `;
  },
  
  renderTime(container) {
    const userData = StorageManager.getUserData();
    const logs = StorageManager.getDailyLog() || [];
    
    let totalMinutes = logs.reduce((sum, log) => sum + (log.minutes || 0), 0);
    totalMinutes += (userData.hoursStudied * 60) || 0;
    
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    
    let html = `
      <h3>Время за учебой</h3>
      <div style="font-size: 32px; font-weight: bold; color: #3b82f6; margin-bottom: 20px;">
        ${hours} ч ${minutes} мин
      </div>
      
      <h4>Активность за последние дни</h4>
      <div style="height: 200px; display: flex; align-items: flex-end; gap: 10px; margin-top: 20px; padding-top: 20px; border-bottom: 1px solid #334155; border-left: 1px solid #334155;">
    `;
    
    // Create dummy chart data based on last 7 days
    const chartData = [10, 45, 30, 60, 20, 90, 15]; 
    const maxVal = Math.max(...chartData, 60);
    
    chartData.forEach(val => {
      let h = (val / maxVal) * 100;
      html += `
        <div style="flex: 1; background: #3b82f6; height: ${h}%; border-radius: 4px 4px 0 0; position: relative; min-height: 5px;" title="${val} мин"></div>
      `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
  },
  
  renderForecast(container) {
    const progress = StorageManager.getProgress() || {};
    const infoTasks = progress.informatics?.completedTasks || 0;
    const mathTasks = progress.math?.completedTasks || 0;
    const rusTasks = progress.russian?.completedTasks || 0;
    
    // Simple forecast calculation
    let infoScore = Math.min(100, Math.floor(40 + (infoTasks / 20) * 60));
    let mathScore = Math.min(100, Math.floor(30 + (mathTasks / 20) * 70));
    let rusScore = Math.min(100, Math.floor(50 + (rusTasks / 20) * 50));
    
    container.innerHTML = `
      <h3>Прогноз баллов ЕГЭ</h3>
      <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">* Прогноз основан на количестве решенных задач</p>
      
      <div style="display: grid; gap: 15px;">
        <div style="background: #1e293b; padding: 15px; border-radius: 4px; border: 1px solid #334155;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <strong>Информатика</strong>
            <strong style="color: #3b82f6;">${infoScore} / 100</strong>
          </div>
          <div style="height: 8px; background: #334155; border-radius: 4px;">
             <div style="height: 100%; width: ${infoScore}%; background: #3b82f6; border-radius: 4px;"></div>
          </div>
        </div>
        
        <div style="background: #1e293b; padding: 15px; border-radius: 4px; border: 1px solid #334155;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <strong>Профильная Математика</strong>
            <strong style="color: #10b981;">${mathScore} / 100</strong>
          </div>
          <div style="height: 8px; background: #334155; border-radius: 4px;">
             <div style="height: 100%; width: ${mathScore}%; background: #10b981; border-radius: 4px;"></div>
          </div>
        </div>
        
        <div style="background: #1e293b; padding: 15px; border-radius: 4px; border: 1px solid #334155;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <strong>Русский язык</strong>
            <strong style="color: #f59e0b;">${rusScore} / 100</strong>
          </div>
          <div style="height: 8px; background: #334155; border-radius: 4px;">
             <div style="height: 100%; width: ${rusScore}%; background: #f59e0b; border-radius: 4px;"></div>
          </div>
        </div>
        
        <div style="margin-top: 15px; padding: 15px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 4px; text-align: center;">
          <strong style="font-size: 20px;">Сумма баллов: ${infoScore + mathScore + rusScore}</strong>
        </div>
      </div>
    `;
  }
};

window.analyticsSystem = analyticsSystem;
