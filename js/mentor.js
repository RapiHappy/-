window.mentorSystem = {
  render() {
    const el = document.getElementById('advisor-recommendation');
    if (!el) return;
    
    const advice = this.generateAdvice();
    
    let iconColor = "#60a5fa"; // default blue
    let iconClass = "fa-robot";
    if (advice.type === 'burnout') { iconColor = "#ef4444"; iconClass = "fa-heart-pulse"; }
    else if (advice.type === 'morning') { iconColor = "#fbbf24"; iconClass = "fa-sun"; }
    else if (advice.type === 'evening') { iconColor = "#a78bfa"; iconClass = "fa-moon"; }
    else if (advice.type === 'post-test') { iconColor = "#f97316"; iconClass = "fa-chart-simple"; }
    else if (advice.type === 'nto') { iconColor = "#10b981"; iconClass = "fa-network-wired"; }
    else if (advice.type === 'overachiever') { iconColor = "#fbbf24"; iconClass = "fa-crown"; }
    else if (advice.type === 'slacker') { iconColor = "#ef4444"; iconClass = "fa-triangle-exclamation"; }
    else if (advice.type === 'math-struggle') { iconColor = "#f43f5e"; iconClass = "fa-calculator"; }

    el.innerHTML = `
      <div class="advisor-card" style="background: linear-gradient(145deg, #1e293b, #0f172a); border: 1px solid ${iconColor}; padding: 15px; border-radius: 8px; margin-bottom: 20px; transition: all 0.3s ease;">
        <div class="advisor-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: ${iconColor};">
          <i class="fa-solid ${iconClass} fa-lg"></i>
          <span style="font-weight: bold; font-size: 16px;">AI-Наставник</span>
        </div>
        <p style="margin: 0 0 15px 0; color: #f1f5f9; line-height: 1.5; font-size: 15px;">${advice.text}</p>
        ${advice.action ? `<button class="btn btn-primary btn-sm" onclick="${advice.action}" style="background: ${iconColor}; border: none; color: ${advice.type === 'morning' || advice.type === 'overachiever' ? '#000' : '#fff'}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">📌 ${advice.actionLabel}</button>` : ''}
      </div>
    `;
  },
  
  generateAdvice() {
    const userData = StorageManager.getUserData() || StorageManager.defaultUserData;
    const progress = StorageManager.getProgress() || StorageManager.defaultProgress;
    const errors = StorageManager.getErrors() || [];
    const ntoProgress = StorageManager.getNtoProgress() || {completedCases: []};
    const dailyLog = JSON.parse(localStorage.getItem(StorageManager.keys.DAILY_LOG)) || [];
    
    let dueItems = [];
    if (window.spacedRepetition) {
      dueItems = window.spacedRepetition.getDueItems();
    }

    const today = new Date().toISOString().split('T')[0];
    const todayLog = dailyLog.find(log => log.date === today);
    const todayMinutes = todayLog ? todayLog.totalMinutes : 0;
    
    let weekMinutes = 0;
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    dailyLog.forEach(log => {
      if (new Date(log.date).getTime() > oneWeekAgo) {
        weekMinutes += log.totalMinutes;
      }
    });

    const currentHour = new Date().getHours();
    const dayOfWeek = new Date().getDay();

    // 1. Burnout Warning (Overwork)
    if (weekMinutes > 40 * 60 || todayMinutes > 240) {
      return {
        type: 'burnout',
        text: `⚠️ Осторожно, выгорание! За последние 7 дней ты учился более ${Math.floor(weekMinutes/60)} часов. Сделай выходной, чтобы мозг успел обработать информацию!`,
        action: "app.navigateTo('dashboard')",
        actionLabel: "Остановить план"
      };
    }

    // 2. Overachiever (High streak, high hours)
    if (userData.streak > 14 && weekMinutes > 20 * 60) {
      return {
        type: 'overachiever',
        text: `👑 Фантастика! Ты держишь стрик уже ${userData.streak} дней подряд с высокой нагрузкой. Твои результаты бьют рекорды. Идеальное время разобрать сложную 27-ю задачу!`,
        action: "window.location.hash = 'lesson/inf-lesson-10'",
        actionLabel: "Решить сложную задачу"
      };
    }

    // 3. Slacker (No activity for 3+ days)
    if (userData.streak === 0 && dailyLog.length > 0 && dailyLog[dailyLog.length-1].totalMinutes === 0) {
       return {
        type: 'slacker',
        text: `🚨 Мы отстаем от плана! Ты пропустил несколько дней. Каждое пропущенное занятие — это забытый материал. Давай сделаем сегодня хотя бы 15 минут практики!`,
        action: "app.navigateTo('trainer')",
        actionLabel: "Начать микро-тест (15 мин)"
      };
    }

    // 4. Struggling with specific subject (many failed lessons)
    const failedLessons = JSON.parse(localStorage.getItem('failed_lessons') || '[]');
    if (failedLessons.length > 2) {
       return {
        type: 'math-struggle',
        text: `🤔 Я вижу, что несколько последних тестов не были пройдены (набрано менее 80%). Не бросай их! Сначала проведи работу над ошибками, прежде чем брать новые темы.`,
        action: "plannerSystem.startLearningNow()",
        actionLabel: "Пройти работу над ошибками"
      };
    }

    // 4.5. Weak topic analysis
    if (errors.length > 0) {
      const topicCounts = {};
      errors.forEach(e => {
        topicCounts[e.topic] = (topicCounts[e.topic] || 0) + 1;
      });
      let worstTopic = null;
      let maxErrors = 0;
      for (const [topic, count] of Object.entries(topicCounts)) {
        if (count > maxErrors) {
          maxErrors = count;
          worstTopic = topic;
        }
      }
      
      if (maxErrors > 1) {
        return {
          type: 'math-struggle',
          text: `🚨 Я проанализировал твои ошибки. Задание №${worstTopic} вызывает проблемы (сделано ${maxErrors} ошибок). Рекомендую срочно повторить теорию!`,
          action: "app.navigateTo('errors')",
          actionLabel: "Разобрать ошибки"
        };
      }
    }

    // 5. Sunday Rest Rule
    if (dayOfWeek === 0) {
      return {
        type: 'burnout', // Using red icon for emphasis on rest
        text: `🛌 Сегодня воскресенье — официальный день отдыха. Отдых — это часть учебного процесса. Займись хобби или погуляй на улице.`,
        action: "",
        actionLabel: ""
      };
    }

    // 6. Post-Test Review
    const todayErrors = errors.filter(e => {
       const errDate = new Date(e.date).toISOString().split('T')[0];
       return errDate === today && e.reviewStage === 0;
    });
    if (todayErrors.length > 0) {
      return {
        type: 'post-test',
        text: `📊 У тебя ${todayErrors.length} свежих ошибок. Давай разберем их, пока материал еще в памяти!`,
        action: "app.navigateTo('errors')",
        actionLabel: "Разобрать ошибки"
      };
    }

    // 7. Morning Message
    if (currentHour >= 5 && currentHour < 12) {
      if (userData.streak > 3) {
        return {
          type: 'morning',
          text: `☀️ Доброе утро! Стрик: ${userData.streak} дней. Начни день с выполнения ежедневного плана!`,
          action: "plannerSystem.startLearningNow()",
          actionLabel: "Начать план на день"
        };
      } else {
        return {
          type: 'morning',
          text: `☀️ Доброе утро! Новый день — новые баллы. Начни с легкой разминки.`,
          action: "plannerSystem.startLearningNow()",
          actionLabel: "Начать план на день"
        };
      }
    }

    // 8. Evening Report
    if (currentHour >= 18 && currentHour <= 23) {
      if (todayMinutes > 60) {
        return {
          type: 'evening',
          text: `🌙 Отличная работа! Сегодня ты занимался ${Math.round(todayMinutes/60 * 10)/10} ч. Пора отдыхать!`,
          action: "app.navigateTo('analytics')",
          actionLabel: "Посмотреть статистику"
        };
      } else if (todayMinutes === 0) {
        return {
          type: 'evening',
          text: `🌙 День почти закончился, а мы еще не занимались. Выполни хотя бы одну задачу, чтобы сохранить стрик!`,
          action: "plannerSystem.startLearningNow()",
          actionLabel: "Сохранить стрик"
        };
      }
    }

    // 9. NTO Prompt
    if (ntoProgress.completedCases.length === 0 && currentHour > 12 && currentHour < 18) {
      return {
        type: 'nto',
        text: `🤖 Профиль НТО "Автоматизация бизнес-процессов" ждет тебя! Это плюс 100 баллов к ЕГЭ при победе.`,
        action: "app.navigateTo('nto')",
        actionLabel: "Открыть проекты НТО"
      };
    }

    // 10. Spaced Repetition
    if (dueItems.length > 0) {
      return {
        type: 'default',
        text: `🧠 Кривая Эббингауза работает. ${dueItems.length} карточек ждут повторения!`,
        action: "app.navigateTo('errors')",
        actionLabel: "Повторить ошибки"
      };
    }

    // DEFAULT
    return {
      type: 'default',
      text: `🎯 Выполни свой ежедневный план, чтобы стать на шаг ближе к поступлению мечты!`,
      action: "plannerSystem.startLearningNow()",
      actionLabel: "Перейти к плану"
    };
  }
};
