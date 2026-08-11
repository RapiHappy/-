window.burnoutSystem = {
  init() {
    const userData = StorageManager.getUserData();
    const today = new Date().toISOString().split('T')[0];
    
    if (userData.lastEnergyDate !== today) {
      setTimeout(() => this.promptEnergyLevel(), 1500); // prompt shortly after load
    } else {
      this.updateUILabel(userData.energyLevel);
      this.detectBurnout();
    }
  },
  
  promptEnergyLevel() {
    let modal = document.getElementById('modal-energy');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-energy';
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(15, 23, 42, 0.9); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
        padding: 20px; box-sizing: border-box; backdrop-filter: blur(4px);
      `;
      document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
      <div style="background: #1e293b; padding: 24px; border-radius: 16px; width: 100%; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); text-align: center;">
        <h2 style="color: #f8fafc; margin-top: 0; margin-bottom: 12px; font-size: 20px;">Как ты сегодня?</h2>
        <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 24px;">Выбери уровень энергии, чтобы мы адаптировали план подготовки.</p>
        
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <button onclick="burnoutSystem.setEnergyLevel('high')" style="background: #10b981; color: white; border: none; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px;">
            <i class="fas fa-battery-full"></i> Отлично! Готов свернуть горы (2.5 ч)
          </button>
          <button onclick="burnoutSystem.setEnergyLevel('medium')" style="background: #f59e0b; color: white; border: none; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px;">
            <i class="fas fa-battery-half"></i> Нормально, поучусь в меру (1.5 ч)
          </button>
          <button onclick="burnoutSystem.setEnergyLevel('low')" style="background: #ef4444; color: white; border: none; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px;">
            <i class="fas fa-battery-quarter"></i> Устал. Сделаю минимум (15 мин)
          </button>
        </div>
      </div>
    `;
    modal.style.display = 'flex';
  },
  
  setEnergyLevel(level) {
    const userData = StorageManager.getUserData();
    userData.energyLevel = level;
    userData.lastEnergyDate = new Date().toISOString().split('T')[0];
    StorageManager.saveUserData(userData);
    
    this.updateUILabel(level);
    if (typeof plannerSystem !== 'undefined') plannerSystem.generatePlan(level);
    
    const modal = document.getElementById('modal-energy');
    if (modal) modal.style.display = 'none';
    
    app.showNotification('План на день адаптирован под твое состояние!', 'success');
  },
  
  updateUILabel(level) {
    const badge = document.getElementById('energy-badge');
    if (!badge) return;
    
    window.map = {
      'high': { color: '#10b981', text: '<i class="fas fa-battery-full"></i> Максимум' },
      'medium': { color: '#f59e0b', text: '<i class="fas fa-battery-half"></i> Норма' },
      'low': { color: '#ef4444', text: '<i class="fas fa-battery-quarter"></i> Минимум' }
    };
    
    if (map[level]) {
      badge.innerHTML = map[level].text;
      badge.style.color = map[level].color;
      badge.style.borderColor = map[level].color;
    }
  },
  
  detectBurnout() {
    const userData = StorageManager.getUserData();
    if (userData.streak > 14 && userData.energyLevel === 'high') {
      // Suggest a break
      app.showNotification('🔥 У тебя огромный стрик! Не забудь взять выходной, чтобы избежать выгорания.', 'info');
    }
  },
  
  getRecommendation() {
    const userData = StorageManager.getUserData();
    if (userData.energyLevel === 'low') {
      return "Сегодня только 15 минут карточек. Не перегружай себя, отдых тоже важен для мозга!";
    }
    return "Отличный день для достижения новых вершин!";
  }
};
