window.mistakesSystem = {
  currentFilter: 'all',

  render() {
    const container = document.getElementById('errors-list');
    if (!container) return;

    const allErrors = StorageManager.getErrors();
    const sr = StorageManager.getSpacedRepetition();
    const now = Date.now();

    let filtered = allErrors;
    if (this.currentFilter !== 'all') {
      window.subjectMap = { 'info': 'Информатика', 'math': 'Математика', 'rus': 'Русский язык' };
      filtered = allErrors.filter(e => e.subject === subjectMap[this.currentFilter]);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
          <i class="fas fa-check-circle" style="font-size: 48px; color: #10b981; margin-bottom: 16px;"></i>
          <p>Ошибок нет! Отличная работа.</p>
        </div>
      `;
      return;
    }

    let html = `
      <div style="display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 4px;">
        <button onclick="mistakesSystem.setFilter('all')" style="white-space: nowrap; padding: 6px 12px; border-radius: 16px; border: none; background: ${this.currentFilter==='all' ? '#3b82f6' : '#334155'}; color: #fff; cursor: pointer;">Все</button>
        <button onclick="mistakesSystem.setFilter('info')" style="white-space: nowrap; padding: 6px 12px; border-radius: 16px; border: none; background: ${this.currentFilter==='info' ? '#3b82f6' : '#334155'}; color: #fff; cursor: pointer;">Информатика</button>
        <button onclick="mistakesSystem.setFilter('math')" style="white-space: nowrap; padding: 6px 12px; border-radius: 16px; border: none; background: ${this.currentFilter==='math' ? '#3b82f6' : '#334155'}; color: #fff; cursor: pointer;">Математика</button>
        <button onclick="mistakesSystem.setFilter('rus')" style="white-space: nowrap; padding: 6px 12px; border-radius: 16px; border: none; background: ${this.currentFilter==='rus' ? '#3b82f6' : '#334155'}; color: #fff; cursor: pointer;">Русский</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 16px;">
    `;

    filtered.forEach((err, idx) => {
      const realIdx = allErrors.indexOf(err);
      const isDue = err.nextReview <= now;
      const subColor = err.subject === 'Информатика' ? '#3b82f6' : err.subject === 'Математика' ? '#10b981' : '#f59e0b';
      
      html += `
        <div style="background: #1e293b; border-radius: 12px; padding: 16px; border-left: 4px solid ${subColor}; position: relative;">
          ${isDue ? `<div style="position: absolute; top: 12px; right: 12px; background: #ef4444; color: white; font-size: 10px; padding: 2px 8px; border-radius: 10px; font-weight: bold;">ПОРА ПОВТОРИТЬ</div>` : ''}
          <div style="font-size: 12px; color: #94a3b8; margin-bottom: 8px;">${err.subject} • ${err.topic}</div>
          <div style="color: #f8fafc; font-size: 14px; margin-bottom: 12px;">${err.question}</div>
          <div style="display: flex; gap: 16px; margin-bottom: 16px; font-size: 14px;">
            <div style="color: #ef4444;"><span style="color: #64748b; font-size: 12px;">Вы ответили:</span> <br> <s style="opacity: 0.8">${err.userAnswer}</s></div>
            <div style="color: #10b981;"><span style="color: #64748b; font-size: 12px;">Правильно:</span> <br> <strong>${err.correctAnswer}</strong></div>
          </div>
          
          <div id="err-exp-${realIdx}" style="display: none; background: #0f172a; padding: 12px; border-radius: 8px; font-size: 13px; color: #cbd5e1; margin-bottom: 16px; border-left: 2px solid #3b82f6;">
            ${err.explanation}
          </div>
          
          <div id="err-quiz-${realIdx}" style="display: none; margin-bottom: 16px;">
            <input type="text" id="err-input-${realIdx}" placeholder="Введите правильный ответ по памяти" style="width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
            <button onclick="mistakesSystem.checkQuiz(${realIdx})" style="width: 100%; background: #10b981; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">Проверить</button>
            <div id="err-quiz-res-${realIdx}" style="margin-top: 8px; font-size: 13px;"></div>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="mistakesSystem.toggleQuiz(${realIdx})" style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <i class="fas fa-redo"></i> Повторить
            </button>
            <button onclick="document.getElementById('err-exp-${realIdx}').style.display = 'block'" style="background: #334155; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <i class="fas fa-lightbulb"></i> Объяснить
            </button>
            <button onclick="window.location.hash = 'trainer'" style="background: #334155; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <i class="fas fa-dumbbell"></i> Похожее
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  },

  setFilter(f) {
    this.currentFilter = f;
    this.render();
  },

  toggleQuiz(idx) {
    const el = document.getElementById(`err-quiz-${idx}`);
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
  },

  checkQuiz(idx) {
    const input = document.getElementById(`err-input-${idx}`);
    const res = document.getElementById(`err-quiz-res-${idx}`);
    const errors = StorageManager.getErrors();
    const err = errors[idx];
    
    if (!input || !res || !err) return;
    
    const userVal = input.value.trim().toLowerCase();
    const correctVal = String(err.correctAnswer).trim().toLowerCase();
    
    if (userVal === correctVal) {
      res.innerHTML = '<span style="color: #10b981;">Верно! Ошибка усвоена.</span>';
      
      // Update spaced repetition
      err.reviewStage = (err.reviewStage || 0) + 1;
      const intervals = [1, 3, 7, 14, 30]; // days
      const days = intervals[Math.min(err.reviewStage, intervals.length - 1)];
      err.nextReview = Date.now() + (days * 86400000);
      
      StorageManager.saveError(err); // Wait, this pushes a new one, we need to update
      
      // Proper update:
      const allErrors = StorageManager.getErrors();
      allErrors[idx] = err;
      localStorage.setItem(StorageManager.keys.ERRORS, JSON.stringify(allErrors));
      
      setTimeout(() => this.render(), 1500);
    } else {
      res.innerHTML = '<span style="color: #ef4444;">Неверно. Почитайте объяснение еще раз.</span>';
      err.reviewStage = 0; // reset
      err.nextReview = Date.now() + 86400000; // 1 day
      
      const allErrors = StorageManager.getErrors();
      allErrors[idx] = err;
      localStorage.setItem(StorageManager.keys.ERRORS, JSON.stringify(allErrors));
    }
  }
};
