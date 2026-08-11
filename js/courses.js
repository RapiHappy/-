window.coursesSystem = {
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
    // Search via AppData helper first, fall back to nested search
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
    if (lessonData.videoEmbed) {
      html += `
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 24px; border-radius: 12px;">
          <iframe src="${lessonData.videoEmbed}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
        </div>
      `;
      // Video timecodes
      if (lessonData.videoTimecodes && lessonData.videoTimecodes.length) {
        html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">';
        lessonData.videoTimecodes.forEach(tc => {
          html += `<span style="background:#334155;color:#94a3b8;padding:4px 10px;border-radius:6px;font-size:12px;">${tc.time} — ${tc.label}</span>`;
        });
        html += '</div>';
      }
    }
    
    // Theory
    if (lessonData.theory) {
      html += `
        <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 24px; color: #cbd5e1; line-height: 1.6; font-size: 14px;">
          <h3 style="color: #f8fafc; margin-top: 0; margin-bottom: 12px; font-size: 16px;">Теория</h3>
          ${lessonData.theory}
          <div style="margin-top: 16px;">
            <button onclick="coursesSystem.showSimplerExplanation('${lessonData.id}')" style="background: #334155; color: #f8fafc; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 12px;">
              🤔 Не понял(а)
            </button>
            <div id="simple-explanation-${lessonData.id}" style="display: none; margin-top: 12px; padding: 12px; background: #0f172a; border-left: 3px solid #3b82f6; border-radius: 4px;"></div>
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

    // Quiz
    if (lessonData.quiz && lessonData.quiz.length > 0) {
      html += '<div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 24px;">';
      html += '<h3 style="color: #f8fafc; margin-top: 0; margin-bottom: 16px; font-size: 16px;">Тест</h3>';
      lessonData.quiz.forEach((q, qi) => {
        html += `<div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #334155;">`;
        html += `<p style="color: #cbd5e1; font-size: 14px; margin-bottom: 10px;">${qi+1}. ${q.question}</p>`;
        (q.options || []).forEach((opt, oi) => {
          html += `<button onclick="coursesSystem.checkQuiz('${lessonData.id}', ${qi}, ${oi}, ${q.correctIndex})" 
            style="display:block;width:100%;text-align:left;background:#0f172a;border:1px solid #334155;color:#cbd5e1;padding:10px 14px;border-radius:6px;margin-bottom:6px;cursor:pointer;font-size:13px;" 
            id="quiz-${lessonData.id}-${qi}-${oi}">${opt}</button>`;
        });
        html += `<div id="quiz-feedback-${lessonData.id}-${qi}" style="font-size:13px;margin-top:6px;"></div>`;
        html += '</div>';
      });
      html += '</div>';
    }
    
    // Completion and Link
    const isCompleted = StorageManager.getLessonProgress()[lessonId]?.completed;
    html += `
      <button id="btn-complete-${lessonId}" onclick="coursesSystem.markCompleted('${lessonId}')" style="width: 100%; background: ${isCompleted ? '#10b981' : '#334155'}; color: #fff; border: none; padding: 14px; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 16px; margin-bottom: 16px;">
        ${isCompleted ? '✓ Урок пройден' : 'Отметить как пройденный'}
      </button>
      
      <div style="text-align: center;">
        <a href="${lessonData.stepikUrl || '#'}" target="_blank" style="color: #94a3b8; font-size: 12px; text-decoration: underline;">Подробнее на Stepik (доп. материалы)</a>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  showSimplerExplanation(lessonId) {
    const el = document.getElementById(`simple-explanation-${lessonId}`);
    if (!el) return;
    const lesson = AppData.findLesson ? AppData.findLesson(lessonId) : null;
    const text = lesson && lesson.simpleExplanation 
      ? lesson.simpleExplanation 
      : 'Попробуй перечитать теорию медленнее или посмотри видео ещё раз.';
    el.style.display = 'block';
    el.innerHTML = `<p style="margin:0;color:#cbd5e1;">${text}</p>`;
  },
  
  checkQuiz(lessonId, questionIdx, selectedIdx, correctIdx) {
    const feedbackEl = document.getElementById(`quiz-feedback-${lessonId}-${questionIdx}`);
    if (selectedIdx === correctIdx) {
      if (feedbackEl) feedbackEl.innerHTML = '<span style="color:#10b981;">✅ Верно!</span>';
    } else {
      if (feedbackEl) feedbackEl.innerHTML = '<span style="color:#ef4444;">❌ Неверно. Попробуй ещё раз.</span>';
    }
  },
  
  checkLessonTask(lessonId, correctAnswer) {
    const input = document.getElementById(`lesson-task-input-${lessonId}`);
    const feedback = document.getElementById(`lesson-task-feedback-${lessonId}`);
    if (!input || !feedback) return;
    
    const userVal = input.value.trim().toLowerCase();
    const correctVal = correctAnswer.trim().toLowerCase();
    
    if (userVal === correctVal) {
      feedback.innerHTML = '<span style="color: #10b981;"><i class="fas fa-check"></i> Верно! Отличная работа.</span>';
      this.markCompleted(lessonId);
    } else {
      feedback.innerHTML = '<span style="color: #ef4444;"><i class="fas fa-times"></i> Неверно. Попробуйте еще раз.</span>';
    }
  },
  
  markCompleted(lessonId) {
    StorageManager.saveLessonProgress(lessonId, { completed: true });
    const btn = document.getElementById(`btn-complete-${lessonId}`);
    if (btn) {
      btn.style.background = '#10b981';
      btn.textContent = '✓ Урок пройден';
    }
    app.showNotification('Урок пройден! Прогресс сохранен.', 'success');
  }
};
