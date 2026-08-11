window.advisorSystem = {
  showDailyRecommendation() {
    const el = document.getElementById('advisor-recommendation');
    if (!el) return;
    
    const advice = this.generateAdvice();
    el.innerHTML = `
      <div class="advisor-card" style="background: linear-gradient(145deg, #1e293b, #0f172a); border: 1px solid #3b82f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <div class="advisor-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: #60a5fa;">
          <i class="fa-solid fa-robot"></i>
          <span style="font-weight: bold;">AI-Наставник</span>
        </div>
        <p style="margin: 0 0 15px 0;">${advice.text}</p>
        ${advice.action ? `<button class="btn btn-secondary btn-sm" onclick="${advice.action}">📌 ${advice.actionLabel}</button>` : ''}
      </div>
    `;
  },
  
  generateAdvice() {
    const userData = StorageManager.getUserData();
    const progress = StorageManager.getProgress();
    const errors = StorageManager.getErrors() || [];
    let dueItems = [];
    if (window.spacedRepetition) {
      dueItems = window.spacedRepetition.getDueItems();
    }
    
    // Rule 1: Spaced repetition due
    if (dueItems.length > 0) {
      return {
        text: `У тебя накопилось ${dueItems.length} ошибок для интервального повторения. Давай закрепим материал!`,
        action: "app.navigateTo('errors')",
        actionLabel: "Повторить ошибки"
      };
    }
    
    // Rule 2: Low energy
    if (userData && userData.energyLevel < 30) {
      return {
        text: `Твой уровень энергии очень низкий (${userData.energyLevel}%). Рекомендую сделать перерыв или позаниматься чем-то легким.`,
        action: "",
        actionLabel: ""
      };
    }
    
    // Rule 3: NTO progress
    const ntoProgress = StorageManager.getNtoProgress() || {completedCases: []};
    if (ntoProgress.completedCases.length === 0) {
      return {
        text: `Ты еще не пробовал свои силы в НТО! Это отличная возможность применить знания на практике.`,
        action: "app.navigateTo('nto')",
        actionLabel: "Перейти к НТО"
      };
    }
    
    // Default
    return {
      text: `Отличный день для изучения новых тем. Давай начнем с профильной математики!`,
      action: "app.navigateTo('courses')",
      actionLabel: "Выбрать курс"
    };
  }
};

window.advisorSystem = advisorSystem;
