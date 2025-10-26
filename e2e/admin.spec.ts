import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard - Guide Management', () => {
  let adminToken: string;

  test.beforeAll(async ({ request }) => {
    // Login before running tests
    const response = await request.post('http://localhost:3001/api/auth/login', {
      data: {
        username: 'admin',
        password: 'admin123'
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    adminToken = data.token;
  });

  test.beforeEach(async ({ page, context }) => {
    // Set admin token in localStorage
    await context.addInitScript((token) => {
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify({ username: 'admin' }));
    }, adminToken);

    await page.goto('/admin/dashboard');
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible();
  });

  test('should display admin dashboard with all tabs and buttons', async ({ page }) => {
    // Check if dashboard is loaded
    await expect(page.locator('text=System Guides')).toBeVisible();
    await expect(page.locator('text=Blog Posts')).toBeVisible();
    await expect(page.locator('text=Analytics')).toBeVisible();
    
    // Check if Add New Guide button is visible
    await expect(page.locator('button:has-text("Add New Guide")')).toBeVisible();
    
    // Check if Logout button is visible
    await expect(page.locator('button:has-text("Logout")')).toBeVisible();
  });

  test('should test all tab switches in admin dashboard', async ({ page }) => {
    // Click Guides tab
    await page.click('text=System Guides');
    await expect(page.locator('text=System Architecture Guides')).toBeVisible();
    
    // Click Blogs tab
    await page.click('text=Blog Posts');
    await page.waitForTimeout(500);
    await expect(page.locator('text=Blog Posts')).toBeVisible();
    
    // Click Analytics tab  
    await page.click('text=Analytics');
    await page.waitForTimeout(500);
    await expect(page.locator('text=Analytics Dashboard').or(page.locator('text=Total Guides'))).toBeVisible();
    
    // Go back to Guides tab
    await page.click('text=System Guides');
    await page.waitForTimeout(500);
  });

  test('should open guide creation form with all fields visible', async ({ page }) => {
    // Click Add New Guide button
    await page.click('button:has-text("Add New Guide")');
    
    // Check if form modal is opened with all fields
    await expect(page.locator('text=Add New Guide')).toBeVisible();
    
    // Verify all form labels are present
    await expect(page.locator('label:has-text("Title")')).toBeVisible();
    await expect(page.locator('label:has-text("Guide ID")')).toBeVisible();
    await expect(page.locator('label:has-text("Company")')).toBeVisible();
    await expect(page.locator('label:has-text("Users Served")')).toBeVisible();
    await expect(page.locator('label:has-text("Description")')).toBeVisible();
    await expect(page.locator('label:has-text("Detailed Description")')).toBeVisible();
    await expect(page.locator('label:has-text("Icon")')).toBeVisible();
    await expect(page.locator('label:has-text("Color")')).toBeVisible();
    await expect(page.locator('label:has-text("Steps")')).toBeVisible();
    await expect(page.locator('label:has-text("Publish")')).toBeVisible();
    
    // Verify all input fields are present
    await expect(page.locator('input#title')).toBeVisible();
    await expect(page.locator('input#guide_id')).toBeVisible();
    await expect(page.locator('input#company')).toBeVisible();
    await expect(page.locator('input#users')).toBeVisible();
    await expect(page.locator('textarea#description')).toBeVisible();
    await expect(page.locator('textarea#details')).toBeVisible();
    await expect(page.locator('select#icon')).toBeVisible();
    await expect(page.locator('input#color')).toBeVisible();
    await expect(page.locator('input#steps')).toBeVisible();
    await expect(page.locator('input#published')).toBeVisible();
    
    // Verify buttons are present
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
  });

  test('should test all icon options in dropdown', async ({ page }) => {
    await page.click('button:has-text("Add New Guide")');
    
    const iconSelect = page.locator('select#icon');
    
    // Verify all icon options are available
    const iconOptions = ['Flag', 'BarChart3', 'Database', 'Brain', 'Zap', 'GitBranch', 'BookOpen', 'Code'];
    
    for (const icon of iconOptions) {
      const option = iconSelect.locator(`option:has-text("${icon}")`);
      await expect(option).toBeVisible();
    }
    
    // Test selecting different icons
    await iconSelect.selectOption('Database');
    await expect(iconSelect).toHaveValue('Database');
    
    await iconSelect.selectOption('Brain');
    await expect(iconSelect).toHaveValue('Brain');
  });

  test('should test color picker functionality', async ({ page }) => {
    await page.click('button:has-text("Add New Guide")');
    
    const colorInput = page.locator('input#color');
    
    // Test default color
    const defaultColor = await colorInput.inputValue();
    expect(defaultColor).toBeTruthy();
    
    // Test changing color
    await colorInput.fill('#ff0000');
    await expect(colorInput).toHaveValue('#ff0000');
    
    await colorInput.fill('#00ff00');
    await expect(colorInput).toHaveValue('#00ff00');
  });

  test('should create a new guide with all fields', async ({ page }) => {
    // Click Add New Guide button
    await page.click('button:has-text("Add New Guide")');
    
    // Fill in the form
    await page.fill('input#title', 'Test System Design');
    
    // Guide ID should be auto-generated
    const guideIdInput = page.locator('input#guide_id');
    await expect(guideIdInput).toHaveValue('test-system-design');
    
    await page.fill('input#company', 'TestCorp');
    await page.fill('input#users', '50M+');
    await page.fill('textarea#description', 'This is a test guide for system design');
    await page.fill('textarea#details', 'Detailed information about the test system architecture');
    
    // Select an icon
    await page.selectOption('select#icon', 'Database');
    
    // Set color
    await page.fill('input#color', '#ff5733');
    
    // Add steps
    await page.fill('input#steps', 'Step 1: Initial Setup');
    await page.click('button:has(svg)'); // Click the Plus button
    
    await page.fill('input#steps', 'Step 2: Configure Database');
    await page.click('button:has(svg)');
    
    await page.fill('input#steps', 'Step 3: Deploy to Production');
    await page.click('button:has(svg)');
    
    // Check if steps are added
    await expect(page.locator('text=1. Step 1: Initial Setup')).toBeVisible();
    await expect(page.locator('text=2. Step 2: Configure Database')).toBeVisible();
    await expect(page.locator('text=3. Step 3: Deploy to Production')).toBeVisible();
    
    // Check publish checkbox
    await page.check('input#published');
    
    // Submit the form
    await page.click('button[type="submit"]:has-text("Create Guide")');
    
    // Wait for the guide to appear in the list
    await expect(page.locator('text=Test System Design')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=TestCorp')).toBeVisible();
  });

  test('should edit an existing guide', async ({ page }) => {
    // Wait for guides to load
    await page.waitForSelector('text=System Architecture Guides');
    
    // Find and click the first Edit button
    const editButton = page.locator('button:has-text("Edit")').first();
    await editButton.click();
    
    // Wait for edit form to open
    await expect(page.locator('text=Edit Guide')).toBeVisible();
    
    // Modify the description
    const descriptionField = page.locator('textarea#description');
    await descriptionField.fill('Updated description for testing');
    
    // Add a new step
    await page.fill('input#steps', 'Additional Step');
    await page.click('button:has(svg)');
    
    // Submit the form
    await page.click('button[type="submit"]:has-text("Update Guide")');
    
    // Wait for modal to close
    await expect(page.locator('text=Edit Guide')).not.toBeVisible({ timeout: 10000 });
  });

  test('should remove a step from the guide form', async ({ page }) => {
    // Open form
    await page.click('button:has-text("Add New Guide")');
    
    // Add multiple steps
    await page.fill('input#steps', 'Step to Remove');
    await page.click('button:has(svg)');
    
    await page.fill('input#steps', 'Step to Keep');
    await page.click('button:has(svg)');
    
    // Verify both steps are added
    await expect(page.locator('text=1. Step to Remove')).toBeVisible();
    await expect(page.locator('text=2. Step to Keep')).toBeVisible();
    
    // Click the trash icon for first step
    const trashButtons = page.locator('button:has(svg)').filter({ hasText: '' });
    await trashButtons.first().click();
    
    // Verify first step is removed
    await expect(page.locator('text=1. Step to Remove')).not.toBeVisible();
    await expect(page.locator('text=1. Step to Keep')).toBeVisible();
  });

  test('should not allow creating guide without steps', async ({ page }) => {
    // Open form
    await page.click('button:has-text("Add New Guide")');
    
    // Fill in required fields but no steps
    await page.fill('input#title', 'Guide Without Steps');
    await page.fill('input#company', 'TestCorp');
    await page.fill('input#users', '10M+');
    await page.fill('textarea#description', 'Test description');
    await page.fill('textarea#details', 'Test details');
    
    // Try to submit
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('should delete a guide', async ({ page }) => {
    // Create a guide first
    await page.click('button:has-text("Add New Guide")');
    await page.fill('input#title', 'Guide to Delete');
    await page.fill('input#company', 'DeleteCorp');
    await page.fill('input#users', '1M+');
    await page.fill('textarea#description', 'Will be deleted');
    await page.fill('textarea#details', 'Details for deletion test');
    await page.fill('input#steps', 'Step 1');
    await page.click('button:has(svg)');
    await page.click('button[type="submit"]:has-text("Create Guide")');
    
    // Wait for guide to appear
    await expect(page.locator('text=Guide to Delete')).toBeVisible({ timeout: 10000 });
    
    // Find and click delete button for this guide
    const guideCard = page.locator('text=Guide to Delete').locator('..');
    const deleteButton = guideCard.locator('button:has-text("Delete")');
    
    // Handle potential confirmation dialog
    page.on('dialog', dialog => dialog.accept());
    
    await deleteButton.click();
    
    // Verify guide is deleted
    await expect(page.locator('text=Guide to Delete')).not.toBeVisible({ timeout: 10000 });
  });

  test('should cancel guide creation', async ({ page }) => {
    // Open form
    await page.click('button:has-text("Add New Guide")');
    
    // Fill in some data
    await page.fill('input#title', 'Cancelled Guide');
    
    // Click cancel
    await page.click('button:has-text("Cancel")');
    
    // Verify modal is closed
    await expect(page.locator('text=Add New Guide')).not.toBeVisible();
  });

  test('should show published/draft status correctly', async ({ page }) => {
    // Create a published guide
    await page.click('button:has-text("Add New Guide")');
    await page.fill('input#title', 'Published Guide Test');
    await page.fill('input#company', 'TestCorp');
    await page.fill('input#users', '5M+');
    await page.fill('textarea#description', 'Published guide');
    await page.fill('textarea#details', 'Details');
    await page.fill('input#steps', 'Step 1');
    await page.click('button:has(svg)');
    await page.check('input#published');
    await page.click('button[type="submit"]:has-text("Create Guide")');
    
    // Check for Published badge
    await expect(page.locator('text=Published')).toBeVisible({ timeout: 10000 });
  });

  test('should logout successfully', async ({ page }) => {
    // Click logout button
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login page
    await expect(page).toHaveURL('/admin/login');
  });
});

