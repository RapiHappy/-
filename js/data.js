// Main data index - aggregates all content modules into structured courses
window.AppData = {
  // Structured courses with modules (for courses.js navigation)
  get courses() {
    return [
      window.mathCourse,
      window.infCourse,
      window.rusCourse,
      window.ntoCourse
    ].filter(Boolean); // Only return defined courses
  },

  // Flat lesson arrays for direct access
  get allLessons() {
    let all = [];
    this.courses.forEach(course => {
      if (course.phases) {
        course.phases.forEach(phase => {
          if (phase.topics) {
            phase.topics.forEach(topic => {
              if (topic.lessons) {
                // Attach course/phase/topic info to lesson for planner context
                topic.lessons.forEach((l, index) => {
                  l.courseId = course.id;
                  l.courseTitle = course.title;
                  l.courseIcon = course.icon;
                  l.phaseTitle = phase.title;
                  l.topicTitle = topic.title;
                  l.lessonIndex = index + 1;
                  l.totalLessons = topic.lessons.length;
                  all.push(l);
                });
              }
            });
          }
        });
      }
    });
    return all;
  },

  // Find any lesson by ID across all subjects
  findLesson(lessonId) {
    return this.allLessons.find(l => l.id === lessonId) || null;
  },

  get tasksEGE() { return window.egeTasks || {}; },

  schedule: {
    "august": ["№4", "№7", "№11"],
    "september": ["№3", "№9", "№18"],
    "october": ["№2", "№6", "№5-14"],
    "november": ["№16", "№23", "№19-21"],
    "december": ["№13"],
    "january": ["№9", "№17", "№22"],
    "february": ["№25", "№27"],
    "march": ["№26", "№24"],
    "april": ["повторение №21-27"],
    "may": ["полное повторение"]
  },

  miniExam: [
    { id: "exam-inf-1", subject: "informatics", question: "Сколько мегабайт содержится в 8192 килобайтах?", answer: "8" },
    { id: "exam-inf-2", subject: "informatics", question: "Запишите число 15 в двоичной системе счисления.", answer: "1111" },
    { id: "exam-inf-3", subject: "informatics", question: "Каково наибольшее двузначное число в шестнадцатеричной системе?", answer: "FF" },
    { id: "exam-math-1", subject: "math", question: "Найдите производную функции y = 3x^2 в точке x = 2.", answer: "12" },
    { id: "exam-math-2", subject: "math", question: "Решите уравнение 2^x = 16. В ответ запишите значение x.", answer: "4" },
    { id: "exam-rus-1", subject: "russian", question: "Укажите слово с верным ударением: тОрты, звонИт, красИвее, катАлог.", answer: "звонИт" },
    { id: "exam-rus-2", subject: "russian", question: "Вставьте пропущенную букву: пр..вилегия.", answer: "и" },
    { id: "exam-rus-3", subject: "russian", question: "Вставьте пропущенную букву: апелл..ция.", answer: "я" }
  ]
};
