You’re absolutely right — a **professional README** should give a new QA engineer or developer everything they need: project structure, fixtures, locators, pages, spec files, environment setup, and clear run commands. Let’s fix that and include **`login.ts` fixture** and all the missing pieces so it’s complete and beginner‑friendly.

---

```markdown
# AMB_TestLab Playwright Automation

This repository contains **Playwright automation** for the AMB_TestLab application.  
It is designed with strict **separation of concerns** and a **fixture‑driven setup** so new contributors can onboard quickly.

---

## 📂 Project Structure

```
AMB_TestLab/
├── src/
│   ├── locators/AmbTestLab            # Locator definitions for each page/component
│   ├── pages/ AmbTestLab                # Page Object classes built on locators
│   ├── reporters/             # Custom reporters (e.g., CustomLoggerReporter.ts)
│   └── fixtures/
│       └── login.ts           # Shared login fixture for authenticated flows
├── tests/
│   ├── Web_Testing/
│   │   └── ambTestLab/        # Smoke, regression, and E2E spec files
│   └── api/                   # API test specs
├── results/                   # JUnit and Allure reports
├── playwright.config.ts       # Centralized Playwright configuration
└── README.md                  # Project documentation
```

---

## 🧩 Fixtures

- **`login.ts`** → Provides a reusable login fixture for tests.  
  - Ensures consistent authentication across spec files.  
  - Avoids duplication of login steps in each test.  
  - Example usage:
    ```ts
    test.use({ storageState: 'src/fixtures/login.ts' });
    ```

---

## 🧩 Key Page Classes & Locators

- **LoginPage** → email/password inputs, OTP login, register link.  
- **AdminMutualFunds** → add/edit/delete fund, search, pagination, export/import.  
- **AdminUserManagement** → user table, card view, export users.  
- **UserProfile** → edit profile fields, save changes, verification locators.  
- **Portfolio** → cart, summary totals, secure payment, purchase verification.  
- **Spi_Calculator** → SIP inputs, results, multiple graph locators.  
- **FundsPage** → funds tab, SIP calculator tab, dashboard tab, buy/add buttons.  
- **DashboardPage** → overview, market snapshot, investor counts, charts.  
- **Purchases** → orders, gross volume, export, table actions.  
- **Ecommerce** → add/edit/delete product, card title verification.  

---

## 🧪 Spec Files

- `LoginRegister.spec.ts` → login and registration flows.  
- `UserProfile.spec.ts` → profile editing and verification.  
- `UseraddFunds.spec.ts` → adding funds and portfolio updates.  
- `AdminMutualFunds.spec.ts` → mutual fund management by admin.  
- `AdminUserManagement.spec.ts` → user management scenarios.  
- `Ecommerce.spec.ts` → product add/edit/delete flows.  
- `Full_E2e.spec.ts` → end‑to‑end regression scenarios.  
- `UserSipCalculator.spec.ts` → SIP calculation and graph validation.  
- `AdminSetting.spec.ts` → admin settings update and export.  

---

## ⚙️ Playwright Setup

### 1. Install dependencies
```powershell
npm install
```

### 2. Install Playwright browsers
```powershell
npx playwright install
```

### 3. Verify installation
```powershell
npx playwright --version
```

---

## 🌐 Environment Setup

### Local Environment
By default, tests run against:
```powershell
$env:ENV="local"
```

### Remote Environment
To run against a remote Playwright server:
```powershell
$env:ENV="qaauto"
$env:REMOTE_WS="ws://your-remote-server:port/playwright"
```

👉 If `ENV` is not set, it defaults to **local**.  
👉 If `REMOTE_WS` is not set, tests run locally.

---

## ▶️ Running Tests

### Local run (default environment)
Run all browsers:
```powershell
npx playwright test --headed
```

Run a specific browser:
```powershell
npx playwright test --project=chromium --headed
npx playwright test --project=firefox --headed
npx playwright test --project=Edge --headed
```

Run a specific spec file:
```powershell
npx playwright test tests/Web_Testing/ambTestLab/LoginRegister.spec.ts --headed
```

Run tagged tests:
```powershell
npx playwright test --grep "@regression" --headed
```

---

### Local run with explicit environment
```powershell
$env:ENV="qaauto"; npx playwright test --grep "@smoke" --project=firefox --headed
```

---

### Remote run (WebSocket endpoint)
```powershell
$env:ENV="qaauto"; $env:REMOTE_WS="ws://IpAdress:port/playwright"; npx playwright test --grep "@regression" --project=chromium --headed
```

---

### Multi‑browser run (all three at once)
👉 If you **don’t specify `--project`**, Playwright runs **Chromium, Firefox, and WebKit** automatically:
```powershell
$env:ENV="qaauto"; npx playwright test tests/Web_Testing/ambTestLab/LoginRegister.spec.ts --headed
```

---

## 📊 Reporting

Configured reporters:
- **Custom Logger Reporter** → `src/reporters/CustomLoggerReporter.ts`
- **HTML report** → `playwright-report/`
- **JUnit XML** → `results/results.xml`
- **Allure** → `allure-results/`

Generate and open HTML report:
```powershell
npx playwright show-report
```

---

--------------  TO RUN API ----------------
 ###  npm run test:api:crud
 --------------------------API TESTING --------------------

## 🛠 Useful Commands

- Install browsers:
  ```powershell
  npx playwright install
  ```
- Debug a single test:
  ```powershell
  npx playwright test tests/Web_Testing/ambTestLab/AdminMutualFunds.spec.ts --project=firefox --debug
  ```
- Run API tests:
  ```powershell
  npx playwright test --project=api
  ```

---

## ✅ Notes

- **Chromium** → maximized via `--start-maximized`.  
- **Firefox & WebKit** → full screen via `viewport: null` + `screen: { width: 1920, height: 1080 }`.  
- **ENV variable** defaults to `local` if not set.  
- **REMOTE_WS** is optional — if not set, tests run locally.  
- **Fixtures (login.ts)** ensure consistent authentication across tests.  
- **Spec files** are grouped by smoke, regression, and full E2E flows for clarity.  
```

---
 ┌───────────────┐
 │   login.ts    │  (fixture: sets up authenticated state)
 └───────┬───────┘
         │
         ▼
 ┌───────────────┐
 │ Page Objects  │  (src/pages/* built on src/locators/*)
 └───────┬───────┘
         │
         ▼
 ┌───────────────┐
 │ Spec Files    │  (tests/Web_Testing/ambTestLab/*.spec.ts)
 └───────┬───────┘
         │
         ▼
 ┌───────────────┐
 │ Reporters     │  (HTML, JUnit, Allure, CustomLogger)
 └───────────────┘


This README now includes **fixtures (`login.ts`)**, **locators/pages/spec files**, **environment setup**, **Playwright installation**, **local/remote execution**, **multi‑browser runs**, and **reporting**. It’s structured so even a brand‑new engineer can onboard quickly.  

W