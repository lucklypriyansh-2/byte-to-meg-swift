import { test, expect } from '@playwright/test';

test.describe('Docs Page - Complete UI Testing', () => {
  
  test('should load docs page with all elements visible', async ({ page }) => {
    await page.goto('/docs');
    await page.waitForLoadState('networkidle');
    
    // Check page title and header
    await expect(page.locator('h1:has-text("System Design")')).toBeVisible();
    await expect(page.locator('text=Documentation')).toBeVisible();
    
    // Wait for guides to load
    await page.waitForSelector('[class*="grid"]', { timeout: 10000 });
    
    // Check if guide cards are displayed
    const guideCards = page.locator('[class*="cursor-pointer"]');
    await expect(guideCards.first()).toBeVisible();
  });

  test('should test navigation back to home from docs', async ({ page }) => {
    await page.goto('/docs');
    
    // Find and click home/back link
    const homeLinks = page.locator('a[href="/"]');
    if (await homeLinks.count() > 0) {
      await homeLinks.first().click();
      await expect(page).toHaveURL('/');
    }
  });

  test('should display guide cards with correct information', async ({ page }) => {
    await page.goto('/docs');
    await page.waitForLoadState('networkidle');
    
    // Check if guide cards have required elements
    const firstCard = page.locator('[class*="cursor-pointer"]').first();
    
    // Should have icon
    await expect(firstCard.locator('svg')).toBeVisible();
    
    // Should have title
    await expect(firstCard.locator('[class*="text-xl"]')).toBeVisible();
    
    // Should have "Read More" text
    await expect(firstCard.locator('text=Read More')).toBeVisible();
  });

  test('should navigate to guide detail page when clicking a guide card', async ({ page }) => {
    await page.goto('/docs');
    await page.waitForLoadState('networkidle');
    
    // Click on the first guide card
    const firstCard = page.locator('[class*="cursor-pointer"]').first();
    await firstCard.click();
    
    // Should navigate to guide detail page
    await expect(page).toHaveURL(/\/guide\/.+/);
    
    // Check if guide detail page loaded
    await expect(page.locator('button:has-text("Back")')).toBeVisible();
  });

  test('should display Quick Start Guide section', async ({ page }) => {
    await page.goto('/docs');
    
    // Check for Quick Start Guide heading
    await expect(page.locator('h2:has-text("Quick Start Guide")')).toBeVisible();
    
    // Quick start guides should be clickable
    const quickStartCards = page.locator('text=Quick Start Guide').locator('..').locator('[class*="cursor-pointer"]');
    await expect(quickStartCards.first()).toBeVisible();
  });

  test('should navigate from Quick Start Guide to guide detail', async ({ page }) => {
    await page.goto('/docs');
    
    // Wait for Quick Start section
    await page.locator('h2:has-text("Quick Start Guide")').scrollIntoViewIfNeeded();
    
    // Click on a quick start guide
    const quickStartSection = page.locator('text=Quick Start Guide').locator('..');
    const quickStartCard = quickStartSection.locator('[class*="cursor-pointer"]').first();
    await quickStartCard.click();
    
    // Should navigate to guide detail
    await expect(page).toHaveURL(/\/guide\/.+/);
  });
});

test.describe('Guide Detail Page - Complete Button Testing', () => {
  
  test('should display guide detail page with all buttons', async ({ page, request }) => {
    // First get a guide from API
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    
    // Navigate to guide detail page
    await page.goto(`/guide/${firstGuide.guide_id}`);
    await page.waitForLoadState('networkidle');
    
    // Check if page loads
    await expect(page.locator('button:has-text("Back")')).toBeVisible();
    
    // Check if guide title is displayed
    await expect(page.locator(`h1:has-text("${firstGuide.title}")`)).toBeVisible();
  });

  test('should test Back button on guide detail page', async ({ page, request }) => {
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    await page.goto(`/guide/${firstGuide.guide_id}`);
    await page.waitForLoadState('networkidle');
    
    // Click back button
    await page.click('button:has-text("Back")');
    
    // Should navigate to home page
    await expect(page).toHaveURL('/');
  });

  test('should test all CTA buttons at bottom of guide', async ({ page, request }) => {
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    await page.goto(`/guide/${firstGuide.guide_id}`);
    await page.waitForLoadState('networkidle');
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Test "Explore More Guides" button
    const exploreButton = page.locator('button:has-text("Explore More Guides")');
    if (await exploreButton.isVisible()) {
      await exploreButton.click();
      await expect(page).toHaveURL('/');
    }
  });

  test('should test "View Documentation" button if exists', async ({ page, request }) => {
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    await page.goto(`/guide/${firstGuide.guide_id}`);
    await page.waitForLoadState('networkidle');
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Test documentation button
    const docsButton = page.locator('button:has-text("Documentation")');
    if (await docsButton.isVisible()) {
      await docsButton.click();
      await page.waitForTimeout(500);
    }
  });

  test('should show loading state while fetching guide', async ({ page }) => {
    // Navigate directly to a guide page
    await page.goto('/guide/test-guide-id');
    
    // Should show loading or error state
    const loadingOrError = page.locator('text=Loading guide').or(page.locator('text=Error'));
    await expect(loadingOrError).toBeVisible({ timeout: 5000 });
  });

  test('should display guide overview section', async ({ page, request }) => {
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    await page.goto(`/guide/${firstGuide.guide_id}`);
    
    // Check for overview section
    await expect(page.locator('h2:has-text("Overview")')).toBeVisible();
    
    // Check if details are displayed
    if (firstGuide.details) {
      await expect(page.locator(`text=${firstGuide.details.substring(0, 50)}`)).toBeVisible();
    }
  });

  test('should display all guide steps', async ({ page, request }) => {
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    await page.goto(`/guide/${firstGuide.guide_id}`);
    
    // Check for steps section
    await expect(page.locator('h2:has-text("Step-by-Step Guide")')).toBeVisible();
    
    // Check if all steps are displayed
    for (let i = 0; i < firstGuide.steps.length; i++) {
      await expect(page.locator(`text=${i + 1}`)).toBeVisible();
      await expect(page.locator(`text=${firstGuide.steps[i]}`)).toBeVisible();
    }
  });

  test('should have back button that navigates home', async ({ page, request }) => {
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    await page.goto(`/guide/${firstGuide.guide_id}`);
    
    // Click back button
    await page.click('button:has-text("Back")');
    
    // Should navigate to home page
    await expect(page).toHaveURL('/');
  });

  test('should display company and users information', async ({ page, request }) => {
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    await page.goto(`/guide/${firstGuide.guide_id}`);
    
    // Check for company info
    if (firstGuide.company) {
      await expect(page.locator(`text=${firstGuide.company}`)).toBeVisible();
    }
    
    // Check for users info
    if (firstGuide.users) {
      await expect(page.locator(`text=${firstGuide.users}`)).toBeVisible();
    }
  });

  test('should show error for non-existent guide', async ({ page }) => {
    await page.goto('/guide/non-existent-guide-id-12345');
    
    // Should show error or not found message
    const errorMessage = page.locator('text=Error').or(page.locator('text=not found'));
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('should have CTA buttons at the bottom', async ({ page, request }) => {
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    await page.goto(`/guide/${firstGuide.guide_id}`);
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check for CTA buttons
    await expect(page.locator('button:has-text("Explore More Guides")')).toBeVisible();
  });
});

test.describe('Navigation Flow', () => {
  
  test('should navigate from home to docs to guide detail and back', async ({ page }) => {
    // Start at home page
    await page.goto('/');
    
    // Navigate to docs (assume there's a link or button)
    await page.goto('/docs');
    await expect(page).toHaveURL('/docs');
    
    // Click on a guide
    await page.waitForLoadState('networkidle');
    const firstCard = page.locator('[class*="cursor-pointer"]').first();
    await firstCard.click();
    
    // Should be on guide detail page
    await expect(page).toHaveURL(/\/guide\/.+/);
    
    // Click back
    await page.click('button:has-text("Back")');
    
    // Should be back at home
    await expect(page).toHaveURL('/');
  });

  test('should handle direct URL navigation to guide', async ({ page, request }) => {
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    
    // Navigate directly via URL
    await page.goto(`/guide/${firstGuide.guide_id}`);
    
    // Page should load correctly
    await expect(page.locator('button:has-text("Back")')).toBeVisible();
    await expect(page.locator(`h1:has-text("${firstGuide.title}")`)).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  
  test('should display docs page correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    
    await page.goto('/docs');
    
    // Should still show guides
    await expect(page.locator('[class*="cursor-pointer"]').first()).toBeVisible();
    
    // Check if grid adjusts for mobile
    const grid = page.locator('[class*="grid"]').first();
    await expect(grid).toBeVisible();
  });

  test('should display guide detail correctly on mobile', async ({ page, request }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const response = await request.get('http://localhost:3001/api/guides');
    const guides = await response.json();
    
    if (guides.length === 0) {
      test.skip();
      return;
    }
    
    const firstGuide = guides[0];
    await page.goto(`/guide/${firstGuide.guide_id}`);
    
    // Should display correctly
    await expect(page.locator('button:has-text("Back")')).toBeVisible();
    await expect(page.locator(`h1:has-text("${firstGuide.title}")`)).toBeVisible();
  });
});

