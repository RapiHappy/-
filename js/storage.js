// Data structures for LocalStorage management

const StorageManager = {
    keys: {
        USER_DATA: 'ege_master_user_data',
        PROGRESS: 'ege_master_progress',
        ERRORS: 'ege_master_errors'
    },

    defaultUserData: {
        name: 'Ученик',
        streak: 0,
        lastLoginDate: null,
        hoursStudied: 0,
        energyLevel: 'high' // high, medium, low
    },

    defaultProgress: {
        informatics: { completedTasks: 0, totalTasks: 1000 },
        math: { completedTasks: 0, totalTasks: 800 },
        russian: { completedTasks: 0, totalTasks: 1200 }
    },

    init() {
        if (!localStorage.getItem(this.keys.USER_DATA)) {
            this.saveUserData(this.defaultUserData);
        }
        if (!localStorage.getItem(this.keys.PROGRESS)) {
            this.saveProgress(this.defaultProgress);
        }
        if (!localStorage.getItem(this.keys.ERRORS)) {
            localStorage.setItem(this.keys.ERRORS, JSON.stringify([]));
        }
    },

    getUserData() {
        return JSON.parse(localStorage.getItem(this.keys.USER_DATA));
    },

    saveUserData(data) {
        localStorage.setItem(this.keys.USER_DATA, JSON.stringify(data));
    },

    getProgress() {
        return JSON.parse(localStorage.getItem(this.keys.PROGRESS));
    },

    saveProgress(data) {
        localStorage.setItem(this.keys.PROGRESS, JSON.stringify(data));
    },

    getErrors() {
        return JSON.parse(localStorage.getItem(this.keys.ERRORS));
    },

    saveError(errorObj) {
        const errors = this.getErrors();
        errors.push(errorObj);
        localStorage.setItem(this.keys.ERRORS, JSON.stringify(errors));
    },

    updateStreak() {
        const data = this.getUserData();
        const today = new Date().toISOString().split('T')[0];
        
        if (data.lastLoginDate === null) {
            data.streak = 1;
            data.lastLoginDate = today;
            this.saveUserData(data);
        } else if (data.lastLoginDate !== today) {
            // Check if it's the next day
            const last = new Date(data.lastLoginDate);
            const now = new Date(today);
            const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                data.streak += 1;
            } else if (diffDays > 1) {
                // Gentle reset
                data.streak = 1; 
            }
            
            data.lastLoginDate = today;
            this.saveUserData(data);
        }
        return data.streak;
    }
};

StorageManager.init();
