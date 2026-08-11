// EGE Master 2026 - Math Lessons Data (Audited & Verified)
window.LessonsMath = [
  {
    id: 'math-lesson-1',
    title: 'Дроби и вычисления',
    subject: 'math',
    egeNumber: '№1',
    theory: `<div class="theory-content">
      <h3>Обыкновенные и десятичные дроби</h3>
      <p>Для сложения и вычитания обыкновенных дробей нужно привести их к общему знаменателю.</p>
      <p>При умножении дробей перемножаются числители и знаменатели. При делении вторая дробь переворачивается.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Всегда превращай смешанные числа в неправильные дроби перед умножением/делением. Общий знаменатель нужен только для плюса и минуса.',
    examples: [{input: '1/2 + 1/3', output: '5/6', explanation: 'Общий знаменатель 6. 3/6 + 2/6 = 5/6.'}],
    tasks: [
      {id: 'm-1-1', question: 'Вычислите: 1/2 + 1/3', answer: '5/6', explanation: '3/6 + 2/6 = 5/6', difficulty: 'easy'},
      {id: 'm-1-2', question: 'Вычислите: 3/4 - 1/2', answer: '1/4', explanation: '3/4 - 2/4 = 1/4', difficulty: 'easy'},
      {id: 'm-1-3', question: 'Вычислите: 2/5 * 5/8', answer: '1/4', explanation: '10/40 = 1/4', difficulty: 'medium'},
      {id: 'm-1-4', question: 'Вычислите: 3/7 : 6/7', answer: '1/2', explanation: '3/7 * 7/6 = 3/6 = 1/2', difficulty: 'medium'},
      {id: 'm-1-5', question: 'Переведите 3/4 в десятичную дробь', answer: '0.75', explanation: '3 разделить на 4', difficulty: 'easy'},
      {id: 'm-1-6', question: 'Вычислите: 1.5 + 2.3', answer: '3.8', explanation: 'Сложение десятичных дробей', difficulty: 'easy'},
      {id: 'm-1-7', question: 'Вычислите: 0.2 * 0.4', answer: '0.08', explanation: '2*4=8, два знака после запятой', difficulty: 'medium'},
      {id: 'm-1-8', question: 'Вычислите: 1 / 0.5', answer: '2', explanation: '1 : (1/2) = 2', difficulty: 'medium'},
      {id: 'm-1-9', question: 'Вычислите: 2 1/3 + 1 2/3 (ответ целым числом)', answer: '4', explanation: '7/3 + 5/3 = 12/3 = 4', difficulty: 'medium'},
      {id: 'm-1-10', question: 'Вычислите: (1/2 + 1/4) * 8', answer: '6', explanation: '3/4 * 8 = 6', difficulty: 'hard'}
    ],
    quiz: [
      {question: 'Как умножить дробь на дробь?', options: ['Привести к общему знаменателю', 'Числитель на числитель, знаменатель на знаменатель'], correctIndex: 1, explanation: 'Умножаются напрямую.'},
      {question: 'Как поделить на дробь?', options: ['Умножить на перевернутую', 'Привести к общему знаменателю'], correctIndex: 0, explanation: 'Деление заменяется умножением.'},
      {question: '1/4 это сколько в десятичных?', options: ['0.4', '0.25', '0.14'], correctIndex: 1, explanation: '1 разделить на 4.'},
      {question: 'Общий знаменатель для 3 и 4?', options: ['7', '12'], correctIndex: 1, explanation: '3*4 = 12.'},
      {question: 'Чему равно 0.5 * 2?', options: ['0.10', '1'], correctIndex: 1, explanation: 'Половина от 2.'}
    ],
    estimatedTime: 25,
    ntoRelevance: 'Базовая математика в расчетах.'
  },
  {
    id: 'math-lesson-2',
    title: 'Проценты',
    subject: 'math',
    egeNumber: '№2',
    theory: `<div class="theory-content">
      <h3>Проценты</h3>
      <p>Процент — это сотая часть числа. 1% = 0.01.</p>
      <p>Чтобы найти P процентов от числа X, нужно X * (P/100).</p>
      <p>Чтобы узнать, сколько процентов число A составляет от B, нужно (A/B) * 100%.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Процент - это сотая часть. 20% - это 0.2. Чтобы найти 20% от 1000, умножай 1000 на 0.2.',
    examples: [{input: 'Найти 15% от 200', output: '30', explanation: '200 * 0.15 = 30.'}],
    tasks: [
      {id: 'm-2-1', question: 'Найдите 10% от 500', answer: '50', explanation: '500 * 0.1 = 50', difficulty: 'easy'},
      {id: 'm-2-2', question: 'Найдите 25% от 80', answer: '20', explanation: '80 / 4 = 20', difficulty: 'easy'},
      {id: 'm-2-3', question: 'Товар стоил 1000 руб, подорожал на 20%. Новая цена?', answer: '1200', explanation: '1000 * 1.2 = 1200', difficulty: 'medium'},
      {id: 'm-2-4', question: 'Товар стоил 500 руб, подешевел на 10%. Новая цена?', answer: '450', explanation: '500 * 0.9 = 450', difficulty: 'medium'},
      {id: 'm-2-5', question: 'Сколько процентов составляет 20 от 100?', answer: '20', explanation: '20/100 * 100%', difficulty: 'easy'},
      {id: 'm-2-6', question: 'Сколько процентов составляет 5 от 20?', answer: '25', explanation: '5/20 = 1/4 = 25%', difficulty: 'medium'},
      {id: 'm-2-7', question: 'Цена выросла в 2 раза. На сколько процентов она выросла?', answer: '100', explanation: 'Стала 200%, выросла на 100%', difficulty: 'hard'},
      {id: 'm-2-8', question: 'Какая дробь соответствует 50%?', answer: '1/2', explanation: '50/100 = 1/2', difficulty: 'easy'},
      {id: 'm-2-9', question: 'Если 10% от числа равны 15, чему равно число?', answer: '150', explanation: '15 / 0.1 = 150', difficulty: 'medium'},
      {id: 'm-2-10', question: 'Товар стоил 100, подорожал на 10%, затем подешевел на 10%. Итоговая цена?', answer: '99', explanation: '100 * 1.1 = 110. 110 * 0.9 = 99.', difficulty: 'hard'}
    ],
    quiz: [
      {question: 'Как найти 1% от числа?', options: ['Умножить на 1', 'Разделить на 100'], correctIndex: 1, explanation: 'Сотая часть.'},
      {question: 'Какая десятичная дробь равна 50%?', options: ['0.5', '0.05'], correctIndex: 0, explanation: '50/100 = 0.5.'},
      {question: 'Товар подорожал на 10%, на что умножить цену?', options: ['на 0.1', 'на 1.1'], correctIndex: 1, explanation: '100% + 10% = 110% = 1.1.'},
      {question: 'Сколько процентов четверть?', options: ['25%', '4%'], correctIndex: 0, explanation: '1/4 = 0.25 = 25%.'},
      {question: 'Цена упала на 20%, коэффициент?', options: ['0.2', '0.8'], correctIndex: 1, explanation: '100 - 20 = 80% = 0.8.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Экономика, бизнес-кейсы.'
  },
  {
    id: 'math-lesson-3',
    title: 'Уравнения',
    subject: 'math',
    egeNumber: '№5',
    theory: `<div class="theory-content">
      <h3>Линейные и квадратные уравнения</h3>
      <p>Линейные: ax + b = 0 => x = -b/a.</p>
      <p>Квадратные: ax^2 + bx + c = 0. Дискриминант D = b^2 - 4ac. Корни: x = (-b +- sqrt(D)) / 2a.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Все неизвестные влево, известные вправо (меняя знак). Для квадратов - считай дискриминант или используй Виета.',
    examples: [{input: 'x^2 - 5x + 6 = 0', output: 'x1=2, x2=3', explanation: 'По теореме Виета сумма 5, произведение 6.'}],
    tasks: [
      {id: 'm-3-1', question: 'Решите: 2x = 10', answer: '5', explanation: 'x = 10/2', difficulty: 'easy'},
      {id: 'm-3-2', question: 'Решите: 3x - 6 = 0', answer: '2', explanation: '3x = 6', difficulty: 'easy'},
      {id: 'm-3-3', question: 'Решите: x^2 = 9 (в ответ запишите больший корень)', answer: '3', explanation: 'Корни 3 и -3', difficulty: 'easy'},
      {id: 'm-3-4', question: 'Решите: x^2 - x - 2 = 0 (в ответ больший корень)', answer: '2', explanation: 'Корни 2 и -1', difficulty: 'medium'},
      {id: 'm-3-5', question: 'Решите: 2x + 5 = 15', answer: '5', explanation: '2x = 10', difficulty: 'easy'},
      {id: 'm-3-6', question: 'Чему равен дискриминант уравнения x^2 - 3x + 2 = 0?', answer: '1', explanation: '9 - 4*1*2 = 1', difficulty: 'medium'},
      {id: 'm-3-7', question: 'Решите: (x-1)(x-2) = 0 (наименьший корень)', answer: '1', explanation: 'x=1 или x=2', difficulty: 'easy'},
      {id: 'm-3-8', question: 'Сумма корней уравнения x^2 - 5x + 6 = 0?', answer: '5', explanation: 'По теореме Виета -b/a = 5', difficulty: 'medium'},
      {id: 'm-3-9', question: 'Произведение корней уравнения x^2 - 4x + 3 = 0?', answer: '3', explanation: 'По Виета c/a = 3', difficulty: 'medium'},
      {id: 'm-3-10', question: 'Решите: 5x = 0', answer: '0', explanation: 'x=0/5', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'Формула дискриминанта?', options: ['b^2 - 4ac', 'a^2 - 4bc'], correctIndex: 0, explanation: 'Стандартная формула.'},
      {question: 'Если D < 0, сколько корней?', options: ['Два', 'Один', 'Ноль'], correctIndex: 2, explanation: 'Действительных корней нет.'},
      {question: 'Теорема Виета для x^2+px+q=0?', options: ['x1+x2=-p, x1*x2=q', 'x1+x2=p, x1*x2=-q'], correctIndex: 0, explanation: 'Сумма корней с обратным знаком.'},
      {question: 'Как перенести слагаемое?', options: ['Поменять знак', 'Не менять знак'], correctIndex: 0, explanation: 'При переносе знак меняется на противоположный.'},
      {question: 'Корень из 16?', options: ['4 и -4', 'только 4'], correctIndex: 1, explanation: 'Арифметический корень всегда положителен (или 0).'}
    ],
    estimatedTime: 35,
    ntoRelevance: 'Математическое моделирование.'
  },
  {
    id: 'math-lesson-4',
    title: 'Функции и графики',
    subject: 'math',
    egeNumber: '№9',
    theory: `<div class="theory-content">
      <h3>Графики функций</h3>
      <p>Линейная: y = kx + b. Прямая линия.</p>
      <p>Парабола: y = ax^2 + bx + c. Вершина: x = -b/2a.</p>
      <p>Гипербола: y = k/x.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Коэффициент k у прямой отвечает за наклон. Если a у параболы положительно, ветви вверх.',
    examples: [{input: 'y = 2x + 3', output: 'Прямая, пересекает OY в точке 3', explanation: 'b=3, свободный член показывает пересечение с OY.'}],
    tasks: [
      {id: 'm-4-1', question: 'y = 2x + 1. Найти y при x = 2', answer: '5', explanation: '2*2+1 = 5', difficulty: 'easy'},
      {id: 'm-4-2', question: 'y = x^2. Найти y при x = 3', answer: '9', explanation: '3^2 = 9', difficulty: 'easy'},
      {id: 'm-4-3', question: 'y = -x^2. Куда направлены ветви параболы? (вверх/вниз)', answer: 'вниз', explanation: 'a < 0', difficulty: 'easy'},
      {id: 'm-4-4', question: 'Найти x вершины параболы y = x^2 - 4x', answer: '2', explanation: '-b/2a = 4/2 = 2', difficulty: 'medium'},
      {id: 'm-4-5', question: 'y = kx. График проходит через (2; 6). k = ?', answer: '3', explanation: '6 = k*2 => k=3', difficulty: 'medium'},
      {id: 'm-4-6', question: 'Функция y = 5. График параллелен оси X? (да/нет)', answer: 'да', explanation: 'Горизонтальная прямая', difficulty: 'easy'},
      {id: 'm-4-7', question: 'Точка пересечения y = 2x - 4 с осью X. x = ?', answer: '2', explanation: '2x-4=0 => x=2', difficulty: 'medium'},
      {id: 'm-4-8', question: 'Точка пересечения y = 3x + 6 с осью Y. y = ?', answer: '6', explanation: 'При x=0, y=6', difficulty: 'easy'},
      {id: 'm-4-9', question: 'График y = 1/x это...', answer: 'гипербола', explanation: 'Название графика', difficulty: 'easy'},
      {id: 'm-4-10', question: 'Принадлежит ли точка (1; 1) графику y = x^3? (да/нет)', answer: 'да', explanation: '1^3 = 1', difficulty: 'easy'}
    ],
    quiz: [
      {question: 'График y = x^2?', options: ['Прямая', 'Парабола', 'Гипербола'], correctIndex: 1, explanation: 'Квадратичная функция.'},
      {question: 'За что отвечает k в y=kx+b?', options: ['Угол наклона', 'Точку пересечения'], correctIndex: 0, explanation: 'Угловой коэффициент.'},
      {question: 'Координата x вершины параболы?', options: ['-b/2a', 'b/2a'], correctIndex: 0, explanation: 'Формула вершины.'},
      {question: 'График y=1/x?', options: ['Гипербола', 'Парабола'], correctIndex: 0, explanation: 'Обратная пропорциональность.'},
      {question: 'Где ветви параболы y=-x^2?', options: ['Вверх', 'Вниз'], correctIndex: 1, explanation: 'a < 0, ветви вниз.'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Анализ данных, визуализация трендов.'
  },
  {
    id: 'math-lesson-5',
    title: 'Производная',
    subject: 'math',
    egeNumber: '№7',
    theory: `<div class="theory-content">
      <h3>Производная</h3>
      <p>Геометрический смысл: f'(x) = k = tg(a). Производная в точке равна угловому коэффициенту касательной.</p>
      <p>Физический смысл: производная пути — это скорость (v = s').</p>
      <p>Точки максимума/минимума: f'(x) = 0.</p>
    </div>`,
    videos: {
      main: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      simple: 'https://www.youtube.com/embed/jfKfPfyJRkM',
      tasks: 'https://www.youtube.com/embed/jfKfPfyJRkM'
    },
    videoTimecodes: [],
    simpleExplanation: 'Если функция растет, производная больше нуля. Если функция падает, производная меньше нуля. На холмах и в ямах производная ноль.',
    examples: [{input: 'Функция убывает на отрезке. Какой знак имеет производная?', output: 'Отрицательный', explanation: 'Убывание означает отрицательную скорость изменения.'}],
    tasks: [
      {id: 'm-5-1', question: 'Производная константы (числа 5)?', answer: '0', explanation: 'С(const) = 0', difficulty: 'easy'},
      {id: 'm-5-2', question: 'Производная x?', answer: '1', explanation: 'x\' = 1', difficulty: 'easy'},
      {id: 'm-5-3', question: 'Производная x^2?', answer: '2x', explanation: 'Степень выносится', difficulty: 'easy'},
      {id: 'm-5-4', question: 'Производная 3x?', answer: '3', explanation: 'Коэффициент остается', difficulty: 'easy'},
      {id: 'm-5-5', question: 'Угловой коэффициент касательной в точке максимума?', answer: '0', explanation: 'Касательная горизонтальна', difficulty: 'medium'},
      {id: 'm-5-6', question: 'Если f\'(x) > 0, то функция f(x)... (ответ: возрастает)', answer: 'возрастает', explanation: 'Положительная скорость', difficulty: 'easy'},
      {id: 'm-5-7', question: 'Если f(x) убывает, то её производная (ответ знаком: <0 или >0)', answer: '<0', explanation: 'Отрицательная скорость', difficulty: 'easy'},
      {id: 'm-5-8', question: 'Производная x^3?', answer: '3x^2', explanation: 'Формула nx^(n-1)', difficulty: 'medium'},
      {id: 'm-5-9', question: 'Путь s(t) = 5t. Чему равна скорость v?', answer: '5', explanation: 'v = s\' = 5', difficulty: 'medium'},
      {id: 'm-5-10', question: 'Путь s(t) = t^2. Найти скорость в t=3', answer: '6', explanation: 'v = 2t. При t=3, v=6', difficulty: 'hard'}
    ],
    quiz: [
      {question: 'Что такое производная геометрически?', options: ['Площадь', 'Тангенс угла наклона касательной'], correctIndex: 1, explanation: 'Геометрический смысл.'},
      {question: 'Если f\'(x) > 0, то функция...', options: ['Возрастает', 'Убывает'], correctIndex: 0, explanation: 'Идет вверх.'},
      {question: 'В точке максимума производная...', options: ['Равна 0', 'Не существует', 'Положительна'], correctIndex: 0, explanation: 'Касательная горизонтальна.'},
      {question: 'Производная от x^2?', options: ['x', '2x'], correctIndex: 1, explanation: 'Степень выносится вперед.'},
      {question: 'Производная константы (числа)?', options: ['0', '1'], correctIndex: 0, explanation: 'Число не меняется, скорость изменения равна 0.'}
    ],
    estimatedTime: 45,
    ntoRelevance: 'Оптимизация (поиск минимума издержек/максимума прибыли).'
  }
];
