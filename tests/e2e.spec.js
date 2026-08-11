const { test, expect } = require('@playwright/test');

test.describe('EGE Master 2026 - E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to local index.html using file protocol or local server
    // Since this is a static project, assuming it will be served or opened via file://.
    // For playwright testing of static files we can pass absolute path, or if we use local server we'd use localhost.
    // To make it portable, we will use a relative file path for playwright if baseDir is set, or a simple server.
    // Assuming Playwright config is set to serve the root dir.
    
    // Fallback if no webServer is configured:
    await page.goto('http://localhost:3000').catch(async () => {
        // If there's no server running, we can load file directly in some setups, but usually Playwright handles it via webServer.
    });
  });

  test('Main UI loads without console errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // We can assume the page is loaded if we see the sidebar
    await expect(page.locator('#sidebar')).toBeVisible({ timeout: 10000 });
    
    // Ensure no JS errors
    expect(errors).toHaveLength(0);
  });

  test('Sidebar Navigation works', async ({ page }) => {
    await page.click('text="Диагностика"');
    await expect(page.locator('#modal-diagnostics')).toBeVisible();
    await page.click('#modal-diagnostics .btn-secondary'); // Close modal
    
    await page.click('text="Мой план"');
    await expect(page.locator('#daily-plan-container')).toBeVisible();

    await page.click('text="Тренажеры"');
    await expect(page.locator('#trainer-container')).toBeVisible();

    await page.click('text="Курсы"');
    await expect(page.locator('.courses-grid')).toBeVisible();

    await page.click('text="Ошибки"');
    await expect(page.locator('#errors-container')).toBeVisible();

    await page.click('text="Модуль НТО"');
    await expect(page.locator('#nto-container')).toBeVisible();

    await page.click('text="Статистика"');
    await expect(page.locator('.analytics-container')).toBeVisible();
  });

  test('Daily Plan (Planner) logic renders tasks', async ({ page }) => {
    await page.click('text="Мой план"');
    const taskCount = await page.locator('.plan-task').count();
    expect(taskCount).toBeGreaterThan(0);
  });

  test('NTO module dynamically loads 3 cases', async ({ page }) => {
    await page.click('text="Модуль НТО"');
    await page.click('text="Проекты"');
    
    // Check that there are 3 cases loaded
    const projects = page.locator('.project-list .card');
    await expect(projects).toHaveCount(3);
    
    // Click on the first project to start
    await page.locator('text="Начать проект"').first().click();
    
    // Ensure the project stage is visible
    await expect(page.locator('text="Этап 1: Анализ процесса"')).toBeVisible();
  });

});
