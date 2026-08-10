// Progress tracking logic
const progressSystem = {
    render() {
        const data = StorageManager.getProgress();
        const container = document.getElementById('analytics-container');
        
        container.innerHTML = `
            <div class="stat-card">
                <i class="fa-solid fa-code text-blue"></i>
                <div class="stat-info w-100">
                    <span class="stat-value">Информатика</span>
                    <div class="progress-bar-container" style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; margin-top: 8px;">
                        <div style="width: ${(data.informatics.completedTasks / data.informatics.totalTasks) * 100}%; background: var(--color-blue); height: 100%; border-radius: 4px;"></div>
                    </div>
                    <span class="stat-label" style="margin-top: 4px;">${data.informatics.completedTasks} / ${data.informatics.totalTasks} задач</span>
                </div>
            </div>
            
            <div class="stat-card" style="margin-top: 12px;">
                <i class="fa-solid fa-calculator text-orange"></i>
                <div class="stat-info w-100">
                    <span class="stat-value">Математика</span>
                    <div class="progress-bar-container" style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; margin-top: 8px;">
                        <div style="width: ${(data.math.completedTasks / data.math.totalTasks) * 100}%; background: var(--color-orange); height: 100%; border-radius: 4px;"></div>
                    </div>
                    <span class="stat-label" style="margin-top: 4px;">${data.math.completedTasks} / ${data.math.totalTasks} задач</span>
                </div>
            </div>
            
            <div class="stat-card" style="margin-top: 12px;">
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
    }
};

// Hook into app navigation
document.querySelector('[data-target="analytics"]').addEventListener('click', () => {
    progressSystem.render();
});
