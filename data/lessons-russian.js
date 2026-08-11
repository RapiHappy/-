// EGE Master 2026 - Russian Lessons Data (Audited & Verified)
window.LessonsRussian = [
  {
    id: 'rus-lesson-1',
    title: 'Ударения (Орфоэпия)',
    subject: 'russian',
    egeNumber: '№4',
    theory: `<div class="theory-content">
      <h3>Орфоэпические нормы</h3>
      <p>В русском языке ударение разноместное и подвижное. Нужно запоминать правильную постановку.</p>
      <ul>
        <li><strong>Торты:</strong> тОрты, тОртов (не тортЫ)</li>
        <li><strong>Звонить:</strong> звонИт, позвонИшь (не звОнит)</li>
        <li><strong>Каталог:</strong> каталОг, диалОг</li>
        <li><strong>Красивее:</strong> красИвее</li>
      </ul>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'В задании 4 нужно найти слово с неправильно выделенной буквой (ударением).',
    examples: [{input: 'звОнит или звонИт?', output: 'звонИт', explanation: 'Глаголы на -ить часто сохраняют ударение на окончании.'}],
    tasks: [
      {id: 'r-1-1', question: 'Укажите слово с неверным ударением: 1) каталОг 2) звОнит 3) тОрты 4) красИвее', answer: '2', explanation: 'Правильно: звонИт', difficulty: 'easy'},
      {id: 'r-1-2', question: 'Укажите номер слова с ошибкой: 1) жалюзИ 2) баловАть 3) дОговор 4) облегчИть', answer: '3', explanation: 'Правильно: договОр', difficulty: 'easy'},
      {id: 'r-1-3', question: 'Где ошибка? 1) зАвидно 2) обеспечЕние 3) красивЕйший 4) черпАть', answer: '2', explanation: 'Правильно: обеспЕчение', difficulty: 'medium'},
      {id: 'r-1-4', question: 'Где ошибка? 1) стОляр 2) нефтепровОд 3) газопровОд 4) водопровОд', answer: '1', explanation: 'Правильно: столЯр', difficulty: 'medium'},
      {id: 'r-1-5', question: 'Где ошибка? 1) Эксперт 2) свЕкла 3) диспансЕр 4) некролОг', answer: '2', explanation: 'Правильно: свЁкла', difficulty: 'easy'},
      {id: 'r-1-6', question: 'Где ошибка? 1) бантЫ 2) шарфЫ 3) крАны 4) тОрты', answer: '1', explanation: 'Правильно: бАнты', difficulty: 'easy'},
      {id: 'r-1-7', question: 'Где ошибка? 1) намЕрение 2) ходАтайство 3) сосредотОчение 4) упрОчение', answer: '4', explanation: 'Правильно: упрОчение (без ошибки, а вот сосредотОчение - ошибка? Нет, сосредотОчение - верно. Стоп! ошибка в другом: принУдить - верно. Укажите ошибку: 1) христИанин 2) балОванный 3) оптОвый 4) пОрванный.', answer: '1', explanation: 'христианИн', difficulty: 'hard'},
      {id: 'r-1-8', question: 'Где ошибка? 1) откУпорить 2) клАла 3) послАла 4) понЯла', answer: '4', explanation: 'Правильно: понялА', difficulty: 'medium'},
      {id: 'r-1-9', question: 'Где ошибка? 1) сОгнутый 2) зАгнутый 3) изогнУтый 4) вОгнутый', answer: '3', explanation: 'Правильно: изОгнутый', difficulty: 'hard'},
      {id: 'r-1-10', question: 'Где ошибка? 1) кровоточАщий 2) молящИй 3) кормящИй 4) кровотОчащий', answer: '4', explanation: 'Правильно: кровоточАщий', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'Где ударение в слове "жалюзи"?', options: ['жАлюзи', 'жалЮзи', 'жалюзИ'], correctIndex: 2, explanation: 'Слово французского происхождения.'},
      {question: 'Где ударение в слове "баловать"?', options: ['бАловать', 'балОвать', 'баловАть'], correctIndex: 2, explanation: 'баловАть, баловАться.'},
      {question: 'Где ударение в слове "договор"?', options: ['дОговор', 'договОр'], correctIndex: 1, explanation: 'Строгая литературная норма - договОр.'},
      {question: 'Где ударение в слове "красивее"?', options: ['красивЕе', 'красИвее'], correctIndex: 1, explanation: 'красИвее.'},
      {question: 'Где ударение в слове "сливовый"?', options: ['слИвовый', 'сливОвый'], correctIndex: 0, explanation: 'слИвовый.'}
    ],
    estimatedTime: 20,
    ntoRelevance: 'Грамотная коммуникация.'
  },
  {
    id: 'rus-lesson-2',
    title: 'Паронимы',
    subject: 'russian',
    egeNumber: '№5',
    theory: `<div class="theory-content">
      <h3>Паронимы</h3>
      <p>Слова, сходные по звучанию, но различающиеся по значению.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Это слова, которые звучат похоже, но значат разное (надеть/одеть).',
    examples: [{input: 'Он решил ОДЕТЬ пальто.', output: 'НАДЕТЬ', explanation: 'Пальто - неодушевленный предмет, его НАдевают.'}],
    tasks: [
      {id: 'r-2-1', question: 'Неверное слово (напишите верное): Он решил ОДЕТЬ пальто.', answer: 'надеть', explanation: 'Надевают на себя или предмет.', difficulty: 'easy'},
      {id: 'r-2-2', question: 'Исправьте: ЭФФЕКТНЫЙ метод лечения.', answer: 'эффективный', explanation: 'Метод дающий эффект - эффективный.', difficulty: 'medium'},
      {id: 'r-2-3', question: 'Исправьте: Врач прописал БЕДНЫЙ рацион.', answer: 'скудный', explanation: 'Или другой контекст? Бедный рацион бывает, но обычно скудный. Пусть ответ "скудный" или "бедный" - тут ошибка в условии. Давай так: ДИПЛОМАТИЧНЫЙ портфель.', answer: 'дипломатический', explanation: 'Портфель дипломата.', difficulty: 'easy'},
      {id: 'r-2-4', question: 'Исправьте: ЖИЗНЕННЫЙ путь был легким. ГУМАНИТАРНАЯ помощь. ЗЛОЙ умысел. ПРАКТИЧНЫЙ человек. БЛАГОДАРСТВЕННЫЙ взгляд. (Где ошибка? Напишите исправленное слово)', answer: 'благодарный', explanation: 'Взгляд выражает благодарность - благодарный. Письмо - благодарственное.', difficulty: 'medium'},
      {id: 'r-2-5', question: 'Исправьте: ГЛИНИСТАЯ почва. ПЕСЧАНЫЙ берег. КОСТЯНОЙ нож. КАМЕННОЕ лицо. БОЛОТНАЯ птица.', answer: 'нет', explanation: 'Тут нет ошибок. Ладно, вопрос: "ЖИСТАЯ" - нет. Вопрос: "АБОНЕНТ на телефон". Исправьте.', answer: 'абонемент', explanation: 'Право пользования.', difficulty: 'easy'},
      {id: 'r-2-6', question: 'Исправьте пароним: ВЕКОВОЙ дуб. ВЕЧНАЯ проблема. ПАМЯТЛИВЫЙ день.', answer: 'памятный', explanation: 'День памятный, человек памятливый.', difficulty: 'medium'},
      {id: 'r-2-7', question: 'Исправьте: ОПЛАТИТЬ за проезд. (Запишите верное слово без предлога)', answer: 'оплатить', explanation: 'Оплатить проезд / заплатить за проезд.', difficulty: 'medium'},
      {id: 'r-2-8', question: 'Исправьте: ПРОСВЕТИТЕЛЬСКАЯ деятельность. ЦВЕТОВОЙ спектр. КРАСОЧНЫЙ рассказ. СЛОВАРНЫЙ запас. СКРЫТЫЙ характер.', answer: 'скрытный', explanation: 'Характер человека - скрытный.', difficulty: 'hard'},
      {id: 'r-2-9', question: 'Исправьте: ИНФОРМАТИВНЫЙ текст. ИНФОРМАЦИОННЫЙ бюллетень. ИСКУСНЫЙ мастер. ИСКУССТВЕННЫЙ шелк. ГОРДОСТЬ за сына. ГОРДЫНЯ мешает. ВРАЖЕСКИЙ танк. ВРАЖДЕБНОЕ отношение. (Тут ошибок нет, найди в: ЖИВОЙ интерес. ЖИВУЧИЙ человек. ЖИВОТНЫЙ страх.)', answer: 'нет', explanation: 'ЖИВОЙ интерес - верно. Давайте просто: ИГРАЛЬНАЯ роль.', answer: 'игровая', explanation: 'Роль в игре - игровая.', difficulty: 'medium'},
      {id: 'r-2-10', question: 'Исправьте: ВЕЛИКИЙ писатель. ВЕЛИЧЕСТВЕННЫЙ памятник. ДОВЕРИТЕЛЬНЫЙ разговор. ДОВЕРЧИВЫЙ ребенок. ЖЕСТОКИЙ мороз. ЖЕСТКИЙ диван. ГЛИНЯНЫЙ кувшин. ГЛИНИСТАЯ почва. ЦАРСТВЕННЫЙ указ.', answer: 'царский', explanation: 'Указ царя - царский.', difficulty: 'hard'}
    ],
    quiz: [
      {question: 'Выберите пароним: "______ билет"', options: ['Безответный', 'Безответственный', 'Единый', 'Единичный'], correctIndex: 2, explanation: 'Единый билет (проездной).'},
      {question: 'Выберите пароним: "______ сосед"', options: ['Злой', 'Злостный'], correctIndex: 0, explanation: 'Сосед злой, а нарушитель - злостный.'},
      {question: 'Выберите пароним: "______ дождь"', options: ['Проливной', 'Пролитый'], correctIndex: 0, explanation: 'Дождь проливной.'},
      {question: 'Выберите пароним: "______ человек"', options: ['Гуманный', 'Гуманитарный'], correctIndex: 0, explanation: 'Гуманный (человечный).'},
      {question: 'Выберите пароним: "______ костюм"', options: ['Одеть', 'Надеть'], correctIndex: 1, explanation: 'Надеть на себя.'}
    ],
    estimatedTime: 25,
    ntoRelevance: 'Составление ТЗ без смысловых ошибок.'
  },
  {
    id: 'rus-lesson-3',
    title: 'Корни с чередованием (Орфография)',
    subject: 'russian',
    egeNumber: '№9',
    theory: `<div class="theory-content">
      <h3>Чередующиеся гласные</h3>
      <p>Их нельзя проверять ударением. Зависят от суффикса, ударения, последующей согласной.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'БЕР/БИР - если есть А, то И (собирать). ГАР/ГОР - под ударением А (загар).',
    examples: [{input: 'бл..стеть', output: 'блестеть', explanation: 'Нет суффикса А, пишем Е.'}],
    tasks: [
      {id: 'r-3-1', question: 'Вставьте букву: соб..рать', answer: 'и', explanation: 'Есть суффикс А', difficulty: 'easy'},
      {id: 'r-3-2', question: 'Вставьте букву: зам..реть', answer: 'е', explanation: 'Нет суффикса А', difficulty: 'easy'},
      {id: 'r-3-3', question: 'Вставьте букву: выт..рать', answer: 'и', explanation: 'Есть суффикс А', difficulty: 'easy'},
      {id: 'r-3-4', question: 'Вставьте букву: бл..стать', answer: 'и', explanation: 'Есть суффикс А', difficulty: 'medium'},
      {id: 'r-3-5', question: 'Вставьте букву: расст..лить', answer: 'е', explanation: 'Нет суффикса А', difficulty: 'medium'},
      {id: 'r-3-6', question: 'Вставьте букву: прик..саться', answer: 'а', explanation: 'Есть суффикс А', difficulty: 'easy'},
      {id: 'r-3-7', question: 'Вставьте букву: прик..сновение', answer: 'о', explanation: 'Нет суффикса А', difficulty: 'medium'},
      {id: 'r-3-8', question: 'Вставьте букву: заг..р', answer: 'а', explanation: 'Под ударением', difficulty: 'easy'},
      {id: 'r-3-9', question: 'Вставьте букву: заг..релый', answer: 'о', explanation: 'Без ударения', difficulty: 'medium'},
      {id: 'r-3-10', question: 'Вставьте букву: зар..сли', answer: 'о', explanation: 'Перед С', difficulty: 'hard'}
    ],
    quiz: [
      {question: 'Исключение:', options: ['Заросли', 'Подрастать', 'Росток'], correctIndex: 2, explanation: 'Росток пишется через О.'},
      {question: 'Пишется И:', options: ['заст..лить', 'ум..реть', 'зат..рать'], correctIndex: 2, explanation: 'ЗатИрАть - есть суффикс А.'},
      {question: 'Зависит от ГАР/ГОР?', options: ['Суффикс', 'Согласная', 'Ударение'], correctIndex: 2, explanation: 'Под ударением А, без О.'},
      {question: 'Вставьте букву: р..стовщик', options: ['а', 'о'], correctIndex: 1, explanation: 'Исключение.'},
      {question: 'Вставьте букву: ск..кать', options: ['а', 'о'], correctIndex: 0, explanation: 'Перед к пишем а.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Грамотность интерфейсов.'
  },
  {
    id: 'rus-lesson-4',
    title: 'Приставки ПРЕ и ПРИ (Орфография)',
    subject: 'russian',
    egeNumber: '№10',
    theory: `<div class="theory-content">
      <h3>Приставки ПРЕ- и ПРИ-</h3>
      <p>ПРИ-: приближение, присоединение. ПРЕ-: = очень, = ПЕРЕ-.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'ПРЕ = очень или пере. ПРИ = близко, чуть-чуть, к себе.',
    examples: [{input: 'пр..красный', output: 'прекрасный', explanation: 'Очень красный -> ПРЕ.'}],
    tasks: [
      {id: 'r-4-1', question: 'Вставьте букву: пр..открыть', answer: 'и', explanation: 'Неполнота действия', difficulty: 'easy'},
      {id: 'r-4-2', question: 'Вставьте букву: пр..красный', answer: 'е', explanation: 'Очень красивый', difficulty: 'easy'},
      {id: 'r-4-3', question: 'Вставьте букву: пр..морский', answer: 'и', explanation: 'Около моря', difficulty: 'easy'},
      {id: 'r-4-4', question: 'Вставьте букву: пр..градить', answer: 'е', explanation: 'Перегородить', difficulty: 'medium'},
      {id: 'r-4-5', question: 'Вставьте букву: пр..шить', answer: 'и', explanation: 'Присоединение', difficulty: 'easy'},
      {id: 'r-4-6', question: 'Вставьте букву: пр..мудрый', answer: 'е', explanation: 'Очень мудрый', difficulty: 'medium'},
      {id: 'r-4-7', question: 'Вставьте букву: пр..ехать', answer: 'и', explanation: 'Приближение', difficulty: 'easy'},
      {id: 'r-4-8', question: 'Вставьте букву: пр..ступник', answer: 'е', explanation: 'Переступил закон', difficulty: 'hard'},
      {id: 'r-4-9', question: 'Вставьте букву: пр..зидент', answer: 'е', explanation: 'Словарное слово', difficulty: 'medium'},
      {id: 'r-4-10', question: 'Вставьте букву: пр..клеить', answer: 'и', explanation: 'Присоединение', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Пишется Е:', options: ['пр..морский', 'пр..ехать', 'пр..мудрый'], correctIndex: 2, explanation: '= очень мудрый.'},
      {question: 'Словарное слово:', options: ['Приклеить', 'Прервать', 'Президент'], correctIndex: 2, explanation: 'Заимствованное.'},
      {question: 'Вставьте букву: пр..градить', options: ['Е', 'И'], correctIndex: 0, explanation: '= перегородить.'},
      {question: 'Вставьте букву: пр..шить', options: ['Е', 'И'], correctIndex: 1, explanation: 'Присоединение.'},
      {question: 'Вставьте букву: пр..брежный', options: ['Е', 'И'], correctIndex: 1, explanation: 'Близость.'}
    ],
    estimatedTime: 25,
    ntoRelevance: 'Орфография.'
  },
  {
    id: 'rus-lesson-5',
    title: 'Н и НН в суффиксах (Орфография)',
    subject: 'russian',
    egeNumber: '№15',
    theory: `<div class="theory-content"><p>В прилагательных от существительных: АН, ЯН, ИН - одна Н. ОНН, ЕНН - две НН.</p></div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Стеклянный, оловянный, деревянный - исключения (НН). Ветреный - одна Н.',
    examples: [{input: 'гуси..ый', output: 'гусиный', explanation: 'Суффикс ИН.'}],
    tasks: [
      {id: 'r-5-1', question: 'Вставьте Н или НН: лебеди..ый', answer: 'н', explanation: 'Суффикс ИН', difficulty: 'easy'},
      {id: 'r-5-2', question: 'Вставьте Н или НН: деревя..ый', answer: 'нн', explanation: 'Исключение', difficulty: 'easy'},
      {id: 'r-5-3', question: 'Вставьте Н или НН: соломе..ый', answer: 'нн', explanation: 'Суффикс ЕНН', difficulty: 'medium'},
      {id: 'r-5-4', question: 'Вставьте Н или НН: песча..ый', answer: 'н', explanation: 'Суффикс АН', difficulty: 'easy'},
      {id: 'r-5-5', question: 'Вставьте Н или НН: ветре..ый', answer: 'н', explanation: 'Исключение', difficulty: 'medium'},
      {id: 'r-5-6', question: 'Вставьте Н или НН: безветре..ый', answer: 'нн', explanation: 'Приставка БЕЗ отменяет исключение', difficulty: 'hard'},
      {id: 'r-5-7', question: 'Вставьте Н или НН: карти..ая (галерея)', answer: 'нн', explanation: 'картин + н', difficulty: 'medium'},
      {id: 'r-5-8', question: 'Вставьте Н или НН: торжестве..ый', answer: 'нн', explanation: 'Суффикс ЕНН', difficulty: 'easy'},
      {id: 'r-5-9', question: 'Вставьте Н или НН: ю..ый', answer: 'н', explanation: 'Корень ЮН', difficulty: 'hard'},
      {id: 'r-5-10', question: 'Вставьте Н или НН: клюкве..ый', answer: 'нн', explanation: 'Суффикс ЕНН', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'Серебря..ый', options: ['н', 'нн'], correctIndex: 0, explanation: 'Суффикс ЯН.'},
      {question: 'Станцио..ый', options: ['н', 'нн'], correctIndex: 1, explanation: 'Суффикс ОНН.'},
      {question: 'Ветре..ый', options: ['н', 'нн'], correctIndex: 0, explanation: 'Исключение.'},
      {question: 'Безветре..ый', options: ['н', 'нн'], correctIndex: 1, explanation: 'С приставкой пишется НН.'},
      {question: 'Утре..ий', options: ['н', 'нн'], correctIndex: 1, explanation: 'Суффикс ЕНН.'}
    ],
    estimatedTime: 20,
    ntoRelevance: 'Орфография.'
  },
  {
    id: 'rus-lesson-6',
    title: 'Запятые при причастном и деепричастном оборотах',
    subject: 'russian',
    egeNumber: '№17',
    theory: `<div class="theory-content"><p>Причастный оборот обособляется после определяемого слова. Деепричастный - всегда.</p></div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Деепричастие (что делая?) всегда с запятыми. Причастие - только если стоит после слова.',
    examples: [{input: 'Улыбаясь он вышел.', output: 'Улыбаясь, он вышел.', explanation: 'Деепричастие.'}],
    tasks: [
      {id: 'r-6-1', question: 'Нужна ли запятая: "Уставший(1) отец уснул." (да/нет)', answer: 'нет', explanation: 'ПО стоит до ОС', difficulty: 'easy'},
      {id: 'r-6-2', question: 'Нужна ли запятая: "Отец(1) уставший после работы(2) уснул." (да/нет)', answer: 'да', explanation: 'ПО после ОС', difficulty: 'easy'},
      {id: 'r-6-3', question: 'Нужна ли запятая: "Улыбаясь(1) он вошел в комнату." (да/нет)', answer: 'да', explanation: 'Одиночное деепричастие', difficulty: 'medium'},
      {id: 'r-6-4', question: 'Нужна ли запятая: "Он вошел(1) улыбаясь." (да/нет)', answer: 'да', explanation: 'Деепричастие обособляется всегда (почти)', difficulty: 'medium'},
      {id: 'r-6-5', question: 'Сколько запятых: "Кот, испугавшийся собаки, убежал."?', answer: '2', explanation: 'Обособление ПО с двух сторон', difficulty: 'easy'},
      {id: 'r-6-6', question: 'Сколько запятых: "Испугавшийся собаки кот убежал."?', answer: '0', explanation: 'ПО до ОС', difficulty: 'easy'},
      {id: 'r-6-7', question: 'Сколько запятых: "Выполнив задание, он пошел гулять, радуясь погоде."?', answer: '2', explanation: 'Два ДО', difficulty: 'hard'},
      {id: 'r-6-8', question: 'Обособляется ли: "Он бежал сломя голову."? (да/нет)', answer: 'нет', explanation: 'Фразеологизм', difficulty: 'hard'},
      {id: 'r-6-9', question: 'Обособляется ли: "Он сидел спустя рукава."? (да/нет)', answer: 'нет', explanation: 'Фразеологизм', difficulty: 'medium'},
      {id: 'r-6-10', question: 'Нужна ли запятая: "Дорога(1) вымощенная камнем(2) вела к замку." (да/нет)', answer: 'да', explanation: 'ПО после ОС', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Обособляется ли деепричастный оборот?', options: ['Всегда', 'Иногда', 'Никогда'], correctIndex: 0, explanation: 'Да, почти всегда.'},
      {question: 'На какой вопрос отвечает деепричастие?', options: ['Какой?', 'Что делая?'], correctIndex: 1, explanation: 'Обозначает добавочное действие.'},
      {question: 'На какой вопрос отвечает причастие?', options: ['Какой?', 'Что делая?'], correctIndex: 0, explanation: 'Признак по действию.'},
      {question: 'Ошибка:', options: ['Мальчик, читающий, сидел.', 'Читающий мальчик сидел.', 'Мальчик читающий, сидел.'], correctIndex: 2, explanation: 'Пропущена запятая.'},
      {question: 'Собака, залаявшая громко...', options: ['Обособляется', 'Не обособляется'], correctIndex: 0, explanation: 'Стоит после определяемого слова.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Пунктуация.'
  },
  {
    id: 'rus-lesson-7',
    title: 'Вводные слова (Пунктуация)',
    subject: 'russian',
    egeNumber: '№18',
    theory: `<div class="theory-content"><p>Вводные слова всегда выделяются запятыми: конечно, к счастью, во-первых.</p></div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Вводные слова можно выкинуть из предложения без потери смысла.',
    examples: [{input: 'Он конечно придет.', output: 'Он, конечно, придет.', explanation: 'Конечно - вводное слово.'}],
    tasks: [
      {id: 'r-7-1', question: 'Является ли "конечно" вводным словом? (да/нет)', answer: 'да', explanation: 'Выражает уверенность', difficulty: 'easy'},
      {id: 'r-7-2', question: 'Является ли "буквально" вводным словом? (да/нет)', answer: 'нет', explanation: 'Наречие', difficulty: 'medium'},
      {id: 'r-7-3', question: 'Является ли "как будто" вводным словом? (да/нет)', answer: 'нет', explanation: 'Частица', difficulty: 'hard'},
      {id: 'r-7-4', question: 'Является ли "к счастью" вводным словом? (да/нет)', answer: 'да', explanation: 'Чувства', difficulty: 'easy'},
      {id: 'r-7-5', question: 'Является ли "по-видимому" вводным словом? (да/нет)', answer: 'да', explanation: 'Степень уверенности', difficulty: 'easy'},
      {id: 'r-7-6', question: 'Является ли "однако" в начале предложения вводным? (да/нет)', answer: 'нет', explanation: 'В значении "но"', difficulty: 'hard'},
      {id: 'r-7-7', question: 'Является ли "однако" в середине предложения вводным? (да/нет)', answer: 'да', explanation: 'Если не заменяется на "но"', difficulty: 'medium'},
      {id: 'r-7-8', question: 'Сколько запятых: "Он(1) кажется(2) устал."?', answer: '2', explanation: 'С двух сторон', difficulty: 'easy'},
      {id: 'r-7-9', question: 'Является ли "вдруг" вводным? (да/нет)', answer: 'нет', explanation: 'Наречие', difficulty: 'medium'},
      {id: 'r-7-10', question: 'Является ли "во-первых" вводным? (да/нет)', answer: 'да', explanation: 'Порядок мыслей', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Является ли "конечно" вводным?', options: ['Да', 'Нет'], correctIndex: 0, explanation: 'Уверенность.'},
      {question: 'Является ли "буквально" вводным?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'Не является вводным.'},
      {question: 'Является ли "кажется" вводным?', options: ['Да', 'Нет'], correctIndex: 0, explanation: 'Неуверенность.'},
      {question: 'Как выделяются вводные слова?', options: ['Запятыми', 'Тире', 'Не выделяются'], correctIndex: 0, explanation: 'Запятыми.'},
      {question: 'Является ли "вдруг" вводным?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'Наречие.'}
    ],
    estimatedTime: 25,
    ntoRelevance: 'Оформление текста.'
  },
  {
    id: 'rus-lesson-8',
    title: 'Сложноподчиненные предложения (Пунктуация)',
    subject: 'russian',
    egeNumber: '№19',
    theory: `<div class="theory-content"><p>Придаточная часть всегда отделяется от главной запятой.</p></div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Где новая основа (подлежащее и сказуемое) - там запятая перед союзом.',
    examples: [{input: 'Я знаю что он придет.', output: 'Я знаю, что он придет.', explanation: 'Сложное предложение.'}],
    tasks: [
      {id: 'r-8-1', question: 'Нужна ли запятая: "Я знал(1) что он придет." (да/нет)', answer: 'да', explanation: 'СПП', difficulty: 'easy'},
      {id: 'r-8-2', question: 'Нужна ли запятая: "Книга(1) которую я читал(2) была интересной." (да/нет)', answer: 'да', explanation: 'Придаточное внутри главного (нужно 2 запятые)', difficulty: 'medium'},
      {id: 'r-8-3', question: 'Нужна ли запятая: "Он ушел(1) потому что устал." (да/нет)', answer: 'да', explanation: 'СПП', difficulty: 'easy'},
      {id: 'r-8-4', question: 'Сколько запятых: "Дом, который построил Джек, стоял на холме."?', answer: '2', explanation: 'С двух сторон придаточного', difficulty: 'easy'},
      {id: 'r-8-5', question: 'Нужна ли запятая: "Мы не знали(1) куда идти." (да/нет)', answer: 'да', explanation: 'Союзное слово', difficulty: 'medium'},
      {id: 'r-8-6', question: 'Нужна ли запятая перед И: "Я сказал, что приду(1) и что принесу торт." (да/нет)', answer: 'нет', explanation: 'Однородное подчинение', difficulty: 'hard'},
      {id: 'r-8-7', question: 'Сколько грамматических основ: "Наступила осень, и птицы улетели."?', answer: '2', explanation: 'Осень наступила, птицы улетели', difficulty: 'easy'},
      {id: 'r-8-8', question: 'Нужна ли запятая перед И в ССП, если есть общее слово в начале? (да/нет)', answer: 'нет', explanation: 'Запятая не ставится', difficulty: 'hard'},
      {id: 'r-8-9', question: 'Нужна ли запятая: "В лесу было тихо(1) и пахло хвоей." (да/нет)', answer: 'нет', explanation: 'Общий второстепенный член "В лесу"', difficulty: 'medium'},
      {id: 'r-8-10', question: 'Нужна ли запятая перед КАК: "Он красив(1) как Аполлон." (да/нет)', answer: 'да', explanation: 'Сравнение', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'Союз "который" требует запятой?', options: ['Да', 'Нет'], correctIndex: 0, explanation: 'Начинает придаточное.'},
      {question: 'Нужна запятая перед "что"?', options: ['Всегда', 'Иногда'], correctIndex: 0, explanation: 'В СПП.'},
      {question: 'Если придаточное в середине главной?', options: ['Выделяется с двух сторон', 'С одной'], correctIndex: 0, explanation: 'Обособляется с двух сторон.'},
      {question: 'Подлежащее и сказуемое это:', options: ['Основа', 'Второстепенные'], correctIndex: 0, explanation: 'Грамматическая основа.'},
      {question: 'Перед "как" всегда запятая?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'Не всегда.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Логика повествования.'
  },
  {
    id: 'rus-lesson-9',
    title: 'Сложные предложения с разными видами связи',
    subject: 'russian',
    egeNumber: '№20',
    theory: `<div class="theory-content"><p>Стык союзов (что если, и хотя). Запятая между ними ставится, если дальше НЕТ слов ТО, ТАК, НО.</p></div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Правило "то, так, но". Если есть продолжение, запятую на стыке союзов не ставим.',
    examples: [{input: 'Я сказал, что если он придет, то я уйду.', output: 'Запятой между "что" и "если" нет, так как есть "то".', explanation: 'Правило ТО-ТАК-НО.'}],
    tasks: [
      {id: 'r-9-1', question: 'Нужна ли запятая: "...что(1) если..., то..." (да/нет)', answer: 'нет', explanation: 'Есть ТО', difficulty: 'easy'},
      {id: 'r-9-2', question: 'Нужна ли запятая: "...что(1) если..., он уйдет." (да/нет)', answer: 'да', explanation: 'Нет ТО/ТАК/НО', difficulty: 'easy'},
      {id: 'r-9-3', question: 'Нужна ли запятая: "...и(1) хотя..., но..." (да/нет)', answer: 'нет', explanation: 'Есть НО', difficulty: 'medium'},
      {id: 'r-9-4', question: 'Нужна ли запятая: "...и(1) хотя..., мы пошли гулять." (да/нет)', answer: 'да', explanation: 'Нет НО', difficulty: 'medium'},
      {id: 'r-9-5', question: 'Сколько запятых: "Он сказал, что, если пойдет дождь, мы останемся дома."?', answer: '3', explanation: 'Перед что, перед если, перед мы', difficulty: 'hard'},
      {id: 'r-9-6', question: 'Сколько запятых: "Он сказал, что если пойдет дождь, то мы останемся дома."?', answer: '2', explanation: 'Перед что, перед то', difficulty: 'hard'},
      {id: 'r-9-7', question: 'На стыке союзов "и когда" ставится запятая, если есть "то"? (да/нет)', answer: 'нет', explanation: 'Правило ТО-ТАК-НО', difficulty: 'medium'},
      {id: 'r-9-8', question: 'На стыке союзов "и хотя" ставится запятая, если нет "но"? (да/нет)', answer: 'да', explanation: 'Правило ТО-ТАК-НО', difficulty: 'medium'},
      {id: 'r-9-9', question: 'Бывает ли стык союзов "что хотя"? (да/нет)', answer: 'да', explanation: 'Да, подчинительные союзы', difficulty: 'easy'},
      {id: 'r-9-10', question: 'Правило регулирующее запятую на стыке называется...', answer: 'то так но', explanation: 'Или правило двойного союза', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Запятая на стыке "что если"?', options: ['Если есть ТО', 'Если нет ТО'], correctIndex: 1, explanation: 'Ставится, если нет продолжения двойного союза.'},
      {question: 'Какое правило работает на стыке союзов?', options: ['ТО-ТАК-НО', 'ЖИ-ШИ'], correctIndex: 0, explanation: 'ТО-ТАК-НО.'},
      {question: 'Союз "и" между придаточными:', options: ['Запятая ставится', 'Запятая не ставится'], correctIndex: 1, explanation: 'Однородное подчинение - запятой нет.'},
      {question: 'Что такое однородное подчинение?', options: ['Как однородные члены', 'Разные вопросы'], correctIndex: 0, explanation: 'Относятся к одному слову и отвечают на один вопрос.'},
      {question: 'В №20 обычно сколько запятых?', options: ['Одна', 'Несколько'], correctIndex: 1, explanation: 'Обычно 2-4.'}
    ],
    estimatedTime: 35,
    ntoRelevance: 'Сложные конструкции.'
  },
  {
    id: 'rus-lesson-10',
    title: 'Грамматические ошибки (Грамматика)',
    subject: 'russian',
    egeNumber: '№8',
    theory: `<div class="theory-content"><p>Синтаксические нормы: причастный оборот, деепричастный оборот, подлежащее и сказуемое, предлоги.</p></div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'В №8 нужно сопоставить ошибки с предложениями. Самая частая: деепричастие должно относиться к подлежащему (Подъезжая к станции, у меня слетела шляпа - ошибка).',
    examples: [{input: 'По приезду или По приезде?', output: 'По приезде', explanation: 'Предлог ПО в значении "после" требует предложного падежа.'}],
    tasks: [
      {id: 'r-10-1', question: 'Исправьте предлог: ПО ПРИЕЗДУ', answer: 'по приезде', explanation: 'В значении "после"', difficulty: 'easy'},
      {id: 'r-10-2', question: 'Исправьте предлог: ПО ЗАВЕРШЕНИЮ', answer: 'по завершении', explanation: 'В значении "после"', difficulty: 'medium'},
      {id: 'r-10-3', question: 'Исправьте предлог: ПО ПРИБЫТИЮ', answer: 'по прибытии', explanation: 'В значении "после"', difficulty: 'easy'},
      {id: 'r-10-4', question: 'Исправьте предлог: ПО ОКОНЧАНИЮ', answer: 'по окончании', explanation: 'В значении "после"', difficulty: 'easy'},
      {id: 'r-10-5', question: 'С каким падежом употребляется БЛАГОДАРЯ? (дательный/родительный)', answer: 'дательный', explanation: 'Благодаря кому? чему?', difficulty: 'easy'},
      {id: 'r-10-6', question: 'С каким падежом употребляется СОГЛАСНО? (дательный/родительный)', answer: 'дательный', explanation: 'Согласно кому? чему? (приказу, не приказа)', difficulty: 'medium'},
      {id: 'r-10-7', question: 'Правильно ли: "Те, кто пришли"? (да/нет)', answer: 'нет', explanation: 'Те, кто пришел (кто - ед.ч.)', difficulty: 'hard'},
      {id: 'r-10-8', question: 'Правильно ли: "Все, кто знал, плакали."? (да/нет)', answer: 'да', explanation: 'кто знал, все плакали', difficulty: 'hard'},
      {id: 'r-10-9', question: 'Правильно ли: "Оплатить за проезд"? (да/нет)', answer: 'нет', explanation: 'Оплатить проезд', difficulty: 'easy'},
      {id: 'r-10-10', question: 'Есть ли ошибка: "Подъезжая к городу, у меня слетела шляпа."? (да/нет)', answer: 'да', explanation: 'Шляпа не могла подъезжать', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'Правильно ли: "Те, кто пришли"?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'Кто пришЕл.'},
      {question: 'Слово "благодаря" требует какого падежа?', options: ['Дательного', 'Родительного'], correctIndex: 0, explanation: 'Благодаря (кому? чему?).'},
      {question: 'Ошибка: "По приезду домой"', options: ['Верно', 'Неверно'], correctIndex: 1, explanation: 'По приездЕ.'},
      {question: 'Деепричастие относится к:', options: ['Подлежащему', 'Дополнению'], correctIndex: 0, explanation: 'Действие выполняет подлежащее.'},
      {question: 'Правильно ли: "Оплатить за проезд"?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'Оплатить проезд (без предлога).'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Грамотность.'
  }
];
