const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function writeJS(filename, variableName, data) {
    const content = `// Генерируемый файл (Архитектура 2.5). Не редактировать вручную.\nwindow.${variableName} = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(path.join(dataDir, filename), content);
}

// Helpers
function genPractice(topic, count, offset, difficulty) {
    return Array.from({length: count}, (_, j) => {
        const val1 = Math.floor(Math.random() * 10) + offset + j;
        const val2 = Math.floor(Math.random() * 10) + offset + j + 5;
        return {
            id: `task_${topic.replace(/\s+/g, '')}_${difficulty}_${j}`,
            question: `Найдите значение выражения: ${val1} + ${val2} (Сложность: ${difficulty})`,
            answer: (val1 + val2).toString(),
            explanation: `Ответ: ${val1 + val2}. Подробное решение...`
        };
    });
}

function genActiveRecall(count) {
    return Array.from({length: count}, (_, j) => ({
        q: `Ключевое правило номер ${j+1}?`,
        a: `Это правило означает...`
    }));
}

// ==========================================
// 1. MATH (EXtremum Strategy)
// ==========================================
const mathCourse = {
    id: 'course_math',
    title: 'Математика ЕГЭ (Профиль)',
    subject: 'math',
    icon: '<i class="fas fa-square-root-variable"></i>',
    phases: [
        {
            id: 'math_p1',
            title: 'Первая часть / База',
            topics: [
                {
                    id: 'math_t_deriv',
                    title: 'Производная и первообразная (Задания 8, 12)',
                    lessons: [
                        {
                            id: 'math_t_deriv_l1',
                            title: 'Понятие производной и физический смысл',
                            durationMins: 45,
                            goal: 'Понять, что такое производная и как она связана со скоростью.',
                            explanation: 'Производная — это скорость изменения функции...',
                            videoUrl: 'https://www.youtube.com/embed/uU-x01m5FQQ?enablejsapi=1',
                            example: 'Найти скорость точки, если s(t) = t^2 + 2t.',
                            activeRecall: genActiveRecall(2),
                            easyPractice: genPractice('deriv', 3, 0, 'Лёгкая'),
                            mainPractice: genPractice('deriv', 5, 10, 'Основная'),
                            control: genPractice('deriv', 2, 20, 'Контроль')
                        },
                        {
                            id: 'math_t_deriv_l2',
                            title: 'Правила дифференцирования',
                            durationMins: 50,
                            goal: 'Научиться брать производные от любых функций.',
                            explanation: 'Таблица производных и правила суммы, произведения, частного.',
                            videoUrl: 'https://www.youtube.com/embed/uU-x01m5FQQ?enablejsapi=1',
                            example: 'y = x^3 * sin(x)',
                            activeRecall: genActiveRecall(3),
                            easyPractice: genPractice('deriv2', 4, 0, 'Лёгкая'),
                            mainPractice: genPractice('deriv2', 6, 10, 'Основная'),
                            control: genPractice('deriv2', 2, 20, 'Контроль')
                        },
                        {
                            id: 'math_t_deriv_l3',
                            title: 'Графики функций и производной',
                            durationMins: 60,
                            goal: 'Определять точки экстремума по графику производной.',
                            explanation: 'Где производная меняет знак с + на - — это максимум.',
                            videoUrl: 'https://www.youtube.com/embed/uU-x01m5FQQ?enablejsapi=1',
                            example: 'Анализ графика на отрезке [a; b]',
                            activeRecall: genActiveRecall(2),
                            easyPractice: genPractice('deriv3', 2, 0, 'Лёгкая'),
                            mainPractice: genPractice('deriv3', 8, 10, 'Основная'),
                            control: genPractice('deriv3', 3, 20, 'Контроль')
                        },
                        {
                            id: 'math_t_deriv_l4',
                            title: 'Типовые прототипы ФИПИ (№8, 12)',
                            durationMins: 55,
                            goal: 'Решать задачи из реального экзамена.',
                            explanation: 'Разбор всех типов задач ФИПИ.',
                            videoUrl: 'https://www.youtube.com/embed/_6l11W640o8?enablejsapi=1',
                            example: 'Решение задачи 2023 года.',
                            activeRecall: genActiveRecall(1),
                            easyPractice: genPractice('deriv4', 1, 0, 'Лёгкая'),
                            mainPractice: genPractice('deriv4', 10, 10, 'Основная'),
                            control: genPractice('deriv4', 3, 20, 'Контроль')
                        },
                        {
                            id: 'math_t_deriv_l5',
                            title: 'Сложные случаи',
                            durationMins: 45,
                            goal: 'Научиться обходить ловушки.',
                            explanation: 'Задачи с модулями и корнями в производной.',
                            videoUrl: 'https://www.youtube.com/embed/v2o9r-M6TzQ?enablejsapi=1',
                            example: 'y = sqrt(x^2 - 4)',
                            activeRecall: genActiveRecall(1),
                            easyPractice: genPractice('deriv5', 2, 0, 'Лёгкая'),
                            mainPractice: genPractice('deriv5', 5, 10, 'Основная'),
                            control: genPractice('deriv5', 2, 20, 'Контроль')
                        },
                        {
                            id: 'math_t_deriv_l6',
                            title: 'Итоговый контроль темы',
                            durationMins: 40,
                            goal: 'Закрепить тему "Производная".',
                            explanation: 'Только практика.',
                            videoUrl: null,
                            example: null,
                            activeRecall: [],
                            easyPractice: [],
                            mainPractice: [],
                            control: genPractice('deriv6', 10, 0, 'Экзамен')
                        }
                    ]
                },
                {
                    id: 'math_t_text',
                    title: 'Текстовые задачи (Задание 10)',
                    lessons: [
                        {
                            id: 'math_t_text_l1',
                            title: 'Движение по прямой',
                            durationMins: 50,
                            goal: 'Составление уравнений движения.',
                            explanation: 'S = V * t',
                            videoUrl: 'https://www.youtube.com/embed/q1-c5P1kH0c?enablejsapi=1',
                            example: 'Автомобиль выехал из пункта А...',
                            activeRecall: genActiveRecall(2),
                            easyPractice: genPractice('text1', 2, 0, 'Лёгкая'),
                            mainPractice: genPractice('text1', 5, 10, 'Основная'),
                            control: genPractice('text1', 2, 20, 'Контроль')
                        }
                    ]
                }
            ]
        },
        {
            id: 'math_p2',
            title: 'Лёгкая вторая часть',
            topics: [
                {
                    id: 'math_t_eq13',
                    title: 'Тригонометрические уравнения (№13)',
                    lessons: [
                        {
                            id: 'math_t_eq13_l1',
                            title: 'Основы тригонометрии',
                            durationMins: 60,
                            goal: 'Вспомнить окружность.',
                            explanation: 'Окружность, синус, косинус.',
                            videoUrl: 'https://www.youtube.com/embed/J7W2n_5tQfU?enablejsapi=1',
                            example: 'sin(x) = 1/2',
                            activeRecall: genActiveRecall(3),
                            easyPractice: genPractice('trig1', 4, 0, 'Лёгкая'),
                            mainPractice: genPractice('trig1', 6, 10, 'Основная'),
                            control: genPractice('trig1', 2, 20, 'Контроль')
                        }
                    ]
                }
            ]
        }
    ]
};

// ==========================================
// 2. INFORMATICS
// ==========================================
const infCourse = {
    id: 'course_inf',
    title: 'Информатика ЕГЭ',
    subject: 'informatics',
    icon: '<i class="fas fa-laptop-code"></i>',
    phases: [
        {
            id: 'inf_p1',
            title: 'Базовые концепции и Программирование',
            topics: [
                {
                    id: 'inf_t_graphs',
                    title: 'Графы и Пути (Задания 1, 13)',
                    lessons: [
                        {
                            id: 'inf_t_graphs_l1',
                            title: 'Матрицы и графы (№1)',
                            durationMins: 45,
                            goal: 'Научиться сопоставлять граф и матрицу.',
                            explanation: 'Степени вершин — ключ к решению.',
                            videoUrl: 'https://www.youtube.com/embed/bW7-A8N1V7s?enablejsapi=1',
                            example: 'Поиск уникальной вершины.',
                            activeRecall: genActiveRecall(2),
                            easyPractice: genPractice('graf1', 2, 0, 'Лёгкая'),
                            mainPractice: genPractice('graf1', 5, 10, 'Основная'),
                            control: genPractice('graf1', 2, 20, 'Контроль')
                        },
                        {
                            id: 'inf_t_graphs_l2',
                            title: 'Количество путей (№13)',
                            durationMins: 40,
                            goal: 'Считать пути динамикой.',
                            explanation: 'Вершина = сумме входящих.',
                            videoUrl: 'https://www.youtube.com/embed/bW7-A8N1V7s?enablejsapi=1',
                            example: 'Путь из А в К через В.',
                            activeRecall: genActiveRecall(1),
                            easyPractice: genPractice('graf2', 2, 0, 'Лёгкая'),
                            mainPractice: genPractice('graf2', 6, 10, 'Основная'),
                            control: genPractice('graf2', 2, 20, 'Контроль')
                        }
                    ]
                }
            ]
        }
    ]
};

// ==========================================
// 3. RUSSIAN
// ==========================================
const rusCourse = {
    id: 'course_rus',
    title: 'Русский язык ЕГЭ',
    subject: 'russian',
    icon: '<i class="fas fa-book"></i>',
    phases: [
        {
            id: 'rus_p1',
            title: 'Орфография',
            topics: [
                {
                    id: 'rus_t_ortho',
                    title: 'Корни, приставки, суффиксы (№9-12)',
                    lessons: [
                        {
                            id: 'rus_t_ortho_l1',
                            title: 'Безударные гласные в корне (№9)',
                            durationMins: 45,
                            goal: 'Научиться определять тип корня.',
                            explanation: 'Чередующиеся, проверяемые, словарные.',
                            videoUrl: 'https://www.youtube.com/embed/Z-4WjHqW5tA?enablejsapi=1',
                            example: 'Выр..сти — чередование.',
                            activeRecall: genActiveRecall(3),
                            easyPractice: genPractice('rus1', 4, 0, 'Лёгкая'),
                            mainPractice: genPractice('rus1', 8, 10, 'Основная'),
                            control: genPractice('rus1', 3, 20, 'Контроль')
                        }
                    ]
                }
            ]
        }
    ]
};

// ==========================================
// 4. NTO
// ==========================================
const ntoCourse = {
    id: 'course_nto',
    title: 'Олимпиада НТО',
    subject: 'nto',
    icon: '<i class="fas fa-trophy"></i>',
    phases: [
        {
            id: 'nto_p1',
            title: 'Бизнес-процессы и SQL',
            topics: [
                {
                    id: 'nto_t_bpmn',
                    title: 'Основы BPMN',
                    lessons: [
                        {
                            id: 'nto_t_bpmn_l1',
                            title: 'Введение в нотацию',
                            durationMins: 40,
                            goal: 'Понять базовые элементы BPMN.',
                            explanation: 'События, шлюзы, задачи.',
                            videoUrl: 'https://www.youtube.com/embed/t_6jB3ZlRpw?enablejsapi=1',
                            example: 'Процесс покупки товара.',
                            activeRecall: genActiveRecall(2),
                            easyPractice: genPractice('nto1', 2, 0, 'Лёгкая'),
                            mainPractice: genPractice('nto1', 4, 10, 'Основная'),
                            control: genPractice('nto1', 1, 20, 'Контроль')
                        }
                    ]
                }
            ]
        }
    ]
};


writeJS('course-math.js', 'mathCourse', mathCourse);
writeJS('course-inf.js', 'infCourse', infCourse);
writeJS('course-rus.js', 'rusCourse', rusCourse);
writeJS('course-nto.js', 'ntoCourse', ntoCourse);

console.log("Macro-architecture content generated successfully.");
