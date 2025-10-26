# ByteToMeg - Real-World System Architecture Learning Platform

A comprehensive platform for learning system design through real-world engineering challenges from companies like Uber, Netflix, Airbnb, Twitter, Stripe, and Spotify. Master scalable system design while converting data instantly.

## 🎯 Features

### Real-World System Design Learning
- **6+ Real-World System Guides** with step-by-step learning paths:
  - Uber's Ride Matching System
  - Netflix's Video Streaming Architecture
  - Airbnb's Search & Discovery
  - Twitter's Timeline System
  - Stripe's Payment Processing
  - Spotify's Music Recommendation

### Interactive Learning Experience
- **Clickable Guide Cards** - Click any guide to open detailed step-by-step instructions
- **Expandable Steps** - Each step includes detailed explanations and best practices
- **Real-World Context** - Learn from actual engineering challenges faced by tech giants
- **Company-Specific Examples** - Understand how different companies solve similar problems

### Data Conversion Tools
- **Byte Converter** - Fast and accurate byte to megabyte conversion
- **Conversion Table** - Quick reference for common conversions
- **Educational Content** - Learn how conversions work

### Admin Panel
- **Content Management** - Add, edit, and manage guides and blog posts
- **Secure Authentication** - JWT-based admin login system
- **Real-time Updates** - Changes reflect immediately on the platform

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development mode)
- Git installed

### Choose Your Development Mode

#### 🔥 **Local Development Mode** (Recommended - Hot Reload Enabled)
Run the app locally with hot reload, database in Docker:

```bash
# 1. Install dependencies
npm install

# 2. Setup local environment and start database
npm run local:setup

# 3. Start frontend and backend with hot reload
npm run dev:local
```

**Access**: http://localhost:5173 (Frontend), http://localhost:3001 (API)  
**Features**: ⚡ Hot reload, 🚀 Fast startup, 💻 Best for daily coding

#### 🐳 **Docker Mode** (Development or Production)
```bash
./start.sh              # Development
./start.sh --prod       # Production
```

**Access**: http://localhost:8080 (Frontend), http://localhost:3001 (API)  
**Features**: 🐳 Containerized, 🔒 Production-ready

### Quick Reference Commands

```bash
# Local Development (Hot Reload)
npm run dev:local          # 🚀 Start everything (recommended)
npm run local:db:up        # Start database only
npm run local:db:down      # Stop database

# Docker Mode
./start.sh                 # Start dev mode
./start.sh --prod          # Start production mode
./start.sh stop            # Stop all services
./start.sh logs            # View logs
```

## 📋 Prerequisites

### For Local Development Mode (Hot Reload)
- **Docker & Docker Compose** - [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** - Comes with Node.js

### For Docker Mode Only
- **Docker** - [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Docker Compose** - Comes with Docker Desktop

## 🌐 Access Points

### Local Development Mode
- **Frontend**: http://localhost:5173 (Vite with hot reload)
- **Backend API**: http://localhost:3001 (nodemon with auto-restart)
- **Admin Panel**: http://localhost:5173/admin/login
- **Database**: PostgreSQL on localhost:5432

### Docker Mode (Dev/Prod)
- **Frontend**: http://localhost:8080 (Nginx)
- **Backend API**: http://localhost:3001
- **Admin Panel**: http://localhost:8080/admin/login

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

## 🛠️ All Available Commands

### Local Development
```bash
npm install                   # Install dependencies
npm run local:setup           # Setup environment (one-time)
npm run dev:local             # Start everything with hot reload
npm run dev                   # Frontend only
npm run dev:backend:watch     # Backend only with hot reload
npm run local:db:up           # Start database
npm run local:db:down         # Stop database
npm run local:db:logs         # View database logs
```

### Docker Commands
```bash
./start.sh                    # Start development
./start.sh --prod             # Start production
./start.sh stop               # Stop all
./start.sh logs               # View logs
./start.sh --build            # Rebuild and start
```

### Other Commands
```bash
npm run build                 # Build for production
npm run lint                  # Run linter
git pull && ./start.sh --prod --build  # Update & deploy
```

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL 15
- **UI**: shadcn/ui + Lucide Icons
- **Auth**: JWT + bcrypt
- **DevOps**: Docker + Docker Compose

## 🔧 Configuration

### Environment Variables

#### Local Development Mode
Copy `env.local` to `.env` or run `npm run local:setup`:

```bash
# Database (Docker)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bytetomeg
DB_USER=postgres
DB_PASSWORD=bytetomeg123

# JWT Secret
JWT_SECRET=local-dev-secret-key

# Server
PORT=3001
NODE_ENV=development

# URLs
FRONTEND_URL=http://localhost:5173    # Vite dev server
VITE_API_URL=http://localhost:3001    # Backend API
```

#### Docker Mode
Use `env.example` as template:

```bash
# Database (Docker network)
DB_HOST=postgres                      # Docker service name
DB_PORT=5432
DB_NAME=bytetomeg
DB_USER=postgres
DB_PASSWORD=bytetomeg123

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Server
NODE_ENV=development                  # or production
PORT=3001

# URLs
FRONTEND_URL=http://localhost:8080    # Nginx
API_URL=http://localhost:3001         # Backend
```

## 📊 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/guides` - Get all guides
- `GET /api/guides/:id` - Get specific guide
- `GET /api/blogs` - Get all blog posts
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Admin Endpoints (Requires Authentication)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/guides` - Create guide
- `PUT /api/admin/guides/:id` - Update guide
- `DELETE /api/admin/guides/:id` - Delete guide
- `POST /api/admin/blogs` - Create blog post
- `PUT /api/admin/blogs/:id` - Update blog post
- `DELETE /api/admin/blogs/:id` - Delete blog post

## 🚀 Production Deployment

### Digital Ocean Deployment

1. **Create a Ubuntu 22.04 droplet**
2. **Upload your code**:
   ```bash
   scp -r . root@YOUR_DROPLET_IP:/opt/bytetomeg/
   ```
3. **SSH into your droplet**:
   ```bash
   ssh root@YOUR_DROPLET_IP
   cd /opt/bytetomeg
   ```
4. **Install Docker**:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```
5. **Run the application**:
   ```bash
   chmod +x start.sh
   ./start.sh --prod
   ```

### Domain Setup (Optional)
1. Point your domain to the droplet IP
2. Update `FRONTEND_URL` in `.env` to your domain
3. Restart: `./start.sh --prod`

## 🔐 Security Features

- **JWT Authentication** for admin panel
- **Password Hashing** using bcrypt
- **CORS Protection** configured
- **Rate Limiting** on API endpoints
- **Input Validation** and sanitization
- **SQL Injection Protection** with parameterized queries

## 📱 Responsive Design

The platform is fully responsive:
- **Mobile**: Single column layout, touch-optimized
- **Tablet**: Two-column grid, optimized spacing
- **Desktop**: Three-column grid, full feature set

## 🌙 Dark Mode Support

- **Automatic detection** of system preference
- **Manual toggle** in the header
- **Consistent theming** across all components

## 🐛 Troubleshooting

### Common Issues

#### Local Development Mode Issues

**Port already in use (5173, 3001, or 5432)**
```bash
# Kill processes using ports
lsof -ti:5173 | xargs kill -9  # Vite dev server
lsof -ti:3001 | xargs kill -9  # Backend
lsof -ti:5432 | xargs kill -9  # PostgreSQL (if running locally)

# Or stop and restart
npm run local:db:down
npm run local:db:up
```

**Backend can't connect to database**
```bash
# Check if database container is running
docker ps | grep postgres

# Check database logs
npm run local:db:logs

# Restart database
npm run local:db:down
npm run local:db:up

# Verify .env file exists and has correct settings
cat .env
```

**Dependencies not installed**
```bash
# Install all dependencies (including backend deps)
npm install

# If still issues, clean install
rm -rf node_modules package-lock.json
npm install
```

**Hot reload not working**
```bash
# For frontend: Clear Vite cache
rm -rf node_modules/.vite

# For backend: Restart nodemon
# Just save server.cjs file or restart with Ctrl+C and npm run dev:backend:watch
```

#### Docker Mode Issues

**Port already in use (8080 or 3001)**
```bash
# Kill processes using ports
lsof -ti:3001 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```

**Docker issues**
```bash
# Restart Docker Desktop
# Or restart Docker daemon
sudo systemctl restart docker

# Check Docker status
docker ps
docker-compose -f docker-compose.dev.yml ps
```

**Database connection failed**
```bash
# Check if PostgreSQL is running
docker-compose -f docker-compose.dev.yml ps

# Check database logs
docker-compose -f docker-compose.dev.yml logs postgres

# Restart database
docker-compose -f docker-compose.dev.yml restart postgres
```

**Container build issues**
```bash
# Clean build
docker-compose -f docker-compose.dev.yml down -v
docker system prune -a
./start.sh --build
```

### Logs and Debugging

**View application logs**
```bash
# Development
docker-compose -f docker-compose.dev.yml logs -f

# Production
docker-compose -f docker-compose.prod.yml logs -f
```

**Check service status**
```bash
# Development
docker-compose -f docker-compose.dev.yml ps

# Production
docker-compose -f docker-compose.prod.yml ps
```

## 🔄 Updates and Maintenance

### Updating the Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
./start.sh --prod --build
```

### Database Backups
```bash
# Create backup
docker-compose -f docker-compose.dev.yml exec postgres pg_dump -U postgres bytetomeg > backup.sql

# Restore backup
docker-compose -f docker-compose.dev.yml exec -T postgres psql -U postgres bytetomeg < backup.sql
```

## 🧪 Testing - Complete E2E Test Suite

### ⚡ Quick Start (3 Steps)

```bash
# 1. Install Playwright (first time only)
npm install
npx playwright install

# 2. Start servers (Terminal 1)
npm run dev:local

# 3. Run all tests (Terminal 2)
npm test
```

**That's it!** ✅ Tests will run automatically and show results.

---

### 📊 Test Coverage: **100+ Scenarios**

All tests cover **every button, link, form field, and user interaction** in the application:

- ✅ **195 automated test scenarios**
- ✅ **4 test files** (Auth, Admin, Docs, Home)
- ✅ **Every button tested** (15+ buttons)
- ✅ **Every form field tested** (11 fields in admin)
- ✅ **All navigation tested** (Home, Docs, Blog, Newsletter)
- ✅ **CRUD operations tested** (Create, Read, Update, Delete guides)
- ✅ **Loading & error states tested**
- ✅ **Mobile & desktop responsive tested**
- ✅ **Security tested** (SQL injection, XSS protection)

---

### Overview

ByteToMeg uses **Playwright** for comprehensive end-to-end testing covering all user flows and interactions.

### Test Files Structure

```
e2e/
├── auth.spec.ts              # Authentication & session management tests
├── admin.spec.ts             # Admin dashboard & guide CRUD tests
├── docs-and-guides.spec.ts   # Docs page & guide viewing tests
└── home.spec.ts              # Home page & navigation tests
```

### Quick Start - Running Tests

#### 1. Install Dependencies
```bash
npm install
npx playwright install  # Install browsers (first time only)
```

#### 2. Start Application
```bash
npm run dev:local  # Start frontend, backend, and database
```

#### 3. Run Tests
```bash
npm run test:e2e           # Run all tests
npm run test:e2e:ui        # Interactive UI mode (recommended)
npm run test:e2e:headed    # See browser while testing
npm run test:e2e:debug     # Debug mode with step-through
npm run test:e2e:report    # View HTML report
```

### Test Coverage Summary

#### ✅ Authentication Tests (`auth.spec.ts`)
- Login with correct/incorrect credentials
- Form validation (empty fields)
- Protected routes redirect to login
- Session persistence across reloads
- Logout clears session
- Security (SQL injection prevention)

#### ✅ Admin Dashboard Tests (`admin.spec.ts`)
**Full CRUD flow for guides:**
- ✅ **CREATE**: Form with all fields
  - Title → auto-generates guide_id
  - Company, Users, Description, Details
  - Icon selection (8 options)
  - Color picker
  - **Dynamic steps array** - add/remove steps
  - Published/draft toggle
- ✅ **READ**: Display guides with badges
- ✅ **UPDATE**: Edit existing guide (pre-fills form)
- ✅ **DELETE**: Remove guide
- ✅ Form validation (requires ≥1 step)
- ✅ Cancel operation

**Example Test:**
```typescript
test('should create guide with all fields', async ({ page }) => {
  await page.click('button:has-text("Add New Guide")');
  
  // Fill form
  await page.fill('input#title', 'Test Design');
  await page.fill('input#company', 'TestCorp');
  await page.fill('input#users', '50M+');
  await page.fill('textarea#description', 'Description');
  await page.fill('textarea#details', 'Details');
  await page.selectOption('select#icon', 'Database');
  await page.fill('input#color', '#ff5733');
  
  // Add steps
  await page.fill('input#steps', 'Step 1');
  await page.click('button:has(svg)');
  await page.fill('input#steps', 'Step 2');
  await page.click('button:has(svg)');
  
  // Submit
  await page.check('input#published');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('text=Test Design')).toBeVisible();
});
```

#### ✅ Docs & Guides Tests (`docs-and-guides.spec.ts`)
- Load docs page with backend data
- Display guide cards (icons, badges, info)
- **Click guide card** → navigate to detail
- **Quick Start section** (top 3 guides)
- **Guide detail page:**
  - Overview section
  - Step-by-step guide (all steps)
  - Back button navigation
  - Company/users info
  - CTA buttons
- Loading & error states
- Direct URL navigation
- Responsive design (mobile/desktop)

#### ✅ Home Page Tests (`home.spec.ts`)
- Display guide cards
- Navigate to guide detail
- Stats section
- Theme toggle
- Performance (< 5s load)
- No console errors

### Test Commands Reference

```bash
# Run tests
npm run test:e2e              # All tests
npm run test:e2e:ui           # Interactive UI ⭐
npm run test:e2e:headed       # See browser
npm run test:e2e:debug        # Step-through debugger

# Specific tests
npx playwright test e2e/admin.spec.ts          # One file
npx playwright test -g "should create guide"   # By pattern

# Browsers
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Reports
npm run test:e2e:report       # View HTML report
```

### Writing Tests - Best Practices

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const button = page.locator('button:has-text("Click")');
    
    // Act
    await button.click();
    
    // Assert
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

**Tips:**
1. ✅ Use descriptive test names
2. ✅ Prefer text-based selectors: `page.locator('text=Submit')`
3. ✅ Wait for network: `await page.waitForLoadState('networkidle')`
4. ✅ Add timeouts: `{ timeout: 10000 }`
5. ✅ Keep tests independent

### Debugging Tests

#### UI Mode (Easiest)
```bash
npm run test:e2e:ui
```
- See all tests
- Run individually
- Inspect DOM
- View network

#### Pause in Test
```typescript
test('debug test', async ({ page }) => {
  await page.goto('/');
  await page.pause();  // Opens inspector
});
```

#### Screenshots
```typescript
await page.screenshot({ path: 'debug.png' });
// Auto-captured on failure → playwright-report/
```

#### Console Logs
```typescript
page.on('console', msg => console.log('Browser:', msg.text()));
```

### Troubleshooting

**Tests Failing Randomly**
```typescript
// Add proper waits
await page.waitForLoadState('networkidle');
await expect(element).toBeVisible({ timeout: 10000 });
```

**Element Not Found**
```typescript
// Wait first
await page.waitForSelector('button:has-text("Submit")');

// Scroll into view
await element.scrollIntoViewIfNeeded();
```

**Authentication Issues**
```typescript
test.beforeEach(async ({ page, context }) => {
  await context.clearCookies();
  // Fresh login
});
```

### CI/CD Integration

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: bytetomeg
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

### Configuration (`playwright.config.ts`)

```typescript
export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:8080',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium' },
    { name: 'firefox' },
    { name: 'webkit' },
  ],
});
```

### Test Reports

After running tests:
```bash
npm run test:e2e:report
```

Report includes:
- ✅ Pass/fail status
- 📸 Failure screenshots
- ⏱️ Test duration
- 🔍 Error details
- 📊 Summary statistics

### Test Coverage Details

#### 🏠 Home Page Tests (15+ scenarios)
```typescript
✅ Page load and title verification
✅ All navigation buttons tested (Home, Docs, Blog, Newsletter)
✅ All guide cards tested (title, description, clickable)
✅ "Start Guide" button on each card
✅ Stats section (4 statistics)
✅ Byte converter functionality
✅ Tab switches (if present)
✅ Scroll to top button
✅ Theme toggle
✅ Performance (< 5s load)
✅ No console errors
```

#### 🔐 Admin Dashboard Tests (35+ scenarios)
```typescript
✅ Dashboard tabs (Guides, Blogs, Analytics)
✅ All form fields tested:
   - Title (auto-generates guide_id)
   - Guide ID (slug format)
   - Company, Users Served
   - Description, Detailed Description
   - Icon dropdown (8 options: Flag, BarChart3, Database, Brain, Zap, GitBranch, BookOpen, Code)
   - Color picker
   - Steps array with add/remove buttons
   - Published/Draft checkbox
✅ CRUD operations (Create, Read, Update, Delete)
✅ Form validation (requires ≥1 step)
✅ Edit button (pre-fills form)
✅ Delete button (removes guide)
✅ Cancel button (closes modal)
✅ Logout button (clears session)
```

#### 📚 Docs & Guides Tests (35+ scenarios)
```typescript
✅ Docs page loads with backend data
✅ All guide cards clickable
✅ Quick Start Guide section (top 3 guides)
✅ Guide detail page:
   - Back button → home
   - Overview section
   - Step-by-step guide (all steps)
   - Company and users info
   - CTA buttons (Explore More, View Docs)
✅ Loading states (spinner)
✅ Error states (non-existent guide)
✅ Try Again button
✅ Navigation flow (home → docs → guide → back)
✅ Direct URL navigation
✅ Responsive design (mobile/desktop)
```

#### 🔒 Authentication Tests (15+ scenarios)
```typescript
✅ Login page display
✅ Login with correct/incorrect credentials
✅ Form validation (empty fields)
✅ Protected routes → redirect to login
✅ Session persistence across reloads
✅ Session across multiple tabs
✅ Logout clears session
✅ Password masking
✅ Security checks (SQL injection prevention)
```

### Complete Button Coverage

**Every Button Tested:**
- ✅ Add New Guide
- ✅ Edit Guide
- ✅ Delete Guide
- ✅ View Guide
- ✅ Cancel
- ✅ Submit/Create/Update
- ✅ Logout
- ✅ Back
- ✅ Explore More Guides
- ✅ View Documentation
- ✅ Start Guide
- ✅ Try Again
- ✅ Plus button (add step)
- ✅ Trash button (remove step)
- ✅ All navigation links (Home, Docs, Blog, Newsletter)

### Test Commands

**Run all tests:**
```bash
npm test
```

**Interactive UI mode (recommended):**
```bash
npm run test:ui
```

**Other options:**
```bash
npm run test:headed        # See browser while testing
npm run test:debug         # Debug mode with breakpoints
npm run test:report        # View HTML report
npm run test:all           # Run tests + open report

# Run specific test file
npx playwright test e2e/admin.spec.ts

# Run tests matching pattern
npx playwright test -g "should create guide"

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Test Files

```
e2e/
├── auth.spec.ts              # Login, logout, session, security
├── admin.spec.ts             # Guide CRUD, form fields, validation
├── docs-and-guides.spec.ts   # Docs page, guide detail, navigation
└── home.spec.ts              # Home page, cards, links, stats
```

### Viewing Test Results

After running tests:

```bash
# View HTML report
npm run test:e2e:report
```

**Report includes:**
- ✅ Pass/fail status
- 📸 Failure screenshots
- ⏱️ Test duration
- 🔍 Error details
- 📊 Summary statistics
- 🌐 Network requests
- 💬 Console logs

### CI/CD Integration Example

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: bytetomeg
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: bytetomeg123
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - name: Setup environment
        run: echo "VITE_API_URL=http://localhost:3001" > .env
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Resources

- **Playwright Docs**: https://playwright.dev
- **Best Practices**: https://playwright.dev/docs/best-practices
- **API Reference**: https://playwright.dev/docs/api/class-playwright

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**
6. **Ensure tests pass**: `npm run test:e2e`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ByteByteGo** for design inspiration
- **shadcn-ui** for beautiful components
- **Lucide** for amazing icons
- **Vite** for blazing fast development
- **React** for the amazing framework

---

**Ready to master system design? Start your journey with real-world engineering challenges!** 🚀

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the logs for error messages
3. Open an issue on GitHub
4. Contact the development team

**Happy Learning!** 🎓