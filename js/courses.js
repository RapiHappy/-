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
      card.className = 'premium-course-card';
      card.onclick = () => { window.location.hash = `course-detail/${course.id}`; };
      
      const totalLessons = course.modules ? course.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 0;
      
      card.innerHTML = `
        <div class="cover">
          ${course.icon || '📚'}
        </div>
        <div class="content">
          <span class="badge" style="background: rgba(59, 130, 246, 0.1); color: var(--accent-primary);">${course.subject}</span>
          <h3>${course.title}</h3>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">${course.level}</p>
          <div style="margin-top: auto;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">
              <span>Прогресс</span>
              <span>0 / ${totalLessons} уроков</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(0,0,0,0.2); border-radius: 3px; overflow: hidden;">
              <div style="width: 0%; height: 100%; background: var(--accent-primary);"></div>
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
    
    const lp = StorageManager.getLessonProgress() || {};
    
    const timeline = document.createElement('div');
    timeline.className = 'curriculum-timeline';
    
    course.modules.forEach(mod => {
      const modEl = document.createElement('div');
      modEl.className = 'timeline-module';
      
      const modTitle = document.createElement('div');
      modTitle.className = 'timeline-module-title';
      modTitle.textContent = mod.title;
      modEl.appendChild(modTitle);
      
      mod.lessons.forEach(lesson => {
        const isCompleted = lp[lesson.id] && lp[lesson.id].completed;
        const lessonEl = document.createElement('div');
        lessonEl.className = `timeline-lesson ${isCompleted ? 'completed' : ''}`;
        lessonEl.onclick = () => { window.location.hash = `lesson/${lesson.id}`; };
        
        lessonEl.innerHTML = `
          <div class="timeline-lesson-info">
            <h4>${lesson.title}</h4>
            <div class="timeline-lesson-meta">
              <span><i class="fas fa-play-circle"></i> Видео и теория</span>
              <span><i class="fas fa-dumbbell"></i> Практика</span>
            </div>
          </div>
          <div style="color: ${isCompleted ? 'var(--color-green)' : 'var(--text-muted)'}; font-size: 20px;">
            <i class="fas ${isCompleted ? 'fa-check-circle' : 'fa-chevron-right'}"></i>
          </div>
        `;
        modEl.appendChild(lessonEl);
      });
      
      timeline.appendChild(modEl);
    });
    
    modulesList.appendChild(timeline);
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
    
    const container = document.getElementById('lesson-container');
    if (!container) return;

    if (!lessonData) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #ef4444; margin-bottom: 16px;"></i>
          <h2 style="color: #f8fafc; margin-bottom: 12px;">Урок не найден</h2>
          <p style="color: #94a3b8; margin-bottom: 24px;">Возможно, этот урок был удален или вы перешли по устаревшей ссылке.</p>
          <button class="btn btn-primary" onclick="app.navigateTo('dashboard'); setTimeout(() => { if(confirm('Сбросить устаревший кэш расписания?')) { localStorage.removeItem('daily_plan_date'); localStorage.removeItem('daily_plan_tasks'); location.reload(); } }, 500)">
            Вернуться на главную и сбросить кэш
          </button>
        </div>
      `;
      return;
    }
    
    // Reset answers for new lesson
    this.currentQuizAnswers = {};
    
    let html = `
      <h2 style="color: #f8fafc; margin-bottom: 24px; font-size: 28px;">${lessonData.title}</h2>
    `;
    
    // 1. Video Section
    if (hasVideo) {
      html += `
        <div id="lesson-section-video" class="lesson-section" style="margin-bottom: 40px;">
          <div class="section-title"><i class="fas fa-play-circle"></i> Видеоурок</div>
          <div class="cinematic-player-container">
            <iframe src="${lessonData.videoUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      `;
    }
    
    // Theory
    if (lessonData.theory) {
      html += `
        <div id="lesson-section-theory" style="background: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid #334155; line-height: 1.6; color: #cbd5e1;">
          <h3 style="color: #f8fafc; margin-bottom: 16px;"><i class="fas fa-book" style="color: #10b981;"></i> Теория</h3>
          ${lessonData.theory}
        </div>
      `;
    }
    
    // Practice Blocks (Warmup, Base, Advanced, Control)
    if (lessonData.practice) {
      const renderPracticeBlock = (tasks, title, icon, color) => {
        if (!tasks || tasks.length === 0) return '';
        let blockHtml = `
          <div style="background: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid #334155;">
            <h3 style="color: #f8fafc; margin-bottom: 16px;"><i class="fas ${icon}" style="color: ${color};"></i> ${title}</h3>
            <div class="tasks-list">
        `;
        tasks.forEach((t, i) => {
           blockHtml += `
             <div class="practice-task" id="task-container-${t.id}" style="background: #0f172a; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
               <div style="font-weight: 500; color: #f8fafc; margin-bottom: 8px;">Задача ${i+1}</div>
               <p style="color: #94a3b8; margin-bottom: 16px;">${t.question}</p>
               <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                 <input type="text" id="input-${t.id}" placeholder="Ваш ответ..." style="flex:1; background: #1e293b; border: 1px solid #334155; color: #f8fafc; padding: 10px 14px; border-radius: 8px; outline: none;">
                 <button class="btn btn-primary" onclick="coursesSystem.checkLessonTask('${t.id}', '${t.answer}', '${t.explanation}')" style="padding: 10px 20px;">Ответить</button>
               </div>
               <div id="feedback-${t.id}" style="display:none; padding: 12px; border-radius: 8px; margin-top: 12px;"></div>
             </div>
           `;
        });
        blockHtml += `</div></div>`;
        return blockHtml;
      };

      html += renderPracticeBlock(lessonData.practice.warmup, 'Разминка', 'fa-running', '#f59e0b');
      html += renderPracticeBlock(lessonData.practice.base, 'Основа (Типовые задачи)', 'fa-dumbbell', '#3b82f6');
      html += renderPracticeBlock(lessonData.practice.advanced, 'Продвинутый уровень', 'fa-fire', '#ef4444');
      html += renderPracticeBlock(lessonData.practice.control, 'Экзаменационный контроль (Без подсказок)', 'fa-graduation-cap', '#8b5cf6');
    }

    // Quiz
    if (lessonData.quiz && lessonData.quiz.length > 0) {
      html += `
        <div id="lesson-section-quiz" style="background: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid #334155;">
          <h3 style="color: #f8fafc; margin-bottom: 16px;"><i class="fas fa-question-circle" style="color: #8b5cf6;"></i> Проверочный тест (Минимум 80% для прохождения)</h3>
          <div id="quiz-container-${lessonId}">
      `;
      lessonData.quiz.forEach((q, idx) => {
        html += `
          <div class="quiz-question" style="margin-bottom: 24px;">
            <p style="color: #f8fafc; font-weight: 500; margin-bottom: 12px;">${idx + 1}. ${q.question}</p>
            <div class="options" style="display: flex; flex-direction: column; gap: 8px;">
        `;
        q.options.forEach((opt, optIdx) => {
          html += `
            <label class="quiz-option" style="display: flex; align-items: center; gap: 12px; background: #0f172a; padding: 12px 16px; border-radius: 8px; cursor: pointer; border: 1px solid transparent;">
              <input type="radio" name="quiz-${lessonId}-${idx}" value="${optIdx}" onchange="coursesSystem.selectQuizOption('${lessonId}', ${idx}, ${optIdx})" style="accent-color: #3b82f6; width: 16px; height: 16px;">
              <span style="color: #cbd5e1;">${opt}</span>
            </label>
          `;
        });
        html += `
            </div>
            <div id="quiz-explanation-${lessonId}-${idx}" style="display:none; margin-top: 12px; padding: 12px; border-radius: 8px; background: rgba(59,130,246,0.1); color: #94a3b8; font-size: 14px;"></div>
          </div>
        `;
      });
      html += `
          </div>
          <button class="btn btn-primary" onclick="coursesSystem.checkQuiz('${lessonId}')" style="width: 100%;">Проверить тест</button>
          <div id="quiz-result-${lessonId}" style="margin-top: 16px; font-weight: bold; text-align: center;"></div>
        </div>
      `;
    }
    
    // Completion status & Next button
    const isCompleted = StorageManager.getLessonProgress()[lessonId]?.completed;
    html += `
      <div id="lesson-complete-banner-${lessonId}" style="display:${isCompleted ? 'block' : 'none'}; width: 100%; background: #10b981; color: #fff; text-align: center; padding: 14px; border-radius: 8px; font-weight: 500; font-size: 16px; margin-bottom: 16px;">
        ✓ Урок пройден
      </div>
      <button id="lesson-next-stage-btn-${lessonId}" onclick="coursesSystem.goToNextLesson('${lessonId}')" style="display:${isCompleted ? 'block' : 'none'}; width: 100%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff; border: none; padding: 16px; border-radius: 12px; cursor: pointer; font-weight: bold; font-size: 18px; margin-bottom: 24px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);">
        Следующий урок 🚀
      </button>
    `;
    
    container.innerHTML = html;

    // Make sidebar TOC sticky highlighting (optional feature, but nice to have)
    const tocItems = document.querySelectorAll('#lesson-toc li');
    if (tocItems.length > 0) {
      tocItems.forEach(item => {
        item.addEventListener('click', function() {
           tocItems.forEach(i => i.classList.remove('active'));
           this.classList.add('active');
        });
      });
    }
  },

  goToNextLesson(currentLessonId) {
    // If running in planner context, advance the planner
    if (plannerSystem.tasks && plannerSystem.tasks.length > 0) {
       const firstIncompleteIdx = plannerSystem.tasks.findIndex(t => !t.completed);
       if (firstIncompleteIdx !== -1 && plannerSystem.tasks[firstIncompleteIdx].lessonId === currentLessonId) {
           plannerSystem.markCurrentTaskCompleted();
           return;
       }
    }

    // Otherwise, just find the next lesson in the same module
    let foundCurrent = false;
    let nextLessonId = null;

    for (const course of AppData.courses) {
      if (!course.modules) continue;
      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
           if (foundCurrent) {
             nextLessonId = lesson.id;
             break;
           }
           if (lesson.id === currentLessonId) {
             foundCurrent = true;
           }
        }
        if (nextLessonId) break;
      }
      if (nextLessonId) break;
    }

    if (nextLessonId) {
      window.location.hash = `lesson/${nextLessonId}`;
    } else {
      app.showNotification('Это был последний урок в курсе!', 'success');
      app.navigateTo('courses');
    }
  },
  
  checkLessonTask(taskId, correctAnswer, explanation) {
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
    }
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

  checkQuiz(lessonId) {
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
      const explanationEl = document.getElementById(`quiz-explanation-${lessonId}-${qi}`);
      
      if (selected === q.correctIndex) {
        correct++;
        explanationEl.innerHTML = `<span style="color:#10b981; font-weight:bold;">✅ Верно!</span> ${q.explanation || ''}`;
        explanationEl.style.background = 'rgba(16, 185, 129, 0.1)';
        explanationEl.style.color = '#10b981';
      } else {
        const correctText = q.options[q.correctIndex];
        explanationEl.innerHTML = `<span style="color:#ef4444; font-weight:bold;">❌ Ошибка.</span> Правильный ответ: ${correctText}. ${q.explanation || ''}`;
        explanationEl.style.background = 'rgba(239, 68, 68, 0.1)';
        explanationEl.style.color = '#ef4444';
      }
      explanationEl.style.display = 'block';
    });

    const percentage = Math.round((correct / total) * 100);
    const resultEl = document.getElementById(`quiz-result-${lessonId}`);
    
    if (percentage >= 80) {
      resultEl.innerHTML = `<span style="color:#10b981;">Тест успешно пройден! Результат: ${percentage}%</span>`;
      this.markCompleted(lessonId);
      
      const banner = document.getElementById(`lesson-complete-banner-${lessonId}`);
      const btn = document.getElementById(`lesson-next-stage-btn-${lessonId}`);
      if (banner) banner.style.display = 'block';
      if (btn) btn.style.display = 'block';
      
      let failedLessons = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
      failedLessons = failedLessons.filter(id => id !== lessonId);
      localStorage.setItem('failed_lessons', JSON.stringify(failedLessons));

    } else {
      resultEl.innerHTML = `<span style="color:#ef4444;">Тест не пройден. Результат: ${percentage}%. (Минимум 80%)</span>`;
      app.showNotification('Тема перенесена на завтра.', 'error');
      
      let failedLessons = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
      if (!failedLessons.includes(lessonId)) {
        failedLessons.push(lessonId);
        localStorage.setItem('failed_lessons', JSON.stringify(failedLessons));
      }
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
    const nextBtn = document.getElementById(`lesson-next-stage-btn-${lessonId}`);
    if (banner) banner.style.display = 'block';
    if (nextBtn) nextBtn.style.display = 'block';
    
    app.showNotification('Урок пройден! Прогресс сохранен.', 'success');
  }
};
