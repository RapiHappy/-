// EGE Master 2026 - Math Lessons Data
window.LessonsMath = [
  {
    id: 'math-lesson-1',
    title: 'Производные',
    subject: 'math',
    egeNumber: '№11',
    theory: `<div class="theory-content">
      <h3>Производная функции</h3>
      <p>Производная характеризует скорость изменения функции. Геометрический смысл: значение производной в точке равно тангенсу угла наклона касательной.</p>
      <h4>Таблица производных:</h4>
      <ul>
        <li>(C)' = 0</li>
        <li>(x^n)' = n * x^(n-1)</li>
        <li>(e^x)' = e^x</li>
        <li>(sin x)' = cos x</li>
        <li>(cos x)' = -sin x</li>
      </ul>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Производная показывает, как быстро растет или падает график. Если производная плюс — график идет вверх, если минус — вниз. В максимумах и минимумах она равна нулю.',
    examples: [
      {input: 'Найти производную f(x) = x^3', output: '3x^2', explanation: 'Степень выносится вперед, и уменьшается на 1.'},
      {input: 'Найти производную f(x) = 5x', output: '5', explanation: 'Производная x равна 1.'}
    ],
    tasks: Array.from({length: 5}).map((_, i) => ({
      id: `math-1-t${i+1}`,
      question: `Найдите производную f(x) = x^${i+2}`,
      answer: `${i+2}*x^${i+1}`,
      explanation: 'Правило дифференцирования степенной функции.',
      difficulty: 'easy'
    })),
    quiz: [
      {question: 'Чему равна производная константы (например, числа 5)?', options: ['5', '1', '0', 'x'], correctIndex: 2, explanation: 'Число не меняется, скорость изменения равна 0.'},
      {question: 'Геометрический смысл производной?', options: ['Площадь под графиком', 'Тангенс угла наклона касательной', 'Длина дуги'], correctIndex: 1, explanation: 'k = tg(a) = f\'(x).'},
      {question: 'Когда функция убывает?', options: ['f\'(x) > 0', 'f\'(x) < 0', 'f\'(x) = 0'], correctIndex: 1, explanation: 'Отрицательная производная означает убывание.'}
    ],
    estimatedTime: 35,
    ntoRelevance: 'Матанализ используется в алгоритмах машинного обучения (градиентный спуск).'
  },
  {
    id: 'math-lesson-2',
    title: 'Уравнения',
    subject: 'math',
    egeNumber: '№5',
    theory: `<div class="theory-content">
      <h3>Типы уравнений</h3>
      <ul>
        <li><strong>Квадратные:</strong> ax^2 + bx + c = 0. Дискриминант D = b^2 - 4ac.</li>
        <li><strong>Показательные:</strong> a^x = b. Решение: логарифмирование.</li>
        <li><strong>Логарифмические:</strong> log_a(x) = b -> x = a^b. ОДЗ: a>0, a!=1, x>0.</li>
      </ul>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Главное правило: делай одинаковые основания в показательных и логарифмических уравнениях. И не забывай про ОДЗ в логарифмах и корнях!',
    examples: [
      {input: '2^x = 8', output: 'x = 3', explanation: '8 это 2^3.'}
    ],
    tasks: Array.from({length: 5}).map((_, i) => ({
      id: `math-2-t${i+1}`,
      question: `Решите уравнение: ${i+2}^x = ${Math.pow(i+2, 2)}`,
      answer: '2',
      explanation: 'Приравниваем степени.',
      difficulty: 'easy'
    })),
    quiz: [
      {question: 'Какое ОДЗ у логарифма log_a(x)?', options: ['x>0', 'x>=0', 'Любое', 'x>1'], correctIndex: 0, explanation: 'Аргумент логарифма строго больше 0.'},
      {question: 'Если D < 0, сколько действительных корней у квадратного уравнения?', options: ['2', '1', '0'], correctIndex: 2, explanation: 'Действительных корней нет.'},
      {question: 'Решите: x^2 = 9', options: ['3', '-3', '+-3'], correctIndex: 2, explanation: 'И 3, и -3 в квадрате дают 9.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Решение математических моделей в экономике и бизнесе.'
  },
  {
    id: 'math-lesson-3',
    title: 'Тригонометрия',
    subject: 'math',
    egeNumber: '№12',
    theory: `<div class="theory-content">
      <h3>Основы</h3>
      <p>Основное тригонометрическое тождество: sin^2(x) + cos^2(x) = 1.</p>
      <p>Формулы двойного угла:</p>
      <ul>
        <li>sin(2x) = 2*sin(x)*cos(x)</li>
        <li>cos(2x) = cos^2(x) - sin^2(x)</li>
      </ul>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Тригонометрический круг - это просто круг с радиусом 1. Ось X - это косинус. Ось Y - это синус.',
    examples: [
      {input: 'sin(x) = 1', output: 'x = π/2 + 2πk', explanation: 'Самая верхняя точка круга.'}
    ],
    tasks: Array.from({length: 5}).map((_, i) => ({
      id: `math-3-t${i+1}`,
      question: `Чему равен sin(30°)?`,
      answer: '0.5',
      explanation: 'Табличное значение.',
      difficulty: 'easy'
    })),
    quiz: [
      {question: 'Каков период у функции sin(x)?', options: ['π', '2π', 'π/2'], correctIndex: 1, explanation: 'Круг проходится за 2π.'},
      {question: 'Чему равен tg(x)?', options: ['sin/cos', 'cos/sin', '1/sin'], correctIndex: 0, explanation: 'Отношение синуса к косинусу.'},
      {question: 'В какой четверти cos < 0, а sin > 0?', options: ['В первой', 'Во второй', 'В третьей'], correctIndex: 1, explanation: 'Вторая четверть: x отрицательный, y положительный.'}
    ],
    estimatedTime: 40,
    ntoRelevance: 'Геометрия и расчеты координат, например, при разработке игр или физических движков.'
  },
  {
    id: 'math-lesson-4',
    title: 'Вероятность',
    subject: 'math',
    egeNumber: '№2',
    theory: `<div class="theory-content">
      <h3>Теория вероятностей</h3>
      <p>Классическое определение: P = m / n, где m - число благоприятных исходов, n - общее число исходов.</p>
      <p>События бывают независимые (вероятность их совместного наступления P(A)*P(B)) и несовместные (вероятность наступления хотя бы одного P(A)+P(B)).</p>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'Вероятность — это просто "что нам нужно" разделить на "всего вариантов". Монета: нужен орел (1 вариант), всего исходов (орел, решка - 2). Вероятность 1/2 = 0.5.',
    examples: [
      {input: 'Бросают кубик. Какова вероятность выпадения четного числа?', output: '0.5', explanation: 'Благоприятные: 2, 4, 6 (3 шт). Всего: 6. 3/6 = 0.5'}
    ],
    tasks: Array.from({length: 5}).map((_, i) => ({
      id: `math-4-t${i+1}`,
      question: `В корзине 10 яблок, из них 3 зеленые. Какова вероятность достать зеленое?`,
      answer: '0.3',
      explanation: '3 / 10 = 0.3',
      difficulty: 'easy'
    })),
    quiz: [
      {question: 'Какое максимальное значение может принимать вероятность?', options: ['1', '100', 'Бесконечность'], correctIndex: 0, explanation: 'Вероятность достоверного события равна 1 (или 100%).'},
      {question: 'Вероятность события А равна 0.4. Какова вероятность того, что А НЕ произойдет?', options: ['0.4', '0.6', '0'], correctIndex: 1, explanation: '1 - 0.4 = 0.6.'},
      {question: 'Монету бросают дважды. Какова вероятность двух орлов?', options: ['0.5', '0.25', '1'], correctIndex: 1, explanation: '0.5 * 0.5 = 0.25.'}
    ],
    estimatedTime: 25,
    ntoRelevance: 'Оценка рисков, статистика, А/В тестирование в продуктовом менеджменте.'
  },
  {
    id: 'math-lesson-5',
    title: 'Функции и графики',
    subject: 'math',
    egeNumber: '№9',
    theory: `<div class="theory-content">
      <h3>Графики функций</h3>
      <ul>
        <li><strong>Прямая:</strong> y = kx + b. k - тангенс угла наклона, b - сдвиг по Y.</li>
        <li><strong>Парабола:</strong> y = ax^2 + bx + c. Вершина: x_0 = -b/(2a). Если a>0, ветви вверх.</li>
        <li><strong>Гипербола:</strong> y = k/x.</li>
      </ul>
    </div>`,
    videoEmbed: '',
    videoTimecodes: [],
    simpleExplanation: 'По графику всегда можно составить уравнение. Для прямой найди две точки и подставь в y=kx+b. Для параболы найди вершину.',
    examples: [
      {input: 'Найдите k для y = kx, проходящей через (2; 4)', output: '2', explanation: '4 = k * 2 => k = 2.'}
    ],
    tasks: Array.from({length: 5}).map((_, i) => ({
      id: `math-5-t${i+1}`,
      question: `Где находится вершина параболы y = x^2 - 4x? (укажите координату x)`,
      answer: '2',
      explanation: 'x_0 = -(-4)/(2*1) = 2',
      difficulty: 'medium'
    })),
    quiz: [
      {question: 'Что означает k в уравнении y=kx+b?', options: ['Сдвиг', 'Угловой коэффициент', 'Корень'], correctIndex: 1, explanation: 'Отвечает за наклон прямой.'},
      {question: 'Куда направлены ветви параболы y = -x^2?', options: ['Вверх', 'Вниз', 'Вправо'], correctIndex: 1, explanation: 'Коэффициент a=-1 < 0, ветви вниз.'},
      {question: 'Какая область определения у гиперболы y = 1/x?', options: ['x > 0', 'x != 0', 'Любое x'], correctIndex: 1, explanation: 'На ноль делить нельзя.'}
    ],
    estimatedTime: 30,
    ntoRelevance: 'Визуализация данных (дашборды), прогнозирование метрик.'
  }
];
