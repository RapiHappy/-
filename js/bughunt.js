// Automated Bug Hunt for EGE Master 2026
// Run by adding ?bughunt=1 to the URL

if (window.location.search.includes('bughunt=1')) {
  console.log('=== ЗАПУСК АВТОМАТИЗИРОВАННОГО BUG HUNT ===');
  
  setTimeout(async () => {
    try {
      const results = [];
      
      const assert = (condition, msg) => {
        if (condition) {
          console.log(`✅ УСПЕХ: ${msg}`);
          results.push({status: 'PASS', msg});
        } else {
          console.error(`❌ ОШИБКА: ${msg}`);
          results.push({status: 'FAIL', msg});
        }
      };

      // 1. Очистка кэша
      localStorage.clear();
      app.init();
      assert(localStorage.length > 0, "Локальное хранилище инициализировано");

      // 2. Тестирование AI-ментора (Burnout rule)
      StorageManager.addDailyLog({date: new Date().toISOString().split('T')[0], totalMinutes: 300}); // 5 часов
      mentorSystem.render();
      let mentorText = document.getElementById('advisor-recommendation').innerText;
      assert(mentorText.includes('выгорание'), "AI-ментор корректно определяет переутомление (выгорание)");

      // 3. Тестирование генерации плана (Воскресенье)
      const oldGetDay = Date.prototype.getDay;
      Date.prototype.getDay = function() { return 0; }; // Мокируем воскресенье
      plannerSystem.generatePlan();
      assert(plannerSystem.tasks.length === 1 && plannerSystem.tasks[0].id === 'plan-rest-sunday', "План на воскресенье генерирует только отдых");
      
      // 4. Тестирование генерации плана (Будний день)
      Date.prototype.getDay = function() { return 1; }; // Понедельник
      plannerSystem.generatePlan();
      assert(plannerSystem.tasks.length > 3, "План на будний день содержит уроки и отдых");
      Date.prototype.getDay = oldGetDay;

      // 5. Тестирование прохождения урока (Провал - менее 80%)
      window.location.hash = 'lesson/math-lesson-1';
      await new Promise(r => setTimeout(r, 500));
      
      // Отвечаем только на первый вопрос правильно (correctIndex: 1 для quiz[0] в math-1), остальные неверно (выбираем 0)
      coursesSystem.selectQuizOption('math-lesson-1', 0, 1);
      coursesSystem.selectQuizOption('math-lesson-1', 1, 0); // неверно
      coursesSystem.selectQuizOption('math-lesson-1', 2, 0); // неверно
      coursesSystem.selectQuizOption('math-lesson-1', 3, 0); // неверно
      coursesSystem.selectQuizOption('math-lesson-1', 4, 0); // неверно
      
      coursesSystem.submitQuiz('math-lesson-1');
      await new Promise(r => setTimeout(r, 500));
      
      let failed = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
      assert(failed.includes('math-lesson-1'), "Урок с результатом < 80% добавлен в failed_lessons");
      
      plannerSystem.generatePlan();
      assert(plannerSystem.tasks[0].id === 'plan-repeat', "Проваленный урок добавлен в план на повторение");

      // 6. Тестирование прохождения урока (Успех - 100%)
      window.location.hash = 'lesson/rus-lesson-1';
      await new Promise(r => setTimeout(r, 500));
      
      // Правильные ответы для rus-lesson-1: 2, 2, 1, 1, 0 (correctIndex)
      coursesSystem.selectQuizOption('rus-lesson-1', 0, 2);
      coursesSystem.selectQuizOption('rus-lesson-1', 1, 2);
      coursesSystem.selectQuizOption('rus-lesson-1', 2, 1);
      coursesSystem.selectQuizOption('rus-lesson-1', 3, 1);
      coursesSystem.selectQuizOption('rus-lesson-1', 4, 0);
      
      coursesSystem.submitQuiz('rus-lesson-1');
      await new Promise(r => setTimeout(r, 500));
      
      let completed = JSON.parse(localStorage.getItem('completed_lessons_russian') || '[]');
      assert(completed.includes('rus-lesson-1'), "Урок с результатом >= 80% добавлен в completed_lessons");
      
      // 7. Тестирование мини-экзамена
      window.location.hash = 'trainer';
      await new Promise(r => setTimeout(r, 500));
      practiceSystem.startMiniExam();
      await new Promise(r => setTimeout(r, 200));
      assert(practiceSystem.activeSession !== null && practiceSystem.activeSession.type === 'exam', "Мини-экзамен успешно запущен");
      practiceSystem.submitExamAnswer(); // пустое поле, должно проигнорировать
      assert(practiceSystem.activeSession.currentIndex === 0, "Пустой ответ игнорируется");
      
      let inp = document.getElementById('exam-answer');
      if (inp) {
         inp.value = "неверный ответ";
         practiceSystem.submitExamAnswer();
         assert(practiceSystem.activeSession.currentIndex === 1, "Ответ принят, переход к следующему вопросу");
      }

      console.log('=== BUG HUNT ЗАВЕРШЕН ===');
      console.log(results);
      
      document.body.innerHTML = '<div style="padding: 20px; font-family: monospace; font-size: 16px; background:#fff; color:#000;"><h1>Результаты Audit Bug Hunt:</h1>' + 
        results.map(r => `<div style="color: ${r.status==='PASS'?'green':'red'}">${r.status}: ${r.msg}</div>`).join('') + '</div>';

    } catch (e) {
      console.error(e);
      document.body.innerHTML = `<h1 style="color:red; background:#fff;">КРИТИЧЕСКАЯ ОШИБКА ТЕСТА: ${e.message}</h1><pre>${e.stack}</pre>`;
    }
  }, 1500);
}
