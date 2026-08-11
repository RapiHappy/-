window.practiceSystem = {
  activeSession: null,

  render() {
    const container = document.getElementById('trainer-container');
    if (!container) return;

    let html = `
      <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #3b82f6; border-radius: 12px; padding: 20px; margin-bottom: 24px; position: relative; overflow: hidden;">
        <h3 style="color: #f8fafc; margin-top: 0; margin-bottom: 8px;">Ежедневный мини-экзамен</h3>
        <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 16px;">10 минут, 10 смешанных случайных задач (Инфо, Мат, Рус). Проверь себя!</p>
        <button onclick="practiceSystem.startMiniExam()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">Начать экзамен (10 мин)</button>
      </div>
      <h3 style="color: #f8fafc; margin-bottom: 16px;">Свободная тренировка по номерам ЕГЭ</h3>
      <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
    `;

    const sources = [
      { id: 'informatics', name: 'Информатика', color: '#3b82f6', data: window.LessonsInformatics || [] },
      { id: 'math', name: 'Математика', color: '#10b981', data: window.LessonsMath || [] },
      { id: 'russian', name: 'Русский язык', color: '#f59e0b', data: window.LessonsRussian || [] }
    ];

    sources.forEach(sub => {
      html += `
        <div style="background: #1e293b; border-radius: 12px; padding: 16px; border-left: 4px solid ${sub.color};">
          <h4 style="color: #f8fafc; margin-top: 0; margin-bottom: 12px;">${sub.name}</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${sub.data.map((lesson, idx) => `<button onclick="practiceSystem.startTraining('${sub.id}', ${idx})" style="background: #334155; color: #f8fafc; border: 1px solid transparent; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.borderColor='${sub.color}'" onmouseout="this.style.borderColor='transparent'">${lesson.egeNumber}</button>`).join('')}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  },

  getAllTasks() {
    let allTasks = [];
    const sources = [
      { id: 'informatics', data: window.LessonsInformatics || [] },
      { id: 'math', data: window.LessonsMath || [] },
      { id: 'russian', data: window.LessonsRussian || [] }
    ];
    sources.forEach(sub => {
      sub.data.forEach(lesson => {
        if(lesson.tasks) {
          lesson.tasks.forEach(task => {
            allTasks.push({
              subject: sub.id,
              taskNum: lesson.egeNumber,
              ...task
            });
          });
        }
      });
    });
    return allTasks;
  },

  startMiniExam() {
    let allTasks = this.getAllTasks();
    
    // Shuffle and pick 10
    allTasks = allTasks.sort(() => 0.5 - Math.random());
    const examQuestions = allTasks.slice(0, 10);
    
    if (examQuestions.length === 0) {
       app.showNotification('Нет доступных задач для экзамена', 'error');
       return;
    }

    this.activeSession = {
      type: 'exam',
      questions: examQuestions,
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
      if (tEl) {
         tEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
         if (this.activeSession.timeRemaining <= 60) {
            tEl.style.animation = 'pulse 1s infinite';
         }
      }
      
      if (this.activeSession.timeRemaining <= 0) {
        clearInterval(this.activeSession.timerInt);
        this.finishExam();
      }
    }, 1000);
  },

  renderExamInterface() {
    const container = document.getElementById('trainer-container');
    const q = this.activeSession.questions[this.activeSession.currentIndex];
    
    // Subject labels
    const subMap = { 'informatics': 'Информатика', 'math': 'Математика', 'russian': 'Русский язык' };

    container.innerHTML = `
      <style>@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }</style>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="color: #f8fafc; margin: 0;">Мини-экзамен (${this.activeSession.currentIndex + 1}/${this.activeSession.questions.length})</h3>
        <div style="background: #ef4444; color: white; padding: 6px 12px; border-radius: 16px; font-weight: bold; font-family: monospace; font-size: 16px; box-shadow: 0 0 10px rgba(239,68,68,0.5);" id="mini-exam-timer">10:00</div>
      </div>
      <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <div style="color: #94a3b8; font-size: 12px; margin-bottom: 12px; text-transform: uppercase;">${subMap[q.subject]} • ${q.taskNum} • <span style="color:${q.difficulty==='hard'?'#ef4444':q.difficulty==='medium'?'#f59e0b':'#10b981'}">${q.difficulty}</span></div>
        <div style="color: #f8fafc; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">${q.question}</div>
        <input type="text" id="exam-answer" placeholder="Введите ответ..." style="width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #334155; color: #f8fafc; padding: 12px; border-radius: 8px; font-size: 16px; margin-bottom: 20px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#334155'" onkeypress="if(event.key === 'Enter') practiceSystem.submitExamAnswer()">
        <button onclick="practiceSystem.submitExamAnswer()" style="width: 100%; background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">Ответить</button>
      </div>
      <button onclick="clearInterval(practiceSystem.activeSession.timerInt); practiceSystem.render()" style="background: none; border: none; color: #94a3b8; cursor: pointer; text-decoration: underline;">Прервать экзамен (Прогресс не сохранится)</button>
    `;
    setTimeout(() => {
      const inp = document.getElementById('exam-answer');
      if (inp) inp.focus();
    }, 50);
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
        topic: q.taskNum,
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
    
    let message = "";
    let color = "#10b981";
    if(pct === 100) { message = "Идеально! 100 баллов! 🎉"; }
    else if(pct >= 80) { message = "Отличный результат! 🚀"; }
    else if(pct >= 50) { message = "Неплохо, но есть над чем работать. 📈"; color = "#f59e0b"; }
    else { message = "Слабо. Нужно больше тренироваться. 💔"; color = "#ef4444"; }

    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; background: #1e293b; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <i class="fas fa-flag-checkered" style="font-size: 48px; color: ${color}; margin-bottom: 16px;"></i>
        <h2 style="color: #f8fafc; margin-top: 0;">Экзамен завершен!</h2>
        <div style="font-size: 48px; font-weight: bold; color: ${color}; margin-bottom: 10px; text-shadow: 0 0 10px ${color}40;">
          ${score} / ${total}
        </div>
        <p style="color: #f1f5f9; font-size: 18px; margin-bottom: 24px;">${message}</p>
        <button onclick="practiceSystem.render()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">Вернуться к тренировкам</button>
      </div>
    `;
  },

  startTraining(subject, lessonIdx) {
    let sourceData = [];
    if(subject === 'informatics') sourceData = window.LessonsInformatics;
    if(subject === 'math') sourceData = window.LessonsMath;
    if(subject === 'russian') sourceData = window.LessonsRussian;

    const lesson = sourceData[lessonIdx];
    if (!lesson || !lesson.tasks || lesson.tasks.length === 0) {
      app.showNotification('Задания пока не добавлены.', 'info');
      return;
    }
    
    // Copy tasks and shuffle them for practice
    const tasks = [...lesson.tasks].sort(() => 0.5 - Math.random());
    this.activeSession = {
      type: 'training', subject, taskNumber: lesson.egeNumber, tasks, currentIndex: 0
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
      <div style="background: #1e293b; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
          <span style="color: #94a3b8; font-size: 14px; text-transform: uppercase;">${this.activeSession.subject} • ${this.activeSession.taskNumber} • <span style="color:${q.difficulty==='hard'?'#ef4444':q.difficulty==='medium'?'#f59e0b':'#10b981'}">${q.difficulty}</span></span>
          <span style="color: #94a3b8; font-size: 14px; font-weight: bold;">Задача ${this.activeSession.currentIndex + 1}/${this.activeSession.tasks.length}</span>
        </div>
        <div style="color: #f8fafc; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">${q.question}</div>
        
        <div id="training-interactive-area">
          <input type="text" id="training-answer" placeholder="Ваш ответ" style="width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #334155; color: #f8fafc; padding: 12px; border-radius: 8px; font-size: 16px; margin-bottom: 16px; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#334155'" onkeypress="if(event.key === 'Enter') practiceSystem.checkTrainingAnswer()">
          <button onclick="practiceSystem.checkTrainingAnswer()" style="width: 100%; background: #10b981; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">Проверить</button>
        </div>
      </div>
    `;
    setTimeout(() => {
      const inp = document.getElementById('training-answer');
      if (inp) inp.focus();
    }, 50);
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
      const p = StorageManager.getProgress();
      if (p[this.activeSession.subject]) p[this.activeSession.subject].completedTasks++;
      StorageManager.saveProgress(p);
      StorageManager.addDailyLog({ subject: this.activeSession.subject, minutes: 2, tasks: 1, type: 'practice' });
    } else {
      StorageManager.saveError({
        subject: this.activeSession.subject, topic: this.activeSession.taskNumber,
        question: q.question, correctAnswer: q.answer, userAnswer: input.value.trim(), explanation: q.explanation
      });
    }
    
    let html = `
      <div style="padding: 16px; border-radius: 8px; background: ${isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; border: 1px solid ${isCorrect ? '#10b981' : '#ef4444'}; margin-bottom: 16px;">
        <h4 style="color: ${isCorrect ? '#10b981' : '#ef4444'}; margin-top: 0; margin-bottom: 8px; font-size: 18px;">
          ${isCorrect ? '<i class="fas fa-check-circle"></i> Абсолютно верно!' : '<i class="fas fa-times-circle"></i> Увы, ошибка'}
        </h4>
        <p style="color: #f1f5f9; font-size: 15px; margin-bottom: 12px;">Правильный ответ: <strong>${q.answer}</strong></p>
        <div style="color: #94a3b8; font-size: 14px; border-top: 1px solid #334155; padding-top: 12px; line-height: 1.5;">
          <strong>Почему так?</strong><br>${q.explanation}
        </div>
      </div>
    `;
    
    if (this.activeSession.currentIndex < this.activeSession.tasks.length - 1) {
      if (isCorrect) {
        html += `<button onclick="practiceSystem.nextTrainingTask()" style="width: 100%; background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">Следующая задача <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i></button>`;
      } else {
        html += `<button onclick="practiceSystem.nextTrainingTask()" style="width: 100%; background: #f59e0b; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d97706'" onmouseout="this.style.background='#f59e0b'">Попробовать аналогичную задачу <i class="fa-solid fa-redo" style="margin-left: 8px;"></i></button>`;
      }
    } else {
      html += `<button onclick="practiceSystem.render()" style="width: 100%; background: #10b981; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Завершить тренировку</button>`;
    }
    
    area.innerHTML = html;
  },
  
  nextTrainingTask() {
    this.activeSession.currentIndex++;
    this.renderTrainingTask();
  }
};
