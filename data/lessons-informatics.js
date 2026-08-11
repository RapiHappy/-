// EGE Master 2026 - Informatics Lessons Data
window.LessonsInformatics = [
  {
    id: 'inf-lesson-1',
    title: 'Системы счисления',
    subject: 'informatics',
    egeNumber: '№1',
    theory: `<div class="theory-content">
      <h3>Системы счисления</h3>
      <p>Система счисления — символический метод записи чисел, представление чисел с помощью письменных знаков.</p>
      <h4>Перевод из десятичной системы в двоичную</h4>
      <p>Для перевода целого десятичного числа в двоичную систему счисления нужно последовательно делить это число на 2. Остатки от деления, записанные в обратном порядке, и будут составлять двоичную запись числа.</p>
      <h4>Формула перевода в десятичную систему</h4>
      <p>Для перевода числа из любой системы счисления в десятичную, нужно умножить каждую цифру числа на основание системы в степени, равной разряду этой цифры (разряды нумеруются с нуля справа налево).</p>
      <pre><code>1011_2 = 1*2^3 + 0*2^2 + 1*2^1 + 1*2^0 = 8 + 0 + 2 + 1 = 11_10</code></pre>
    </div>`,
    videoEmbed: 'https://www.youtube.com/embed/NFmDz1dQyPU',
    videoTimecodes: [{time: '0:00', label: 'Введение'}, {time: '2:15', label: 'Двоичная система'}, {time: '10:30', label: 'Восьмеричная и шестнадцатеричная'}],
    simpleExplanation: 'Делим на 2, собираем остатки снизу вверх — это перевод в двоичную. Для перевода обратно умножаем цифры на степени двойки.',
    examples: [
      {input: 'Перевести 25 в двоичную систему', output: '11001', explanation: '25/2=12(1), 12/2=6(0), 6/2=3(0), 3/2=1(1), 1/2=0(1). Читаем снизу вверх: 11001.'},
      {input: 'Перевести 1010 из двоичной в десятичную', output: '10', explanation: '1*2^3 + 0*2^2 + 1*2^1 + 0*2^0 = 8 + 0 + 2 + 0 = 10.'},
      {input: 'Перевести FF из шестнадцатеричной в десятичную', output: '255', explanation: 'F = 15. 15*16^1 + 15*16^0 = 240 + 15 = 255.'}
    ],
    tasks: [
      {id: 'inf-1-t1', question: 'Переведите число 42 в двоичную систему.', answer: '101010', explanation: '42 = 32 + 8 + 2 = 2^5 + 2^3 + 2^1 = 101010_2', difficulty: 'easy'},
      {id: 'inf-1-t2', question: 'Переведите число 11011_2 в десятичную систему.', answer: '27', explanation: '16 + 8 + 0 + 2 + 1 = 27', difficulty: 'easy'},
      {id: 'inf-1-t3', question: 'Чему равно 10_16 в десятичной системе?', answer: '16', explanation: '1*16^1 + 0*16^0 = 16', difficulty: 'easy'},
      {id: 'inf-1-t4', question: 'Переведите число 100 в восьмеричную систему.', answer: '144', explanation: '100 / 8 = 12 (остаток 4), 12 / 8 = 1 (остаток 4). Ответ: 144_8', difficulty: 'medium'},
      {id: 'inf-1-t5', question: 'Переведите число 77_8 в десятичную.', answer: '63', explanation: '7*8 + 7 = 56 + 7 = 63', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Какая цифра не может использоваться в восьмеричной системе?', options: ['0', '7', '8', '5'], correctIndex: 2, explanation: 'В 8-ричной системе используются цифры от 0 до 7.'},
      {question: 'Чему равно основание двоичной системы?', options: ['1', '2', '10', '16'], correctIndex: 1, explanation: 'Основание равно 2.'},
      {question: 'Как представляется число 15 в 16-ричной системе?', options: ['A', 'C', 'E', 'F'], correctIndex: 3, explanation: 'F соответствует 15.'}
    ],
    estimatedTime: 25,
    ntoRelevance: 'Понимание работы с битами критично для сетевых протоколов.'
  },
  {
    id: 'inf-lesson-2',
    title: 'Кодирование информации',
    subject: 'informatics',
    egeNumber: '№4',
    theory: `<div class="theory-content">
      <h3>Условие Фано</h3>
      <p>Никакое кодовое слово не может быть началом другого кодового слова. Это обеспечивает однозначное декодирование сообщений с начала.</p>
      <h3>Обратное условие Фано</h3>
      <p>Никакое кодовое слово не может быть концом другого кодового слова. Обеспечивает декодирование с конца.</p>
      <h3>Префиксные коды</h3>
      <p>Коды, удовлетворяющие прямому условию Фано, называются префиксными. Для построения оптимального префиксного кода часто используют двоичные деревья.</p>
    </div>`,
    videoEmbed: 'https://www.youtube.com/embed/dM6us854Jk0',
    videoTimecodes: [],
    simpleExplanation: 'Условие Фано значит, что код буквы не может совпадать с началом кода любой другой буквы. Иначе компьютер не поймёт, где кончается одна буква и начинается другая.',
    examples: [
      {input: 'А: 0, Б: 10, В: 110. Выполняется ли Фано?', output: 'Да', explanation: 'Ни один код не является началом другого (0 не начало 10 или 110, 10 не начало 110).'},
      {input: 'А: 01, Б: 011, В: 10. Выполняется ли Фано?', output: 'Нет', explanation: 'Код А (01) является началом кода Б (011).'},
      {input: 'Закодировать "АБВ" (А: 0, Б: 10, В: 11)', output: '01011', explanation: 'Просто подставляем коды друг за другом.'}
    ],
    tasks: Array.from({length: 15}).map((_, i) => ({
      id: `inf-2-t${i+1}`,
      question: `Задача на условие Фано #${i+1}: Даны коды некоторых букв. Найдите кратчайший код для новой буквы, чтобы условие Фано сохранялось. (Тестовый вопрос)`,
      answer: i % 2 === 0 ? '111' : '00',
      explanation: 'Строим двоичное дерево и выбираем свободный узел минимальной длины.',
      difficulty: 'medium'
    })),
    quiz: [
      {question: 'Что гарантирует условие Фано?', options: ['Сжатие данных', 'Однозначное декодирование', 'Защиту от ошибок', 'Ускорение передачи'], correctIndex: 1, explanation: 'Оно позволяет однозначно разбивать поток битов на буквы.'},
      {question: 'Может ли код удовлетворять и прямому, и обратному условию Фано?', options: ['Да', 'Нет', 'Зависит от алфавита', 'Только для двоичного кода'], correctIndex: 0, explanation: 'Да, например, коды одинаковой длины.'},
      {question: 'Какой код короче для часто встречающихся символов при алгоритме Хаффмана?', options: ['Самый длинный', 'Самый короткий', 'Средний', 'Любой'], correctIndex: 1, explanation: 'Частым символам даются короткие коды.'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Кодирование и алгоритмы сжатия данных применяются в передаче информации.'
  },
  {
    id: 'inf-lesson-3',
    title: 'Логические выражения',
    subject: 'informatics',
    egeNumber: '№2',
    theory: `<div class="theory-content">
      <h3>Алгебра логики</h3>
      <ul>
        <li><strong>Конъюнкция (И, *, &)</strong> - истинна только когда оба операнда истинны.</li>
        <li><strong>Дизъюнкция (ИЛИ, +, |)</strong> - истинна когда хотя бы один операнд истинен.</li>
        <li><strong>Инверсия (НЕ, ¬, ~)</strong> - меняет значение на противоположное.</li>
        <li><strong>Импликация (СЛЕДОВАНИЕ, →)</strong> - ложна только когда из истины следует ложь (1 → 0 = 0).</li>
        <li><strong>Эквивалентность (РАВЕНСТВО, ≡)</strong> - истинна когда операнды равны.</li>
      </ul>
      <h3>Законы де Моргана</h3>
      <p>НЕ (А И Б) = НЕ А ИЛИ НЕ Б</p>
      <p>НЕ (А ИЛИ Б) = НЕ А И НЕ Б</p>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'И (умножение) - жесткое условие (все должны быть 1). ИЛИ (сложение) - мягкое (хотя бы одна 1). Следование (->) ломается только если из правды делают ложь (1->0).',
    examples: [
      {input: '1 AND 0', output: '0', explanation: 'Конъюнкция дает 1 только при 1 AND 1.'},
      {input: '1 OR 0', output: '1', explanation: 'Дизъюнкция дает 1, если есть хотя бы одна 1.'},
      {input: '1 -> 0', output: '0', explanation: 'Единственный случай, когда импликация ложна.'}
    ],
    tasks: [
      {id: 'inf-3-t1', question: 'Вычислите: (1 OR 0) AND 1', answer: '1', explanation: '1 OR 0 = 1; 1 AND 1 = 1', difficulty: 'easy'},
      {id: 'inf-3-t2', question: 'Вычислите: NOT(1 AND 0) OR 0', answer: '1', explanation: '1 AND 0 = 0; NOT 0 = 1; 1 OR 0 = 1', difficulty: 'medium'},
      {id: 'inf-3-t3', question: 'Для какого x истинно: (x > 5) AND (x < 10)? Варианты: 4, 5, 8, 10', answer: '8', explanation: 'Только 8 одновременно больше 5 и меньше 10.', difficulty: 'easy'},
      {id: 'inf-3-t4', question: 'Ложно ли выражение: 1 -> 1?', answer: '0', explanation: '1 -> 1 истинно (1). В ответ пишем 0 (так как вопрос "Ложно ли?"). Точнее, ответ: Нет/0', difficulty: 'medium'},
      {id: 'inf-3-t5', question: 'Упростите: A OR (A AND B)', answer: 'A', explanation: 'Закон поглощения: A OR (A AND B) = A.', difficulty: 'hard'}
    ],
    quiz: [
      {question: 'Когда ложна импликация (A -> B)?', options: ['A=0, B=0', 'A=0, B=1', 'A=1, B=0', 'A=1, B=1'], correctIndex: 2, explanation: 'Из истины не может следовать ложь.'},
      {question: 'Как иначе называется конъюнкция?', options: ['Логическое сложение', 'Логическое умножение', 'Отрицание', 'Следование'], correctIndex: 1, explanation: 'Конъюнкция работает как умножение (1*0=0).'},
      {question: 'Чему равно NOT(A OR B) по закону де Моргана?', options: ['NOT A AND NOT B', 'NOT A OR NOT B', 'A AND B', 'A OR B'], correctIndex: 0, explanation: 'Отрицание дизъюнкции равно конъюнкции отрицаний.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Логика лежит в основе условий (if-else) при программировании процессов.'
  },
  {
    id: 'inf-lesson-4',
    title: 'Python: переменные и типы данных',
    subject: 'informatics',
    egeNumber: '',
    theory: `<div class="theory-content">
      <h3>Типы данных в Python</h3>
      <ul>
        <li><code>int</code> - целые числа (5, -10, 100)</li>
        <li><code>float</code> - вещественные числа (3.14, 2.5)</li>
        <li><code>str</code> - строки ('hello', "world")</li>
        <li><code>bool</code> - логический тип (True, False)</li>
      </ul>
      <h3>Ввод и вывод</h3>
      <pre><code>name = input("Введите имя: ")
print("Привет,", name)
age = int(input("Введите возраст: ")) # преобразование в int</code></pre>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Переменная — это коробочка с именем, куда можно положить число или текст. Тип данных определяет, что именно лежит в коробочке (целое число, дробное, текст).',
    examples: [
      {input: 'a = "5"\nb = "10"\nprint(a + b)', output: '510', explanation: 'Строки склеиваются (конкатенация), а не складываются математически.'},
      {input: 'a = 5\nb = 10\nprint(a + b)', output: '15', explanation: 'Числа складываются.'},
      {input: 'print(type(5.5))', output: '<class \'float\'>', explanation: '5.5 — это число с плавающей точкой (float).'}
    ],
    tasks: [
      {id: 'inf-4-t1', question: 'Что выведет код: print(int("10") + 5)?', answer: '15', explanation: 'Строка "10" переводится в число 10, затем 10 + 5 = 15.', difficulty: 'easy'},
      {id: 'inf-4-t2', question: 'Что выведет код: print("2" * 3)?', answer: '222', explanation: 'Умножение строки на число дублирует строку.', difficulty: 'medium'},
      {id: 'inf-4-t3', question: 'Какой тип у переменной x = True?', answer: 'bool', explanation: 'True и False — логические значения (boolean).', difficulty: 'easy'},
      {id: 'inf-4-t4', question: 'Что выведет код: print(10 / 2)?', answer: '5.0', explanation: 'Обычное деление (/) в Python всегда возвращает float.', difficulty: 'medium'},
      {id: 'inf-4-t5', question: 'Что выведет: print(10 // 3)?', answer: '3', explanation: 'Оператор // выполняет целочисленное деление.', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Функция для ввода данных с клавиатуры?', options: ['print()', 'scan()', 'input()', 'read()'], correctIndex: 2, explanation: 'input() считывает строку из консоли.'},
      {question: 'Какой тип возвращает функция input() по умолчанию?', options: ['int', 'str', 'float', 'bool'], correctIndex: 1, explanation: 'Всегда возвращает строку (str).'},
      {question: 'Как получить остаток от деления?', options: ['/', '//', '%', 'mod'], correctIndex: 2, explanation: 'Оператор % вычисляет остаток от деления.'}
    ],
    estimatedTime: 20,
    ntoRelevance: 'Основа для написания скриптов на Python.'
  },
  {
    id: 'inf-lesson-5',
    title: 'Python: условия if/elif/else',
    subject: 'informatics',
    egeNumber: '',
    theory: `<div class="theory-content">
      <h3>Условные конструкции</h3>
      <p>Позволяют выполнять разный код в зависимости от условий.</p>
      <pre><code>x = 10
if x > 0:
    print("Положительное")
elif x < 0:
    print("Отрицательное")
else:
    print("Ноль")</code></pre>
      <h3>Операторы сравнения</h3>
      <p>== (равно), != (не равно), >, <, >=, <=.</p>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Если (if) условие верно — делаем это. Иначе если (elif) другое верно — делаем то. Иначе (else) — делаем что-то еще.',
    examples: [
      {input: 'x = 5\nif x == 5:\n  print("Пять")', output: 'Пять', explanation: 'Условие x == 5 истинно.'}
    ],
    tasks: [
      {id: 'inf-5-t1', question: 'Что выведет: x = 3\nif x > 5: print(1)\nelse: print(2)', answer: '2', explanation: '3 не больше 5, сработает else.', difficulty: 'easy'},
      {id: 'inf-5-t2', question: 'x = 10\nif x % 2 == 0: print("Ч")\nelse: print("Н")', answer: 'Ч', explanation: 'Остаток от деления 10 на 2 равен 0 (четное).', difficulty: 'easy'},
      {id: 'inf-5-t3', question: 'Каким оператором проверяется равенство?', answer: '==', explanation: 'Два знака равно используются для сравнения.', difficulty: 'easy'},
      {id: 'inf-5-t4', question: 'x = 5\nif x < 10: print("A")\nelif x < 20: print("B")', answer: 'A', explanation: 'Первое условие истинно, блок elif не проверяется.', difficulty: 'medium'},
      {id: 'inf-5-t5', question: 'Что будет при if True: print(1)?', answer: '1', explanation: 'True всегда истинно, выполнится блок if.', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Какой отступ обязателен в блоке if в Python?', options: ['Нет отступа', 'Любое количество пробелов, но одинаковое', 'Только Tab', 'Только 4 пробела'], correctIndex: 1, explanation: 'Python требует одинаковый отступ, по стандарту PEP8 это 4 пробела.'},
      {question: 'Можно ли использовать несколько elif подряд?', options: ['Да', 'Нет'], correctIndex: 0, explanation: 'Да, количество elif не ограничено.'},
      {question: 'Обязательно ли использовать else?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'else можно опустить.'}
    ],
    estimatedTime: 25,
    ntoRelevance: 'Маршрутизация в бизнес-процессах (эксклюзивный шлюз) работает по тем же принципам.'
  },
  {
    id: 'inf-lesson-6',
    title: 'Python: циклы for и while',
    subject: 'informatics',
    egeNumber: '',
    theory: `<div class="theory-content">
      <h3>Цикл while</h3>
      <p>Выполняется, пока условие истинно.</p>
      <pre><code>i = 0
while i < 5:
    print(i)
    i += 1</code></pre>
      <h3>Цикл for</h3>
      <p>Используется для перебора последовательностей.</p>
      <pre><code>for i in range(5):
    print(i) # выведет от 0 до 4</code></pre>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'while работает как "пока правда — делай". for работает как "для каждого элемента из списка/диапазона — делай".',
    examples: [
      {input: 'for i in range(1, 4): print(i)', output: '1\n2\n3', explanation: 'range(start, stop) идет до stop-1.'}
    ],
    tasks: [
      {id: 'inf-6-t1', question: 'Сколько раз выполнится цикл: for i in range(5)?', answer: '5', explanation: 'Выполнится для i от 0 до 4 (всего 5 раз).', difficulty: 'easy'},
      {id: 'inf-6-t2', question: 'Что выведет: i = 3\nwhile i > 0:\n  print(i)\n  i -= 1', answer: '3 2 1', explanation: 'Выводит число и уменьшает его на 1, пока оно больше 0.', difficulty: 'medium'},
      {id: 'inf-6-t3', question: 'Что делает команда break?', answer: 'прерывает цикл', explanation: 'Досрочный выход из цикла.', difficulty: 'easy'},
      {id: 'inf-6-t4', question: 'Что выведет: for i in range(0, 5, 2): print(i)', answer: '0 2 4', explanation: 'Шаг равен 2.', difficulty: 'medium'},
      {id: 'inf-6-t5', question: 'Что делает команда continue?', answer: 'переходит к следующей итерации', explanation: 'Пропускает оставшийся код в теле цикла и переходит на следующий шаг.', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'Функция range(3) сгенерирует числа:', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3, 3, 3'], correctIndex: 1, explanation: 'От 0 до стоп-значения не включительно.'},
      {question: 'Как создать бесконечный цикл?', options: ['for i in infinite:', 'while True:', 'loop:', 'while False:'], correctIndex: 1, explanation: 'while True всегда истинно.'},
      {question: 'Можно ли вложить один цикл в другой?', options: ['Да', 'Нет'], correctIndex: 0, explanation: 'Да, это называется вложенным циклом.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Автоматизация повторяющихся задач (обработка массива заявок).'
  },
  {
    id: 'inf-lesson-7',
    title: 'Python: строки',
    subject: 'informatics',
    egeNumber: '',
    theory: `<div class="theory-content">
      <h3>Строки</h3>
      <p>Строки неизменяемы. Элементы индексируются с 0.</p>
      <pre><code>s = "Hello"
print(s[0]) # 'H'
print(s[-1]) # 'o'
print(s[1:4]) # 'ell' (срезы)</code></pre>
      <h3>Методы</h3>
      <p>.upper(), .lower(), .replace('old', 'new'), .find('sub')</p>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Строка это массив букв. Можно брать букву по номеру [0], можно брать кусок [от:до]. И можно искать/заменять слова с помощью методов.',
    examples: [
      {input: 's = "ABC"\nprint(s[1])', output: 'B', explanation: 'Индексы: A(0), B(1), C(2).'}
    ],
    tasks: [
      {id: 'inf-7-t1', question: 's = "Python". Чему равно s[2]?', answer: 't', explanation: 'P(0), y(1), t(2)', difficulty: 'easy'},
      {id: 'inf-7-t2', question: 's = "Python". Чему равно s[:2]?', answer: 'Py', explanation: 'Срез от начала до индекса 2 (не включительно).', difficulty: 'medium'},
      {id: 'inf-7-t3', question: 'Что выведет: "A" + "B"', answer: 'AB', explanation: 'Конкатенация строк.', difficulty: 'easy'},
      {id: 'inf-7-t4', question: 's = "a b c". s.split() вернет?', answer: '[\'a\', \'b\', \'c\']', explanation: 'split() по умолчанию разбивает по пробелам.', difficulty: 'medium'},
      {id: 'inf-7-t5', question: 'Как узнать длину строки s?', answer: 'len(s)', explanation: 'Функция len() возвращает длину.', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Что делает s[::-1]?', options: ['Удаляет строку', 'Разворачивает строку задом наперед', 'Выдает ошибку', 'Берет каждый второй символ'], correctIndex: 1, explanation: 'Шаг -1 идет с конца в начало.'},
      {question: 'Можно ли изменить символ строки так: s[0] = "X"?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'Строки в Python неизменяемы.'},
      {question: 'Метод .replace() ...', options: ['Заменяет подстроку на другую', 'Удаляет пробелы', 'Меняет регистр'], correctIndex: 0, explanation: 'Именно это он и делает.'}
    ],
    estimatedTime: 25,
    ntoRelevance: 'Парсинг текстов, обработка логов, анализ данных.'
  },
  {
    id: 'inf-lesson-8',
    title: 'Python: списки',
    subject: 'informatics',
    egeNumber: '',
    theory: `<div class="theory-content">
      <h3>Списки (List)</h3>
      <p>Изменяемая упорядоченная коллекция элементов.</p>
      <pre><code>a = [1, 2, 3]
a.append(4) # [1, 2, 3, 4]
a[0] = 10 # [10, 2, 3, 4]</code></pre>
      <h3>Генераторы списков</h3>
      <pre><code>squares = [x**2 for x in range(5)] # [0, 1, 4, 9, 16]</code></pre>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Список — это коробка, куда можно положить много вещей по порядку. Можно добавлять (.append), удалять (.pop) и менять элементы.',
    examples: [
      {input: 'a = [1, 2]\na.append(3)\nprint(a)', output: '[1, 2, 3]', explanation: 'append добавляет в конец.'}
    ],
    tasks: [
      {id: 'inf-8-t1', question: 'a = [10, 20, 30]. Чему равно a[1]?', answer: '20', explanation: 'Индекс 1 — это второй элемент.', difficulty: 'easy'},
      {id: 'inf-8-t2', question: 'Что делает метод .pop()?', answer: 'удаляет и возвращает последний элемент', explanation: 'По умолчанию удаляет с конца.', difficulty: 'medium'},
      {id: 'inf-8-t3', question: 'Как отсортировать список a?', answer: 'a.sort()', explanation: 'Метод sort() сортирует на месте.', difficulty: 'easy'},
      {id: 'inf-8-t4', question: 'Что вернет len([1, 2, 3, 4])?', answer: '4', explanation: 'Длина списка (количество элементов).', difficulty: 'easy'},
      {id: 'inf-8-t5', question: 'a = [1, 2]; b = [3, 4]; a + b = ?', answer: '[1, 2, 3, 4]', explanation: 'Сложение списков склеивает их.', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'В чем отличие списка (list) от кортежа (tuple)?', options: ['Список медленнее', 'Список изменяемый, кортеж - нет', 'В кортеже только числа', 'Нет отличий'], correctIndex: 1, explanation: 'Кортеж неизменяем.'},
      {question: 'Что сделает a.insert(0, X)?', options: ['Удалит X', 'Добавит X в конец', 'Вставит X на место с индексом 0', 'Заменит нулевой элемент'], correctIndex: 2, explanation: 'Вставка по индексу со сдвигом остальных вправо.'},
      {question: 'Как проверить, есть ли число 5 в списке a?', options: ['5 in a', 'a.has(5)', 'a.find(5)', 'contains(5, a)'], correctIndex: 0, explanation: 'Оператор in.'}
    ],
    estimatedTime: 25,
    ntoRelevance: 'Хранение массивов данных, выборки из БД.'
  },
  {
    id: 'inf-lesson-9',
    title: 'Алгоритмы: сортировка и поиск',
    subject: 'informatics',
    egeNumber: '',
    theory: `<div class="theory-content">
      <h3>Линейный и бинарный поиск</h3>
      <p>Линейный поиск (перебор) работает за O(N). Бинарный поиск работает за O(log N), но только на отсортированном массиве: делим массив пополам на каждом шаге.</p>
      <h3>Сортировки</h3>
      <ul>
        <li><strong>Пузырек:</strong> сравниваем соседние элементы, всплывает больший. O(N^2)</li>
        <li><strong>Сортировка слиянием (Merge Sort):</strong> рекурсивно делим пополам, затем сливаем упорядоченные части. O(N log N)</li>
      </ul>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Бинарный поиск - это как искать слово в словаре, открывая его посередине. Пузырек - медленная сортировка, слияние - быстрая.',
    examples: [
      {input: 'Массив [1, 3, 5, 7, 9]. Ищем 7 бинарным поиском.', output: 'Сначала смотрим 5 (мало), потом 7 (нашли).', explanation: 'Деление пополам ускоряет поиск.'}
    ],
    tasks: [
      {id: 'inf-9-t1', question: 'Какая сложность у сортировки пузырьком (в худшем случае)?', answer: 'O(N^2)', explanation: 'Два вложенных цикла.', difficulty: 'easy'},
      {id: 'inf-9-t2', question: 'Требуется ли предварительная сортировка для бинарного поиска?', answer: 'Да', explanation: 'Без нее нельзя понять, в какой половине искать.', difficulty: 'easy'},
      {id: 'inf-9-t3', question: 'Какая сложность у бинарного поиска?', answer: 'O(log N)', explanation: 'На каждом шаге размер задачи уменьшается вдвое.', difficulty: 'medium'},
      {id: 'inf-9-t4', question: 'Сколько сравнений нужно для бинарного поиска в массиве из 8 элементов (в худшем случае)?', answer: '3', explanation: 'log2(8) = 3', difficulty: 'medium'},
      {id: 'inf-9-t5', question: 'Какая сортировка в среднем быстрее: пузырек или слияние?', answer: 'слияние', explanation: 'O(N log N) быстрее O(N^2).', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Что такое O-большое (O(N))?', options: ['Объем памяти', 'Оценка сложности/количества операций', 'Функция в Python', 'Ошибки компиляции'], correctIndex: 1, explanation: 'Показывает, как растет время работы от объема данных.'},
      {question: 'Можно ли применить бинарный поиск к неотсортированному массиву?', options: ['Да', 'Нет'], correctIndex: 1, explanation: 'Нет, он опирается на порядок элементов.'},
      {question: 'Какая сортировка встроена в Python (Timsort) опирается на?', options: ['Пузырек', 'Слияние и вставки', 'Только быструю сортировку', 'Случайную (Bogo)'], correctIndex: 1, explanation: 'Timsort использует гибрид слияния и сортировки вставками.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Оптимизация обработки больших объемов данных.'
  },
  {
    id: 'inf-lesson-10',
    title: 'Рекурсия и динамическое программирование',
    subject: 'informatics',
    egeNumber: '№23',
    theory: `<div class="theory-content">
      <h3>Рекурсия</h3>
      <p>Функция вызывает саму себя. Обязательно должно быть условие выхода (базовый случай), иначе произойдет переполнение стека.</p>
      <h3>Динамическое программирование (ДП)</h3>
      <p>Метод решения задач путем разбиения их на пересекающиеся подзадачи. Результаты подзадач запоминаются (мемоизация), чтобы не вычислять их дважды.</p>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Рекурсия - матрешка. Открываешь, пока не найдешь самую маленькую. ДП - это рекурсия с блокнотом: один раз посчитал ответ для матрешки №5, записал в блокнот. В следующий раз просто смотришь в блокнот.',
    examples: [
      {input: 'Факториал: f(n) = n * f(n-1), f(1)=1', output: 'f(3) = 3 * 2 * 1 = 6', explanation: 'f(3)->f(2)->f(1).'}
    ],
    tasks: [
      {id: 'inf-10-t1', question: 'Что обязательно должно быть в рекурсивной функции?', answer: 'условие выхода', (explanation): 'Иначе бесконечный цикл (RecursionError).', difficulty: 'easy'},
      {id: 'inf-10-t2', question: 'Как называется запоминание результатов вычисления в ДП?', answer: 'мемоизация', explanation: 'От слова memory.', difficulty: 'medium'},
      {id: 'inf-10-t3', question: 'def f(n): if n<2: return 1 else: return f(n-1)+f(n-2). Что вернет f(3)?', answer: '3', explanation: 'f(3) = f(2)+f(1) = (f(1)+f(0))+1 = 1+1+1=3.', difficulty: 'hard'},
      {id: 'inf-10-t4', question: 'У Исполнителя две команды: +1 и *2. Сколько программ из 1 в 10?', answer: '14', explanation: 'ДП: a[i] = a[i-1] + (a[i/2] если i четное).', difficulty: 'hard'},
      {id: 'inf-10-t5', question: 'Какая структура данных используется для мемоизации в Python чаще всего?', answer: 'словарь', explanation: 'dict позволяет хранить {аргумент: результат}.', difficulty: 'medium'}
    ],
    quiz: [
      {question: 'К чему приведет рекурсия без базового случая?', options: ['К оптимизации', 'К ошибке переполнения стека', 'К превращению в цикл for', 'К игнорированию вызова'], correctIndex: 1, explanation: 'RecursionError: maximum recursion depth exceeded.'},
      {question: 'Что быстрее вычисляет числа Фибоначчи для больших N?', options: ['Чистая рекурсия', 'Рекурсия с мемоизацией (ДП)', 'Они равны'], correctIndex: 1, explanation: 'ДП делает O(N) вместо O(2^N).'},
      {question: 'Можно ли любую рекурсию переписать в цикл?', options: ['Да', 'Нет'], correctIndex: 0, explanation: 'Да, любая рекурсия может быть заменена циклом и стеком.'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Оптимизация путей и графов в логистических бизнес-задачах.'
  }
];
