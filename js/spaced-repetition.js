window.spacedRepetition = {
  intervals: [1, 3, 7, 14, 30],
  
  scheduleReview(errorObj) {
    let items = StorageManager.getSpacedRepetition() || [];
    
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + this.intervals[0]);
    
    window.newItem = {
      id: Date.now(),
      errorObj: errorObj,
      stage: 0,
      nextReview: nextDate.toISOString().split('T')[0]
    };
    
    items.push(newItem);
    StorageManager.saveSpacedRepetition(items);
  },
  
  getDueItems() {
    const items = StorageManager.getSpacedRepetition() || [];
    const today = new Date().toISOString().split('T')[0];
    return items.filter(item => item.nextReview <= today);
  },
  
  checkDueItems() {
    const due = this.getDueItems();
    // Update badge or section if needed
    return due;
  },
  
  completeReview(itemId, correct) {
    let items = StorageManager.getSpacedRepetition() || [];
    const index = items.findIndex(i => i.id === itemId);
    
    if (index === -1) return;
    
    if (correct) {
      items[index].stage += 1;
      if (items[index].stage >= this.intervals.length) {
        // Mastered, remove from list
        items.splice(index, 1);
      } else {
        // Schedule next
        let nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + this.intervals[items[index].stage]);
        items[index].nextReview = nextDate.toISOString().split('T')[0];
      }
    } else {
      // Reset stage
      items[index].stage = 0;
      let nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + this.intervals[0]);
      items[index].nextReview = nextDate.toISOString().split('T')[0];
    }
    
    StorageManager.saveSpacedRepetition(items);
  },
  
  renderDueItems(container) {
    if (!container) container = document.getElementById('errors-list');
    if (!container) return;
    
    const due = this.getDueItems();
    if (due.length === 0) {
      container.innerHTML = '<p style="color: #94a3b8;">На сегодня заданий для повторения нет. Вы молодец!</p>';
      return;
    }
    
    let html = `<h3>Пора повторить (${due.length})</h3><div style="display: grid; gap: 10px;">`;
    due.forEach(item => {
      let subj = item.errorObj.subject === 'informatics' ? 'Информатика' : item.errorObj.subject;
      html += `
        <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>${subj}</strong>: ${item.errorObj.topic || 'Без темы'}
          </div>
          <button class="btn btn-primary btn-sm" onclick="spacedRepetition.startQuiz(${item.id})">Повторить</button>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  },
  
  startQuiz(itemId) {
    const items = StorageManager.getSpacedRepetition() || [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const container = document.getElementById('errors-list');
    if (!container) return;
    
    container.innerHTML = `
      <div class="card">
        <h3>Повторение</h3>
        <div style="margin-bottom: 15px;">
          <strong>Вопрос:</strong> ${item.errorObj.question || 'Вопрос не указан'}
        </div>
        <div style="margin-bottom: 15px;">
          <input type="text" id="sr-answer" class="form-control" placeholder="Ваш ответ" style="width: 100%; padding: 8px; background: #0f172a; color: #fff; border: 1px solid #334155; border-radius: 4px;">
        </div>
        <button class="btn btn-primary" onclick="spacedRepetition.checkAnswer(${itemId}, '${item.errorObj.correctAnswer}')">Ответить</button>
        <button class="btn btn-secondary" onclick="spacedRepetition.renderDueItems()">Отмена</button>
        <div id="sr-feedback" style="margin-top: 15px;"></div>
      </div>
    `;
  },
  
  checkAnswer(itemId, correctAns) {
    const userAnswer = document.getElementById('sr-answer').value.trim();
    const isCorrect = userAnswer.toLowerCase() === (correctAns || '').toString().toLowerCase();
    
    this.completeReview(itemId, isCorrect);
    
    const feedback = document.getElementById('sr-feedback');
    if (isCorrect) {
      feedback.innerHTML = `<div style="padding: 10px; background: rgba(16, 185, 129, 0.2); color: #10b981; border-radius: 4px;">Верно! Отлично.</div>`;
      setTimeout(() => this.renderDueItems(), 1500);
    } else {
      feedback.innerHTML = `<div style="padding: 10px; background: rgba(239, 68, 68, 0.2); color: #ef4444; border-radius: 4px;">Ошибка. Правильный ответ: ${correctAns}</div>`;
      setTimeout(() => this.renderDueItems(), 3000);
    }
  },
  
  removeItem(itemId) {
    let items = StorageManager.getSpacedRepetition() || [];
    items = items.filter(i => i.id !== itemId);
    StorageManager.saveSpacedRepetition(items);
  }
};

window.spacedRepetition = spacedRepetition;
