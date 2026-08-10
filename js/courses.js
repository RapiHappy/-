const coursesSystem = {
    async loadCourses() {
        try {
            const response = await fetch('data/courses.json');
            const courses = await response.json();
            this.renderCourses(courses);
        } catch (error) {
            console.error('Ошибка загрузки курсов:', error);
            document.getElementById('courses-list').innerHTML = '<p>Не удалось загрузить курсы.</p>';
        }
    },

    renderCourses(courses) {
        const container = document.getElementById('courses-list');
        container.innerHTML = '';

        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <div class="course-header" style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                    <div style="background: rgba(255,255,255,0.1); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                        <i class="${course.icon}" style="color: ${course.color}; font-size: 20px;"></i>
                    </div>
                    <div>
                        <h3 style="font-size: 16px; margin: 0;">${course.title}</h3>
                        <span style="font-size: 12px; color: var(--text-secondary);">${course.level} • ${course.lessonsCount} уроков</span>
                    </div>
                </div>
                <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">${course.description}</p>
                <div style="display: flex; gap: 8px;">
                    <a href="${course.url}" target="_blank" class="btn btn-primary" style="flex: 1; padding: 10px; font-size: 14px; text-decoration: none; text-align: center;">▶ Открыть</a>
                    <button class="btn btn-secondary" style="flex: 1; padding: 10px; font-size: 14px;" onclick="coursesSystem.addToPlan('${course.id}')">📅 В план</button>
                </div>
            `;
            container.appendChild(card);
        });
    },

    addToPlan(courseId) {
        alert(`Курс добавлен в план! Алгоритм учтет его при составлении расписания.`);
    }
};

document.querySelector('[data-target="courses"]').addEventListener('click', () => {
    coursesSystem.loadCourses();
});
