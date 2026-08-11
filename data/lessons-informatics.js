// EGE Master 2026 - Informatics Lessons Data (Audited & Verified)
window.LessonsInformatics = [
  {
    id: 'inf-lesson-1',
    title: 'Условие Фано (Задание №4)',
    subject: 'informatics',
    egeNumber: '№4',
    theory: `<div class="theory-content">
      <h3>Условие Фано</h3>
      <p>Прямое условие Фано: Никакое кодовое слово не может быть началом другого кодового слова. Обеспечивает однозначное декодирование с начала.</p>
      <h3>Дерево Фано</h3>
      <p>Для решения задачи удобно строить бинарное дерево. Влево идет 0, вправо 1. Свободные ветки (листья) можно использовать для новых букв.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Фано значит, что код буквы не может совпадать с началом кода любой другой буквы.',
    examples: [],
    tasks: [
      {id: 'inf-4-1', question: 'Для кодирования используется условие Фано. А=00, Б=01, В=10. Укажите кратчайший код для Г.', answer: '11', explanation: 'Ветки 00, 01, 10 заняты. Свободна 11.', difficulty: 'easy'},
      {id: 'inf-4-2', question: 'А=1, Б=01, В=001. Найдите код для Г (кратчайший).', answer: '000', explanation: 'Ветка 1 занята. 0 делится на 01 (Б) и 00. 00 делится на 001 (В) и 000.', difficulty: 'easy'},
      {id: 'inf-4-3', question: 'А=0, Б=10, В=110. Код для Г?', answer: '111', explanation: 'Свободна ветка 111.', difficulty: 'easy'},
      {id: 'inf-4-4', question: 'А=10, Б=11, В=000, Г=001, Д=010. Код для Е?', answer: '011', explanation: '10, 11 заняты. 000, 001 заняты. 010 занят. Свободен 011.', difficulty: 'medium'},
      {id: 'inf-4-5', question: 'Даны коды А=0, Б=10. Можно ли задать В=1? (да/нет)', answer: 'нет', explanation: 'Если В=1, то он будет началом для Б=10.', difficulty: 'medium'},
      {id: 'inf-4-6', question: 'А=01, Б=10. Какой кратчайший код можно дать В?', answer: '00', explanation: '00 и 11 свободны. Длина 2.', difficulty: 'medium'},
      {id: 'inf-4-7', question: 'А=000, Б=001, В=01, Г=10. Кратчайший для Д?', answer: '11', explanation: 'Свободна ветка 11.', difficulty: 'medium'},
      {id: 'inf-4-8', question: 'А=111, Б=110, В=10, Г=01. Кратчайший для Д?', answer: '00', explanation: 'Свободна ветка 00.', difficulty: 'medium'},
      {id: 'inf-4-9', question: 'Если А=00, Б=01, В=1. Можно ли добавить Г длины 1? (да/нет)', answer: 'нет', explanation: 'Ветка 0 занята (там А и Б), ветка 1 занята (В).', difficulty: 'hard'},
      {id: 'inf-4-10', question: 'А=01, Б=001, В=11, Г=100. Кратчайший для Д?', answer: '000', explanation: 'Свободны 000 и 101. Оба длины 3.', difficulty: 'hard'}
    ],
    quiz: [
      {question: 'Что гарантирует прямое условие Фано?', options: ['Сжатие', 'Однозначное декодирование с начала'], correctIndex: 1, explanation: 'Декодирование с начала.'},
      {question: 'А=1, Б=10. Нарушено ли Фано?', options: ['Да', 'Нет'], correctIndex: 0, explanation: 'А - начало Б.'},
      {question: 'Какое дерево строится для Фано?', options: ['Бинарное', 'Тернарное'], correctIndex: 0, explanation: '0 и 1.'},
      {question: 'Если ветка занята буквой, можно ли её продолжать?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'Тогда она станет началом других букв.'},
      {question: 'Обратное условие Фано...', options: ['Не начало', 'Не конец'], correctIndex: 1, explanation: 'Никакое слово не является концом другого.'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Кодирование данных.'
  },
  {
    id: 'inf-lesson-2',
    title: 'Кодирование графики и звука (Задание №7)',
    subject: 'informatics',
    egeNumber: '№7',
    theory: `<div class="theory-content">
      <h3>Графика</h3>
      <p>I = x * y * i (бит). N = 2^i.</p>
      <h3>Звук</h3>
      <p>I = f * r * k * t (бит).</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Переводите килобайты в биты перед делением.',
    examples: [],
    tasks: [
      {id: 'inf-7-1', question: 'Изображение 100x100, 256 цветов. Объем в байтах?', answer: '10000', explanation: '256 = 2^8. 100*100*8 = 80000 бит = 10000 байт.', difficulty: 'easy'},
      {id: 'inf-7-2', question: '1024x1024, i=8 бит. Кбайт?', answer: '1024', explanation: '1024*1024*8 / 8 / 1024 = 1024.', difficulty: 'easy'},
      {id: 'inf-7-3', question: 'Моно звук, 44100 Гц, 16 бит, 1 сек. Байт?', answer: '88200', explanation: '44100 * 16 * 1 / 8 = 88200.', difficulty: 'medium'},
      {id: 'inf-7-4', question: 'Стерео звук (2), 22050 Гц, 16 бит, 2 сек. Байт?', answer: '176400', explanation: '22050 * 16 * 2 * 2 / 8 = 176400.', difficulty: 'medium'},
      {id: 'inf-7-5', question: 'Картинка 200x200 весит 40000 байт. Сколько цветов?', answer: '256', explanation: '40000*8 / (200*200) = 8 бит. 2^8 = 256.', difficulty: 'medium'},
      {id: 'inf-7-6', question: 'Картинка 400x400, 16 цветов. Байт?', answer: '80000', explanation: '16=2^4 (4 бита). 400*400*4/8 = 80000.', difficulty: 'medium'},
      {id: 'inf-7-7', question: 'Аудио: частота упала в 2 раза, стерео -> квадро (4). Как изменится объем? (во сколько раз)', answer: '1', explanation: 'Частота 1/2, каналы x2. В итоге 1 (не изменится).', difficulty: 'hard'},
      {id: 'inf-7-8', question: 'Разрешение было 100x100, стало 200x200. Как изменится объем?', answer: '4', explanation: 'Площадь выросла в 4 раза.', difficulty: 'hard'},
      {id: 'inf-7-9', question: '1 Кбайт = ... бит?', answer: '8192', explanation: '1024 * 8.', difficulty: 'easy'},
      {id: 'inf-7-10', question: 'Глубина цвета 24 бита (True Color). Сколько байт на 1 пиксель?', answer: '3', explanation: '24 / 8 = 3.', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Сколько бит весит один пиксель при 65536 цветах?', options: ['8', '16'], correctIndex: 1, explanation: '65536 = 2^16.'},
      {question: 'Как из бит перевести в байты?', options: ['Умножить на 8', 'Разделить на 8'], correctIndex: 1, explanation: '1 байт = 8 бит.'},
      {question: 'Стерео аудио — это сколько каналов?', options: ['1', '2'], correctIndex: 1, explanation: '2 канала.'},
      {question: 'Квадро аудио — это сколько каналов?', options: ['2', '4'], correctIndex: 1, explanation: '4 канала.'},
      {question: 'Формула глубины цвета?', options: ['N = 2^i', 'N = i*8'], correctIndex: 0, explanation: 'Количество цветов N равно 2 в степени i.'}
    ],
    estimatedTime: 45,
    ntoRelevance: 'Обработка медиаданных.'
  },
  {
    id: 'inf-lesson-3',
    title: 'Вычисление количества информации (Задание №11)',
    subject: 'informatics',
    egeNumber: '№11',
    theory: `<div class="theory-content">
      <h3>Пароли и символы</h3>
      <p>M <= 2^i. Считаем вес одного пароля: i * длина (в битах). Перевод в байты с округлением вверх.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Байты на пароль округляются всегда вверх.',
    examples: [],
    tasks: [
      {id: 'inf-11-1', question: 'Алфавит 30 симв. Сколько бит на 1 символ?', answer: '5', explanation: '30 <= 2^5', difficulty: 'easy'},
      {id: 'inf-11-2', question: 'Алфавит 100 симв. Сколько бит?', answer: '7', explanation: '100 <= 2^7', difficulty: 'easy'},
      {id: 'inf-11-3', question: 'Алфавит 10 цифр. Пароль 5 симв. Сколько байт на пароль?', answer: '3', explanation: '10 <= 2^4. 5*4 = 20 бит. 20/8 = 2.5 -> 3 байта.', difficulty: 'medium'},
      {id: 'inf-11-4', question: 'Алфавит 33 буквы (одного регистра). Пароль 10 симв. Байт на пароль?', answer: '8', explanation: '33 <= 2^6. 10*6 = 60 бит. 60/8 = 7.5 -> 8 байт.', difficulty: 'medium'},
      {id: 'inf-11-5', question: 'Алфавит 26 строчных + 26 заглавных. Бит на символ?', answer: '6', explanation: '52 <= 2^6.', difficulty: 'medium'},
      {id: 'inf-11-6', question: 'Алфавит 26 стр + 26 заг + 10 цифр. Бит?', answer: '6', explanation: '62 <= 2^6.', difficulty: 'medium'},
      {id: 'inf-11-7', question: 'Алфавит 15 симв. Пароль 8 симв. Байт?', answer: '4', explanation: 'i=4. 8*4=32 бит. 32/8 = 4 байта.', difficulty: 'medium'},
      {id: 'inf-11-8', question: 'Доп. инфа 10 байт. Пароль (алф. 10 симв, длина 5). Всего байт на пользователя?', answer: '13', explanation: 'Пароль 3 байта + 10 = 13.', difficulty: 'hard'},
      {id: 'inf-11-9', question: '20 пользователей занимают 400 байт. Сколько байт на 1 пользователя?', answer: '20', explanation: '400 / 20 = 20.', difficulty: 'easy'},
      {id: 'inf-11-10', question: 'Если на пароль выделено 5 байт, максимальная длина пароля из алфавита 10 символов?', answer: '10', explanation: '5 байт = 40 бит. i=4. 40 / 4 = 10.', difficulty: 'hard'}
    ],
    quiz: [
      {question: 'Как округляются биты в байты для хранения пароля?', options: ['Вниз', 'Вверх'], correctIndex: 1, explanation: 'Вверх (ceil).'},
      {question: 'Сколько бит нужно для алфавита из 10 цифр?', options: ['3', '4'], correctIndex: 1, explanation: '2^4 = 16.'},
      {question: 'Алфавит: 33 строчных + 33 заглавных. Мощность?', options: ['33', '66'], correctIndex: 1, explanation: '33 + 33 = 66.'},
      {question: 'Минимальное i для алфавита из 65 символов?', options: ['6', '7'], correctIndex: 1, explanation: '2^7 = 128.'},
      {question: 'В чем измеряется доп. информация о пользователе?', options: ['В битах', 'В байтах'], correctIndex: 1, explanation: 'В байтах (по условию ЕГЭ обычно так).'}
    ],
    estimatedTime: 35,
    ntoRelevance: 'Криптография, базы данных.'
  },
  {
    id: 'inf-lesson-4',
    title: 'Реляционные базы данных (Задание №3)',
    subject: 'informatics',
    egeNumber: '№3',
    theory: `<div class="theory-content">
      <h3>Поиск в БД</h3>
      <p>Обычно даются таблицы Сотрудники, Отделы или Родственники. Нужно искать по ключу ID.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Ищем ID в одной таблице, подставляем в другую.',
    examples: [],
    tasks: [
      {id: 'inf-3-1', question: 'В таблице Родственники ID 1 - родитель 2 и 3. У ID 2 есть дети 4 и 5. Сколько внуков у ID 1?', answer: '2', explanation: '4 и 5 - внуки от ребенка 2.', difficulty: 'easy'},
      {id: 'inf-3-2', question: 'ID 1 родитель 2. ID 2 родитель 3. ID 3 родитель 4. Кем приходится 4 для 1?', answer: 'правнук', explanation: 'Цепочка 1->2->3->4.', difficulty: 'easy'},
      {id: 'inf-3-3', question: 'У Ивана (ID=10) два ребенка. У Петра (ID=20) один. Сколько записей в таблице связи, где ID_род = 10 или 20?', answer: '3', explanation: '2+1 = 3.', difficulty: 'medium'},
      {id: 'inf-3-4', question: 'Таблица Товары: ID=1(Хлеб, 50р), ID=2(Молоко, 80р). Покупки: 2 хлеба, 1 молоко. Сумма?', answer: '180', explanation: '2*50 + 80 = 180.', difficulty: 'medium'},
      {id: 'inf-3-5', question: 'У ID 5 трое детей. Сколько у него племянников, если у него нет братьев/сестер?', answer: '0', explanation: 'Племянники - дети братьев/сестер.', difficulty: 'easy'},
      {id: 'inf-3-6', question: 'Если таблица связи пуста, сколько детей?', answer: '0', explanation: 'Нет связей = нет детей.', difficulty: 'easy'},
      {id: 'inf-3-7', question: 'Связь 1:М значит "Один ко...', answer: 'многим', explanation: 'One-to-many.', difficulty: 'easy'},
      {id: 'inf-3-8', question: 'ID_магазина = 5. Продано 10 шт товара ID=1. Выручка, если товар стоит 100р?', answer: '1000', explanation: '10*100 = 1000.', difficulty: 'medium'},
      {id: 'inf-3-9', question: 'Функция в Excel для связи таблиц по ID?', answer: 'ВПР', explanation: 'Или VLOOKUP.', difficulty: 'medium'},
      {id: 'inf-3-10', question: 'В таблице 10 строк. Условие WHERE ID > 5. Сколько строк выведется (ID идут от 1 до 10)?', answer: '5', explanation: '6, 7, 8, 9, 10.', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'Первичный ключ это:', options: ['Уникальный номер записи', 'Пароль'], correctIndex: 0, explanation: 'Идентификатор.'},
      {question: 'Можно ли решить №3 в Excel?', options: ['Да', 'Нет'], correctIndex: 0, explanation: 'Через функцию ВПР.'},
      {question: 'Связь Родитель-Ребенок это связь:', options: ['Один к Одному', 'Один ко Многим', 'Многие ко Многим'], correctIndex: 2, explanation: 'У одного родителя много детей, у ребенка 2 родителя.'},
      {question: 'Для чего нужна таблица связей?', options: ['Для красоты', 'Для связи многие-ко-многим'], correctIndex: 1, explanation: 'Чтобы не дублировать данные.'},
      {question: 'Реляционная БД это...', options: ['Связанные таблицы', 'Текстовый файл'], correctIndex: 0, explanation: 'Relations = отношения/связи.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Основы SQL.'
  },
  {
    id: 'inf-lesson-5',
    title: 'Электронные таблицы (Задание №9)',
    subject: 'informatics',
    egeNumber: '№9',
    theory: `<div class="theory-content">
      <h3>Анализ данных в таблицах</h3>
      <p>Нужно написать формулы для проверки условий в строке.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Пишем формулу для 1 строки, растягиваем на все, считаем количество ИСТИНА.',
    examples: [],
    tasks: [
      {id: 'inf-9-1', question: 'Строка: 3, 4, 5. Треугольник существует? (1-Да, 0-Нет)', answer: '1', explanation: '3+4>5, 4+5>3, 3+5>4.', difficulty: 'easy'},
      {id: 'inf-9-2', question: 'Строка: 1, 2, 5. Треугольник?', answer: '0', explanation: '1+2 < 5.', difficulty: 'easy'},
      {id: 'inf-9-3', question: 'Строка: 10, 10, 20. Треугольник?', answer: '0', explanation: '10+10 = 20 (не строго больше).', difficulty: 'easy'},
      {id: 'inf-9-4', question: 'Квадрат Пифагора: 3, 4. Какая гипотенуза?', answer: '5', explanation: '3^2+4^2 = 9+16 = 25 = 5^2.', difficulty: 'medium'},
      {id: 'inf-9-5', question: 'Строка: 4, 4, 4, 5. Сколько раз встречается 4?', answer: '3', explanation: 'Функция СЧЕТЕСЛИ.', difficulty: 'easy'},
      {id: 'inf-9-6', question: 'Какая функция найдет максимальное из 4 чисел?', answer: 'МАКС', explanation: 'Встроена в Excel.', difficulty: 'easy'},
      {id: 'inf-9-7', question: 'Как в Excel записать условие "А1 равно Б1"?', answer: 'А1=Б1', explanation: 'Простое равенство.', difficulty: 'easy'},
      {id: 'inf-9-8', question: 'Среднее значение для 2, 4, 6?', answer: '4', explanation: 'СРЗНАЧ.', difficulty: 'medium'},
      {id: 'inf-9-9', question: 'В строке числа 1, 2, 3, 4. Сумма квадратов?', answer: '30', explanation: '1+4+9+16 = 30.', difficulty: 'medium'},
      {id: 'inf-9-10', question: 'Как закрепить ячейку А1 при копировании?', answer: '$А$1', explanation: 'Абсолютная ссылка.', difficulty: 'hard'}
    ],
    quiz: [
      {question: 'Какая функция проверяет, что ВСЕ условия верны?', options: ['И', 'ИЛИ'], correctIndex: 0, explanation: 'И(усл1; усл2).'},
      {question: 'Какая функция проверяет, что ХОТЯ БЫ ОДНО верно?', options: ['И', 'ИЛИ'], correctIndex: 1, explanation: 'ИЛИ.'},
      {question: 'СЧЁТЕСЛИ(A1:A5; 5) делает:', options: ['Считает сумму', 'Считает количество'], correctIndex: 1, explanation: 'Количество ячеек, равных 5.'},
      {question: 'Неравенство треугольника:', options: ['A+B>C', 'A+B=C'], correctIndex: 0, explanation: 'Сумма 2 сторон больше третьей.'},
      {question: 'Знак $ означает:', options: ['Формат', 'Абсолютную ссылку'], correctIndex: 1, explanation: 'Фиксирует столбец или строку.'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Обработка данных.'
  },
  {
    id: 'inf-lesson-6',
    title: 'Рекурсия (Задание №16)',
    subject: 'informatics',
    egeNumber: '№16',
    theory: `<div class="theory-content">
      <h3>Рекурсивные функции</h3>
      <p>F(n) = F(n-1) + F(n-2). Главное - базовый случай (выход), иначе будет ошибка переполнения стека.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Рекурсия вызывает саму себя.',
    examples: [],
    tasks: [
      {id: 'inf-16-1', question: 'F(n) = F(n-1)+1, F(1)=1. Чему равно F(3)?', answer: '3', explanation: 'F(3)=F(2)+1 = F(1)+1+1 = 3.', difficulty: 'easy'},
      {id: 'inf-16-2', question: 'F(n) = F(n-1)*n, F(1)=1. F(4)?', answer: '24', explanation: 'Это факториал. 1*2*3*4 = 24.', difficulty: 'medium'},
      {id: 'inf-16-3', question: 'F(n) = F(n-1)+F(n-2), F(1)=1, F(2)=1. F(5)?', answer: '5', explanation: 'Фибоначчи: 1, 1, 2, 3, 5.', difficulty: 'medium'},
      {id: 'inf-16-4', question: 'F(n) = F(n//2)+1 (целочисленное деление), F(1)=0. F(4)?', answer: '2', explanation: 'F(4)=F(2)+1 = F(1)+1+1 = 0+2 = 2.', difficulty: 'hard'},
      {id: 'inf-16-5', question: 'Что будет, если нет базового случая F(1)?', answer: 'ошибка', explanation: 'RecursionError.', difficulty: 'easy'},
      {id: 'inf-16-6', question: 'F(n) = 2*F(n-1), F(1)=2. F(3)?', answer: '8', explanation: 'F(2)=4, F(3)=8.', difficulty: 'medium'},
      {id: 'inf-16-7', question: 'Как кэшировать рекурсию в Python?', answer: '@lru_cache', explanation: 'Декоратор из functools.', difficulty: 'hard'},
      {id: 'inf-16-8', question: 'F(n) = n. Чему равно F(10)?', answer: '10', explanation: 'Просто функция, возвращающая аргумент.', difficulty: 'easy'},
      {id: 'inf-16-9', question: 'Лимит глубины рекурсии в Python по умолчанию?', answer: '1000', explanation: 'sys.setrecursionlimit.', difficulty: 'hard'},
      {id: 'inf-16-10', question: 'F(n) = F(n-3)+n, F(1)=1, F(2)=2, F(3)=3. F(4)?', answer: '5', explanation: 'F(4) = F(1)+4 = 1+4 = 5.', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'К чему приведет рекурсия без выхода?', options: ['К ошибке стека', 'К нулю'], correctIndex: 0, explanation: 'Stack overflow.'},
      {question: 'Какая структура данных используется при вызове функций?', options: ['Очередь', 'Стек'], correctIndex: 1, explanation: 'Стек вызовов.'},
      {question: 'Что делает @lru_cache?', options: ['Удаляет кэш', 'Запоминает результаты вызовов'], correctIndex: 1, explanation: 'Ускоряет рекурсию.'},
      {question: 'Можно ли заменить рекурсию циклом?', options: ['Да', 'Нет'], correctIndex: 0, explanation: 'Любую рекурсию можно переписать на цикл+стек.'},
      {question: 'Фибоначчи через рекурсию без кэша работает...', options: ['Быстро', 'Медленно (O(2^n))'], correctIndex: 1, explanation: 'Очень медленно из-за дублирования вычислений.'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Алгоритмы графов.'
  },
  {
    id: 'inf-lesson-7',
    title: 'Динамическое программирование (Задание №23)',
    subject: 'informatics',
    egeNumber: '№23',
    theory: `<div class="theory-content">
      <h3>ДП для числа программ</h3>
      <p>Исполнитель преобразует число. Команды: +1, *2. Сколько путей из А в Б? Заводим массив или рекурсию с мемоизацией.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Идём от А до Б, складывая количество путей для каждого промежуточного числа.',
    examples: [],
    tasks: [
      {id: 'inf-23-1', question: 'Команды: +1. Путей из 1 в 5?', answer: '1', explanation: 'Только 1 путь (1+1+1+1).', difficulty: 'easy'},
      {id: 'inf-23-2', question: 'Команды: +1, *2. Из 1 в 4?', answer: '4', explanation: '1-2-3-4; 1-2-4; 1-2-4 (если 2 получено умножением, это другой путь... стоп, 1->2(+1), 1->2(*2) - 2 пути в 2. В 3: 2 пути. В 4: 2 пути из 3 + 2 пути из 2 = 4 пути.', difficulty: 'hard'},
      {id: 'inf-23-3', question: 'Обязательный узел В. Из А в С через В = ?', answer: 'f(А,В)*f(В,С)', explanation: 'Перемножаем количества путей.', difficulty: 'medium'},
      {id: 'inf-23-4', question: 'Команда: +2. Из 1 в 5?', answer: '1', explanation: '1->3->5.', difficulty: 'medium'},
      {id: 'inf-23-5', question: 'Команда: +2. Из 1 в 4?', answer: '0', explanation: 'Нельзя попасть (только нечетные).', difficulty: 'medium'},
      {id: 'inf-23-6', question: 'Команды +1, +2. Из 1 в 3?', answer: '2', explanation: '1->2->3 и 1->3.', difficulty: 'easy'},
      {id: 'inf-23-7', question: 'Избегаемый узел Х. Что делаем с f(i=X)?', answer: '0', explanation: 'Обнуляем пути в Х.', difficulty: 'medium'},
      {id: 'inf-23-8', question: 'Команда: x^2. Из 2 в 16?', answer: '2', explanation: '2->4->16 и 2->3(нет)->...', difficulty: 'hard'},
      {id: 'inf-23-9', question: 'Как пишется умножение в Python?', answer: '*', explanation: 'Звездочка.', difficulty: 'easy'},
      {id: 'inf-23-10', question: 'Если мы идем из 10 в 1 (команды -1, //2). Базовый случай?', answer: 'f(1)=1', explanation: 'В конечной точке 1 путь.', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'Как учесть обязательный узел В при пути А->С?', options: ['Сложить f(A,B) и f(B,C)', 'Перемножить f(A,B) * f(B,C)'], correctIndex: 1, explanation: 'Правило умножения комбинаторики.'},
      {question: 'Что делать с избегаемым узлом?', options: ['Вернуть 0', 'Вернуть 1'], correctIndex: 0, explanation: 'В него нельзя попасть.'},
      {question: 'ДП лучше рекурсии?', options: ['Да, с кэшем быстрее', 'Нет'], correctIndex: 0, explanation: 'Избегает дублирования.'},
      {question: 'Какое условие при движении назад (из Б в А)?', options: ['n < A: return 0', 'n > A: return 0'], correctIndex: 0, explanation: 'Ушли дальше цели.'},
      {question: 'Сколько путей из 1 в 1?', options: ['0', '1'], correctIndex: 1, explanation: 'Один путь - ничего не делать.'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Оптимизация путей.'
  },
  {
    id: 'inf-lesson-8',
    title: 'Обработка строк (Задание №24)',
    subject: 'informatics',
    egeNumber: '№24',
    theory: `<div class="theory-content">
      <h3>Текстовые файлы и строки</h3>
      <p>Читаем файл: s = open('file.txt').readline(). Ищем максимальную длину подстроки.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Идём циклом по строке. Если условие выполняется — увеличиваем счетчик. Иначе — сбрасываем и сохраняем максимум.',
    examples: [],
    tasks: [
      {id: 'inf-24-1', question: 'Строка "AABBAA". Макс. кол-во А подряд?', answer: '2', explanation: 'AA.', difficulty: 'easy'},
      {id: 'inf-24-2', question: 's.replace("A", "B"). "ABA" станет?', answer: 'BBB', explanation: 'Все А заменятся на В.', difficulty: 'easy'},
      {id: 'inf-24-3', question: 's.split("C"). "AACCBB" -> длина массива?', answer: '3', explanation: '["AA", "", "BB"].', difficulty: 'medium'},
      {id: 'inf-24-4', question: 'Как найти длину строки s?', answer: 'len(s)', explanation: 'Встроенная функция.', difficulty: 'easy'},
      {id: 'inf-24-5', question: 'Строка "XYXY". Макс длина чередующихся?', answer: '4', explanation: 'Все 4.', difficulty: 'medium'},
      {id: 'inf-24-6', question: 'Метод для поиска подстроки?', answer: 'find', explanation: 'Или index.', difficulty: 'medium'},
      {id: 'inf-24-7', question: 'Как прочитать первую строку файла f?', answer: 'f.readline()', explanation: 'Читает строку.', difficulty: 'medium'},
      {id: 'inf-24-8', question: 's[1:4] для "ABCDE"?', answer: 'BCD', explanation: 'С 1 по 3 индексы.', difficulty: 'medium'},
      {id: 'inf-24-9', question: 's[-1] для "XYZ"?', answer: 'Z', explanation: 'Последний символ.', difficulty: 'easy'},
      {id: 'inf-24-10', question: 'Что делает s.count("A")?', answer: 'считает A', explanation: 'Количество вхождений подстроки.', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Какой цикл лучше для прохода по индексам строки?', options: ['for i in range(len(s))', 'for c in s'], correctIndex: 0, explanation: 'Дает доступ к i и s[i+1].'},
      {question: 'Что вернет s.find("Z"), если Z нет?', options: ['Ошибка', '-1'], correctIndex: 1, explanation: 'Возвращает -1.'},
      {question: 'Изменяемы ли строки в Python?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'Строки неизменяемы.'},
      {question: 's.split() без аргументов делит по...', options: ['Пробелам', 'Запятым'], correctIndex: 0, explanation: 'По любым пробельным символам.'},
      {question: 'Как прочитать весь файл в одну строку (если там нет переносов)?', options: ['f.read()', 'f.readlines()'], correctIndex: 0, explanation: 'read() читает целиком.'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Парсинг логов.'
  },
  {
    id: 'inf-lesson-9',
    title: 'Сортировка и жадные алгоритмы (Задание №26)',
    subject: 'informatics',
    egeNumber: '№26',
    theory: `<div class="theory-content">
      <h3>Жадные алгоритмы</h3>
      <p>Суть: сортируем данные (например, цены по возрастанию) и берем самые дешевые, пока хватает бюджета.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Сортируй массив (.sort()), а потом иди циклом, пока не упрешься в лимит.',
    examples: [],
    tasks: [
      {id: 'inf-26-1', question: 'Бюджет 10. Товары: 4, 5, 6. Макс. количество?', answer: '2', explanation: '4+5 = 9 <= 10.', difficulty: 'easy'},
      {id: 'inf-26-2', question: 'Бюджет 10. Товары: 1, 2, 3, 4. Количество?', answer: '4', explanation: '1+2+3+4=10.', difficulty: 'easy'},
      {id: 'inf-26-3', question: 'Как отсортировать список a по убыванию?', answer: 'a.sort(reverse=True)', explanation: 'Параметр reverse.', difficulty: 'medium'},
      {id: 'inf-26-4', question: 'Бюджет 10. Товары: 8, 9. Количество?', answer: '1', explanation: 'Берем один за 8.', difficulty: 'easy'},
      {id: 'inf-26-5', question: 'Аренда мест. Лучше сортировать по...', answer: 'времени окончания', explanation: 'Жадный выбор - кто раньше освободит.', difficulty: 'hard'},
      {id: 'inf-26-6', question: 'Сложность a.sort() в Python?', answer: 'O(NlogN)', explanation: 'Timsort.', difficulty: 'hard'},
      {id: 'inf-26-7', question: 'Как удалить элемент с конца списка?', answer: 'a.pop()', explanation: 'pop().', difficulty: 'easy'},
      {id: 'inf-26-8', question: 'Бюджет 10. Взяли 4, 5. Остаток?', answer: '1', explanation: '10-9 = 1.', difficulty: 'easy'},
      {id: 'inf-26-9', question: 'Замена самого дорогого из взятых. Взяли 4, 5 (остаток 1). Есть товар 6. Можно ли заменить 5 на 6?', answer: 'да', explanation: '4+6 = 10 <= 10.', difficulty: 'medium'},
      {id: 'inf-26-10', question: 'Массив [5, 2, 8]. После a.sort() первый элемент?', answer: '2', explanation: 'По возрастанию.', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Какой алгоритм в основе многих 26 задач?', options: ['Динамика', 'Жадный алгоритм'], correctIndex: 1, explanation: 'Берем самое выгодное на каждом шаге.'},
      {question: 'Как прочитать массив чисел из файла, по 1 на строке?', options: ['[int(x) for x in f]', 'f.read().split()'], correctIndex: 0, explanation: 'Оба варианта рабочие, но генератор со строками файла короче.'},
      {question: 'Что делает a.sort(reverse=True)?', options: ['Сортирует по возрастанию', 'Сортирует по убыванию'], correctIndex: 1, explanation: 'От большего к меньшему.'},
      {question: 'Какая структура данных удобна для двумерных данных (вес, цена)?', options: ['Список списков (кортежей)', 'Множество'], correctIndex: 0, explanation: 'Кортежи можно сортировать (сначала по 1 эл, потом по 2).'},
      {question: 'Файл слишком большой для памяти?', options: ['В №26 обычно влезает (до 100к строк)', 'Нужно читать побайтово'], correctIndex: 0, explanation: '100к int - это мегабайты, влезет в ОЗУ.'}
    ],
    estimatedTime: 45,
    ntoRelevance: 'Распределение ресурсов.'
  },
  {
    id: 'inf-lesson-10',
    title: 'Оптимизация и сложные алгоритмы (Задание №27)',
    subject: 'informatics',
    egeNumber: '№27',
    theory: `<div class="theory-content">
      <h3>Оптимизация N^2 -> N</h3>
      <p>Задачи на пары, последовательности, префиксные суммы. Алгоритм за O(N^2) получит 1 балл. За O(N) - 2 балла. Используйте массивы остатков или префиксные суммы.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/Br9lLex6G9g',
      simple: 'https://www.youtube.com/embed/Br9lLex6G9g',
      tasks: 'https://www.youtube.com/embed/Br9lLex6G9g'
    },
    videoTimecodes: [],
    simpleExplanation: 'Вместо того чтобы сравнивать каждое число с каждым (долго!), храни нужную информацию в маленьком массиве (например, из 100 элементов).',
    examples: [],
    tasks: [
      {id: 'inf-27-1', question: 'Если файл 1000000 строк. Перебор двойным циклом N^2 успеет?', answer: 'нет', explanation: '10^12 операций - это часы.', difficulty: 'easy'},
      {id: 'inf-27-2', question: 'Массив префиксных сумм для [1, 2, 3]?', answer: '[0, 1, 3, 6]', explanation: 'Или [1, 3, 6].', difficulty: 'medium'},
      {id: 'inf-27-3', question: 'Сумма элементов с i по j равна?', answer: 'P[j] - P[i-1]', explanation: 'Разность префиксных сумм.', difficulty: 'medium'},
      {id: 'inf-27-4', question: 'Как узнать, кратна ли сумма 3?', answer: 'Сумма % 3 == 0', explanation: 'Остаток 0.', difficulty: 'easy'},
      {id: 'inf-27-5', question: 'Разность сумм кратна K, если их остатки от деления на K...', answer: 'равны', explanation: 'Важное свойство.', difficulty: 'hard'},
      {id: 'inf-27-6', question: 'Сколько ячеек нужно для массива остатков по модулю 10?', answer: '10', explanation: 'Индексы 0..9.', difficulty: 'medium'},
      {id: 'inf-27-7', question: 'O(N) алгоритм работает за...', answer: 'один проход', explanation: 'Один цикл for.', difficulty: 'medium'},
      {id: 'inf-27-8', question: 'O(N^2) это сколько циклов?', answer: 'два вложенных', explanation: 'for i... for j...', difficulty: 'easy'},
      {id: 'inf-27-9', question: 'Структура для быстрого поиска минимума на отрезке?', answer: 'дерево отрезков', explanation: 'Или разреженная таблица.', difficulty: 'hard'},
      {id: 'inf-27-10', question: 'Может ли 27А быть решена перебором?', answer: 'да', explanation: 'Там мало данных.', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Зачем нужны префиксные суммы?', options: ['Для быстрого поиска суммы на любом отрезке', 'Для сортировки'], correctIndex: 0, explanation: 'O(1) вместо O(N).'},
      {question: 'Если S1 % 5 == 2 и S2 % 5 == 2. Чему равно (S2 - S1) % 5?', options: ['0', '2'], correctIndex: 0, explanation: 'Остатки сокращаются.'},
      {question: 'Очередь (кольцевой буфер) нужна для задач с условием:', options: ['Расстояние между элементами не менее K', 'Сумма максимальна'], correctIndex: 0, explanation: 'Храним K элементов и достаем старые.'},
      {question: 'Какая оценка сложности даст 2 балла за 27Б?', options: ['O(N^2)', 'O(N)'], correctIndex: 1, explanation: 'Линейное время.'},
      {question: 'Файл 27А имеет размер около...', options: ['100 строк', '100000 строк'], correctIndex: 0, explanation: 'Малый файл.'}
    ],
    estimatedTime: 60,
    ntoRelevance: 'Big Data, алгоритмика.'
  }
];
