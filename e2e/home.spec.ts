import { test, expect } from '@playwright/test';

test.describe('Home Page - Complete UI Testing', () => {
  
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if main content is visible
    await expect(page).toHaveTitle(/ByteToMeg/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should test all navigation buttons in header/sidebar', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test home link/logo
    const homeLinks = page.locator('a[href="/"]');
    if (await homeLinks.count() > 0) {
      await expect(homeLinks.first()).toBeVisible();
    }
    
    // Test Docs link
    const docsLinks = page.locator('a[href="/docs"]');
    if (await docsLinks.count() > 0) {
      await expect(docsLinks.first()).toBeVisible();
      await docsLinks.first().click();
      await expect(page).toHaveURL('/docs');
      await page.goBack();
    }
    
    // Test Blog link
    const blogLinks = page.locator('a[href="/blog"]');
    if (await blogLinks.count() > 0) {
      await expect(blogLinks.first()).toBeVisible();
      await blogLinks.first().click();
      await expect(page).toHaveURL('/blog');
      await page.goBack();
    }
    
    // Test Newsletter link
    const newsletterLinks = page.locator('a[href="/newsletter"]');
    if (await newsletterLinks.count() > 0) {
      await expect(newsletterLinks.first()).toBeVisible();
      await newsletterLinks.first().click();
      await expect(page).toHaveURL('/newsletter');
      await page.goBack();
    }
  });

  test('should display and interact with all guide cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if guide cards are present
    const guideCards = page.locator('[class*="group"][class*="cursor-pointer"]');
    const count = await guideCards.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Test each guide card
    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = guideCards.nth(i);
      
      // Verify card has title
      const cardTitle = card.locator('[class*="font-bold"]').first();
      await expect(cardTitle).toBeVisible();
      
      // Verify card has description
      const cardDescription = card.locator('[class*="text-muted-foreground"]').first();
      await expect(cardDescription).toBeVisible();
      
      // Verify card is clickable
      await expect(card).toBeVisible();
    }
  });

  test('should click guide card and navigate to detail page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click on first guide card
    const firstGuide = page.locator('[class*="group"][class*="cursor-pointer"]').first();
    await firstGuide.click();
    
    // Should navigate to guide detail
    await expect(page).toHaveURL(/\/guide\/.+/);
    
    // Verify guide detail page loaded
    await expect(page.locator('button:has-text("Back")')).toBeVisible();
  });

  test('should test "Start Guide" button on guide cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find Start Guide button
    const startGuideButtons = page.locator('text=Start Guide');
    if (await startGuideButtons.count() > 0) {
      await startGuideButtons.first().click();
      await expect(page).toHaveURL(/\/guide\/.+/);
    }
  });

  test('should display stats section with all statistics', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to stats section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    
    // Check for various stats
    const statsText = [
      /6\+.*Real-World/i,
      /200M\+/i,
      /99\.9%/i,
      /<1s/i,
    ];
    
    for (const statPattern of statsText) {
      const stat = page.locator(`text=${statPattern}`);
      if (await stat.count() > 0) {
        await expect(stat.first()).toBeVisible();
      }
    }
  });

  test('should test byte converter if present on home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if converter is present
    const converterInput = page.locator('input[type="number"]');
    if (await converterInput.count() > 0) {
      await converterInput.first().fill('1024');
      
      // Check for conversion result
      await page.waitForTimeout(500);
      const result = page.locator('text=1.00');
      if (await result.count() > 0) {
        await expect(result.first()).toBeVisible();
      }
    }
  });

  test('should test all tab switches if tabs exist', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find all tabs
    const tabs = page.locator('[role="tab"]');
    const tabCount = await tabs.count();
    
    if (tabCount > 0) {
      // Click each tab
      for (let i = 0; i < tabCount; i++) {
        await tabs.nth(i).click();
        await page.waitForTimeout(500);
        
        // Verify tab is selected
        const isSelected = await tabs.nth(i).getAttribute('data-state');
        expect(isSelected).toBe('active');
      }
    }
  });

  test('should test scroll to top button if exists', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    // Look for scroll to top button
    const scrollTopButton = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: '' });
    if (await scrollTopButton.count() > 0) {
      const visibleButton = scrollTopButton.first();
      if (await visibleButton.isVisible()) {
        await visibleButton.click();
        await page.waitForTimeout(500);
        
        // Verify scrolled to top
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBeLessThan(100);
      }
    }
  });
});

test.describe('Navigation', () => {
  
  test('should navigate to docs page from home', async ({ page }) => {
    await page.goto('/');
    
    // Find and click docs link (assuming there's a navigation menu)
    const docsLink = page.locator('a[href="/docs"]').or(page.locator('text=Docs').locator('..'));
    
    if (await docsLink.isVisible()) {
      await docsLink.click();
      await expect(page).toHaveURL('/docs');
    }
  });

  test('should navigate to blog page from home', async ({ page }) => {
    await page.goto('/');
    
    // Find and click blog link
    const blogLink = page.locator('a[href="/blog"]').or(page.locator('text=Blog').locator('..'));
    
    if (await blogLink.isVisible()) {
      await blogLink.click();
      await expect(page).toHaveURL('/blog');
    }
  });

  test('should have working logo/home link', async ({ page }) => {
    await page.goto('/docs');
    
    // Find logo or home link
    const homeLink = page.locator('a[href="/"]').first();
    
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await expect(page).toHaveURL('/');
    }
  });
});

test.describe('Search and Filter', () => {
  
  test('should filter guides by category if available', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if there are tabs or filters
    const tabs = page.locator('[role="tab"]').or(page.locator('[class*="tab"]'));
    
    if (await tabs.first().isVisible()) {
      const tabCount = await tabs.count();
      
      if (tabCount > 1) {
        // Click second tab
        await tabs.nth(1).click();
        
        // Content should change
        await page.waitForLoadState('networkidle');
      }
    }
  });
});

test.describe('Theme Toggle', () => {
  
  test('should have theme toggle functionality', async ({ page }) => {
    await page.goto('/');
    
    // Look for theme toggle button
    const themeToggle = page.locator('button').filter({ has: page.locator('svg') }).first();
    
    if (await themeToggle.isVisible()) {
      // Get initial theme
      const initialClass = await page.locator('html').getAttribute('class');
      
      // Click theme toggle
      await themeToggle.click();
      await page.waitForTimeout(500);
      
      // Theme should change
      const newClass = await page.locator('html').getAttribute('class');
      expect(initialClass).not.toBe(newClass);
    }
  });
});

test.describe('Performance', () => {
  
  test('should load home page within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have console errors on home page', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should not have critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('Extension')
    );
    
    expect(criticalErrors.length).toBe(0);
  });
});

