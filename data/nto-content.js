// EGE Master 2026 - NTO Olympiad Content
window.NTOContent = {
  profile: {
    title: 'Автоматизация бизнес-процессов',
    description: `<h3>О профиле</h3>
    <p>Профиль "Автоматизация бизнес-процессов" Национальной технологической олимпиады (НТО) посвящен решению реальных задач бизнеса с помощью IT-инструментов.</p>
    <p>Участники учатся описывать бизнес-процессы (BPMN), проектировать базы данных (SQL), писать скрипты на Python для интеграции систем и создавать дашборды.</p>`,
    skills: ['BPMN', 'SQL', 'Python', 'API', 'Excel/Google Sheets', 'No-code/Low-code', 'Аналитика']
  },
  roadmap: [
    {week: 1, title: 'Основы бизнес-анализа', description: 'Понятие процесса. Нотация BPMN 2.0 (события, задачи, шлюзы).', tasks: ['Пройти симулятор BPMN', 'Решить кейс №1']},
    {week: 2, title: 'Моделирование данных (SQL)', description: 'Основы реляционных БД. SELECT, WHERE, JOIN.', tasks: ['10 задач по SQL', 'Спроектировать БД интернет-магазина']},
    {week: 3, title: 'Python: основы для автоматизации', description: 'Структуры данных, функции, работа с JSON.', tasks: ['Написать парсер данных']},
    {week: 4, title: 'Работа с API', description: 'HTTP-запросы, REST API, библиотека requests.', tasks: ['Написать скрипт запроса к API погоды']},
    {week: 5, title: 'No-code инструменты', description: 'Make/Zapier, Airtable, Telegram-боты.', tasks: ['Собрать бота без кода']},
    {week: 6, title: 'Продвинутый SQL', description: 'GROUP BY, HAVING, подзапросы, оконные функции.', tasks: ['Решить сложные SQL-задачи']},
    {week: 7, title: 'BPMN: Продвинутый уровень', description: 'Пул, дорожки, события-таймеры, ошибки.', tasks: ['Смоделировать сложный процесс HR']},
    {week: 8, title: 'Аналитика и Дашборды', description: 'Визуализация данных. DataLens, PowerBI.', tasks: ['Собрать дашборд продаж']},
    {week: 9, title: 'Python: интеграции', description: 'Связка API + БД + Telegram.', tasks: ['Скрипт синхронизации данных']},
    {week: 10, title: 'Решение комплексных кейсов', description: 'Сборка всех навыков воедино.', tasks: ['Кейс "Служба поддержки"']},
    {week: 11, title: 'Разбор заданий прошлых лет', description: 'Анализ финала НТО прошлого года.', tasks: ['Тестовый прогон финала']},
    {week: 12, title: 'Подготовка к финалу', description: 'Командная работа, стратегия.', tasks: ['Распределение ролей']}
  ],
  cases: [
    {
      id: 'case-1',
      title: 'Автоматизация заказов интернет-магазина',
      description: 'Магазин обрабатывает заказы вручную через Excel. Менеджер тратит по 10 минут на заказ. Нужно спроектировать автоматический процесс.',
      stages: [
        {title: 'Анализ процесса', content: 'Какая главная проблема в текущем бизнес-процессе?', inputPlaceholder: 'Например: ручной ввод', expectedKeywords: ['ручн', 'ввод', 'excel', 'человек', 'время']},
        {title: 'BPMN-схема', content: 'Каким должен быть первый элемент (событие) на схеме BPMN при поступлении заказа?', inputPlaceholder: 'Например: Стартовое событие', expectedKeywords: ['старт', 'начал']},
        {title: 'Таблицы данных', content: 'Вам нужна таблица для хранения заказов. Напишите SQL команду для создания таблицы orders (со столбцами id, item).', inputPlaceholder: 'CREATE TABLE...', expectedKeywords: ['create table', 'orders', 'id', 'item']},
        {title: 'Автоматизация', content: 'Напишите условие на Python: если сумма (total) больше 1000, вывести "Скидка".', inputPlaceholder: 'if ...:', expectedKeywords: ['if total > 1000', 'if total >= 1000', 'if total>1000']},
        {title: 'Отчёт', content: 'Вы успешно спроектировали систему. Нажмите кнопку, чтобы завершить.', isFinal: true}
      ]
    },
    {
      id: 'case-2',
      title: 'Интеграция CRM и Telegram (API)',
      description: 'Отдел продаж теряет лиды, так как они не приходят в мессенджер вовремя.',
      stages: [
        {title: 'Анализ API', content: 'Какой HTTP-метод используется для отправки данных (например, сообщения в API Telegram)?', inputPlaceholder: 'Например: GET, POST', expectedKeywords: ['post']},
        {title: 'BPMN-схема', content: 'Какой шлюз (XOR или AND) нужно использовать, если лид может быть целевым ИЛИ нецелевым (только один вариант)?', inputPlaceholder: 'XOR / AND', expectedKeywords: ['xor', 'исключ']},
        {title: 'Структура JSON', content: 'Напишите JSON объект с ключами chat_id (равен 1) и text (равен "hi").', inputPlaceholder: '{"chat_id": ...}', expectedKeywords: ['"chat_id"', '1', '"text"', '"hi"']},
        {title: 'Завершение', content: 'Интеграция готова!', isFinal: true}
      ]
    },
    {
      id: 'case-3',
      title: 'Аналитика и дашборды (SQL + Sheets)',
      description: 'Руководителю нужен дашборд по продажам за месяц из базы данных.',
      stages: [
        {title: 'Сбор данных (SQL)', content: 'Напишите SQL-запрос для подсчета суммы продаж (amount) из таблицы sales.', inputPlaceholder: 'SELECT ...', expectedKeywords: ['select', 'sum(amount)', 'from sales']},
        {title: 'Группировка (SQL)', content: 'Добавьте группировку по менеджеру (manager_id). Как называется оператор?', inputPlaceholder: 'Например: ORDER BY', expectedKeywords: ['group by']},
        {title: 'Дашборд (Визуализация)', content: 'Какой тип диаграммы лучше всего покажет доли продаж разных менеджеров от общей суммы?', inputPlaceholder: 'Например: Линейная, Круговая', expectedKeywords: ['круг', 'pie']},
        {title: 'Завершение', content: 'Дашборд собран и отправлен руководству!', isFinal: true}
      ]
    }
  ],
  bpmnElements: [
    {type: 'start-event', name: 'Стартовое событие', description: 'Начало процесса (например, "Поступил заказ")', icon: '⭕'},
    {type: 'end-event', name: 'Конечное событие', description: 'Конец процесса (например, "Заказ выдан")', icon: '⏺'},
    {type: 'task', name: 'Задача (Task)', description: 'Единица работы (например, "Собрать заказ")', icon: '🟦'},
    {type: 'gateway-exclusive', name: 'Исключающий шлюз (XOR)', description: 'Ветвление: ТОЛЬКО ОДИН путь из нескольких. Вопрос Да/Нет.', icon: '◇'},
    {type: 'gateway-parallel', name: 'Параллельный шлюз (AND)', description: 'Распараллеливание процесса. Все ветки выполняются одновременно.', icon: '⬡'}
  ],
  bpmnExercises: [
    {
      id: 'bpmn-1',
      title: 'Процесс приготовления кофе',
      description: 'Соберите правильную последовательность: Захотел кофе -> Взять чашку -> Налить кофе -> Кофе готов',
      correctSequence: ['start-event', 'task', 'task', 'end-event'],
      elements: []
    }
  ],
  sqlTasks: [
    {
      id: 'sql-1',
      title: 'Создание таблицы заказов',
      description: 'Выведите все заказы клиента "Иванов".',
      setupSQL: 'CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, customer_name TEXT, product TEXT, amount INTEGER, order_date TEXT);\nINSERT INTO orders VALUES (1, "Иванов", "Ноутбук", 1, "2024-01-15");\nINSERT INTO orders VALUES (2, "Петрова", "Мышь", 3, "2024-01-16");\nINSERT INTO orders VALUES (3, "Сидоров", "Клавиатура", 1, "2024-01-17");\nINSERT INTO orders VALUES (4, "Иванов", "Монитор", 1, "2024-02-01");\nINSERT INTO orders VALUES (5, "Козлова", "Наушники", 2, "2024-02-05");',
      task: 'Напишите SQL-запрос, который выберет все столбцы из таблицы orders, где имя клиента равно "Иванов".',
      expectedQuery: 'SELECT * FROM orders WHERE customer_name = "Иванов"',
      hint: 'Используйте оператор WHERE customer_name = "..."',
      checkFunction: 'rows.length === 2 && rows[0].customer_name === "Иванов"' 
    },
    {
      id: 'sql-2',
      title: 'Подсчет суммы',
      description: 'Посчитайте общую сумму (amount) всех заказов в таблице.',
      setupSQL: 'CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, customer_name TEXT, product TEXT, amount INTEGER, order_date TEXT);\nINSERT INTO orders VALUES (1, "Иванов", "Ноутбук", 100, "2024-01-15");\nINSERT INTO orders VALUES (2, "Петрова", "Мышь", 50, "2024-01-16");\nINSERT INTO orders VALUES (3, "Сидоров", "Клавиатура", 75, "2024-01-17");',
      task: 'Выведите сумму (SUM) поля amount. Назовите колонку total_amount.',
      expectedQuery: 'SELECT SUM(amount) as total_amount FROM orders',
      hint: 'Используйте агрегатную функцию SUM()',
      checkFunction: 'rows.length === 1 && rows[0].total_amount === 225'
    },
    {
      id: 'sql-3',
      title: 'Группировка',
      description: 'Найдите количество заказов каждого клиента.',
      setupSQL: 'CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, customer_name TEXT, product TEXT);\nINSERT INTO orders VALUES (1, "Иванов", "А");\nINSERT INTO orders VALUES (2, "Иванов", "Б");\nINSERT INTO orders VALUES (3, "Петров", "В");',
      task: 'Выведите customer_name и количество заказов (COUNT(id) as count) сгруппировав по customer_name.',
      expectedQuery: 'SELECT customer_name, COUNT(id) as count FROM orders GROUP BY customer_name',
      hint: 'Используйте GROUP BY',
      checkFunction: 'rows.length === 2 && rows[0].count === 2'
    }
  ],
  weeklyPlan: [
    {day: 'Пн', topic: 'BPMN теория и нотация', duration: 40},
    {day: 'Вт', topic: 'SQL базовые запросы', duration: 45},
    {day: 'Ср', topic: 'Разбор бизнес-кейса', duration: 60},
    {day: 'Чт', topic: 'Python скрипты', duration: 45},
    {day: 'Пт', topic: 'SQL сложные задачи', duration: 45},
    {day: 'Сб', topic: 'Командное собрание, практика', duration: 90},
    {day: 'Вс', topic: 'Отдых', duration: 0}
  ]
};
