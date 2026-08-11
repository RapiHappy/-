window.coursesSystem = {
  // Store user's selected answers for the current lesson quiz
  currentQuizAnswers: {},

  loadCourses() {
    const list = document.getElementById('courses-list');
    if (!list) return;
    
    if (typeof AppData === 'undefined' || !AppData.courses) {
      list.innerHTML = '<p style="color:#94a3b8; text-align:center;">Курсы временно недоступны.</p>';
      return;
    }

    list.innerHTML = '';
    
    const courses = AppData.courses;
    courses.forEach(course => {
      const card = document.createElement('div');
      card.className = 'course-card';
      card.style.cssText = `
        background: #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 16px;
        cursor: pointer; transition: transform 0.2s; border: 1px solid #334155;
      `;
      card.onclick = () => { window.location.hash = `course-detail/${course.id}`; };
      
      const header = document.createElement('div');
      header.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-bottom: 12px;';
      header.innerHTML = `
        <div style="font-size: 24px; background: #334155; padding: 10px; border-radius: 8px;">${course.icon || '📚'}</div>
        <div>
          <h3 style="margin: 0; color: #f8fafc; font-size: 16px;">${course.title}</h3>
          <span style="font-size: 12px; color: #94a3b8;">${course.subject} • ${course.level}</span>
        </div>
      `;
      
      const stats = document.createElement('div');
      stats.style.cssText = 'display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8; margin-bottom: 8px;';
      stats.innerHTML = `<span>Уроков: ${course.modules ? course.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 0}</span>`;
      
      card.appendChild(header);
      card.appendChild(stats);
      list.appendChild(card);
    });
  },
  
  openCourse(courseId) {
    const course = AppData.courses.find(c => c.id === courseId);
    if (!course) return;
    
    const titleEl = document.getElementById('course-detail-title');
    const modulesList = document.getElementById('course-modules-list');
    if (!titleEl || !modulesList) return;
    
    titleEl.textContent = course.title;
    modulesList.innerHTML = '';
    
    const lp = StorageManager.getLessonProgress() || {};
    
    course.modules.forEach(mod => {
      const modEl = document.createElement('div');
      modEl.style.cssText = 'margin-bottom: 24px;';
      
      const modTitle = document.createElement('h4');
      modTitle.style.cssText = 'color: #f8fafc; margin-bottom: 12px; font-size: 16px;';
      modTitle.textContent = mod.title;
      modEl.appendChild(modTitle);
      
      mod.lessons.forEach(lesson => {
        const isCompleted = lp[lesson.id] && lp[lesson.id].completed;
        const lessonEl = document.createElement('div');
        lessonEl.style.cssText = `
          background: #1e293b; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px;
          display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; border: 1px solid ${isCompleted ? '#10b981' : '#334155'};
        `;
        lessonEl.onclick = () => { window.location.hash = `lesson/${lesson.id}`; };
        
        lessonEl.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas ${isCompleted ? 'fa-check-circle' : 'fa-play-circle'}" style="color: ${isCompleted ? '#10b981' : '#3b82f6'};"></i>
            <span style="color: #f8fafc; font-size: 14px;">${lesson.title}</span>
          </div>
        `;
        modEl.appendChild(lessonEl);
      });
      
      modulesList.appendChild(modEl);
    });
  },
  
  openLesson(lessonId) {
    let lessonData = AppData.findLesson ? AppData.findLesson(lessonId) : null;
    
    if (!lessonData) {
      for (const course of AppData.courses) {
        if (!course.modules) continue;
        for (const mod of (course.modules || [])) {
          const l = (mod.lessons || []).find(x => x.id === lessonId);
          if (l) { lessonData = l; break; }
        }
        if (lessonData) break;
      }
    }
    
    if (!lessonData) return;
    
    // Reset answers for new lesson
    this.currentQuizAnswers = {};

    const container = document.getElementById('lesson-container');
    if (!container) return;
    
    let html = `
      <div style="margin-bottom: 20px;">
        <button onclick="window.history.back()" style="background: none; border: none; color: #3b82f6; cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 0;">
          <i class="fas fa-arrow-left"></i> Назад
        </button>
      </div>
      <h2 style="color: #f8fafc; margin-bottom: 16px; font-size: 20px;">${lessonData.title}</h2>
    `;
    
    // Video
    if (lessonData.videos || lessonData.videoEmbed) {
      const defaultVideo = lessonData.videos ? lessonData.videos.main : lessonData.videoEmbed;
      html += `
        <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 16px; border-radius: 8px;">
            <iframe id="lesson-video-iframe" src="${defaultVideo}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
          </div>
          `;
      if (lessonData.videos) {
        html += `
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button onclick="document.getElementById('lesson-video-iframe').src='${lessonData.videos.main}'" style="background: #3b82f6; border: none; color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; flex: 1; font-size: 14px; transition: background 0.2s;">
              <i class="fas fa-play-circle"></i> Основное видео
            </button>
            <button onclick="document.getElementById('lesson-video-iframe').src='${lessonData.videos.simple}'" style="background: #ef4444; border: none; color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; flex: 1; font-size: 14px; transition: background 0.2s;">
              <i class="fas fa-question-circle"></i> Не понял
            </button>
            <button onclick="document.getElementById('lesson-video-iframe').src='${lessonData.videos.tasks}'" style="background: #10b981; border: none; color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; flex: 1; font-size: 14px; transition: background 0.2s;">
              <i class="fas fa-tasks"></i> Разбор задач ЕГЭ
            </button>
          </div>
        `;
      }
      html += `</div>`;
    }
    
    // Theory
    if (lessonData.theory) {
      html += `
        <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 24px; color: #cbd5e1; line-height: 1.6; font-size: 14px;">
          <h3 style="color: #f8fafc; margin-top: 0; margin-bottom: 12px; font-size: 16px;">Теория</h3>
          ${lessonData.theory}
          <div style="margin-top: 16px;">
            <div id="simple-explanation-${lessonData.id}" style="display: none; margin-top: 12px; padding: 12px; background: #0f172a; border-left: 3px solid #3b82f6; border-radius: 4px;">
              <p style="margin:0;color:#cbd5e1;">${lessonData.simpleExplanation || 'Попробуй перечитать теорию.'}</p>
            </div>
          </div>
        </div>
      `;
    }
    
    // Interactive Tasks
    if (lessonData.tasks && lessonData.tasks.length > 0) {
      const firstTask = lessonData.tasks[0];
      html += `
        <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
          <h3 style="color: #f8fafc; margin-top: 0; margin-bottom: 12px; font-size: 16px;">Практика (${lessonData.tasks.length} задач)</h3>
          <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 16px;">${firstTask.question}</p>
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <input type="text" id="lesson-task-input-${lessonData.id}" placeholder="Ваш ответ" style="flex: 1; background: #0f172a; border: 1px solid #334155; color: #f8fafc; padding: 10px; border-radius: 6px; outline: none;">
            <button onclick="coursesSystem.checkLessonTask('${lessonData.id}', '${firstTask.answer}')" style="background: #3b82f6; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;">Проверить</button>
          </div>
          <div id="lesson-task-feedback-${lessonData.id}" style="font-size: 14px; min-height: 20px;"></div>
        </div>
      `;
    }

    // Quiz - 80% passing threshold
    if (lessonData.quiz && lessonData.quiz.length > 0) {
      html += '<div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 24px;">';
      html += '<h3 style="color: #f8fafc; margin-top: 0; margin-bottom: 16px; font-size: 16px;">Контрольный тест (минимум 80% для прохождения)</h3>';
      
      lessonData.quiz.forEach((q, qi) => {
        html += `<div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #334155;">`;
        html += `<p style="color: #cbd5e1; font-size: 14px; margin-bottom: 10px;">${qi+1}. ${q.question}</p>`;
        (q.options || []).forEach((opt, oi) => {
          html += `<button onclick="coursesSystem.selectQuizOption('${lessonData.id}', ${qi}, ${oi})" 
            style="display:block;width:100%;text-align:left;background:#0f172a;border:1px solid #334155;color:#cbd5e1;padding:10px 14px;border-radius:6px;margin-bottom:6px;cursor:pointer;font-size:13px;" 
            id="quiz-${lessonData.id}-${qi}-${oi}">${opt}</button>`;
        });
        html += `<div id="quiz-feedback-${lessonData.id}-${qi}" style="font-size:13px;margin-top:6px;"></div>`;
        html += '</div>';
      });
      
      html += `<button onclick="coursesSystem.submitQuiz('${lessonData.id}')" style="width: 100%; background: #3b82f6; color: #fff; border: none; padding: 14px; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 16px; margin-bottom: 16px;">
        Сдать тест
      </button>`;
      html += `<div id="quiz-final-feedback-${lessonData.id}" style="font-weight:bold;text-align:center;font-size:16px;"></div>`;
      html += '</div>';
    }
    
    // Completion status
    const isCompleted = StorageManager.getLessonProgress()[lessonId]?.completed;
    html += `
      <div id="lesson-complete-banner-${lessonId}" style="display:${isCompleted ? 'block' : 'none'}; width: 100%; background: #10b981; color: #fff; text-align: center; padding: 14px; border-radius: 8px; font-weight: 500; font-size: 16px; margin-bottom: 16px;">
        ✓ Урок пройден
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  selectQuizOption(lessonId, questionIdx, selectedIdx) {
    // Save answer
    this.currentQuizAnswers[questionIdx] = selectedIdx;
    
    // Highlight selected
    const buttons = document.querySelectorAll(`[id^="quiz-${lessonId}-${questionIdx}-"]`);
    buttons.forEach(btn => {
      btn.style.background = '#0f172a';
      btn.style.borderColor = '#334155';
    });
    const selectedBtn = document.getElementById(`quiz-${lessonId}-${questionIdx}-${selectedIdx}`);
    if (selectedBtn) {
      selectedBtn.style.background = '#1e3a8a';
      selectedBtn.style.borderColor = '#3b82f6';
    }
  },

  submitQuiz(lessonId) {
    let lessonData = AppData.findLesson ? AppData.findLesson(lessonId) : null;
    if (!lessonData) {
      for (const course of AppData.courses) {
        if (!course.modules) continue;
        for (const mod of (course.modules || [])) {
          const l = (mod.lessons || []).find(x => x.id === lessonId);
          if (l) { lessonData = l; break; }
        }
        if (lessonData) break;
      }
    }

    const total = lessonData.quiz.length;
    let correct = 0;

    lessonData.quiz.forEach((q, qi) => {
      const selected = this.currentQuizAnswers[qi];
      const feedbackEl = document.getElementById(`quiz-feedback-${lessonId}-${qi}`);
      if (selected === q.correctIndex) {
        correct++;
        feedbackEl.innerHTML = '<span style="color:#10b981;">✅ Верно!</span>';
      } else {
        feedbackEl.innerHTML = `<span style="color:#ef4444;">❌ Неверно. (Правильный ответ: ${q.options[q.correctIndex]}). ${q.explanation}</span>`;
      }
    });

    const percentage = Math.round((correct / total) * 100);
    const finalFeedback = document.getElementById(`quiz-final-feedback-${lessonId}`);
    
    if (percentage >= 80) {
      finalFeedback.innerHTML = `<span style="color:#10b981;">Тест пройден! Результат: ${percentage}% (${correct} из ${total})</span>`;
      this.markCompleted(lessonId);
      
      // Remove from failed lessons if it was there
      let failedLessons = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
      failedLessons = failedLessons.filter(id => id !== lessonId);
      localStorage.setItem('failed_lessons', JSON.stringify(failedLessons));

    } else {
      finalFeedback.innerHTML = `<span style="color:#ef4444;">Тест не пройден. Результат: ${percentage}% (${correct} из ${total}). Требуется 80%.</span>`;
      app.showNotification('Меньше 80%. Тема перенесена на завтра. Изучи дополнительное объяснение!', 'error');
      
      // Show simple explanation
      const expEl = document.getElementById(`simple-explanation-${lessonId}`);
      if (expEl) expEl.style.display = 'block';

      // Schedule for tomorrow
      let failedLessons = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
      if (!failedLessons.includes(lessonId)) {
        failedLessons.push(lessonId);
        localStorage.setItem('failed_lessons', JSON.stringify(failedLessons));
      }
    }
  },
  
  checkLessonTask(lessonId, correctAnswer) {
    const input = document.getElementById(`lesson-task-input-${lessonId}`);
    const feedback = document.getElementById(`lesson-task-feedback-${lessonId}`);
    if (!input || !feedback) return;
    
    const userVal = input.value.trim().toLowerCase();
    const correctVal = String(correctAnswer).trim().toLowerCase();
    
    if (userVal === correctVal) {
      feedback.innerHTML = '<span style="color: #10b981;"><i class="fas fa-check"></i> Верно! Можешь переходить к тесту.</span>';
    } else {
      feedback.innerHTML = '<span style="color: #ef4444;"><i class="fas fa-times"></i> Неверно. Попробуйте еще раз.</span>';
    }
  },
  
  markCompleted(lessonId) {
    StorageManager.saveLessonProgress(lessonId, { completed: true });
    
    // Add to completed lessons array for subject
    const lessonData = AppData.findLesson ? AppData.findLesson(lessonId) : null;
    if (lessonData && lessonData.subject) {
      const subKey = `completed_lessons_${lessonData.subject}`;
      let completed = JSON.parse(localStorage.getItem(subKey) || '[]');
      if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        localStorage.setItem(subKey, JSON.stringify(completed));
      }
    }

    const banner = document.getElementById(`lesson-complete-banner-${lessonId}`);
    if (banner) banner.style.display = 'block';
    app.showNotification('Урок пройден! Прогресс сохранен.', 'success');
  }
};
