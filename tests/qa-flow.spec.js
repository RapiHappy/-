const { test, expect } = require('@playwright/test');
const path = require('path');
const artifactDir = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\5432f2b8-cf0d-4ebd-a661-307bef5565ae';

test.describe('EGE Master 2026 - Automatic QA Flow', () => {
  let consoleLogs = [];
  
  test.beforeEach(async ({ page }) => {
    consoleLogs = [];
    page.on('console', msg => {
      consoleLogs.push({ type: msg.type(), text: msg.text() });
    });
    // Desktop view
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('Full Route QA', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Clear storage to act as new user
    await page.evaluate(() => {
      window.localStorage.clear();
      window.localStorage.setItem('diagnostics_done', 'true');
    });
    await page.reload();
    await page.waitForTimeout(1000);

    // Ensure we are on dashboard
    await expect(page.locator('#view-dashboard')).toBeVisible();

    // 1. Screenshot of the Main page showing the new 10-step route
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'screenshot-1-main-route.png'), fullPage: true });

    // 2. Click "Начать сегодняшнее занятие"
    await page.locator('.btn-mega').click();
    await page.waitForTimeout(1000);
    
    // We should be on Lesson 1 (Informatics)
    await expect(page.locator('#view-lesson')).toBeVisible();
    await page.waitForSelector('#lesson-section-video iframe');
    
    // 3. Screenshot of Lesson 1 Desktop (showing two columns)
    await page.screenshot({ path: path.join(artifactDir, 'screenshot-2-lesson1-desktop.png') });

    // Scroll to Practice
    await page.locator('#lesson-section-practice').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Click "Показать разбор" on first task
    page.on('dialog', dialog => dialog.accept());
    const showSolutionBtn = page.locator('.practice-task .btn-secondary').first();
    await showSolutionBtn.click();
    await page.waitForTimeout(500);

    // 4. Screenshot of Practice
    await page.screenshot({ path: path.join(artifactDir, 'screenshot-4-practice.png') });

    // Solve the Quiz (click first option)
    await page.locator('input[type="radio"]').first().check();
    await page.locator('#lesson-section-quiz .btn-primary').click();
    await page.waitForTimeout(500);
    
    // Check next lesson button appeared
    const nextBtn = page.locator('button:has-text("Следующий урок")');
    await expect(nextBtn).toBeVisible();

    // 5. Navigate to NTO manually to take screenshot
    await page.evaluate(() => window.app.navigateTo('nto'));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'screenshot-5-nto.png') });

    // 6. Mobile version screenshot
    await page.setViewportSize({ width: 375, height: 812 });
    await page.evaluate(() => window.app.navigateTo('dashboard'));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(artifactDir, 'screenshot-6-mobile.png'), fullPage: true });

    // 7. Generate console log output
    const fs = require('fs');
    fs.writeFileSync(path.join(artifactDir, 'screenshot-7-console.txt'), consoleLogs.map(l => `[${l.type}] ${l.text}`).join('\\n'));
  });
});
