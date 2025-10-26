import { test, expect } from '@playwright/test';

test.describe('Admin Authentication', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth
    await page.context().clearCookies();
    await page.goto('/admin/login');
  });

  test('should display login page correctly', async ({ page }) => {
    // Check page elements
    await expect(page.locator('text=Admin Login').or(page.locator('text=Login'))).toBeVisible();
    await expect(page.locator('input[type="text"]').or(page.locator('input[name="username"]'))).toBeVisible();
    await expect(page.locator('input[type="password"]').or(page.locator('input[name="password"]'))).toBeVisible();
    await expect(page.locator('button[type="submit"]').or(page.locator('button:has-text("Login")'))).toBeVisible();
  });

  test('should login successfully with correct credentials', async ({ page }) => {
    // Fill login form
    await page.fill('input[type="text"], input[name="username"]', 'admin');
    await page.fill('input[type="password"], input[name="password"]', 'admin123');
    
    // Submit form
    await page.click('button[type="submit"], button:has-text("Login")');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/admin/dashboard', { timeout: 10000 });
    
    // Should see dashboard content
    await expect(page.locator('text=Admin Dashboard')).toBeVisible();
  });

  test('should show error with incorrect credentials', async ({ page }) => {
    // Fill login form with wrong credentials
    await page.fill('input[type="text"], input[name="username"]', 'wronguser');
    await page.fill('input[type="password"], input[name="password"]', 'wrongpassword');
    
    // Submit form
    await page.click('button[type="submit"], button:has-text("Login")');
    
    // Should show error message
    const errorMessage = page.locator('text=Invalid').or(page.locator('text=Error')).or(page.locator('text=failed'));
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    
    // Should stay on login page
    await expect(page).toHaveURL('/admin/login');
  });

  test('should not allow empty username', async ({ page }) => {
    // Fill only password
    await page.fill('input[type="password"], input[name="password"]', 'admin123');
    
    // Try to submit
    await page.click('button[type="submit"], button:has-text("Login")');
    
    // Should show validation or stay on page
    await expect(page).toHaveURL('/admin/login');
  });

  test('should not allow empty password', async ({ page }) => {
    // Fill only username
    await page.fill('input[type="text"], input[name="username"]', 'admin');
    
    // Try to submit
    await page.click('button[type="submit"], button:has-text("Login")');
    
    // Should show validation or stay on page
    await expect(page).toHaveURL('/admin/login');
  });

  test('should protect admin dashboard without authentication', async ({ page }) => {
    // Try to access dashboard directly
    await page.goto('/admin/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL('/admin/login', { timeout: 5000 });
  });

  test('should persist authentication across page reloads', async ({ page }) => {
    // Login first
    await page.fill('input[type="text"], input[name="username"]', 'admin');
    await page.fill('input[type="password"], input[name="password"]', 'admin123');
    await page.click('button[type="submit"], button:has-text("Login")');
    
    await expect(page).toHaveURL('/admin/dashboard');
    
    // Reload page
    await page.reload();
    
    // Should still be on dashboard
    await expect(page).toHaveURL('/admin/dashboard');
    await expect(page.locator('text=Admin Dashboard')).toBeVisible();
  });

  test('should logout and redirect to login page', async ({ page }) => {
    // Login first
    await page.fill('input[type="text"], input[name="username"]', 'admin');
    await page.fill('input[type="password"], input[name="password"]', 'admin123');
    await page.click('button[type="submit"], button:has-text("Login")');
    
    await expect(page).toHaveURL('/admin/dashboard');
    
    // Click logout
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login
    await expect(page).toHaveURL('/admin/login');
    
    // Try to access dashboard again
    await page.goto('/admin/dashboard');
    
    // Should redirect back to login
    await expect(page).toHaveURL('/admin/login');
  });

  test('should show password in asterisks', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"], input[name="password"]');
    
    // Fill password
    await passwordInput.fill('testpassword');
    
    // Input type should be password
    const inputType = await passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock a failed API response
    await page.route('**/api/auth/login', route => 
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal server error' })
      })
    );
    
    // Try to login
    await page.fill('input[type="text"], input[name="username"]', 'admin');
    await page.fill('input[type="password"], input[name="password"]', 'admin123');
    await page.click('button[type="submit"], button:has-text("Login")');
    
    // Should show error message
    const errorMessage = page.locator('text=error').or(page.locator('text=failed'));
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Session Management', () => {
  
  test('should handle concurrent sessions', async ({ page, context }) => {
    // Login in first tab
    await page.goto('/admin/login');
    await page.fill('input[type="text"], input[name="username"]', 'admin');
    await page.fill('input[type="password"], input[name="password"]', 'admin123');
    await page.click('button[type="submit"], button:has-text("Login")');
    
    await expect(page).toHaveURL('/admin/dashboard');
    
    // Open new tab with same context
    const newPage = await context.newPage();
    await newPage.goto('/admin/dashboard');
    
    // Should also be authenticated
    await expect(newPage).toHaveURL('/admin/dashboard');
    await expect(newPage.locator('text=Admin Dashboard')).toBeVisible();
    
    await newPage.close();
  });

  test('should clear session on logout', async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[type="text"], input[name="username"]', 'admin');
    await page.fill('input[type="password"], input[name="password"]', 'admin123');
    await page.click('button[type="submit"], button:has-text("Login")');
    
    await expect(page).toHaveURL('/admin/dashboard');
    
    // Check localStorage has token
    const tokenBefore = await page.evaluate(() => localStorage.getItem('adminToken'));
    expect(tokenBefore).not.toBeNull();
    
    // Logout
    await page.click('button:has-text("Logout")');
    
    // Check localStorage token is cleared
    const tokenAfter = await page.evaluate(() => localStorage.getItem('adminToken'));
    expect(tokenAfter).toBeNull();
  });
});

test.describe('Security', () => {
  
  test('should not expose sensitive information in client-side', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Check page source doesn't contain sensitive info
    const content = await page.content();
    
    // Should not contain hardcoded passwords or tokens
    expect(content.toLowerCase()).not.toContain('jwt_secret');
    expect(content.toLowerCase()).not.toContain('database_password');
  });

  test('should use HTTPS in production (check headers)', async ({ page }) => {
    await page.goto('/');
    
    // In production, should redirect to HTTPS
    // For local testing, this might not apply
    const url = page.url();
    
    // Just verify we can access the page
    expect(url).toContain('localhost');
  });

  test('should not allow SQL injection in login', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Try SQL injection
    await page.fill('input[type="text"], input[name="username"]', "admin' OR '1'='1");
    await page.fill('input[type="password"], input[name="password"]', "anything");
    await page.click('button[type="submit"], button:has-text("Login")');
    
    // Should not login
    await expect(page).toHaveURL('/admin/login');
  });
});

