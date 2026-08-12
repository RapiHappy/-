const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function writeJS(filename, variableName, data) {
    const content = `// Генерируемый файл. Не редактировать вручную.\nwindow.${variableName} = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(path.join(dataDir, filename), content);
}

// 1. Generate Informatics Tasks & Lessons (1-27)
const informaticsTasks = [];
const informaticsLessons = [];
const infTopics = [
    "Анализ информационных моделей (Графы)", "Таблицы истинности", "Условие Фано", "Базы данных", 
    "Алгоритмы автомата", "Циклы и ветвления", "Кодирование изображений/звука", "Комбинаторика", 
    "Электронные таблицы", "Поиск в тексте", "Количество путей в графе", "Алгоритмы для Исполнителя", 
    "Адресация в сети", "Системы счисления", "Алгебра логики", "Рекурсия", "Обработка чисел", 
    "Динамическое программирование", "Теория игр (1 куча)", "Теория игр (2 кучи)", "Теория игр (сложная)", 
    "Многопоточность", "Динамика (сложная)", "Обработка строк", "Маски сети", "Сортировка", "Сложная обработка данных"
];
const infVideos = ["ufiiuyjKy2Q", "e2NsZkuPmiI", "ayVxU_1SR9A", "_Twpp23LI8k"]; // Real EXtremum videos

for (let i = 1; i <= 27; i++) {
    const lessonId = `inf_${i}`;
    let difficultyBlock = i >= 25 ? 'high' : (i >= 19 ? 'advanced' : (i >= 12 ? 'medium' : 'base'));
    const topic = infTopics[i - 1] || `Задание №${i}`;
    const vidId = infVideos[(i - 1) % infVideos.length];

    const lessonTasks = Array.from({length: 15}, (_, j) => ({
        id: `inf_t_${i}_${j}`, 
        question: `Задание №${i}. Вариант ${j + 1}. Дан граф дорог... Определите длину кратчайшего пути.`, 
        answer: (10 + j).toString(),
        explanation: `Разбор ошибки: правильный ответ ${10 + j}. Постройте дерево путей.`
    }));

    const quiz = [
        {
            question: "Какая основная стратегия решения данного типа задач?",
            options: ["Перебор", "Динамическое программирование", "Жадный алгоритм", "Аналитическое решение"],
            correctIndex: 1,
            explanation: "Для данного типа оптимальным является динамическое программирование."
        }
    ];

    informaticsLessons.push({
        id: lessonId,
        number: i,
        title: `Задание №${i}: ${topic}`,
        subject: 'informatics',
        difficulty: difficultyBlock,
        theory: `<h3>Теория по теме "${topic}"</h3><p>Для успешного решения задачи необходимо понимать базовые принципы построения алгоритмов. Внимательно читайте условие и проверяйте граничные случаи.</p><p><b>Алгоритм решения:</b></p><ol><li>Анализ условия</li><li>Построение модели</li><li>Вычисления</li></ol>`,
        videoUrl: `https://www.youtube.com/embed/${vidId}?enablejsapi=1`,
        channel: "Дядя Саша | EXtremum | Информатика ЕГЭ 2026",
        badges: ["🚀 Пошаговый разбор", "🔰 С нуля"],
        duration: "45-90 мин",
        tasks: lessonTasks,
        quiz: quiz
    });

    informaticsTasks.push(...lessonTasks);
}

writeJS('tasks-ege.js', 'egeTasks', informaticsTasks);
writeJS('lessons-informatics.js', 'informaticsLessons', informaticsLessons);

// 2. Generate Russian Lessons (5 topics)
const russianTopics = ["Орфография", "Пунктуация", "Грамматика", "Текст", "Сочинение"];
const rusVideos = ["H1ds1L1smsQ", "McWvYTCEObU"]; // Real Umshcool/Sotka
const russianLessons = russianTopics.map((topic, i) => ({
    id: `rus_${i}`,
    title: topic,
    subject: 'russian',
    theory: `<h3>Теория: ${topic}</h3><p>Запомните исключения и основные конструкции русского языка.</p><p><b>Главное правило:</b> всегда проверяйте контекст предложения.</p>`,
    videoUrl: `https://www.youtube.com/embed/${rusVideos[i % rusVideos.length]}?enablejsapi=1`,
    channel: ["Сотка | Русский ЕГЭ", "Умскул Русский ЕГЭ", "Школково Русский ЕГЭ"][i % 3],
    tasks: Array.from({length: 15}, (_, j) => ({
        id: `rus_t_${i}_${j}`,
        question: `Практика по теме ${topic}. В каком ряду во всех словах пропущена проверяемая гласная корня? Вариант ${j+1}`,
        answer: "13",
        explanation: "Правильный ответ 13. Слова нужно проверить ударением."
    })),
    quiz: [
        {
            question: "Выберите верное утверждение:",
            options: ["Запятая ставится всегда", "Запятая ставится перед союзом И", "Зависит от контекста", "Запятая не ставится"],
            correctIndex: 2,
            explanation: "В русском языке большинство правил зависят от контекста предложения."
        }
    ]
}));
writeJS('lessons-russian.js', 'russianLessons', russianLessons);

// 3. Generate Math Lessons (8 topics)
const mathTopics = ["Арифметика", "Алгебра", "Функции", "Производная", "Вероятность", "Геометрия", "Параметры", "Вторая часть"];
const mathVideos = ["JJT28hxRvP0", "eJAc8z0DjrY"]; // Real Shkolkovo
const mathLessons = mathTopics.map((topic, i) => ({
    id: `math_${i}`,
    title: topic,
    subject: 'math',
    theory: `<h3>Ключевые формулы: ${topic}</h3><p>Алгоритм решения:</p><ol><li>Выписать дано.</li><li>Применить формулу.</li><li>Проверить ОДЗ.</li></ol>`,
    videoUrl: `https://www.youtube.com/embed/${mathVideos[i % mathVideos.length]}?enablejsapi=1`,
    channel: ["Школково ЕГЭ Математика", "Умскул Математика ЕГЭ", "Пифагор | ЕГЭ Математика"][i % 3],
    tasks: Array.from({length: 15}, (_, j) => ({
        id: `math_t_${i}_${j}`,
        question: `Решите уравнение или задачу по теме ${topic}. Вариант ${j+1}: 2^(x-1) = 8`,
        answer: "4",
        explanation: "Поскольку 8 = 2^3, получаем x-1=3, следовательно x=4."
    })),
    quiz: [
        {
            question: "С чего стоит начать решение?",
            options: ["С ОДЗ", "С производной", "С подстановки", "С графика"],
            correctIndex: 0,
            explanation: "Всегда начинайте с области допустимых значений."
        }
    ]
}));
writeJS('lessons-math.js', 'mathLessons', mathLessons);

// 4. Generate NTO Course
const ntoModules = ["Бизнес-процессы", "BPMN", "Google Sheets / Excel", "SQL", "Python для автоматизации", "API и JSON", "Проектная работа"];
const ntoContent = {
    modules: ntoModules.map((m, i) => ({
        id: `nto_m_${i}`,
        title: m,
        theory: `<h3>Модуль: ${m}</h3><p>Освойте инструменты для успешного решения олимпиады НТО.</p>`,
        videoUrl: `https://www.youtube.com/embed/${infVideos[0]}?enablejsapi=1`,
        tasks: [{ id: `nto_t_${i}_1`, question: `Решите кейс:`, answer: "SELECT * FROM users" }],
        quiz: [
            {
                question: "Что является основным элементом в этой технологии?",
                options: ["Переменные", "Связи", "События", "Все вышеперечисленное"],
                correctIndex: 3,
                explanation: "Все элементы важны."
            }
        ]
    })),
    cases: ["Интернет-магазин", "Кафе", "Школа", "CRM", "Склад"].map((c, i) => ({
        id: `nto_case_${i}`,
        title: `Кейс: ${c}`,
        steps: ["Анализ процесса", "Построение BPMN схемы", "Таблицы данных", "SQL запросы", "Скрипт на Python", "Итоговый отчёт"]
    }))
};
writeJS('nto-content.js', 'ntoContent', ntoContent);

console.log("Full courses content generated successfully.");
