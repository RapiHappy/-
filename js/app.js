// Main Application Logic
const app = {
    init() {
        // Init UI components
        this.updateDate();
        this.updateDashboardStats();
        
        // Navigation setup
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                const target = item.closest('a');
                target.classList.add('active');
                this.navigateTo(target.dataset.target);
            });
        });

        // Initialize Systems
        burnoutSystem.init();
        timerSystem.init();

        // Update streak daily check
        StorageManager.updateStreak();
        this.updateDashboardStats();
    },

    updateDate() {
        const options = { month: 'long', day: 'numeric' };
        const dateStr = new Date().toLocaleDateString('ru-RU', options);
        document.getElementById('current-date').textContent = `Сегодня: ${dateStr}`;
    },

    updateDashboardStats() {
        const data = StorageManager.getUserData();
        document.getElementById('stat-streak').textContent = data.streak;
        document.getElementById('stat-hours').textContent = data.hoursStudied.toFixed(1) + 'ч';
    },

    navigateTo(viewId) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
