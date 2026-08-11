const { test, expect } = require('@playwright/test');

test.describe('EGE Master 2026 - E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Main UI loads without console errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('Failed to load resource')) {
        errors.push(msg.text());
      }
    });
    
    // Check nav
    await expect(page.locator('#bottom-nav')).toBeVisible({ timeout: 10000 });
    
    // Ensure no JS errors
    expect(errors).toHaveLength(0);
  });

  test('Navigation works', async ({ page }) => {
    // If diagnostics is open, close it or do diagnostics
    const diagModal = page.locator('#modal-diagnostics');
    if (await diagModal.isVisible()) {
      // Just click outside or there is no close button, wait, there is a start button
      // But we can just execute JS to close it
      await page.evaluate(() => {
        document.getElementById('modal-diagnostics').style.display = 'none';
      });
    }

    await page.click('text="Практика"');
    await expect(page.locator('#view-trainer')).toBeVisible();

    await page.click('text="Курсы"');
    await expect(page.locator('#view-courses')).toBeVisible();

    await page.click('text="Ошибки"');
    await expect(page.locator('#view-errors')).toBeVisible();

    await page.click('text="НТО"');
    await expect(page.locator('#view-nto')).toBeVisible();

    await page.click('text="Прогресс"');
    await expect(page.locator('#view-analytics')).toBeVisible();
    
    await page.click('text="Главная"');
    await expect(page.locator('#view-dashboard')).toBeVisible();
  });

  test('Daily Plan (Planner) logic renders tasks', async ({ page }) => {
    const diagModal = page.locator('#modal-diagnostics');
    if (await diagModal.isVisible()) {
      await page.evaluate(() => {
        document.getElementById('modal-diagnostics').style.display = 'none';
      });
    }
    
    await page.click('text="Главная"');
    const taskCount = await page.locator('.plan-task').count();
    expect(taskCount).toBeGreaterThan(0);
  });

  test('NTO module dynamically loads 3 cases', async ({ page }) => {
    const diagModal = page.locator('#modal-diagnostics');
    if (await diagModal.isVisible()) {
      await page.evaluate(() => {
        document.getElementById('modal-diagnostics').style.display = 'none';
      });
    }

    await page.click('text="НТО"');
    
    // Click on the Projects tab inside the NTO container, since there might be duplicate text from index.html tabs
    await page.locator('#nto-container').locator('text="Проекты"').click();
    
    // Check that there are 3 cases loaded
    const projects = page.locator('.project-list .card');
    await expect(projects).toHaveCount(3);
    
    // Click on the first project to start
    await page.locator('text="Начать проект"').first().click();
    
    // Ensure the project stage is visible
    await expect(page.locator('text="Анализ процесса"')).toBeVisible();
  });

});
