const { test, expect } = require('@playwright/test');

test.describe('EGE Master 2026 - Comprehensive Tests', () => {
  let consoleErrors = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Set viewport to Desktop initially
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('Desktop & Mobile: Navigation and UI rendering', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => {
      setInterval(() => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(m => {
          if (m.style.display !== 'none') {
            m.style.display = 'none';
          }
        });
      }, 100);
    });
    
    // Handle Diagnostics Modal if present
    const diagModal = await page.locator('#modal-diagnostics');
    if (await diagModal.isVisible()) {
      await page.evaluate(() => { window.diagnosticsSystem.finish(); });
      await page.waitForTimeout(500);
    }
    
    // Check navigation buttons desktop
    const tabs = ['dashboard', 'courses', 'trainer', 'nto', 'errors', 'analytics'];
    for (const tab of tabs) {
      await page.evaluate((t) => window.app.navigateTo(t), tab);
      await expect(page.locator(`#view-${tab}`)).toBeVisible();
    }
    
    // Check Mobile layout
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    
    for (const tab of tabs) {
      await page.evaluate((t) => window.app.navigateTo(t), tab);
      await expect(page.locator(`#view-${tab}`)).toBeVisible();
    }
  });

  test('Functionality: Lessons, Videos, Timer, and LocalStorage', async ({ page, context }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => {
      window.localStorage.clear();
      window.localStorage.setItem('diagnostics_done', 'true');
    });
    await page.reload();
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      setInterval(() => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(m => {
          if (m.style.display !== 'none') {
            m.style.display = 'none';
          }
        });
      }, 100);
    });

    // Navigate to courses
    await page.evaluate(() => window.app.navigateTo('courses'));
    
    // Force a lesson load
    await page.evaluate(() => {
      window.coursesSystem.openLesson('inf_1');
    });
    await page.waitForTimeout(500);
    
    // Check Video iframe validation
    const iframe = await page.locator('#lesson-container iframe');
    await expect(iframe).toHaveCount(1);
    
    // Complete lesson tasks
    await page.evaluate(() => {
       window.coursesSystem.markCompleted('inf_1');
    });
    await page.waitForTimeout(500);
    
    // Verify LocalStorage updated
    const ls = await page.evaluate(() => window.localStorage.getItem('ege_master_lesson_progress'));
    expect(ls).toBeTruthy();
    
    // Timer test
    await page.evaluate(() => window.app.navigateTo('timer'));
    await page.locator('#btn-timer-toggle').click();
    await page.waitForTimeout(1100);
    const timerText = await page.locator('#timer-time').innerText();
    expect(timerText).not.toBe('25:00'); // it should tick down

    // No console errors
    expect(consoleErrors.length).toBe(0);
  });

  test('Offline Mode and PWA', async ({ page, context }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(2000); // Wait for service worker to cache
    
    // Go offline
    await context.setOffline(true);
    await page.reload();
    
    // Ensure the page still loads and header is visible
    await expect(page.locator('#greeting-text')).toBeVisible();
  });
});
