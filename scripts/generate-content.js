const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

// Helper to write file
function writeJS(filename, variableName, data) {
    const content = `// Генерируемый файл. Не редактировать вручную.\nwindow.${variableName} = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(path.join(dataDir, filename), content);
}

// 1. Generate Informatics Tasks & Lessons (1-27)
const informaticsTasks = [];
const informaticsLessons = [];
const extremumVideos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ"
];

for (let i = 1; i <= 27; i++) {
    const lessonId = `inf_${i}`;
    let difficultyBlock = 'base';
    if (i >= 12 && i <= 18) difficultyBlock = 'medium';
    if (i >= 19 && i <= 24) difficultyBlock = 'advanced';
    if (i >= 25 && i <= 27) difficultyBlock = 'high';

    informaticsLessons.push({
        id: lessonId,
        number: i,
        title: `Задание №${i}`,
        subject: 'informatics',
        difficulty: difficultyBlock,
        theory: `Теория для задания №${i}. Здесь описываются основные алгоритмы и формулы.`,
        examples: [
            { question: `Пример 1 для №${i}`, answer: "Ответ 1" },
            { question: `Пример 2 для №${i}`, answer: "Ответ 2" },
            { question: `Пример 3 для №${i}`, answer: "Ответ 3" }
        ],
        videoUrl: `https://www.youtube.com/embed/jfKfPfyJRdk`,
        channel: "Дядя Саша | EXtremum",
        badges: ["😄 Нескучно", "🚀 Легко понять", "🔰 С нуля"],
        duration: "15:00"
    });

    const diffs = [
        ...Array(10).fill('easy'),
        ...Array(10).fill('medium'),
        ...Array(5).fill('hard')
    ];

    diffs.forEach((diff, idx) => {
        informaticsTasks.push({
            id: `inf_t_${i}_${idx}`,
            lessonId: lessonId,
            subject: 'informatics',
            taskNumber: i,
            difficulty: diff,
            question: `Задача №${i} (${diff}). Условие задачи ${idx + 1}...`,
            answer: "42",
            explanation: `Разбор ошибки: правильный ответ 42, потому что...`
        });
    });
}

writeJS('tasks-ege.js', 'egeTasks', informaticsTasks);
writeJS('lessons-informatics.js', 'informaticsLessons', informaticsLessons);

// 2. Generate Russian Lessons
const russianTopics = ["Орфография", "Пунктуация", "Грамматика", "Лексика", "Текст", "Сочинение"];
const russianLessons = russianTopics.map((topic, i) => ({
    id: `rus_${i}`,
    title: topic,
    subject: 'russian',
    theory: `Теория по теме ${topic}.`,
    videoUrl: `https://www.youtube.com/embed/jfKfPfyJRdk`,
    channel: ["Сотка | Русский ЕГЭ", "Умскул Русский ЕГЭ", "Школково Русский ЕГЭ"][i % 3],
    examples: [{ question: `Пример 1 ${topic}`, answer: "Ответ" }],
    tasks: Array.from({length: 15}, (_, j) => ({
        id: `rus_t_${i}_${j}`,
        question: `Вопрос по теме ${topic} #${j}`,
        answer: "1"
    }))
}));
writeJS('lessons-russian.js', 'russianLessons', russianLessons);

// 3. Generate Math Lessons
const mathTopics = ["Арифметика", "Алгебра", "Функции", "Производная", "Вероятность", "Планиметрия", "Стереометрия", "Параметры", "Экономические задачи", "Вторая часть"];
const mathLessons = mathTopics.map((topic, i) => ({
    id: `math_${i}`,
    title: topic,
    subject: 'math',
    theory: `Теория по теме ${topic}. Пошаговый алгоритм: 1. 2. 3.`,
    formulas: ["a^2 + b^2 = c^2"],
    videoUrl: `https://www.youtube.com/embed/jfKfPfyJRdk`,
    channel: ["Школково ЕГЭ Математика", "Умскул Математика ЕГЭ", "Пифагор | ЕГЭ Математика"][i % 3],
    examples: [{ question: `Пример 1 ${topic}`, answer: "Ответ" }],
    tasks: Array.from({length: 15}, (_, j) => ({
        id: `math_t_${i}_${j}`,
        question: `Вопрос по теме ${topic} #${j}`,
        answer: "1"
    }))
}));
writeJS('lessons-math.js', 'mathLessons', mathLessons);

// 4. Generate NTO Course
const ntoModules = ["Бизнес-процессы", "BPMN", "Google Sheets / Excel", "SQL", "Python для автоматизации", "API и JSON", "Проектная работа"];
const ntoCases = ["интернет-магазин", "кафе", "школа", "CRM", "склад"];
const ntoContent = {
    modules: ntoModules.map((m, i) => ({
        id: `nto_m_${i}`,
        title: m,
        theory: `Изучение модуля ${m}`,
        videoUrl: `https://www.youtube.com/embed/jfKfPfyJRdk`,
        tasks: [{ id: `nto_t_${i}_1`, question: `Задача по ${m}`, answer: "готово" }]
    })),
    cases: ntoCases.map((c, i) => ({
        id: `nto_case_${i}`,
        title: `Кейс: ${c}`,
        steps: ["анализ процесса", "BPMN", "таблицы", "SQL", "Python", "отчёт"]
    }))
};
writeJS('nto-content.js', 'ntoContent', ntoContent);

console.log("Content generated successfully.");
console.log(`Generated ${informaticsTasks.length} informatics tasks.`);
