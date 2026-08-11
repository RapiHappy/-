window.app = {
  currentView: 'dashboard',
  views: ['dashboard', 'courses', 'trainer', 'timer', 'analytics', 'errors', 'nto', 'lesson', 'course-detail'],
  
  init() {
    if (typeof StorageManager !== 'undefined') StorageManager.init();
    
    this.updateDate();
    this.updateGreeting();
    this.setupNavigation();
    this.setupHashRouting();
    
    if (typeof burnoutSystem !== 'undefined') burnoutSystem.init();
    if (typeof timerSystem !== 'undefined') timerSystem.init();
    
    if (typeof StorageManager !== 'undefined') {
      StorageManager.updateStreak();
      this.updateDashboardStats();
      
      if (typeof plannerSystem !== 'undefined') plannerSystem.generatePlan();
    }
    
    if (typeof mentorSystem !== 'undefined' && mentorSystem.render) {
        mentorSystem.render();
    }
    
    if (typeof spacedRepetition !== 'undefined' && spacedRepetition.checkDueItems) {
        spacedRepetition.checkDueItems();
    }
    
    this.showMotivation();
    this.registerSW();
    
    if (typeof diagnosticsSystem !== 'undefined') {
      setTimeout(() => diagnosticsSystem.check(), 500);
    }
  },
  
  updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Доброе утро';
    if (hour >= 12 && hour < 17) greeting = 'Добрый день';
    else if (hour >= 17 && hour < 22) greeting = 'Добрый вечер';
    else if (hour >= 22 || hour < 5) greeting = 'Доброй ночи';
    const greetingEl = document.getElementById('greeting-text');
    if (greetingEl) greetingEl.textContent = greeting + ' 👋';
  },
  
  updateDate() {
    window.options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateEl = document.getElementById('current-date');
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString('ru-RU', options);
  },
  
  updateDashboardStats() {
    if (typeof StorageManager === 'undefined') return;
    const data = StorageManager.getUserData();
    const statStreak = document.getElementById('stat-streak');
    const statHours = document.getElementById('stat-hours');
    
    if (statStreak) statStreak.textContent = `${data.streak || 0} дней`;
    if (statHours) statHours.textContent = `${(data.hoursStudied || 0).toFixed(1)} ч.`;
    
    const todayLog = StorageManager.getTodayLog();
    const statTasksToday = document.getElementById('stat-tasks-today');
    if (statTasksToday) {
      statTasksToday.textContent = todayLog.reduce((acc, log) => acc + (log.tasks || 0), 0);
    }
    
    if (typeof progressSystem !== 'undefined' && progressSystem.updateForecast) {
        progressSystem.updateForecast();
    }
  },
  
  setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-item, .quick-nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) return; // handled by hash routing
        e.preventDefault();
        const targetView = e.currentTarget.getAttribute('data-view');
        if (targetView) window.location.hash = targetView;
      });
    });
  },
  
  setupHashRouting() {
    const handleHash = () => {
      const hash = window.location.hash.slice(1) || 'dashboard';
      const parts = hash.split('/');
      const view = parts[0];
      
      if (this.views.includes(view)) {
        this.navigateTo(view);
        
        // Deep linking handling
        if (view === 'lesson' && parts[1]) {
           if (typeof coursesSystem !== 'undefined') coursesSystem.openLesson(parts[1]);
        } else if (view === 'course-detail' && parts[1]) {
           if (typeof coursesSystem !== 'undefined') coursesSystem.openCourse(parts[1]);
        }
        
        // Lazy rendering
        if (view === 'courses' && typeof coursesSystem !== 'undefined') coursesSystem.loadCourses();
        if (view === 'trainer' && typeof practiceSystem !== 'undefined') practiceSystem.render();
        if (view === 'analytics' && typeof analyticsSystem !== 'undefined') analyticsSystem.render();
        if (view === 'errors' && typeof mistakesSystem !== 'undefined') mistakesSystem.render();
        if (view === 'nto' && typeof ntoSystem !== 'undefined') ntoSystem.render();
      }
    };
    
    window.addEventListener('hashchange', handleHash);
    handleHash();
  },
  
  // Map view IDs to bottom nav button indices
  navMap: { 'dashboard': 0, 'courses': 1, 'trainer': 2, 'nto': 3, 'errors': 4, 'analytics': 5 },
  
  navigateTo(viewId) {
    this.currentView = viewId;
    
    // Update hash for routing (without triggering hashchange loop)
    const currentHash = window.location.hash.slice(1).split('/')[0];
    if (currentHash !== viewId) {
      history.pushState(null, '', '#' + viewId);
    }
    
    this.views.forEach(view => {
      const el = document.getElementById(`view-${view}`);
      if (el) el.style.display = 'none';
    });
    
    const targetEl = document.getElementById(`view-${viewId}`);
    if (targetEl) targetEl.style.display = 'block';
    
    // Update bottom nav active state
    const navItems = document.querySelectorAll('#bottom-nav .nav-item');
    navItems.forEach(btn => btn.classList.remove('active'));
    const activeIdx = this.navMap[viewId];
    if (activeIdx !== undefined && navItems[activeIdx]) {
      navItems[activeIdx].classList.add('active');
    }
    
    // Trigger lazy loading for the target view
    if (viewId === 'courses' && typeof coursesSystem !== 'undefined') coursesSystem.loadCourses();
    if (viewId === 'trainer' && typeof practiceSystem !== 'undefined') practiceSystem.render();
    if (viewId === 'analytics' && typeof analyticsSystem !== 'undefined') analyticsSystem.render();
    if (viewId === 'errors' && typeof mistakesSystem !== 'undefined') mistakesSystem.render();
    if (viewId === 'nto' && typeof ntoSystem !== 'undefined') ntoSystem.render();
    
    window.scrollTo(0, 0);
  },
  
  showNotification(message, type = 'info') {
    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px; max-width: 300px;';
      document.body.appendChild(container);
    }
    
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    window.bgColors = { 'success': '#10b981', 'error': '#ef4444', 'info': '#3b82f6' };
    notif.style.cssText = `
      padding: 12px 20px; border-radius: 8px; color: #fff; font-size: 14px;
      font-weight: 500; opacity: 0; transform: translateY(-20px); transition: all 0.3s ease;
      background-color: ${bgColors[type] || bgColors['info']};
      box-shadow: 0 4px 6px rgba(0,0,0,0.3); word-break: break-word;
    `;
    notif.textContent = message;
    
    container.appendChild(notif);
    
    requestAnimationFrame(() => {
      notif.style.opacity = '1';
      notif.style.transform = 'translateY(0)';
    });
    
    setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transform = 'translateY(-20px)';
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  },
  
  showMotivation() {
    const quotes = [
      'Каждый день — это шанс стать лучше.',
      'Дорога в тысячу миль начинается с одного шага.',
      'Ты сильнее, чем думаешь. 💪',
      'Маленькие шаги каждый день приводят к большим результатам.',
      'Не сдавайся. Ты уже на пути к 100 баллам!',
      'Сегодняшние усилия — завтрашние результаты.',
      'Учёба — это инвестиция в своё будущее.',
      'Каждая решённая задача — плюс балл на ЕГЭ.'
    ];
    const el = document.getElementById('motivation-quote');
    if (el) el.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  },
  
  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW:', err));
    }
  }
};

document.addEventListener('DOMContentLoaded', () => app.init());
