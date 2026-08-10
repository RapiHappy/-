// Dynamic generation of daily study plans based on energy level
const plannerSystem = {
    init() {
        // Will be called by burnoutSystem after energy is determined
    },

    generatePlan(energyLevel) {
        const container = document.getElementById('daily-plan-container');
        container.innerHTML = ''; // Clear current

        let planHTML = '';
        
        if (energyLevel === 'high') {
            planHTML = `
                <div class="subject-block">
                    <div class="subject-header">
                        <div class="subject-title"><i class="fa-solid fa-code text-blue"></i> Информатика</div>
                        <div class="subject-time">60 мин</div>
                    </div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Урок Stepik: Алгоритмы</div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> 15 задач (практика)</div>
                </div>
                
                <div class="subject-block">
                    <div class="subject-header">
                        <div class="subject-title"><i class="fa-solid fa-calculator text-orange"></i> Математика</div>
                        <div class="subject-time">60 мин</div>
                    </div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Видеоразбор: Параметры</div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> 10 задач (практика)</div>
                </div>

                <div class="subject-block">
                    <div class="subject-header">
                        <div class="subject-title"><i class="fa-solid fa-book-open text-green"></i> Русский язык</div>
                        <div class="subject-time">30 мин</div>
                    </div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Теория: Орфография</div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Тест из 10 вопросов</div>
                </div>
            `;
        } else if (energyLevel === 'medium') {
            planHTML = `
                <div class="subject-block">
                    <div class="subject-header">
                        <div class="subject-title"><i class="fa-solid fa-code text-blue"></i> Информатика</div>
                        <div class="subject-time">40 мин</div>
                    </div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Урок Stepik: Алгоритмы</div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> 5 задач</div>
                </div>
                
                <div class="subject-block">
                    <div class="subject-header">
                        <div class="subject-title"><i class="fa-solid fa-calculator text-orange"></i> Математика</div>
                        <div class="subject-time">30 мин</div>
                    </div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Повторение старых ошибок</div>
                </div>
            `;
        } else {
            planHTML = `
                <div class="subject-block">
                    <div class="subject-header">
                        <div class="subject-title"><i class="fa-solid fa-bed text-blue"></i> Разгрузочный день</div>
                        <div class="subject-time">15 мин</div>
                    </div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Быстрое повторение карточек (Русский)</div>
                    <div class="task-item" onclick="this.classList.toggle('completed')"><i class="fa-regular fa-square"></i> Одно видео без практики</div>
                </div>
            `;
        }

        container.innerHTML = planHTML;
    }
};
