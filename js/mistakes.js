const mistakesSystem = {
    render() {
        const errors = StorageManager.getErrors();
        const container = document.getElementById('errors-list');
        
        if (!errors || errors.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                    <i class="fa-solid fa-check-circle" style="font-size: 48px; margin-bottom: 16px; color: var(--color-green); opacity: 0.5;"></i>
                    <h3>Ошибок пока нет!</h3>
                    <p>Отличная работа.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        errors.forEach((err, index) => {
            container.innerHTML += `
                <div class="subject-block" style="margin-bottom: 12px; border-left: 4px solid var(--color-red);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-size: 12px; color: var(--text-secondary);">${err.date} • ${err.subject}</span>
                        <span style="font-size: 12px; color: var(--color-orange);"><i class="fa-solid fa-clock-rotate-left"></i> К повторению</span>
                    </div>
                    <p style="font-size: 14px; margin-bottom: 12px;"><strong>Вопрос:</strong> ${err.question}</p>
                    <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                        <p style="font-size: 13px; color: var(--color-red); margin-bottom: 4px;">Ваш ответ: <span style="text-decoration: line-through;">${err.userAnswer}</span></p>
                        <p style="font-size: 13px; color: var(--color-green);">Правильный: ${err.correctAnswer}</p>
                    </div>
                    <button class="btn btn-secondary" style="width: 100%; font-size: 14px; padding: 10px;" onclick="mistakesSystem.repeat(${index})">Повторить сейчас</button>
                </div>
            `;
        });
    },

    repeat(index) {
        alert("Запуск повторения... (заглушка)");
        // In real app, it would open trainer with this specific question
        // and if answered correctly, remove from errors.
    }
};

document.querySelector('[data-target="errors"]').addEventListener('click', () => {
    mistakesSystem.render();
});
