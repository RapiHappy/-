// Trainer logic for daily mini-exams and smart practice
const trainerSystem = {
    render() {
        const container = document.getElementById('trainer-container');
        container.innerHTML = `
            <div class="subject-block">
                <div class="subject-header">
                    <div class="subject-title">Ежедневный Мини-Экзамен</div>
                </div>
                <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">
                    10 минут: 3 инфа, 2 матем, 3 русский.
                </p>
                <button class="btn btn-primary" style="width: 100%;" onclick="trainerSystem.startExam()">Начать тест</button>
            </div>
        `;
    },

    startExam() {
        const container = document.getElementById('trainer-container');
        container.innerHTML = `
            <div class="subject-block" style="text-align: center;">
                <h3>Задание загружается...</h3>
                <p>Здесь будет рендер задачи из JSON базы.</p>
                <br>
                <button class="btn btn-secondary" onclick="trainerSystem.render()">Завершить</button>
            </div>
        `;
    }
};

document.querySelector('[data-target="trainer"]').addEventListener('click', () => {
    trainerSystem.render();
});
