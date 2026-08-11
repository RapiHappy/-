window.diagnosticsSystem = {
  currentSubject: 0,
  subjects: ['informatics', 'math', 'russian'],
  subjectNames: {
    'informatics': 'Информатика',
    'math': 'Математика',
    'russian': 'Русский язык'
  },
  currentQuestionIndex: 0,
  score: 0,
  
  start() {
    this.currentSubject = 0;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.renderQuestion();
  },

  renderQuestion() {
    const container = document.getElementById('diagnostics-content');
    if (this.currentSubject >= this.subjects.length) {
      this.finish();
      return;
    }

    if (this.currentQuestionIndex >= 10) {
      this.currentSubject++;
      this.currentQuestionIndex = 0;
      this.renderQuestion();
      return;
    }

    const subject = this.subjects[this.currentSubject];
    container.innerHTML = `
      <h3 style="color: #3b82f6; margin-bottom: 10px;">${this.subjectNames[subject]}</h3>
      <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">Вопрос ${this.currentQuestionIndex + 1} из 10</p>
      
      <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 20px; text-align: left;">
        <p style="font-size: 18px; margin-top: 0;">Демонстрационный диагностический вопрос по предмету: ${this.subjectNames[subject]}. Найдите правильный ответ.</p>
        <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;">
          <button class="btn btn-outline" style="text-align: left; justify-content: flex-start;" onclick="diagnosticsSystem.answer(true)">Вариант 1 (Правильный)</button>
          <button class="btn btn-outline" style="text-align: left; justify-content: flex-start;" onclick="diagnosticsSystem.answer(false)">Вариант 2</button>
          <button class="btn btn-outline" style="text-align: left; justify-content: flex-start;" onclick="diagnosticsSystem.answer(false)">Вариант 3</button>
          <button class="btn btn-outline" style="text-align: left; justify-content: flex-start;" onclick="diagnosticsSystem.answer(false)">Вариант 4</button>
        </div>
      </div>
    `;
  },

  answer(isCorrect) {
    if (isCorrect) this.score++;
    this.currentQuestionIndex++;
    this.renderQuestion();
  },

  finish() {
    localStorage.setItem('diagnostics_done', 'true');
    localStorage.setItem('diagnostics_score', this.score);
    
    // Create initial plan based on score if needed
    if (window.plannerSystem) {
      plannerSystem.generatePlan();
    }
    
    const container = document.getElementById('diagnostics-content');
    container.innerHTML = `
      <h3 style="color: #10b981; margin-bottom: 15px;">Диагностика завершена!</h3>
      <p style="margin-bottom: 25px;">Твой результат: ${this.score} из 30. Мы составили для тебя индивидуальный план подготовки.</p>
      <button class="btn btn-primary btn-large" style="width: 100%;" onclick="document.getElementById('modal-diagnostics').style.display='none'">Начать обучение</button>
    `;
  },

  check() {
    if (!localStorage.getItem('diagnostics_done')) {
      document.getElementById('modal-diagnostics').style.display = 'flex';
    }
  }
};
