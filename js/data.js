// Main data index - aggregates all content modules into structured courses
window.AppData = {
  // Structured courses with modules (for courses.js navigation)
  get courses() {
    return [
      {
        id: 'info-course',
        title: 'Информатика ЕГЭ',
        subject: 'informatics',
        icon: '💻',
        level: 'С нуля до 100 баллов',
        description: 'Полный курс по информатике.',
        modules: [
          {
            id: 'mod-inf-all',
            title: '1. Все задания',
            lessons: window.informaticsLessons || []
          }
        ]
      },
      {
        id: 'rus-course',
        title: 'Русский язык ЕГЭ',
        subject: 'russian',
        icon: '📖',
        level: 'Любой',
        description: 'Подготовка к тестовой части и сочинению.',
        modules: [
          {
            id: 'mod-rus-all',
            title: '1. Все темы',
            lessons: window.russianLessons || []
          }
        ]
      },
      {
        id: 'math-course',
        title: 'Математика ЕГЭ',
        subject: 'math',
        icon: '📐',
        level: 'Любой',
        description: 'Подготовка к базе и профилю.',
        modules: [
          {
            id: 'mod-math-all',
            title: '1. Основные темы',
            lessons: window.mathLessons || []
          }
        ]
      }
    ];
  },

  // Flat lesson arrays for direct access
  get allLessons() {
    return [].concat(
      window.informaticsLessons || [],
      window.russianLessons || [],
      window.mathLessons || []
    );
  },

  // Find any lesson by ID across all subjects
  findLesson(lessonId) {
    return this.allLessons.find(l => l.id === lessonId) || null;
  },

  get lessonsInformatics() { return window.informaticsLessons || []; },
  get lessonsRussian() { return window.russianLessons || []; },
  get lessonsMath() { return window.mathLessons || []; },
  get tasksEGE() { return window.egeTasks || {}; },
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
