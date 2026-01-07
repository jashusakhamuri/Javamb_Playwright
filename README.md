You’re absolutely right — a **professional README** should give a new QA engineer or developer everything they need: project structure, fixtures, locators, pages, spec files, environment setup, and clear run commands. Let’s fix that and include **`login.ts` fixture** and all the missing pieces so it’s complete and beginner‑friendly.

---

# AMB_TestLab — Playwright Automation 

This document is the canonical, AmbTestLab‑focused README. It explains project architecture, setup, how to add and run tests, debugging, and contribution rules — everything a QA engineer or an AI agent needs to be productive quickly.

---

## TL;DR (quick commands) ⚡
- Install deps: `npm install`
- Install browsers: `npx playwright install`
- Run all tests (headed): `npx playwright test --headed`
- Run a single spec: `npx playwright test tests/Web_Testing/ambTestLab/<Spec>.spec.ts --project=chromium --headed`
- Run by tag: `npx playwright test --grep "@regression" --project=chromium --headed`
- Debug: `npx playwright test <spec> --debug --project=<browser>`

---

## Overview & Goals 🎯
AMB_TestLab automation is a Playwright-based test framework organized to maximize readability, maintainability, and reusability:
- Pattern: Page Object Model (POM) + fixture-driven tests
- Tests are separated into **Web** and **API** projects
- Tag-driven user selection enables running tests with domain-specific users

This README focuses on AmbTestLab specifics (file locations, patterns, and how the team runs and triages tests).

---

## Project layout (what to open first) 📂
- `playwright.config.ts` — Runner config, projects, timeout, reporter setup
- `Fixtuers/Login.ts` — Authentication fixture (note directory intentionally named `Fixtuers`)
- `src/locators/` — Selector classes (POM: locators layer)
- `src/pages/` — Page object classes that use locators
- `tests/Web_Testing/ambTestLab/` — UI spec files for AmbTestLab
- `tests/API_TESTING/` — API specs; payloads in `TestData/APIPayloads/`
- `src/utils/testContext.ts` — Tag → user mapping logic (reads `src/env/users.appname.json`)
- `src/reporters/CustomLoggerReporter.ts` and `src/utils/logger.ts` — centralized logging

Open `playwright.config.ts` and `Fixtuers/Login.ts` first to understand project behavior.

---

## Environment & configuration details 🔧
Environment variables used:
- `ENV` (defaults to `local`) — selects properties file
- `test_env` — alternate environment selector read by `configLoader`
- `REMOTE_WS` — optional Playwright remote ws endpoint
- `BASE_URL` — override system-under-test base URL
- `CI` — set to `true` in CI pipelines

Configs are read from `config/*.properties` via `config/configLoader.ts`.

Example: run tests on a remote runner
```powershell
$env:ENV="qaauto"; $env:REMOTE_WS="ws://192.168.0.220:9000/playwright"; npx playwright test --grep "@regression" --project=chromium --headed
```

---

## How tests run (flow) 🔁
1. Playwright starts using settings from `playwright.config.ts`.
2. Global and test-level fixtures (e.g., `Fixtuers/Login.ts`) set up state.
3. If the test has tags (e.g., `@admin`), `testContext.getUser(testInfo)` selects a user from `src/env/users.appname.json`.
4. Test initializes page objects and calls page methods.
5. On failure, traces, videos and logs are captured (see config).
6. Reports (HTML/Allure/JUnit) are produced in `playwright-report/`, `allure-results/`, and `results/`.

---

## Adding a new test — recommended checklist ✅
1. Create locators: `src/locators/<feature>.ts` (class with `readonly` Locator props)
2. Create page: `src/pages/<feature>.ts` (methods that wrap locators)
3. Create spec: `tests/Web_Testing/ambTestLab/<Feature>.spec.ts` (tag tests, use `getUser` when needed)
4. Add test entry to `TestData/testsList.json` if you want it runnable via `RunTestCli.ts`
5. Run locally and debug (see commands below)
6. Add/Update docs: small README note or `docs/` entry if behavior is non-obvious

Small code pattern to follow (AmbTestLab style):
```ts
// src/pages/login.page.ts
import { Page } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
export class LoginPage {
  page: Page; locator: LoginLocator
  constructor(page: Page){ this.page = page; this.locator = new LoginLocator(page); }
  async goto(){ await this.page.goto(process.env.BASE_URL || 'https://example'); }
  async login(user){ await this.locator.email.fill(user.email); await this.locator.password.fill(user.password); await this.locator.submit.click(); }
}
```

---

## Official spec template (use this)
```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/login.page';
import { getUser } from '../../../src/utils/testContext';

test('Feature: should do X @smoke', async ({ page }, testInfo) => {
  const user = getUser(testInfo); // tag-driven
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(user);
  // ... instantiate other pages and assert
});
```

---

## Tagging & user conventions 🏷️
- `@smoke` — quick, high-level happy-path checks
- `@regression` — broader suite for nightly/regression runs
- `@critical` — release-blocking tests
- `@flaky` — known flaky; open an issue referencing traces
- Domain tags: `@admin`, `@user` etc. — used to select users in `src/env/users.appname.json`

If a test needs a specific user, add the tag to the test and ensure the user record in `src/env/users.appname.json` contains that tag.

---

## Run commands (detailed) ▶️
- Install dependencies
```powershell
npm install
npx playwright install
```
- Run all tests (headed):
```powershell
npx playwright test --headed
```
- Run a single spec:
```powershell
npx playwright test tests/Web_Testing/ambTestLab/LoginRegister.spec.ts --project=chromium --headed
```
- Run by tag:
```powershell
npx playwright test --grep "@regression" --project=chromium --headed
```
- Run API project:
```powershell
npx playwright test --project=api
npm run test:api:crud
```
- Run via CLI runner:
```powershell
npx ts-node RunTestCli.ts login @smoke
```
- Debugging (inspector):
```powershell
npx playwright test <spec> --debug --project=<browser>
```

---

## Debugging & artifacts 🐞
- Playwright inspector (`--debug`) to step through tests
- Artifacts:
  - HTML: `playwright-report/`
  - Allure: `allure-results/`
  - JUnit: `results/results.xml`
  - Videos/traces: `playwright-report/<run>/artifacts/`
- Useful commands:
  - `npx playwright show-report`
  - `npm run typecheck`

Triage failure steps:
1. Re-run locally with `--debug` and `--headed`.
2. Capture trace and video; attach to issue.
3. If flaky, add `@flaky` and open an issue with the trace URL and commands used.

---

## Flaky tests policy (short) ⚠️
- Reproduce and capture artifacts locally first.
- Prefer focused fixes (explicit waits, mock network) over global timeout increases.
- Mark flaky tests with `@flaky` and open an issue; include trace and run link.

---

## PR guide & validation checklist ✅
Before opening a PR:
- Run `npm run typecheck` and `npx playwright test <affected-spec> --project=chromium --headed` locally
- Add tests for behavior changes and tag them appropriately
- If editing selectors, include a screenshot or DOM snippet in PR
- Add test list entry to `TestData/testsList.json` if needed for CLI runner
- Update `.github/copilot-instructions.md` if you introduce new patterns agents should know

PR template (short):
- Title: `<area>: short summary`
- Description: What changed, why, one command to run locally
- Test plan: Exact spec and commands
- Notes: CI impact, flaky risk, rollback plan

---

## Developer tips & gotchas 💡
- Do not rename the `Fixtuers/` directory — it’s intentionally preserved for compatibility
- Use `src/utils/logger.ts` for structured logging instead of `console.log`
- Keep tests deterministic: prefer waiting for elements or intercepts over sleeps
- Check `config/configLoader.ts` when changes are environment-related

---

## Next actions I can do for you
- Add a `docs/TEST_TEMPLATE.md` with a more detailed test scaffold and a sample PR template
- Add a short `CONTRIBUTING.md` with branching and release notes for test owners

Tell me which of those you'd like me to add next.

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
$env:ENV="qaauto"; $env:REMOTE_WS="ws://IpAdress:port"; npx playwright test --grep "@regression" --project=chromium --headed
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

