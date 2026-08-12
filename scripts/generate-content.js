const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function writeJS(filename, variableName, data) {
    const content = `// Генерируемый файл. Не редактировать вручную.\nwindow.${variableName} = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(path.join(dataDir, filename), content);
}

// Helpers for multi-stage practice
function generatePracticeTasks(topic, level, count, offset) {
    return Array.from({length: count}, (_, j) => {
        const val1 = Math.floor(Math.random() * 10) + level + offset + j;
        const val2 = Math.floor(Math.random() * 10) + level + offset + j + 5;
        return {
            id: `task_${topic.replace(/\s+/g, '')}_l${level}_${offset}_${j}`,
            question: `Практика (${topic}). Уровень ${level}. Вычислите результат: ${val1} + ${val2}`,
            answer: (val1 + val2).toString(),
            explanation: `Объяснение: Мы складываем ${val1} и ${val2}. Получается ${val1 + val2}. Применяйте это правило для всех подобных задач.`
        };
    });
}

// 1. INFORMATICS (27 Topics, each has 3-5 Levels)
const informaticsLessons = [];
const infTopics = [
    "Графы и пути", "Таблицы истинности", "Условие Фано", "Базы данных", 
    "Алгоритмы автомата", "Циклы Черепахи", "Кодирование графики и звука", "Комбинаторика", 
    "Excel базовый", "Поиск в Word", "Пути в ориентированном графе", "Исполнитель Редактор", 
    "IP-адреса и сети", "Системы счисления", "Алгебра логики", "Рекурсивные алгоритмы", "Обработка чисел", 
    "Динамическое программирование", "Теория игр 1 куча", "Теория игр 2 кучи", "Теория игр сложная", 
    "Многопоточность", "Динамика сложных путей", "Обработка строк", "Маски сети", "Сортировка", "Сложная обработка данных"
];
const infVideos = ["ufiiuyjKy2Q", "e2NsZkuPmiI", "ayVxU_1SR9A", "_Twpp23LI8k"]; // EXtremum

for (let i = 1; i <= 27; i++) {
    const topic = infTopics[i - 1];
    
    // Create 4 levels for each topic
    const levelTitles = ["Основы и теория", "Типовые задачи", "Сложные варианты", "Экзаменационный контроль"];
    
    for(let lvl = 1; lvl <= 4; lvl++) {
        const lessonId = `inf_${i}_lvl_${lvl}`;
        const vidId = infVideos[(i + lvl) % infVideos.length];
        
        informaticsLessons.push({
            id: lessonId,
            topicId: `inf_${i}`,
            number: i,
            level: lvl,
            title: `Задание №${i}: ${topic} (Уровень ${lvl}: ${levelTitles[lvl-1]})`,
            subject: 'informatics',
            theory: `<h3>Уровень ${lvl}: ${levelTitles[lvl-1]}</h3><p>Изучаем ${topic}. На этом этапе мы фокусируемся на ${lvl === 1 ? 'базовых правилах и Python-синтаксисе' : 'решении реальных прототипов ФИПИ'}.</p>`,
            videoUrl: lvl <= 2 ? `https://www.youtube.com/embed/${vidId}?enablejsapi=1` : null,
            channel: "Дядя Саша | EXtremum",
            practice: {
                warmup: generatePracticeTasks(topic, lvl, 3, 0),
                base: generatePracticeTasks(topic, lvl, 5, 10),
                advanced: lvl >= 2 ? generatePracticeTasks(topic, lvl, 3, 20) : [],
                control: lvl >= 3 ? generatePracticeTasks(topic, lvl, 3, 30) : []
            },
            quiz: [
                {
                    question: `Проверка понимания уровня ${lvl}. Какое действие является ключевым?`,
                    options: ["Сдаться", "Прочитать условие", "Списать", "Угадать"],
                    correctIndex: 1,
                    explanation: "Всегда внимательно читайте условие, там кроется 90% успеха."
                }
            ]
        });
    }
}
writeJS('lessons-informatics.js', 'informaticsLessons', informaticsLessons);

// 2. RUSSIAN
const russianLessons = [];
const rusTopics = ["Орфография", "Пунктуация", "Грамматика", "Работа с текстом", "Сочинение"];
const rusVideos = ["H1ds1L1smsQ", "McWvYTCEObU"];
rusTopics.forEach((topic, i) => {
    for(let lvl = 1; lvl <= 3; lvl++) {
        russianLessons.push({
            id: `rus_${i}_lvl_${lvl}`,
            topicId: `rus_${i}`,
            level: lvl,
            title: `${topic} (Уровень ${lvl})`,
            subject: 'russian',
            theory: `<h3>${topic}</h3><p>Разбираем правила и исключения.</p>`,
            videoUrl: `https://www.youtube.com/embed/${rusVideos[(i+lvl) % rusVideos.length]}?enablejsapi=1`,
            practice: {
                warmup: generatePracticeTasks(topic, lvl, 3, 0),
                base: generatePracticeTasks(topic, lvl, 5, 10),
                advanced: [],
                control: []
            },
            quiz: [{ question: "Нужна ли тут запятая?", options: ["Да", "Нет"], correctIndex: 0, explanation: "В данном случае причастный оборот стоит после определяемого слова." }]
        });
    }
});
writeJS('lessons-russian.js', 'russianLessons', russianLessons);

// 3. MATH
const mathLessons = [];
const mathTopics = ["База Вычисления", "База Уравнения", "База Планиметрия", "Средний Производная", "Средний Вероятность", "Хард Тригонометрия", "Хард Параметры"];
const mathVideos = ["JJT28hxRvP0", "eJAc8z0DjrY"];
mathTopics.forEach((topic, i) => {
    for(let lvl = 1; lvl <= 3; lvl++) {
        mathLessons.push({
            id: `math_${i}_lvl_${lvl}`,
            topicId: `math_${i}`,
            level: lvl,
            title: `${topic} (Уровень ${lvl})`,
            subject: 'math',
            theory: `<h3>${topic}</h3><p>Разбираем математические формулы и алгоритмы.</p>`,
            videoUrl: `https://www.youtube.com/embed/${mathVideos[(i+lvl) % mathVideos.length]}?enablejsapi=1`,
            practice: {
                warmup: generatePracticeTasks(topic, lvl, 3, 0),
                base: generatePracticeTasks(topic, lvl, 5, 10),
                advanced: [],
                control: []
            },
            quiz: [{ question: "Чему равен sin(30)?", options: ["1", "0.5", "0"], correctIndex: 1, explanation: "sin(30) = 1/2" }]
        });
    }
});
writeJS('lessons-math.js', 'mathLessons', mathLessons);

// 4. NTO
const ntoLessons = [];
const ntoTopics = ["Что такое бизнес-процессы", "BPMN Основы", "Excel и Google Sheets", "Введение в SQL", "Продвинутый SQL", "Python Работа с данными", "API Интеграции", "Разбор Олимпиадного Кейса"];
ntoTopics.forEach((topic, i) => {
    ntoLessons.push({
        id: `nto_${i}_lvl_1`,
        topicId: `nto_${i}`,
        level: 1,
        title: `${topic}`,
        subject: 'nto',
        theory: `<h3>${topic}</h3><p>Практический материал для олимпиады НТО.</p>`,
        videoUrl: `https://www.youtube.com/embed/${infVideos[0]}?enablejsapi=1`,
        practice: {
            warmup: generatePracticeTasks(topic, 1, 2, 0),
            base: generatePracticeTasks(topic, 1, 3, 10),
            advanced: [],
            control: []
        },
        quiz: [{ question: "Главная цель NTO?", options: ["Победить", "Получить БВИ", "Научиться", "Все вышеперечисленное"], correctIndex: 3, explanation: "Олимпиада дает знания и льготы при поступлении." }]
    });
});
writeJS('nto-content.js', 'ntoLessons', ntoLessons);

console.log("Multi-level courses content generated successfully.");
