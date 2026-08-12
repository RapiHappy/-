window.coursesSystem = {
  currentActiveRecallAnswers: {},

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
      card.className = 'premium-course-card';
      card.onclick = () => { window.location.hash = `course-detail/${course.id}`; };
      
      let totalLessons = 0;
      course.phases.forEach(p => p.topics.forEach(t => totalLessons += t.lessons.length));
      
      const completed = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
      let courseCompleted = 0;
      course.phases.forEach(p => p.topics.forEach(t => t.lessons.forEach(l => {
        if (completed.includes(l.id)) courseCompleted++;
      })));

      const pct = totalLessons > 0 ? Math.round((courseCompleted / totalLessons) * 100) : 0;

      card.innerHTML = `
        <div class="cover">
          ${course.icon || '📚'}
        </div>
        <div class="content">
          <span class="badge" style="background: rgba(59, 130, 246, 0.1); color: var(--accent-primary);">${course.title}</span>
          <h3 style="margin: 10px 0;">${course.title}</h3>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Макро-курс</p>
          <div style="margin-top: auto;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">
              <span>Прогресс</span>
              <span>${courseCompleted} / ${totalLessons} уроков</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(0,0,0,0.2); border-radius: 3px; overflow: hidden;">
              <div style="width: ${pct}%; height: 100%; background: var(--accent-primary);"></div>
            </div>
          </div>
        </div>
      `;
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
    
    const completed = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    
    const timeline = document.createElement('div');
    timeline.className = 'curriculum-timeline';
    
    course.phases.forEach(phase => {
      const phaseEl = document.createElement('div');
      phaseEl.className = 'timeline-module';
      
      const phaseTitle = document.createElement('div');
      phaseTitle.className = 'timeline-module-title';
      phaseTitle.innerHTML = `<i class="fas fa-layer-group"></i> Этап: ${phase.title}`;
      phaseTitle.style.color = 'var(--accent-primary)';
      phaseTitle.style.marginBottom = '20px';
      phaseEl.appendChild(phaseTitle);
      
      phase.topics.forEach(topic => {
        const topicTitle = document.createElement('h3');
        topicTitle.style.cssText = 'color: #f8fafc; font-size: 16px; margin: 0 0 12px 16px;';
        topicTitle.textContent = topic.title;
        phaseEl.appendChild(topicTitle);

        topic.lessons.forEach((lesson, index) => {
          const isCompleted = completed.includes(lesson.id);
          const lessonEl = document.createElement('div');
          lessonEl.className = `timeline-lesson ${isCompleted ? 'completed' : ''}`;
          lessonEl.onclick = () => { window.location.hash = `lesson/${lesson.id}`; };
          
          lessonEl.innerHTML = `
            <div class="timeline-lesson-info">
              <h4>${index + 1}. ${lesson.title}</h4>
              <div class="timeline-lesson-meta">
                <span><i class="fas fa-clock"></i> ${lesson.durationMins || 45} мин</span>
                ${lesson.videoUrl ? '<span><i class="fas fa-video"></i> Видео</span>' : ''}
              </div>
            </div>
            <div style="color: ${isCompleted ? 'var(--color-green)' : 'var(--text-muted)'}; font-size: 20px;">
              <i class="fas ${isCompleted ? 'fa-check-circle' : 'fa-chevron-right'}"></i>
            </div>
          `;
          phaseEl.appendChild(lessonEl);
        });
      });
      
      timeline.appendChild(phaseEl);
    });
    
    modulesList.appendChild(timeline);
  },
  
  openLesson(lessonId) {
    const lessonData = AppData.findLesson ? AppData.findLesson(lessonId) : null;
    const container = document.getElementById('lesson-container');
    if (!container) return;

    if (!lessonData) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <h2 style="color: #f8fafc; margin-bottom: 12px;">Урок не найден</h2>
          <button class="btn btn-primary" onclick="app.navigateTo('dashboard')">На главную</button>
        </div>
      `;
      return;
    }
    
    this.currentActiveRecallAnswers = {};
    
    let html = `
      <div style="margin-bottom: 24px;">
        <div style="color: var(--accent-primary); font-size: 14px; font-weight: bold; margin-bottom: 8px;">${lessonData.topicTitle} (Занятие ${lessonData.lessonIndex} из ${lessonData.totalLessons})</div>
        <h2 style="color: #f8fafc; font-size: 28px;">${lessonData.title}</h2>
      </div>
    `;

    // 1. Goal
    if (lessonData.goal) {
       html += `
         <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--accent-primary); padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
           <strong style="color: var(--accent-primary);">🎯 Цель занятия:</strong> <span style="color: #f8fafc;">${lessonData.goal}</span>
         </div>
       `;
    }

    // 2. Explanation
    if (lessonData.explanation) {
       html += `
         <div style="background: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #334155; line-height: 1.6; color: #cbd5e1;">
           <h3 style="color: #f8fafc; margin-bottom: 12px;"><i class="fas fa-book-open" style="color: #10b981;"></i> Теория</h3>
           ${lessonData.explanation}
         </div>
       `;
    }

    // 3. Video
    if (lessonData.videoUrl) {
      html += `
        <div style="margin-bottom: 32px;">
          <h3 style="color: #f8fafc; margin-bottom: 16px;"><i class="fas fa-play-circle" style="color: #ef4444;"></i> Видеоразбор</h3>
          <div class="cinematic-player-container">
            <iframe src="${lessonData.videoUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      `;
    }

    // 4. Example
    if (lessonData.example) {
      html += `
         <div style="background: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid #334155; line-height: 1.6; color: #cbd5e1;">
           <h3 style="color: #f8fafc; margin-bottom: 12px;"><i class="fas fa-lightbulb" style="color: #f59e0b;"></i> Пример решения</h3>
           ${lessonData.example}
         </div>
       `;
    }

    // 5. Active Recall
    if (lessonData.activeRecall && lessonData.activeRecall.length > 0) {
      html += `
        <div style="background: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid #334155;">
          <h3 style="color: #f8fafc; margin-bottom: 16px;"><i class="fas fa-brain" style="color: #8b5cf6;"></i> Активное вспоминание</h3>
          <p style="color: #94a3b8; font-size: 13px; margin-bottom: 16px;">Ответьте на эти вопросы про себя, прежде чем переходить к практике.</p>
      `;
      lessonData.activeRecall.forEach((ar, idx) => {
        html += `
          <div style="background: #0f172a; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
            <div style="color: #f8fafc; font-weight: 500; margin-bottom: 12px;">${idx + 1}. ${ar.q}</div>
            <button class="btn" style="background: #334155; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;" onclick="document.getElementById('ar-answer-${lessonId}-${idx}').style.display = 'block'; this.style.display = 'none';">Показать ответ</button>
            <div id="ar-answer-${lessonId}-${idx}" style="display: none; color: #10b981; margin-top: 12px;">✅ ${ar.a}</div>
          </div>
        `;
      });
      html += `</div>`;
    }

    // Render Practice Helper
    const renderPracticeBlock = (tasks, title, icon, color, isControl = false) => {
      if (!tasks || tasks.length === 0) return '';
      let blockHtml = `
        <div style="background: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid ${isControl ? color : '#334155'};">
          <h3 style="color: #f8fafc; margin-bottom: 16px;"><i class="fas ${icon}" style="color: ${color};"></i> ${title}</h3>
          <div class="tasks-list">
      `;
      tasks.forEach((t, i) => {
         blockHtml += `
           <div class="practice-task" id="task-container-${t.id}" style="background: #0f172a; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
             <div style="font-weight: 500; color: #f8fafc; margin-bottom: 8px;">Задача ${i+1}</div>
             <p style="color: #94a3b8; margin-bottom: 16px;">${t.question}</p>
             <div style="display: flex; gap: 12px; margin-bottom: 12px;">
               <input type="text" id="input-${t.id}" placeholder="Ответ..." style="flex:1; background: #1e293b; border: 1px solid #334155; color: #f8fafc; padding: 10px 14px; border-radius: 8px; outline: none;">
               <button class="btn btn-primary" onclick="coursesSystem.checkLessonTask('${t.id}', '${t.answer}', '${t.explanation}', ${isControl})" style="padding: 10px 20px;">Ответить</button>
             </div>
             <div id="feedback-${t.id}" style="display:none; padding: 12px; border-radius: 8px; margin-top: 12px;"></div>
           </div>
         `;
      });
      blockHtml += `</div></div>`;
      return blockHtml;
    };

    // 6, 7, 8: Practice Blocks
    html += renderPracticeBlock(lessonData.easyPractice, 'Лёгкая практика', 'fa-running', '#3b82f6');
    html += renderPracticeBlock(lessonData.mainPractice, 'Основная практика', 'fa-dumbbell', '#f59e0b');
    html += renderPracticeBlock(lessonData.control, 'Контроль', 'fa-graduation-cap', '#ef4444', true);

    // Complete button
    const completedArr = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    const isCompleted = completedArr.includes(lessonId);
    
    html += `
      <div id="lesson-complete-banner-${lessonId}" style="display:${isCompleted ? 'block' : 'none'}; width: 100%; background: #10b981; color: #fff; text-align: center; padding: 14px; border-radius: 8px; font-weight: 500; font-size: 16px; margin-bottom: 16px;">
        ✓ Урок пройден
      </div>
      <button id="lesson-next-stage-btn-${lessonId}" onclick="coursesSystem.markCompleted('${lessonId}')" style="display:${isCompleted ? 'none' : 'block'}; width: 100%; background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none; padding: 16px; border-radius: 12px; cursor: pointer; font-weight: bold; font-size: 18px; margin-bottom: 24px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);">
        Завершить урок 🚀
      </button>
    `;
    
    container.innerHTML = html;
  },

  checkLessonTask(taskId, correctAnswer, explanation, isControl) {
    const inputEl = document.getElementById(`input-${taskId}`);
    const feedbackEl = document.getElementById(`feedback-${taskId}`);
    if (!inputEl || !feedbackEl) return;
    
    const userAnswer = inputEl.value.trim();
    if (!userAnswer) {
      alert('Введите ответ!');
      return;
    }
    
    feedbackEl.style.display = 'block';
    
    if (userAnswer === correctAnswer) {
      feedbackEl.style.background = 'rgba(16, 185, 129, 0.1)';
      feedbackEl.style.color = '#10b981';
      feedbackEl.innerHTML = `<strong>✅ Верно!</strong> <br><span style="color:#94a3b8; font-size: 14px; margin-top: 8px; display:inline-block;">${explanation || ''}</span>`;
    } else {
      feedbackEl.style.background = 'rgba(239, 68, 68, 0.1)';
      feedbackEl.style.color = '#ef4444';
      feedbackEl.innerHTML = `<strong>❌ Ошибка.</strong> <br><span style="color:#94a3b8; font-size: 14px; margin-top: 8px; display:inline-block;">Правильный ответ: ${correctAnswer}. <br>${explanation || ''}</span>`;
      
      if (isControl) {
         // Fail the lesson
         const lessonId = window.location.hash.split('/')[1];
         let failedLessons = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
         if (!failedLessons.includes(lessonId)) {
           failedLessons.push(lessonId);
           localStorage.setItem('failed_lessons', JSON.stringify(failedLessons));
           app.showNotification('Ошибки в блоке Контроль! Тема будет отправлена на повторение.', 'error');
         }
      }
    }
  },
  
  markCompleted(lessonId) {
    let completed = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('completed_lessons', JSON.stringify(completed));
    }
    
    // Remove from failed if it was there
    let failed = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
    failed = failed.filter(id => id !== lessonId);
    localStorage.setItem('failed_lessons', JSON.stringify(failed));

    const banner = document.getElementById(`lesson-complete-banner-${lessonId}`);
    const nextBtn = document.getElementById(`lesson-next-stage-btn-${lessonId}`);
    if (banner) banner.style.display = 'block';
    if (nextBtn) nextBtn.style.display = 'none';
    
    app.showNotification('Урок пройден! Прогресс сохранен.', 'success');
    
    // If in planner, complete task
    if (plannerSystem && plannerSystem.tasks && plannerSystem.tasks.length > 0) {
       const firstIncompleteIdx = plannerSystem.tasks.findIndex(t => !t.completed);
       if (firstIncompleteIdx !== -1 && plannerSystem.tasks[firstIncompleteIdx].lessonId === lessonId) {
           plannerSystem.markCurrentTaskCompleted();
           return;
       }
    }
    
    setTimeout(() => {
      app.navigateTo('dashboard');
    }, 1500);
  }
};
