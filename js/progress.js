const progressSystem = {
    render() {
        const data = StorageManager.getProgress();
        const userData = StorageManager.getUserData();
        const container = document.getElementById('analytics-container');
        
        // Calculate totals
        const totalCompleted = data.informatics.completedTasks + data.math.completedTasks + data.russian.completedTasks;
        const totalAll = data.informatics.totalTasks + data.math.totalTasks + data.russian.totalTasks;
        const totalPercent = Math.round((totalCompleted / totalAll) * 100) || 0;

        container.innerHTML = `
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <i class="fa-solid fa-check-double text-green"></i>
                    <div class="stat-info">
                        <span class="stat-value">${totalCompleted}</span>
                        <span class="stat-label">Задач решено</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fa-solid fa-clock text-blue"></i>
                    <div class="stat-info">
                        <span class="stat-value">${userData.hoursStudied.toFixed(1)}ч</span>
                        <span class="stat-label">Обучение</span>
                    </div>
                </div>
            </div>

            <h3 style="font-size: 16px; margin-bottom: 12px;">Общий прогресс: ${totalPercent}%</h3>
            <div class="progress-bar-container" style="background: rgba(255,255,255,0.1); height: 12px; border-radius: 6px; margin-bottom: 24px;">
                <div style="width: ${totalPercent}%; background: var(--accent-primary); height: 100%; border-radius: 6px;"></div>
            </div>
            
            <div class="stat-card" style="margin-bottom: 12px;">
                <i class="fa-solid fa-code text-blue"></i>
                <div class="stat-info w-100">
                    <span class="stat-value">Информатика</span>
                    <div class="progress-bar-container" style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; margin-top: 8px;">
                        <div style="width: ${(data.informatics.completedTasks / data.informatics.totalTasks) * 100}%; background: var(--color-blue); height: 100%; border-radius: 4px;"></div>
                    </div>
                    <span class="stat-label" style="margin-top: 4px;">${data.informatics.completedTasks} / ${data.informatics.totalTasks} задач</span>
                </div>
            </div>
            
            <div class="stat-card" style="margin-bottom: 12px;">
                <i class="fa-solid fa-calculator text-orange"></i>
                <div class="stat-info w-100">
                    <span class="stat-value">Математика</span>
                    <div class="progress-bar-container" style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; margin-top: 8px;">
                        <div style="width: ${(data.math.completedTasks / data.math.totalTasks) * 100}%; background: var(--color-orange); height: 100%; border-radius: 4px;"></div>
                    </div>
                    <span class="stat-label" style="margin-top: 4px;">${data.math.completedTasks} / ${data.math.totalTasks} задач</span>
                </div>
            </div>
            
            <div class="stat-card" style="margin-bottom: 12px;">
                <i class="fa-solid fa-book text-green"></i>
                <div class="stat-info w-100">
                    <span class="stat-value">Русский язык</span>
                    <div class="progress-bar-container" style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; margin-top: 8px;">
                        <div style="width: ${(data.russian.completedTasks / data.russian.totalTasks) * 100}%; background: var(--color-green); height: 100%; border-radius: 4px;"></div>
                    </div>
                    <span class="stat-label" style="margin-top: 4px;">${data.russian.completedTasks} / ${data.russian.totalTasks} задач</span>
                </div>
            </div>
        `;

        this.renderChart();
    },

    renderChart() {
        // Simple HTML/CSS bar chart representation of daily activity
        const chartContainer = document.getElementById('progress-chart-container');
        
        // Mock data for last 7 days activity (hours)
        const activity = [1.5, 2.0, 0.5, 3.0, 2.5, 1.0, StorageManager.getUserData().hoursStudied % 4];
        
        let barsHtml = '';
        activity.forEach(val => {
            const height = Math.max((val / 4) * 100, 5); // max 4 hours scale
            barsHtml += `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100px; flex: 1;">
                    <div style="width: 20px; background: var(--accent-primary); border-radius: 4px 4px 0 0; height: ${height}%;"></div>
                </div>
            `;
        });

        chartContainer.innerHTML = `
            <h3 style="font-size: 16px; margin-bottom: 12px;">Активность за 7 дней</h3>
            <div style="display: flex; gap: 8px; background: var(--card-bg); padding: 16px; border-radius: var(--radius-lg); align-items: flex-end;">
                ${barsHtml}
            </div>
        `;
    }
};

document.querySelector('[data-target="analytics"]').addEventListener('click', () => {
    progressSystem.render();
});
