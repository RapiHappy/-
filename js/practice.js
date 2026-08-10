const practiceSystem = {
    render() {
        const container = document.getElementById('trainer-container');
        container.innerHTML = `
            <div class="subject-block" style="margin-bottom: 16px;">
                <div class="subject-header">
                    <div class="subject-title">Ежедневный Мини-Экзамен</div>
                </div>
                <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">
                    10 минут: 3 инфа, 2 матем, 3 русский.
                </p>
                <button class="btn btn-primary" style="width: 100%;" onclick="practiceSystem.startMiniExam()">Начать тест</button>
            </div>

            <div class="subject-block">
                <div class="subject-header">
                    <div class="subject-title">Тренировка: Информатика №4</div>
                </div>
                <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">
                    Условие Фано, кодирование. 15 задач.
                </p>
                <button class="btn btn-secondary" style="width: 100%;" onclick="practiceSystem.startTraining('info-4')">Решать</button>
            </div>
        `;
    },

    async startMiniExam() {
        const container = document.getElementById('trainer-container');
        container.innerHTML = `<h3>Загрузка...</h3>`;
        try {
            const res = await fetch('data/mini_exam.json');
            this.examData = await res.json();
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.errors = [];
            this.renderQuestion();
        } catch (e) {
            container.innerHTML = `<p>Ошибка загрузки.</p>`;
        }
    },

    renderQuestion() {
        const container = document.getElementById('trainer-container');
        if (this.currentQuestionIndex >= this.examData.length) {
            this.finishExam();
            return;
        }

        const q = this.examData[this.currentQuestionIndex];
        
        container.innerHTML = `
            <div class="subject-block">
                <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px; color: var(--text-secondary);">
                    <span>Вопрос ${this.currentQuestionIndex + 1} из ${this.examData.length}</span>
                    <span>${q.subject}</span>
                </div>
                <p style="font-size: 16px; margin-bottom: 24px; line-height: 1.5;">${q.question}</p>
                <input type="text" id="answer-input" placeholder="Ваш ответ..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; margin-bottom: 16px;">
                <button class="btn btn-primary" style="width: 100%;" onclick="practiceSystem.checkAnswer()">Ответить</button>
            </div>
        `;
    },

    checkAnswer() {
        const input = document.getElementById('answer-input').value.trim();
        const q = this.examData[this.currentQuestionIndex];

        if (input.toLowerCase() === q.answer.toLowerCase()) {
            this.score++;
            // add to progress
            const prog = StorageManager.getProgress();
            prog[q.subject].completedTasks++;
            StorageManager.saveProgress(prog);
        } else {
            this.errors.push({
                subject: q.subject,
                topic: "Мини-экзамен",
                date: new Date().toISOString().split('T')[0],
                question: q.question,
                correctAnswer: q.answer,
                userAnswer: input
            });
            StorageManager.saveError(this.errors[this.errors.length - 1]);
        }

        this.currentQuestionIndex++;
        this.renderQuestion();
    },

    finishExam() {
        const container = document.getElementById('trainer-container');
        const percent = Math.round((this.score / this.examData.length) * 100);
        
        container.innerHTML = `
            <div class="subject-block" style="text-align: center;">
                <h3 style="margin-bottom: 8px;">Экзамен завершен!</h3>
                <p style="font-size: 48px; font-weight: bold; color: ${percent > 70 ? 'var(--color-green)' : 'var(--color-orange)'};">${percent}%</p>
                <p style="margin-bottom: 24px; color: var(--text-secondary);">Верных ответов: ${this.score} из ${this.examData.length}</p>
                <button class="btn btn-primary" style="width: 100%;" onclick="practiceSystem.render()">Вернуться</button>
            </div>
        `;
    },

    async startTraining(type) {
        // Mocking training flow
        alert('Запуск тренировки. Логика аналогична мини-экзамену.');
    }
};

document.querySelector('[data-target="trainer"]').addEventListener('click', () => {
    practiceSystem.render();
});
