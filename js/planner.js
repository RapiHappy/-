const plannerSystem = {
    async generatePlan(energyLevel) {
        const container = document.getElementById('daily-plan-container');
        const summary = document.getElementById('plan-summary-time');
        
        container.innerHTML = '<p>Загрузка плана...</p>';
        
        try {
            const res = await fetch('data/schedule.json');
            const schedule = await res.json();
            
            // Get current month in english lowercase
            const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
            const currentMonth = monthNames[new Date().getMonth()];
            
            const currentTasks = schedule[currentMonth] || ["№1"]; // fallback
            const tasksString = currentTasks.join(', ');

            if (energyLevel === 'high') {
                summary.innerHTML = `<strong>Сегодня — 2 ч 15 мин</strong>`;
                container.innerHTML = `
                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-code text-blue"></i> Информатика</div>
                            <div class="subject-time">55 мин</div>
                        </div>
                        <p style="font-size:12px; color:var(--text-secondary); margin-bottom:8px;">Месячный план: ${tasksString}</p>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Посмотреть урок: Циклы for</div>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Решить задания Stepik</div>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Решить 5 задач ЕГЭ ${currentTasks[0]}</div>
                    </div>
                    
                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-book-open text-green"></i> Русский язык</div>
                            <div class="subject-time">40 мин</div>
                        </div>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Урок: Орфография</div>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Тест из 10 вопросов</div>
                    </div>

                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-calculator text-orange"></i> Математика</div>
                            <div class="subject-time">40 мин</div>
                        </div>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Теория: Функции</div>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Практика: 5 задач</div>
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
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Посмотреть урок</div>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Решить 3 задачи ЕГЭ ${currentTasks[0]}</div>
                    </div>
                    <div class="subject-block">
                        <div class="subject-header">
                            <div class="subject-title"><i class="fa-solid fa-book-open text-green"></i> Русский язык</div>
                            <div class="subject-time">30 мин</div>
                        </div>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Повторение старых ошибок</div>
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
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Быстрое повторение карточек (Русский)</div>
                        <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Просмотр одного видео без практики</div>
                    </div>
                `;
            }
        } catch (e) {
            container.innerHTML = `<p>Ошибка загрузки расписания.</p>`;
        }
    }
};
