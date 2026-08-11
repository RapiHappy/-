window.timerSystem = {
  mode: 'pomodoro', // pomodoro, shortBreak, longBreak
  timeLeft: 25 * 60,
  initialTime: 25 * 60,
  intervalId: null,
  isRunning: false,
  pomodoroCount: 0,
  
  init() {
    this.setupListeners();
    this.updateDisplay();
    this.renderStats();
  },
  
  setupListeners() {
    const btnToggle = document.getElementById('btn-timer-toggle');
    const btnReset = document.getElementById('btn-timer-reset');
    
    if (btnToggle) btnToggle.addEventListener('click', () => this.toggle());
    if (btnReset) btnReset.addEventListener('click', () => this.reset());
    
    // Quick time selectors if they exist
    document.querySelectorAll('.timer-duration-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mins = parseInt(e.target.dataset.mins);
        if (!isNaN(mins)) this.setDuration(mins);
      });
    });
  },
  
  setDuration(mins) {
    if (this.isRunning) this.pause();
    this.initialTime = mins * 60;
    this.timeLeft = this.initialTime;
    this.mode = 'pomodoro';
    this.updateDisplay();
  },
  
  toggle() {
    if (this.isRunning) this.pause();
    else this.start();
  },
  
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    const btnToggle = document.getElementById('btn-timer-toggle');
    if (btnToggle) {
      btnToggle.innerHTML = '<i class="fas fa-pause"></i> Пауза';
      btnToggle.style.background = '#f59e0b';
    }
    
    this.intervalId = setInterval(() => {
      this.timeLeft--;
      this.updateDisplay();
      
      if (this.timeLeft <= 0) {
        this.completeSession();
      }
    }, 1000);
  },
  
  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.intervalId);
    
    const btnToggle = document.getElementById('btn-timer-toggle');
    if (btnToggle) {
      btnToggle.innerHTML = '<i class="fas fa-play"></i> Старт';
      btnToggle.style.background = '#10b981';
    }
  },
  
  reset() {
    this.pause();
    this.timeLeft = this.initialTime;
    this.updateDisplay();
  },
  
  updateDisplay() {
    const timeEl = document.getElementById('timer-time');
    const statusEl = document.getElementById('timer-status');
    
    if (timeEl) {
      const m = Math.floor(this.timeLeft / 60);
      const s = this.timeLeft % 60;
      timeEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    
    if (statusEl) {
      if (this.mode === 'pomodoro') statusEl.textContent = 'Фокус';
      else if (this.mode === 'shortBreak') statusEl.textContent = 'Короткий перерыв';
      else statusEl.textContent = 'Длинный перерыв';
    }
    
    // Update document title
    const m = Math.floor(this.timeLeft / 60);
    const s = this.timeLeft % 60;
    document.title = `${m}:${s < 10 ? '0' : ''}${s} - EGE Master`;
  },
  
  completeSession() {
    this.pause();
    this.playNotifySound();
    if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
    
    if (this.mode === 'pomodoro') {
      this.pomodoroCount++;
      
      // Save session
      StorageManager.addPomodoroSession({
        duration: this.initialTime,
        completed: true
      });
      
      this.renderStats();
      
      // Switch to break
      if (this.pomodoroCount % 4 === 0) {
        this.mode = 'longBreak';
        this.timeLeft = 15 * 60;
        app.showNotification('Отличная работа! Время для длинного перерыва (15 мин)', 'success');
      } else {
        this.mode = 'shortBreak';
        this.timeLeft = 5 * 60;
        app.showNotification('Сессия завершена! Сделай короткий перерыв (5 мин)', 'success');
      }
    } else {
      this.mode = 'pomodoro';
      this.timeLeft = this.initialTime;
      app.showNotification('Перерыв окончен. Пора за работу!', 'info');
    }
    
    this.initialTime = this.timeLeft;
    this.updateDisplay();
  },
  
  playNotifySound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) { console.error('Audio api error', e); }
  },
  
  renderStats() {
    const container = document.getElementById('focus-stats-container');
    if (!container) return;
    
    const today = StorageManager.getTodayPomodoros();
    const totalMins = today.reduce((acc, s) => acc + (s.duration / 60), 0);
    
    container.innerHTML = `
      <div style="display: flex; justify-content: space-around; background: #1e293b; padding: 16px; border-radius: 12px; margin-top: 24px;">
        <div style="text-align: center;">
          <div style="font-size: 24px; font-weight: bold; color: #f8fafc;">${today.length}</div>
          <div style="font-size: 12px; color: #94a3b8;">Сессий сегодня</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 24px; font-weight: bold; color: #10b981;">${totalMins}</div>
          <div style="font-size: 12px; color: #94a3b8;">Минут фокуса</div>
        </div>
      </div>
    `;
  }
};
