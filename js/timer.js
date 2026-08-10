// Pomodoro timer logic
const timerSystem = {
    timeLeft: 25 * 60,
    isRunning: false,
    interval: null,
    mode: 'work', // work, shortBreak, longBreak
    cycles: 0,

    init() {
        this.display = document.getElementById('timer-time');
        this.status = document.getElementById('timer-status');
        this.btnToggle = document.getElementById('btn-timer-toggle');
        this.btnReset = document.getElementById('btn-timer-reset');

        this.btnToggle.addEventListener('click', () => this.toggle());
        this.btnReset.addEventListener('click', () => this.reset());
        this.updateDisplay();
    },

    toggle() {
        if (this.isRunning) {
            clearInterval(this.interval);
            this.btnToggle.textContent = 'Старт';
            this.isRunning = false;
        } else {
            this.interval = setInterval(() => this.tick(), 1000);
            this.btnToggle.textContent = 'Пауза';
            this.isRunning = true;
        }
    },

    reset() {
        clearInterval(this.interval);
        this.isRunning = false;
        this.btnToggle.textContent = 'Старт';
        this.setMode(this.mode);
    },

    setMode(mode) {
        this.mode = mode;
        if (mode === 'work') {
            this.timeLeft = 25 * 60;
            this.status.textContent = 'Работа (25 мин)';
            document.querySelector('.timer-display').style.background = 'var(--card-bg)';
        } else if (mode === 'shortBreak') {
            this.timeLeft = 5 * 60;
            this.status.textContent = 'Отдых (5 мин)';
            document.querySelector('.timer-display').style.background = 'rgba(34, 197, 94, 0.1)';
        } else {
            this.timeLeft = 15 * 60;
            this.status.textContent = 'Длинный отдых (15 мин)';
            document.querySelector('.timer-display').style.background = 'rgba(59, 130, 246, 0.1)';
        }
        this.updateDisplay();
    },

    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
        } else {
            this.completeCycle();
        }
    },

    completeCycle() {
        clearInterval(this.interval);
        this.isRunning = false;
        this.btnToggle.textContent = 'Старт';
        
        // Notify
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([200, 100, 200]);
        }
        
        if (this.mode === 'work') {
            this.cycles++;
            let userData = StorageManager.getUserData();
            userData.hoursStudied += (25 / 60);
            StorageManager.saveUserData(userData);
            app.updateDashboardStats();

            if (this.cycles % 4 === 0) {
                this.setMode('longBreak');
            } else {
                this.setMode('shortBreak');
            }
        } else {
            this.setMode('work');
        }
    },

    updateDisplay() {
        const m = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const s = (this.timeLeft % 60).toString().padStart(2, '0');
        this.display.textContent = `${m}:${s}`;
    }
};
