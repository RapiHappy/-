window.bpmnTrainer = {
  elements: [],
  
  render(container) {
    if (!container) container = document.getElementById('bpmn-trainer-area');
    if (!container) return;
    
    container.innerHTML = `
      <div class="card bpmn-trainer">
        <h3>Тренажер BPMN</h3>
        <p>Составьте правильную последовательность процесса "Обработка заказа":</p>
        
        <div style="display: flex; gap: 20px; margin-top: 15px;">
          <!-- Palette -->
          <div style="flex: 1; border: 1px solid #334155; padding: 10px; border-radius: 4px;">
            <h4>Палитра элементов</h4>
            <div id="bpmn-palette" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
              <button class="btn btn-secondary" onclick="bpmnTrainer.addElement('Start Event', 'Начало')">⭕ Start Event (Начало)</button>
              <button class="btn btn-secondary" onclick="bpmnTrainer.addElement('Task', 'Принять заказ')">🟦 Task (Принять заказ)</button>
              <button class="btn btn-secondary" onclick="bpmnTrainer.addElement('Task', 'Собрать заказ')">🟦 Task (Собрать заказ)</button>
              <button class="btn btn-secondary" onclick="bpmnTrainer.addElement('Gateway', 'Проверка оплаты')">🔶 Gateway (Оплата?)</button>
              <button class="btn btn-secondary" onclick="bpmnTrainer.addElement('End Event', 'Конец')">🔴 End Event (Конец)</button>
            </div>
          </div>
          
          <!-- Builder area -->
          <div style="flex: 2; border: 1px solid #334155; padding: 10px; border-radius: 4px; background: #0f172a;">
            <h4>Ваш процесс</h4>
            <div id="bpmn-builder" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; min-height: 200px;">
              <p style="color: #94a3b8; text-align: center; margin-top: 50px;" id="bpmn-empty-text">Добавьте элементы из палитры</p>
            </div>
            <div style="margin-top: 20px;">
              <button class="btn btn-primary" onclick="bpmnTrainer.checkSequence()">Проверить схему</button>
              <button class="btn btn-secondary" onclick="bpmnTrainer.clearElements()">Очистить</button>
            </div>
          </div>
        </div>
        <div id="bpmn-feedback" style="margin-top: 15px;"></div>
      </div>
    `;
    
    this.renderElements();
  },
  
  addElement(type, label) {
    this.elements.push({ type, label, id: Date.now() });
    this.renderElements();
  },
  
  removeElement(index) {
    this.elements.splice(index, 1);
    this.renderElements();
  },
  
  moveElement(index, dir) {
    if (dir === -1 && index > 0) {
      let temp = this.elements[index];
      this.elements[index] = this.elements[index-1];
      this.elements[index-1] = temp;
    } else if (dir === 1 && index < this.elements.length - 1) {
      let temp = this.elements[index];
      this.elements[index] = this.elements[index+1];
      this.elements[index+1] = temp;
    }
    this.renderElements();
  },
  
  clearElements() {
    this.elements = [];
    document.getElementById('bpmn-feedback').innerHTML = '';
    this.renderElements();
  },
  
  renderElements() {
    const builder = document.getElementById('bpmn-builder');
    if (!builder) return;
    
    if (this.elements.length === 0) {
      builder.innerHTML = '<p style="color: #94a3b8; text-align: center; margin-top: 50px;" id="bpmn-empty-text">Добавьте элементы из палитры</p>';
      return;
    }
    
    builder.innerHTML = '';
    this.elements.forEach((el, index) => {
      let icon = '';
      if (el.type === 'Start Event') icon = '⭕';
      else if (el.type === 'End Event') icon = '🔴';
      else if (el.type === 'Task') icon = '🟦';
      else if (el.type === 'Gateway') icon = '🔶';
      
      builder.innerHTML += `
        <div style="display: flex; align-items: center; gap: 10px; background: #1e293b; padding: 10px; border: 1px solid #475569; border-radius: 4px;">
          <div style="font-size: 20px;">${icon}</div>
          <div style="flex: 1;">${el.label}</div>
          <div>
            <button class="btn btn-sm" onclick="bpmnTrainer.moveElement(${index}, -1)" ${index === 0 ? 'disabled' : ''}>↑</button>
            <button class="btn btn-sm" onclick="bpmnTrainer.moveElement(${index}, 1)" ${index === this.elements.length - 1 ? 'disabled' : ''}>↓</button>
            <button class="btn btn-sm" style="color: #ef4444;" onclick="bpmnTrainer.removeElement(${index})">✕</button>
          </div>
        </div>
        ${index < this.elements.length - 1 ? '<div style="text-align: center; color: #94a3b8;">↓</div>' : ''}
      `;
    });
  },
  
  checkSequence() {
    const feedback = document.getElementById('bpmn-feedback');
    const expected = ['Начало', 'Принять заказ', 'Проверка оплаты', 'Собрать заказ', 'Конец'];
    
    if (this.elements.length === 0) {
      feedback.innerHTML = '<div style="color: #ef4444;">Схема пуста</div>';
      return;
    }
    
    const userLabels = this.elements.map(e => e.label);
    
    let isCorrect = true;
    if (userLabels.length !== expected.length) {
      isCorrect = false;
    } else {
      for (let i = 0; i < expected.length; i++) {
        if (userLabels[i] !== expected[i]) {
          isCorrect = false;
          break;
        }
      }
    }
    
    if (isCorrect) {
      feedback.innerHTML = `<div style="padding: 10px; background: rgba(16, 185, 129, 0.2); color: #10b981; border-radius: 4px;">Верно! Отличная работа.</div>`;
      let progress = StorageManager.getNtoProgress() || {completedCases: [], sqlSolutions: [], bpmnSolutions: []};
      if (!progress.bpmnSolutions.includes('order-processing')) {
        progress.bpmnSolutions.push('order-processing');
        StorageManager.saveNtoProgress(progress);
      }
    } else {
      feedback.innerHTML = `<div style="padding: 10px; background: rgba(239, 68, 68, 0.2); color: #ef4444; border-radius: 4px;">Есть ошибки. Проверьте порядок элементов. Сначала начало, затем прием заказа, затем оплата...</div>`;
    }
  }
};

window.bpmnTrainer = bpmnTrainer;
