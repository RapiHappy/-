window.StorageManager = {
  keys: {
    USER_DATA: 'ege_master_user_data',
    PROGRESS: 'ege_master_progress',
    ERRORS: 'ege_master_errors',
    LESSON_PROGRESS: 'ege_master_lesson_progress',
    NTO_PROGRESS: 'ege_master_nto_progress',
    SPACED_REPETITION: 'ege_master_spaced_rep',
    DAILY_LOG: 'ege_master_daily_log',
    POMODORO_SESSIONS: 'ege_master_pomodoro'
  },
  
  defaultUserData: {
    name: 'Ученик',
    streak: 0,
    lastLoginDate: null,
    hoursStudied: 0,
    energyLevel: 'high',
    lastEnergyDate: null
  },
  
  defaultProgress: {
    informatics: { completedTasks: 0, totalTasks: 500 },
    math: { completedTasks: 0, totalTasks: 300 },
    russian: { completedTasks: 0, totalTasks: 400 },
    nto: { completedTasks: 0, totalTasks: 100 }
  },
  
  init() {
    if (!localStorage.getItem(this.keys.USER_DATA)) this.saveUserData(this.defaultUserData);
    if (!localStorage.getItem(this.keys.PROGRESS)) this.saveProgress(this.defaultProgress);
    if (!localStorage.getItem(this.keys.ERRORS)) localStorage.setItem(this.keys.ERRORS, JSON.stringify([]));
    if (!localStorage.getItem(this.keys.LESSON_PROGRESS)) localStorage.setItem(this.keys.LESSON_PROGRESS, JSON.stringify({}));
    if (!localStorage.getItem(this.keys.NTO_PROGRESS)) localStorage.setItem(this.keys.NTO_PROGRESS, JSON.stringify({completedCases: [], sqlSolutions: [], bpmnSolutions: [], portfolio: []}));
    if (!localStorage.getItem(this.keys.SPACED_REPETITION)) localStorage.setItem(this.keys.SPACED_REPETITION, JSON.stringify([]));
    if (!localStorage.getItem(this.keys.DAILY_LOG)) localStorage.setItem(this.keys.DAILY_LOG, JSON.stringify([]));
    if (!localStorage.getItem(this.keys.POMODORO_SESSIONS)) localStorage.setItem(this.keys.POMODORO_SESSIONS, JSON.stringify([]));
  },
  
  getUserData() { return JSON.parse(localStorage.getItem(this.keys.USER_DATA)); },
  saveUserData(data) { localStorage.setItem(this.keys.USER_DATA, JSON.stringify(data)); },
  
  getProgress() { return JSON.parse(localStorage.getItem(this.keys.PROGRESS)); },
  saveProgress(data) { localStorage.setItem(this.keys.PROGRESS, JSON.stringify(data)); },
  
  getErrors() { return JSON.parse(localStorage.getItem(this.keys.ERRORS)); },
  saveError(errorObj) {
    const errors = this.getErrors();
    const now = Date.now();
    window.newError = { ...errorObj, date: now, reviewStage: 0, nextReview: now + 86400000 }; // next review in 1 day
    errors.push(newError);
    localStorage.setItem(this.keys.ERRORS, JSON.stringify(errors));
    
    const sr = this.getSpacedRepetition();
    sr.push({ errorIndex: errors.length - 1, nextReview: newError.nextReview, stage: 0 });
    this.saveSpacedRepetition(sr);
  },
  removeError(index) {
    const errors = this.getErrors();
    errors.splice(index, 1);
    localStorage.setItem(this.keys.ERRORS, JSON.stringify(errors));
  },
  
  getLessonProgress() { return JSON.parse(localStorage.getItem(this.keys.LESSON_PROGRESS)); },
  saveLessonProgress(lessonId, data) {
    const lp = this.getLessonProgress();
    lp[lessonId] = { ...lp[lessonId], ...data, timestamp: Date.now() };
    localStorage.setItem(this.keys.LESSON_PROGRESS, JSON.stringify(lp));
  },
  
  getNtoProgress() { return JSON.parse(localStorage.getItem(this.keys.NTO_PROGRESS)); },
  saveNtoProgress(data) {
    const current = this.getNtoProgress();
    localStorage.setItem(this.keys.NTO_PROGRESS, JSON.stringify({ ...current, ...data }));
  },
  
  getSpacedRepetition() { return JSON.parse(localStorage.getItem(this.keys.SPACED_REPETITION)); },
  saveSpacedRepetition(data) { localStorage.setItem(this.keys.SPACED_REPETITION, JSON.stringify(data)); },
  
  getDailyLog() { return JSON.parse(localStorage.getItem(this.keys.DAILY_LOG)); },
  addDailyLog(entry) {
    const log = this.getDailyLog();
    const today = new Date().toISOString().split('T')[0];
    log.push({ ...entry, date: today, timestamp: Date.now() });
    localStorage.setItem(this.keys.DAILY_LOG, JSON.stringify(log));
  },
  getTodayLog() {
    const log = this.getDailyLog();
    const today = new Date().toISOString().split('T')[0];
    return log.filter(e => e.date === today);
  },
  getWeekLog() {
    const log = this.getDailyLog();
    const aWeekAgo = Date.now() - 7 * 86400000;
    return log.filter(e => e.timestamp >= aWeekAgo);
  },
  
  getPomodoroSessions() { return JSON.parse(localStorage.getItem(this.keys.POMODORO_SESSIONS)); },
  addPomodoroSession(session) {
    const sessions = this.getPomodoroSessions();
    sessions.push({ ...session, date: new Date().toISOString().split('T')[0], timestamp: Date.now() });
    localStorage.setItem(this.keys.POMODORO_SESSIONS, JSON.stringify(sessions));
    
    const userData = this.getUserData();
    userData.hoursStudied = (parseFloat(userData.hoursStudied) || 0) + (session.duration / 60);
    this.saveUserData(userData);
  },
  getTodayPomodoros() {
    const sessions = this.getPomodoroSessions();
    const today = new Date().toISOString().split('T')[0];
    return sessions.filter(s => s.date === today);
  },
  
  updateStreak() {
    const data = this.getUserData();
    const today = new Date().toISOString().split('T')[0];
    if (!data.lastLoginDate) {
      data.streak = 1;
      data.lastLoginDate = today;
    } else if (data.lastLoginDate !== today) {
      const lastLogin = new Date(data.lastLoginDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastLogin);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 1) {
        data.streak += 1;
      } else if (diffDays > 1) {
        data.streak = 1;
      }
      data.lastLoginDate = today;
    }
    this.saveUserData(data);
    return data.streak;
  }
};

StorageManager.init();
