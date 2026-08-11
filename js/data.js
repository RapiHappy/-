// Main data index - aggregates all content modules into structured courses
window.AppData = {
  // Structured courses with modules (for courses.js navigation)
  get courses() {
    return [
      {
        id: 'info-python',
        title: 'Python для ЕГЭ',
        subject: 'informatics',
        icon: '🐍',
        level: 'Начинающий',
        description: 'С нуля до профи в Python для ЕГЭ.',
        stepikUrl: 'https://stepik.org/course/207789',
        modules: [
          {
            id: 'mod-py-basics',
            title: '1. Основы Python',
            lessons: (window.LessonsInformatics || []).filter(l =>
              ['inf-lesson-4', 'inf-lesson-5', 'inf-lesson-6'].includes(l.id)
            )
          },
          {
            id: 'mod-py-data',
            title: '2. Структуры данных',
            lessons: (window.LessonsInformatics || []).filter(l =>
              ['inf-lesson-7', 'inf-lesson-8'].includes(l.id)
            )
          }
        ]
      },
      {
        id: 'info-algo',
        title: 'Алгоритмы и ЕГЭ',
        subject: 'informatics',
        icon: '🧮',
        level: 'Продвинутый',
        description: 'Все задания ЕГЭ по информатике.',
        stepikUrl: 'https://stepik.org/course/214479',
        modules: [
          {
            id: 'mod-algo-basics',
            title: '1. Системы счисления и логика',
            lessons: (window.LessonsInformatics || []).filter(l =>
              ['inf-lesson-1', 'inf-lesson-2', 'inf-lesson-3'].includes(l.id)
            )
          },
          {
            id: 'mod-algo-advanced',
            title: '2. Алгоритмы',
            lessons: (window.LessonsInformatics || []).filter(l =>
              ['inf-lesson-9', 'inf-lesson-10'].includes(l.id)
            )
          }
        ]
      },
      {
        id: 'rus-2026',
        title: 'Русский язык ЕГЭ 2026',
        subject: 'russian',
        icon: '📖',
        level: 'Любой',
        description: 'Подготовка к тестовой части и сочинению.',
        stepikUrl: 'https://stepik.org/course/92015',
        modules: [
          {
            id: 'mod-rus-orfography',
            title: '1. Орфография',
            lessons: (window.LessonsRussian || []).filter(l =>
              ['rus-lesson-3', 'rus-lesson-4'].includes(l.id)
            )
          },
          {
            id: 'mod-rus-speech',
            title: '2. Речевые нормы',
            lessons: (window.LessonsRussian || []).filter(l =>
              ['rus-lesson-1', 'rus-lesson-2'].includes(l.id)
            )
          },
          {
            id: 'mod-rus-punct',
            title: '3. Пунктуация и сочинение',
            lessons: (window.LessonsRussian || []).filter(l =>
              ['rus-lesson-5', 'rus-lesson-6'].includes(l.id)
            )
          }
        ]
      },
      {
        id: 'math-2026',
        title: 'Математика ЕГЭ 2026',
        subject: 'math',
        icon: '📐',
        level: 'Любой',
        description: 'Подготовка к базе и профилю.',
        modules: [
          {
            id: 'mod-math-core',
            title: '1. Основные темы',
            lessons: (window.LessonsMath || [])
          }
        ]
      }
    ];
  },

  // Flat lesson arrays for direct access
  get allLessons() {
    return [].concat(
      window.LessonsInformatics || [],
      window.LessonsRussian || [],
      window.LessonsMath || []
    );
  },

  // Find any lesson by ID across all subjects
  findLesson(lessonId) {
    return this.allLessons.find(l => l.id === lessonId) || null;
  },

  get lessonsInformatics() { return window.LessonsInformatics || []; },
  get lessonsRussian() { return window.LessonsRussian || []; },
  get lessonsMath() { return window.LessonsMath || []; },
  get tasksEGE() { return window.TasksEGE || {}; },
  get ntoContent() { return window.NTOContent || {}; },

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
