window.progressSystem = {
  render() {
    const container = document.getElementById('analytics-container');
    if (!container) return;
    
    const p = StorageManager.getProgress();
    const userData = StorageManager.getUserData();
    
    const totalComp = p.informatics.completedTasks + p.math.completedTasks + p.russian.completedTasks + p.nto.completedTasks;
    const totalAll = p.informatics.totalTasks + p.math.totalTasks + p.russian.totalTasks + p.nto.totalTasks;
    const overallPct = Math.round((totalComp / totalAll) * 100) || 0;
    
    const infPct = Math.round((p.informatics.completedTasks / p.informatics.totalTasks) * 100) || 0;
    const mathPct = Math.round((p.math.completedTasks / p.math.totalTasks) * 100) || 0;
    const rusPct = Math.round((p.russian.completedTasks / p.russian.totalTasks) * 100) || 0;
    const ntoPct = Math.round((p.nto.completedTasks / p.nto.totalTasks) * 100) || 0;
    
    // Forecast calculation
    const infScore = Math.min(100, Math.round(40 + (infPct / 100) * 60));
    const mathScore = Math.min(100, Math.round(30 + (mathPct / 100) * 70));
    const rusScore = Math.min(100, Math.round(50 + (rusPct / 100) * 50));
    const totalScore = infScore + mathScore + rusScore;

    let html = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div style="background: #1e293b; padding: 16px; border-radius: 12px; text-align: center;">
          <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px;">Всего решено</div>
          <div style="font-size: 28px; font-weight: bold; color: #3b82f6;">${totalComp}</div>
        </div>
        <div style="background: #1e293b; padding: 16px; border-radius: 12px; text-align: center;">
          <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px;">Общий прогресс</div>
          <div style="font-size: 28px; font-weight: bold; color: #10b981;">${overallPct}%</div>
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 20px; border-radius: 12px; border: 1px solid #334155; margin-bottom: 24px;">
        <h3 style="margin-top: 0; color: #f8fafc; font-size: 16px; margin-bottom: 16px;">Прогноз баллов ЕГЭ</h3>
        <div style="font-size: 36px; font-weight: bold; color: #f59e0b; text-align: center; margin-bottom: 16px;">${totalScore} / 300</div>
        
        <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px;">
          <span style="color: #cbd5e1;">Информатика</span>
          <span style="color: #f8fafc; font-weight: bold;">~${infScore}</span>
        </div>
        <div style="width: 100%; background: #0f172a; height: 8px; border-radius: 4px; margin-bottom: 12px;">
          <div style="width: ${infScore}%; background: #3b82f6; height: 100%; border-radius: 4px;"></div>
        </div>
        
        <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px;">
          <span style="color: #cbd5e1;">Математика</span>
          <span style="color: #f8fafc; font-weight: bold;">~${mathScore}</span>
        </div>
        <div style="width: 100%; background: #0f172a; height: 8px; border-radius: 4px; margin-bottom: 12px;">
          <div style="width: ${mathScore}%; background: #10b981; height: 100%; border-radius: 4px;"></div>
        </div>
        
        <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px;">
          <span style="color: #cbd5e1;">Русский язык</span>
          <span style="color: #f8fafc; font-weight: bold;">~${rusScore}</span>
        </div>
        <div style="width: 100%; background: #0f172a; height: 8px; border-radius: 4px; margin-bottom: 16px;">
          <div style="width: ${rusScore}%; background: #f59e0b; height: 100%; border-radius: 4px;"></div>
        </div>
        
        <div style="font-size: 12px; color: #64748b; text-align: center;">Прогноз строится на основе пройденных тем и процента верных ответов в тренажере.</div>
      </div>
      
      <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
        <h3 style="margin-top: 0; color: #f8fafc; font-size: 16px; margin-bottom: 16px;">Активность за 7 дней (мин)</h3>
        <div id="chart-mount" style="height: 150px; display: flex; align-items: flex-end; gap: 8px; justify-content: space-between; padding-top: 20px; border-bottom: 1px solid #334155;">
          <!-- Chart will be injected here -->
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    this.renderChart();
  },
  
  updateForecast() {
    // Only used by dashboard currently, to update quick stats if needed
    const p = StorageManager.getProgress();
    const infPct = Math.round((p.informatics.completedTasks / p.informatics.totalTasks) * 100) || 0;
    const mathPct = Math.round((p.math.completedTasks / p.math.totalTasks) * 100) || 0;
    const rusPct = Math.round((p.russian.completedTasks / p.russian.totalTasks) * 100) || 0;
    
    const infScore = Math.min(100, Math.round(40 + (infPct / 100) * 60));
    const mathScore = Math.min(100, Math.round(30 + (mathPct / 100) * 70));
    const rusScore = Math.min(100, Math.round(50 + (rusPct / 100) * 50));
    const totalScore = infScore + mathScore + rusScore;
    
    const el = document.getElementById('stat-score-forecast');
    if (el) el.textContent = `${totalScore} б.`;
  },
  
  renderChart() {
    const mount = document.getElementById('chart-mount');
    if (!mount) return;
    
    const log = StorageManager.getWeekLog();
    const days = [];
    for(let i=6; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    
    const dayTotals = days.map(day => {
      return log.filter(l => l.date === day).reduce((acc, l) => acc + (l.minutes || 0), 0);
    });
    
    const maxVal = Math.max(...dayTotals, 60); // min scale 60
    
    let chartHtml = '';
    days.forEach((day, idx) => {
      const val = dayTotals[idx];
      const height = (val / maxVal) * 100;
      const dateLabel = new Date(day).getDate();
      
      chartHtml += `
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%; flex: 1;">
          <div style="font-size: 10px; color: #94a3b8; margin-bottom: 4px;">${val > 0 ? val : ''}</div>
          <div style="width: 100%; max-width: 24px; background: #3b82f6; height: ${Math.max(height, 2)}%; border-radius: 4px 4px 0 0; transition: height 0.3s ease;"></div>
          <div style="font-size: 10px; color: #64748b; margin-top: 8px;">${dateLabel}</div>
        </div>
      `;
    });
    
    mount.innerHTML = chartHtml;
  }
};
