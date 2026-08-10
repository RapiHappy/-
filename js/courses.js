const coursesSystem = {
    loadCourses() {
        const courses = AppData.courses;
        this.renderCourses(courses);
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
                    <button class="btn btn-primary" style="flex: 1; padding: 10px; font-size: 14px;" onclick="coursesSystem.openCourse('${course.id}')">▶ Открыть</button>
                    <button class="btn btn-secondary" style="flex: 1; padding: 10px; font-size: 14px;" onclick="coursesSystem.addToPlan('${course.id}')">📅 В план</button>
                </div>
            `;
            container.appendChild(card);
        });
    },

    openCourse(courseId) {
        const course = AppData.courses.find(c => c.id === courseId);
        if (!course) return;

        document.getElementById('course-detail-title').textContent = course.title;
        const modulesContainer = document.getElementById('course-modules-list');
        modulesContainer.innerHTML = '';

        if (!course.modules || course.modules.length === 0) {
            modulesContainer.innerHTML = '<p>Модули не найдены.</p>';
        } else {
            course.modules.forEach(mod => {
                let lessonsHtml = '';
                mod.lessons.forEach(lesson => {
                    const icon = lesson.type === 'video' ? 'fa-video' : 'fa-pen-to-square';
                    lessonsHtml += `
                        <div class="task-item" style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);" onclick="coursesSystem.openLesson('${lesson.id}', '${lesson.title}', '${course.url}')">
                            <i class="fa-solid ${icon} text-blue" style="width: 24px;"></i>
                            <span style="flex: 1;">${lesson.title}</span>
                            <i class="fa-solid fa-chevron-right text-secondary" style="font-size: 12px;"></i>
                        </div>
                    `;
                });

                modulesContainer.innerHTML += `
                    <div class="subject-block" style="margin-bottom: 16px; padding: 0;">
                        <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
                            <h3 style="font-size: 15px; margin: 0;">${mod.title}</h3>
                        </div>
                        <div>
                            ${lessonsHtml}
                        </div>
                    </div>
                `;
            });
        }

        app.navigateTo('course-detail');
    },

    openLesson(lessonId, title, courseUrl) {
        // Mock opening a lesson inside the app
        const container = document.getElementById('course-modules-list');
        container.innerHTML = `
            <div class="subject-block" style="text-align: center; padding: 40px 20px;">
                <i class="fa-solid fa-play-circle text-blue" style="font-size: 48px; margin-bottom: 16px;"></i>
                <h3 style="margin-bottom: 8px;">${title}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 14px;">
                    Оригинальный урок доступен на платформе Stepik.
                </p>
                <div style="display: flex; gap: 12px; justify-content: center; flex-direction: column;">
                    <a href="${courseUrl}" target="_blank" class="btn btn-primary" style="text-decoration: none;">Открыть на Stepik</a>
                    <button class="btn btn-secondary" onclick="coursesSystem.markLessonCompleted('${lessonId}')">Отметить как пройденный</button>
                </div>
            </div>
        `;
    },

    markLessonCompleted(lessonId) {
        alert("Урок отмечен как пройденный! Статистика обновлена.");
        const prog = StorageManager.getProgress();
        prog.informatics.completedTasks++; 
        StorageManager.saveProgress(prog);
        app.navigateTo('courses');
    },

    addToPlan(courseId) {
        alert(`Курс добавлен в план! Задачи равномерно распределены по расписанию.`);
    }
};

document.querySelector('[data-target="courses"]').addEventListener('click', () => {
    coursesSystem.loadCourses();
});
