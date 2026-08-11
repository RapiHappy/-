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
  questionsCache: [],
  
  start() {
    this.currentSubject = 0;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.loadQuestions();
  },

  loadQuestions() {
    if (this.currentSubject >= this.subjects.length) {
      this.finish();
      return;
    }
    const subject = this.subjects[this.currentSubject];
    let allTasks = [];
    const subjectData = window.TasksEGE[subject];
    for (let key in subjectData) {
      if (subjectData[key].tasks && subjectData[key].tasks.length > 0) {
        allTasks = allTasks.concat(subjectData[key].tasks);
      }
    }
    // Shuffle and pick 10
    allTasks = allTasks.sort(() => 0.5 - Math.random()).slice(0, 10);
    this.questionsCache = allTasks;
    this.currentQuestionIndex = 0;
    this.renderQuestion();
  },

  renderQuestion() {
    const container = document.getElementById('diagnostics-content');
    const subject = this.subjects[this.currentSubject];
    
    if (this.currentQuestionIndex >= this.questionsCache.length) {
      this.currentSubject++;
      this.loadQuestions();
      return;
    }

    const task = this.questionsCache[this.currentQuestionIndex];
    
    container.innerHTML = `
      <h3 style="color: #3b82f6; margin-bottom: 10px;">${this.subjectNames[subject]}</h3>
      <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">Вопрос ${this.currentQuestionIndex + 1} из ${this.questionsCache.length}</p>
      
      <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 20px; text-align: left;">
        <p style="font-size: 16px; margin-top: 0; line-height: 1.5;">${task.question}</p>
        <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;">
          <input type="text" id="diag-answer" placeholder="Ваш ответ..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: white; font-size: 16px;">
          <button class="btn btn-primary" style="margin-top: 10px;" onclick="diagnosticsSystem.answer('${task.answer.replace(/'/g, "\\'")}')">Ответить</button>
        </div>
      </div>
    `;
  },

  answer(correctAnswer) {
    const inputEl = document.getElementById('diag-answer');
    if (!inputEl) return;
    const userAnswer = inputEl.value.trim().toLowerCase();
    
    if (userAnswer === correctAnswer.trim().toLowerCase()) {
      this.score++;
    }
    this.currentQuestionIndex++;
    this.renderQuestion();
  },

  finish() {
    localStorage.setItem('diagnostics_done', 'true');
    localStorage.setItem('diagnostics_score', this.score);
    
    if (window.plannerSystem && typeof window.plannerSystem.generatePlan === 'function') {
      window.plannerSystem.generatePlan();
    }
    
    const container = document.getElementById('diagnostics-content');
    container.innerHTML = `
      <h3 style="color: #10b981; margin-bottom: 15px;">Диагностика завершена!</h3>
      <p style="margin-bottom: 25px;">Твой результат: ${this.score} баллов. Мы проанализировали твои ответы и составили индивидуальный план подготовки.</p>
      <button class="btn btn-primary btn-large" style="width: 100%;" onclick="document.getElementById('modal-diagnostics').style.display='none'; location.reload();">Начать обучение</button>
    `;
  },

  check() {
    if (!localStorage.getItem('diagnostics_done')) {
      document.getElementById('modal-diagnostics').style.display = 'flex';
    }
  }
};
