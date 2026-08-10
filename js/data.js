// Static data for EGE Master 2026 to ensure offline capabilities without CORS issues

const AppData = {
    courses: [
        {
            "id": "info-python",
            "subjectId": "informatics",
            "title": "Python для ЕГЭ",
            "url": "https://stepik.org/course/207789",
            "description": "С нуля до профи в Python для ЕГЭ.",
            "level": "Начинающий",
            "lessonsCount": 50,
            "icon": "fa-brands fa-python",
            "color": "var(--color-blue)",
            "modules": [
                {
                    "id": "m1",
                    "title": "1. Основы Python",
                    "lessons": [
                        { "id": "l1", "title": "Введение, переменные, типы данных", "type": "video" },
                        { "id": "l2", "title": "Арифметика", "type": "practice" }
                    ]
                },
                {
                    "id": "m2",
                    "title": "2. Условия и циклы",
                    "lessons": [
                        { "id": "l3", "title": "Условный оператор if", "type": "video" },
                        { "id": "l4", "title": "Циклы while и for", "type": "video" },
                        { "id": "l5", "title": "Практика: Циклы", "type": "practice" }
                    ]
                }
            ]
        },
        {
            "id": "info-algo",
            "subjectId": "informatics",
            "title": "Алгоритмы ЕГЭ",
            "url": "https://stepik.org/course/214479",
            "description": "Секреты алгоритмов для 27 задания.",
            "level": "Продвинутый",
            "lessonsCount": 45,
            "icon": "fa-solid fa-code-branch",
            "color": "var(--color-blue)",
            "modules": [
                {
                    "id": "m1",
                    "title": "1. Сортировки и поиск",
                    "lessons": [
                        { "id": "l1", "title": "Бинарный поиск", "type": "video" },
                        { "id": "l2", "title": "Сортировка слиянием", "type": "video" }
                    ]
                }
            ]
        },
        {
            "id": "rus-2026",
            "subjectId": "russian",
            "title": "Русский язык ЕГЭ 2026",
            "url": "https://stepik.org/course/92015",
            "description": "Подготовка к тестовой части и сочинению.",
            "level": "Любой",
            "lessonsCount": 60,
            "icon": "fa-solid fa-book",
            "color": "var(--color-green)",
            "modules": [
                {
                    "id": "m1",
                    "title": "1. Орфография",
                    "lessons": [
                        { "id": "l1", "title": "Чередующиеся корни", "type": "video" },
                        { "id": "l2", "title": "Приставки пре- и при-", "type": "video" }
                    ]
                }
            ]
        }
    ],

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
        {
            "id": "exam-inf-1",
            "subject": "informatics",
            "question": "Сколько мегабайт содержится в 8192 килобайтах?",
            "answer": "8"
        },
        {
            "id": "exam-inf-2",
            "subject": "informatics",
            "question": "Запишите число 15 в двоичной системе счисления.",
            "answer": "1111"
        },
        {
            "id": "exam-inf-3",
            "subject": "informatics",
            "question": "Каково наибольшее двузначное число в шестнадцатеричной системе?",
            "answer": "FF"
        },
        {
            "id": "exam-math-1",
            "subject": "math",
            "question": "Найдите производную функции y = 3x^2 в точке x = 2.",
            "answer": "12"
        },
        {
            "id": "exam-math-2",
            "subject": "math",
            "question": "Решите уравнение 2^x = 16. В ответ запишите значение x.",
            "answer": "4"
        },
        {
            "id": "exam-rus-1",
            "subject": "russian",
            "question": "Укажите слово, в котором верно выделена буква, обозначающая ударный гласный звук: тОрты, звонИт, красИвее, катАлог.",
            "answer": "звонИт"
        },
        {
            "id": "exam-rus-2",
            "subject": "russian",
            "question": "Вставьте пропущенную букву: пр..вилегия.",
            "answer": "и"
        },
        {
            "id": "exam-rus-3",
            "subject": "russian",
            "question": "Вставьте пропущенную букву: апелл..ция.",
            "answer": "я"
        }
    ]
};
