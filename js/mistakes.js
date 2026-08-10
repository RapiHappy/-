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
                <div class="subject-block" style="margin-bottom: 12px; border-left: 4px solid var(--color-red);" id="mistake-card-${index}">
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
        const errors = StorageManager.getErrors();
        const err = errors[index];
        if (!err) return;
        
        const card = document.getElementById(`mistake-card-${index}`);
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Повторение • ${err.subject}</span>
            </div>
            <p style="font-size: 14px; margin-bottom: 12px;"><strong>Вопрос:</strong> ${err.question}</p>
            <input type="text" id="mistake-answer-${index}" placeholder="Введите верный ответ..." style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; margin-bottom: 12px;">
            <div style="display: flex; gap: 8px;">
                <button class="btn btn-primary" style="flex: 1; padding: 10px;" onclick="mistakesSystem.checkRepeat(${index})">Проверить</button>
                <button class="btn btn-secondary" style="flex: 1; padding: 10px;" onclick="mistakesSystem.render()">Отмена</button>
            </div>
        `;
    },
    
    checkRepeat(index) {
        const errors = StorageManager.getErrors();
        const err = errors[index];
        const input = document.getElementById(`mistake-answer-${index}`).value.trim();
        
        if (input.toLowerCase() === err.correctAnswer.toLowerCase()) {
            // Remove from errors
            errors.splice(index, 1);
            localStorage.setItem(StorageManager.keys.ERRORS, JSON.stringify(errors));
            alert("Верно! Ошибка отработана и удалена из списка.");
            
            // Re-render
            this.render();
        } else {
            alert("Всё ещё неверно. Попробуйте еще раз или посмотрите теорию!");
            this.render();
        }
    }
};

document.querySelector('[data-target="errors"]').addEventListener('click', () => {
    mistakesSystem.render();
});
