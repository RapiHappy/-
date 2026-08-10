const plannerSystem = {
    generatePlan(energyLevel) {
        const container = document.getElementById('daily-plan-container');
        const summary = document.getElementById('plan-summary-time');
        
        container.innerHTML = '<p>Загрузка плана...</p>';
        
        try {
            const schedule = AppData.schedule;
            
            // Get current month in english lowercase
            const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
            const currentMonth = monthNames[new Date().getMonth()];
            
            const currentTasks = schedule[currentMonth] || ["№1"]; // fallback
            const tasksString = currentTasks.join(', ');

            // Setup today's completed state
            const today = new Date().toISOString().split('T')[0];
            const savedState = JSON.parse(localStorage.getItem('ege_planner_state_' + today) || "{}");

            // Helper to generate task HTML
            const renderTask = (id, title) => {
                const isCompleted = savedState[id] ? 'completed' : '';
                const icon = savedState[id] ? 'fa-square-check text-green' : 'fa-square text-secondary';
                return `<div class="task-item ${isCompleted}" data-task-id="${id}" onclick="plannerSystem.toggleTask('${id}')">
                            <i class="fa-regular ${icon}"></i> ${title}
                        </div>`;
            };

            if (energyLevel === 'high') {
                summary.innerHTML = `<strong>Сегодня — 2 ч 15 мин</strong>`;
                container.innerHTML = `
                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-code text-blue"></i> Информатика</div>
                            <div class="subject-time">55 мин</div>
                        </div>
                        <p style="font-size:12px; color:var(--text-secondary); margin-bottom:8px;">Месячный план: ${tasksString}</p>
                        ${renderTask('inf-1', 'Посмотреть урок: Циклы for')}
                        ${renderTask('inf-2', 'Решить задания Stepik')}
                        ${renderTask('inf-3', `Решить 5 задач ЕГЭ ${currentTasks[0]}`)}
                    </div>
                    
                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-book-open text-green"></i> Русский язык</div>
                            <div class="subject-time">40 мин</div>
                        </div>
                        ${renderTask('rus-1', 'Урок: Орфография')}
                        ${renderTask('rus-2', 'Тест из 10 вопросов')}
                    </div>

                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-calculator text-orange"></i> Математика</div>
                            <div class="subject-time">40 мин</div>
                        </div>
                        ${renderTask('math-1', 'Теория: Функции')}
                        ${renderTask('math-2', 'Практика: 5 задач')}
                    </div>
                `;
            } else if (energyLevel === 'medium') {
                summary.innerHTML = `<strong>Сегодня — 1 ч 15 мин (Сниженная нагрузка)</strong>`;
                container.innerHTML = `
                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-code text-blue"></i> Информатика</div>
                            <div class="subject-time">45 мин</div>
                        </div>
                        ${renderTask('inf-m1', 'Посмотреть урок')}
                        ${renderTask('inf-m2', `Решить 3 задачи ЕГЭ ${currentTasks[0]}`)}
                    </div>
                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-book-open text-green"></i> Русский язык</div>
                            <div class="subject-time">30 мин</div>
                        </div>
                        ${renderTask('rus-m1', 'Повторение старых ошибок')}
                    </div>
                `;
            } else {
                summary.innerHTML = `<strong>Сегодня — 15 мин (День отдыха)</strong>`;
                container.innerHTML = `
                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-bed text-blue"></i> Разгрузочный день</div>
                            <div class="subject-time">15 мин</div>
                        </div>
                        ${renderTask('rest-1', 'Быстрое повторение карточек (Русский)')}
                        ${renderTask('rest-2', 'Просмотр одного видео без практики')}
                    </div>
                `;
            }
        } catch (e) {
            console.error(e);
            container.innerHTML = `<p>Ошибка генерации расписания.</p>`;
        }
    },

    toggleTask(taskId) {
        const today = new Date().toISOString().split('T')[0];
        const stateKey = 'ege_planner_state_' + today;
        let savedState = JSON.parse(localStorage.getItem(stateKey) || "{}");
        
        savedState[taskId] = !savedState[taskId];
        localStorage.setItem(stateKey, JSON.stringify(savedState));
        
        // Re-render the active tasks visually
        const taskEl = document.querySelector(`[data-task-id="${taskId}"]`);
        const icon = taskEl.querySelector('i');
        
        if (savedState[taskId]) {
            taskEl.classList.add('completed');
            icon.className = 'fa-regular fa-square-check text-green';
            
            // Add to global progress slightly
            const prog = StorageManager.getProgress();
            prog.informatics.completedTasks++; // Mocking simple progress addition
            StorageManager.saveProgress(prog);
        } else {
            taskEl.classList.remove('completed');
            icon.className = 'fa-regular fa-square text-secondary';
        }
        
        // Refresh dashboard stats
        app.updateDashboardStats();
    }
};
