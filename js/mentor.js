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

    el.innerHTML = `
      <div class="advisor-card" style="background: linear-gradient(145deg, #1e293b, #0f172a); border: 1px solid ${iconColor}; padding: 15px; border-radius: 8px; margin-bottom: 20px; transition: all 0.3s ease;">
        <div class="advisor-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: ${iconColor};">
          <i class="fa-solid ${iconClass} fa-lg"></i>
          <span style="font-weight: bold; font-size: 16px;">AI-Наставник</span>
        </div>
        <p style="margin: 0 0 15px 0; color: #f1f5f9; line-height: 1.5; font-size: 15px;">${advice.text}</p>
        ${advice.action ? `<button class="btn btn-primary btn-sm" onclick="${advice.action}" style="background: ${iconColor}; border: none; color: ${advice.type === 'morning' ? '#000' : '#fff'}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">📌 ${advice.actionLabel}</button>` : ''}
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
    
    // Calculate 7-day study time
    let weekMinutes = 0;
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    dailyLog.forEach(log => {
      if (new Date(log.date).getTime() > oneWeekAgo) {
        weekMinutes += log.totalMinutes;
      }
    });

    const currentHour = new Date().getHours();

    // RULE 1: Burnout Warning (Priority 1)
    if (weekMinutes > 40 * 60 || (userData.energyLevel === 'low' && todayMinutes > 120)) {
      return {
        type: 'burnout',
        text: `⚠️ Осторожно, выгорание близко! За последние 7 дней ты учился более ${Math.floor(weekMinutes/60)} часов (или твоя энергия на нуле, но ты продолжаешь). Твоя продуктивность сильно упадет, если не отдохнешь. Сделай паузу!`,
        action: "app.navigateTo('trainer')", // just redirect somewhere safe or no action
        actionLabel: "Сменить деятельность"
      };
    }

    // RULE 2: Post-Test Review (Priority 2)
    // If there are errors made TODAY that haven't been reviewed
    const todayErrors = errors.filter(e => {
       const errDate = new Date(e.date).toISOString().split('T')[0];
       return errDate === today && e.reviewStage === 0;
    });
    if (todayErrors.length > 0 && currentHour > 12) {
      return {
        type: 'post-test',
        text: `📊 Я проанализировал твой последний тест. У тебя ${todayErrors.length} свежих ошибок. Самое время провести работу над ошибками, пока материал еще в памяти!`,
        action: "app.navigateTo('errors')",
        actionLabel: "Разобрать ошибки"
      };
    }

    // RULE 3: Morning Message (Priority 3)
    if (currentHour >= 5 && currentHour < 12) {
      if (userData.streak > 3) {
        return {
          type: 'morning',
          text: `☀️ Доброе утро! У тебя отличная серия: ${userData.streak} дней подряд. Не сбавляй темп. Давай начнем день с выполнения плана!`,
          action: "window.scrollTo(0, document.getElementById('daily-plan-container').offsetTop)",
          actionLabel: "Посмотреть план"
        };
      } else {
        return {
          type: 'morning',
          text: `☀️ Доброе утро! Новый день — новые баллы к ЕГЭ. ${dueItems.length > 0 ? `У тебя накопилось ${dueItems.length} карточек для повторения.` : 'Отличный момент начать изучение новой теории.'}`,
          action: dueItems.length > 0 ? "app.navigateTo('errors')" : "app.navigateTo('courses')",
          actionLabel: dueItems.length > 0 ? "Повторить карточки" : "Начать урок"
        };
      }
    }

    // RULE 4: Evening Report (Priority 4)
    if (currentHour >= 18 && currentHour <= 23) {
      if (todayMinutes > 60) {
        return {
          type: 'evening',
          text: `🌙 Отличная работа сегодня! Ты занимался ${Math.round(todayMinutes/60 * 10)/10} часов. Мозг нуждается в отдыхе для консолидации памяти. Пора закругляться!`,
          action: "app.navigateTo('analytics')",
          actionLabel: "Посмотреть статистику"
        };
      } else if (todayMinutes === 0) {
        return {
          type: 'evening',
          text: `🌙 День подходит к концу, а мы еще не занимались. Давай сделаем хотя бы один короткий урок или решим пару тестов, чтобы не терять прогресс!`,
          action: "app.navigateTo('trainer')",
          actionLabel: "Быстрый тест"
        };
      }
    }

    // RULE 5: NTO Daily Task (Priority 5)
    if (ntoProgress.completedCases.length === 0 && currentHour > 12 && currentHour < 18) {
      return {
        type: 'nto',
        text: `🤖 Я заметил, что ты еще не приступал к проектам Национальной технологической олимпиады (НТО). Это даст огромный буст при поступлении. Пройди первый мини-проект!`,
        action: "app.navigateTo('nto')",
        actionLabel: "Открыть проекты НТО"
      };
    }

    // RULE 6: Spaced Repetition (Priority 6)
    if (dueItems.length > 0) {
      return {
        type: 'default',
        text: `🧠 Кривая забывания Эббингауза работает против нас. Прямо сейчас у тебя ${dueItems.length} ошибок ждут повторения. Чем быстрее повторишь, тем лучше запомнишь!`,
        action: "app.navigateTo('errors')",
        actionLabel: "Повторить ошибки"
      };
    }

    // DEFAULT: Next Best Step (Priority 7)
    // Find the subject with least progress
    const mathProg = progress.math.totalTasks > 0 ? progress.math.completedTasks / progress.math.totalTasks : 0;
    const infProg = progress.informatics.totalTasks > 0 ? progress.informatics.completedTasks / progress.informatics.totalTasks : 0;
    const rusProg = progress.russian.totalTasks > 0 ? progress.russian.completedTasks / progress.russian.totalTasks : 0;

    let leastSub = 'math';
    let leastVal = mathProg;
    let label = 'Математику';
    
    if (infProg < leastVal) { leastSub = 'informatics'; leastVal = infProg; label = 'Информатику'; }
    if (rusProg < leastVal) { leastSub = 'russian'; leastVal = rusProg; label = 'Русский язык'; }

    return {
      type: 'default',
      text: `🎯 Мой анализ показывает, что сейчас больше всего внимания требует **${label}**. Давай решим несколько задач из этого раздела, чтобы подтянуть статистику.`,
      action: "app.navigateTo('trainer')",
      actionLabel: "Тренировать " + label
    };
  }
};
