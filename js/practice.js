window.practiceSystem = {
  activeSession: null,

  render() {
    const container = document.getElementById('trainer-container');
    if (!container) return;

    let html = `
      <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #3b82f6; border-radius: 12px; padding: 20px; margin-bottom: 24px; position: relative; overflow: hidden;">
        <h3 style="color: #f8fafc; margin-top: 0; margin-bottom: 8px;">Ежедневный мини-экзамен</h3>
        <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 16px;">10 минут, смешанные задачи (Инфо, Мат, Рус). Проверь себя!</p>
        <button onclick="practiceSystem.startMiniExam()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">Начать экзамен</button>
      </div>
      <h3 style="color: #f8fafc; margin-bottom: 16px;">Тренировка по предметам</h3>
      <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
    `;

    const subjects = [
      { id: 'informatics', name: 'Информатика', color: '#3b82f6', tasks: [1,2,3,4,5,6,7,8] },
      { id: 'math', name: 'Математика', color: '#10b981', tasks: [1,2,3,4,5] },
      { id: 'russian', name: 'Русский язык', color: '#f59e0b', tasks: [1,2,3,4,5,6,7,8,9,10] }
    ];

    subjects.forEach(sub => {
      html += `
        <div style="background: #1e293b; border-radius: 12px; padding: 16px; border-left: 4px solid ${sub.color};">
          <h4 style="color: #f8fafc; margin-top: 0; margin-bottom: 12px;">${sub.name}</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${sub.tasks.map(t => `<button onclick="practiceSystem.startTraining('${sub.id}', ${t})" style="background: #334155; color: #f8fafc; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 14px;">Задание ${t}</button>`).join('')}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  },

  startMiniExam() {
    if (typeof AppData === 'undefined' || !AppData.miniExam) {
      app.showNotification('Данные экзамена недоступны', 'error');
      return;
    }
    this.activeSession = {
      type: 'exam',
      questions: AppData.miniExam,
      currentIndex: 0,
      score: 0,
      timeRemaining: 600, // 10 mins
      timerInt: null
    };
    
    this.renderExamInterface();
    this.startExamTimer();
  },

  startExamTimer() {
    this.activeSession.timerInt = setInterval(() => {
      this.activeSession.timeRemaining--;
      const m = Math.floor(this.activeSession.timeRemaining / 60);
      const s = this.activeSession.timeRemaining % 60;
      const tEl = document.getElementById('mini-exam-timer');
      if (tEl) tEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
      
      if (this.activeSession.timeRemaining <= 0) {
        clearInterval(this.activeSession.timerInt);
        this.finishExam();
      }
    }, 1000);
  },

  renderExamInterface() {
    const container = document.getElementById('trainer-container');
    const q = this.activeSession.questions[this.activeSession.currentIndex];
    
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="color: #f8fafc; margin: 0;">Мини-экзамен (${this.activeSession.currentIndex + 1}/${this.activeSession.questions.length})</h3>
        <div style="background: #ef4444; color: white; padding: 6px 12px; border-radius: 16px; font-weight: bold; font-family: monospace; font-size: 16px;" id="mini-exam-timer">10:00</div>
      </div>
      <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <div style="color: #94a3b8; font-size: 12px; margin-bottom: 12px; text-transform: uppercase;">${q.subject} • Задание ${q.taskNum}</div>
        <div style="color: #f8fafc; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">${q.question}</div>
        <input type="text" id="exam-answer" placeholder="Введите ответ..." style="width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #334155; color: #f8fafc; padding: 12px; border-radius: 8px; font-size: 16px; margin-bottom: 20px; outline: none;">
        <button onclick="practiceSystem.submitExamAnswer()" style="width: 100%; background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Ответить</button>
      </div>
      <button onclick="practiceSystem.render()" style="background: none; border: none; color: #94a3b8; cursor: pointer; text-decoration: underline;">Прервать экзамен</button>
    `;
  },

  submitExamAnswer() {
    const input = document.getElementById('exam-answer');
    if (!input || !input.value.trim()) return;
    
    const q = this.activeSession.questions[this.activeSession.currentIndex];
    const userAns = input.value.trim().toLowerCase();
    const correctAns = String(q.answer).toLowerCase();
    
    if (userAns === correctAns) {
      this.activeSession.score++;
    } else {
      StorageManager.saveError({
        subject: q.subject,
        topic: `Задание ${q.taskNum}`,
        question: q.question,
        correctAnswer: q.answer,
        userAnswer: input.value.trim(),
        explanation: q.explanation || 'Объяснение отсутствует'
      });
    }
    
    this.activeSession.currentIndex++;
    if (this.activeSession.currentIndex >= this.activeSession.questions.length) {
      clearInterval(this.activeSession.timerInt);
      this.finishExam();
    } else {
      this.renderExamInterface();
    }
  },

  finishExam() {
    const container = document.getElementById('trainer-container');
    const total = this.activeSession.questions.length;
    const score = this.activeSession.score;
    const pct = Math.round((score / total) * 100);
    
    StorageManager.addDailyLog({
      subject: 'Мини-экзамен', minutes: Math.floor((600 - this.activeSession.timeRemaining)/60), tasks: total, type: 'exam'
    });
    
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; background: #1e293b; border-radius: 12px;">
        <i class="fas fa-flag-checkered" style="font-size: 48px; color: ${pct >= 70 ? '#10b981' : '#f59e0b'}; margin-bottom: 16px;"></i>
        <h2 style="color: #f8fafc; margin-top: 0;">Экзамен завершен!</h2>
        <div style="font-size: 36px; font-weight: bold; color: ${pct >= 70 ? '#10b981' : '#f59e0b'}; margin-bottom: 20px;">
          ${score} / ${total}
        </div>
        <p style="color: #cbd5e1; margin-bottom: 24px;">Верных ответов: ${pct}%</p>
        <button onclick="practiceSystem.render()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer;">Вернуться к тренировкам</button>
      </div>
    `;
  },

  startTraining(subject, taskNumber) {
    if (typeof AppData === 'undefined' || !AppData.tasksEGE || !AppData.tasksEGE[subject] || !AppData.tasksEGE[subject][taskNumber]) {
      app.showNotification('Задания в разработке', 'info');
      return;
    }
    
    const tasks = AppData.tasksEGE[subject][taskNumber];
    this.activeSession = {
      type: 'training', subject, taskNumber, tasks, currentIndex: 0
    };
    this.renderTrainingTask();
  },

  renderTrainingTask() {
    const container = document.getElementById('trainer-container');
    const q = this.activeSession.tasks[this.activeSession.currentIndex];
    
    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <button onclick="practiceSystem.render()" style="background: none; border: none; color: #3b82f6; cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 0;">
          <i class="fas fa-arrow-left"></i> Назад к списку
        </button>
      </div>
      <div style="background: #1e293b; padding: 20px; border-radius: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
          <span style="color: #94a3b8; font-size: 14px;">${this.activeSession.subject} • Задание ${this.activeSession.taskNumber}</span>
          <span style="color: #94a3b8; font-size: 14px;">Задача ${this.activeSession.currentIndex + 1}/${this.activeSession.tasks.length}</span>
        </div>
        <div style="color: #f8fafc; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">${q.question}</div>
        
        <div id="training-interactive-area">
          <input type="text" id="training-answer" placeholder="Ваш ответ" style="width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #334155; color: #f8fafc; padding: 12px; border-radius: 8px; font-size: 16px; margin-bottom: 16px; outline: none;">
          <button onclick="practiceSystem.checkTrainingAnswer()" style="width: 100%; background: #10b981; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Проверить</button>
        </div>
      </div>
    `;
  },

  checkTrainingAnswer() {
    const input = document.getElementById('training-answer');
    if (!input || !input.value.trim()) return;
    
    const q = this.activeSession.tasks[this.activeSession.currentIndex];
    const userAns = input.value.trim().toLowerCase();
    const correctAns = String(q.answer).toLowerCase();
    
    const area = document.getElementById('training-interactive-area');
    const isCorrect = (userAns === correctAns);
    
    if (isCorrect) {
      // Update progress
      const p = StorageManager.getProgress();
      if (p[this.activeSession.subject]) p[this.activeSession.subject].completedTasks++;
      StorageManager.saveProgress(p);
      StorageManager.addDailyLog({ subject: this.activeSession.subject, minutes: 2, tasks: 1, type: 'practice' });
    } else {
      StorageManager.saveError({
        subject: this.activeSession.subject, topic: `Задание ${this.activeSession.taskNumber}`,
        question: q.question, correctAnswer: q.answer, userAnswer: input.value.trim(), explanation: q.explanation
      });
    }
    
    let html = `
      <div style="padding: 16px; border-radius: 8px; background: ${isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; border: 1px solid ${isCorrect ? '#10b981' : '#ef4444'}; margin-bottom: 16px;">
        <h4 style="color: ${isCorrect ? '#10b981' : '#ef4444'}; margin-top: 0; margin-bottom: 8px;">
          ${isCorrect ? '<i class="fas fa-check-circle"></i> Верно!' : '<i class="fas fa-times-circle"></i> Неверно'}
        </h4>
        <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 12px;">Правильный ответ: <strong>${q.answer}</strong></p>
        <div style="color: #94a3b8; font-size: 14px; border-top: 1px solid #334155; padding-top: 12px;">
          <strong>Объяснение:</strong><br>${q.explanation}
        </div>
      </div>
    `;
    
    if (this.activeSession.currentIndex < this.activeSession.tasks.length - 1) {
      html += `<button onclick="practiceSystem.nextTrainingTask()" style="width: 100%; background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Следующая задача</button>`;
    } else {
      html += `<button onclick="practiceSystem.render()" style="width: 100%; background: #334155; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Завершить тренировку</button>`;
    }
    
    area.innerHTML = html;
  },
  
  nextTrainingTask() {
    this.activeSession.currentIndex++;
    this.renderTrainingTask();
  }
};
