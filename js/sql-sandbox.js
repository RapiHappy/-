window.sqlSandbox = {
  db: null,
  currentTask: 0,
  isLoading: false,
  
  async init() {
    this.isLoading = true;
    try {
      if (!window.initSqlJs) {
        console.error("sql.js is not loaded");
        return;
      }
      const SQL = await window.initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}` });
      this.db = new SQL.Database();
      console.log("SQL.js initialized successfully");
    } catch (e) {
      console.error("Failed to initialize sql.js", e);
    } finally {
      this.isLoading = false;
    }
  },
  
  render(container) {
    if (!container) container = document.getElementById('sql-sandbox-area');
    if (!container) return;
    
    if (this.isLoading) {
      container.innerHTML = '<div class="card"><p>Загрузка SQL движка...</p></div>';
      return;
    }
    
    if (!this.db) {
       this.init().then(() => this.render(container));
       return;
    }
    
    container.innerHTML = `
      <div class="card sql-sandbox">
        <h3>SQL Песочница</h3>
        <div style="margin-bottom: 15px;">
          <strong>Задача:</strong> Выведи всех пользователей старше 18 лет из таблицы users.
        </div>
        
        <textarea id="sql-query-input" style="width: 100%; height: 100px; background: #0f172a; color: #f8fafc; border: 1px solid #334155; padding: 10px; font-family: monospace; border-radius: 4px; margin-bottom: 15px;">SELECT * FROM users;</textarea>
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <button class="btn btn-primary" onclick="sqlSandbox.executeQuery()">Выполнить</button>
          <button class="btn btn-secondary" onclick="sqlSandbox.checkAnswer()">Проверить</button>
          <button class="btn btn-secondary" onclick="sqlSandbox.showHint()">Подсказка</button>
        </div>
        
        <div id="sql-results-area"></div>
      </div>
    `;
    
    this.setupTestData();
  },
  
  setupTestData() {
    if (!this.db) return;
    try {
      this.db.exec("CREATE TABLE IF NOT EXISTS users (id INT, name TEXT, age INT);");
      this.db.exec("DELETE FROM users;");
      this.db.exec("INSERT INTO users VALUES (1, 'Alice', 20), (2, 'Bob', 17), (3, 'Charlie', 22);");
    } catch(e) {
      console.error(e);
    }
  },
  
  executeQuery() {
    const query = document.getElementById('sql-query-input').value;
    const resultsArea = document.getElementById('sql-results-area');
    
    if (!query.trim()) {
      resultsArea.innerHTML = '<p style="color: #ef4444;">Введите SQL запрос</p>';
      return;
    }
    
    try {
      const results = this.db.exec(query);
      this.renderResults(results, resultsArea);
    } catch (e) {
      resultsArea.innerHTML = `<p style="color: #ef4444;">Ошибка SQL: ${e.message}</p>`;
    }
  },
  
  checkAnswer() {
    this.executeQuery();
    const resultsArea = document.getElementById('sql-results-area');
    // Simplified check
    const query = document.getElementById('sql-query-input').value.toLowerCase();
    if (query.includes('where age > 18')) {
      resultsArea.innerHTML += `<div style="margin-top: 15px; padding: 10px; background: rgba(16, 185, 129, 0.2); color: #10b981; border-radius: 4px;">Верно! Задача решена.</div>`;
      
      let progress = StorageManager.getNtoProgress() || {completedCases: [], sqlSolutions: [], bpmnSolutions: []};
      if (!progress.sqlSolutions.includes(this.currentTask)) {
        progress.sqlSolutions.push(this.currentTask);
        StorageManager.saveNtoProgress(progress);
      }
    } else {
      resultsArea.innerHTML += `<div style="margin-top: 15px; padding: 10px; background: rgba(239, 68, 68, 0.2); color: #ef4444; border-radius: 4px;">Ответ неполный или неверный. Попробуйте еще раз.</div>`;
    }
  },
  
  showHint() {
    if (app && app.showNotification) {
      app.showNotification("Используйте оператор WHERE для фильтрации.", "info");
    }
  },
  
  renderResults(results, container) {
    if (!results || results.length === 0) {
      container.innerHTML = '<p>Запрос выполнен успешно, но вернул пустой результат.</p>';
      return;
    }
    
    const data = results[0];
    let html = '<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
    html += '<thead style="background: #334155;"><tr>';
    data.columns.forEach(col => {
      html += `<th style="padding: 8px; text-align: left; border: 1px solid #475569;">${col}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    data.values.forEach(row => {
      html += '<tr>';
      row.forEach(val => {
        html += `<td style="padding: 8px; border: 1px solid #475569;">${val}</td>`;
      });
      html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
  }
};

window.sqlSandbox = sqlSandbox;
