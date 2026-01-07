# AI Agent Instructions: AMB_PlaywrightAutomation

## Project Overview
This is a **Playwright-based automation framework** for testing web applications and APIs across multiple environments (QA, staging, prod). It follows strict **Page Object Model (POM)** and **fixture-driven patterns** to ensure maintainability and reusability.

## Architecture & Key Patterns

### Three-Layer Structure: Locators → Pages → Tests
- **Locators** (`src/locators/`): Define selectors, organized by application module
  - Example: `src/locators/ambTestLab/adminDashboard.ts` → contains all selectors for admin dashboard
  - Pattern: Class with `readonly` Locator properties initialized in constructor
- **Pages** (`src/pages/`): Encapsulate page interactions using locators
  - Example: `LoginPage` uses `LoginLocator` to fill credentials
  - Methods are async and descriptive (e.g., `fillUsername()`, `submitForm()`)
- **Tests** (`tests/`): Orchestrate page objects and assertions
  - Web tests: `tests/Web_Testing/ambTestLab/*.spec.ts`
  - API tests: `tests/API_Testing/*.spec.ts` (separate project config)

### Tag-Based User Selection
Tests use Playwright tags (`@tag`) matched against user attributes:
- Tags are defined in test files: `test('scenario', { tag: ['@admin', '@smoke'] }, async => {...})`
- `getUser(testInfo)` in [src/utils/testContext.ts](src/utils/testContext.ts#L12) selects user from `users.appname.json` based on matching tags
- Users live in [src/env/users.appname.json](src/env/users.appname.json)

### Configuration & Environments
- **Config loader**: [config/configLoader.ts](config/configLoader.ts) reads `.properties` files for each env
  - Supported: `qa.properties`, `staging.properties`, `qaauto.properties`
  - Use `loadProperties(env)` to get config as key-value pairs
- **Environment selection**: Set `test_env` environment variable (default: `qa`)
- **Dynamic base URLs**: [playwright.config.ts](playwright.config.ts#L45) reads `process.env.BASE_URL` (fallback: Heroku booker API)

### Logging & Reporting
- **Custom Logger**: [src/utils/logger.ts](src/utils/logger.ts) using Winston with daily rotation
- **Custom Reporter**: [src/reporters/CustomLoggerReporter.ts](src/reporters/CustomLoggerReporter.ts) logs test lifecycle events (started, passed, failed)
- **Allure Reports**: Run `npm run allure:report` to generate and open Allure HTML report
- **JUnit XML**: Generated at `results/results.xml` for CI pipelines

### API Testing Pattern
- Uses AJV for JSON schema validation
- Data stored in [TestData/APIPayloads/](TestData/APIPayloads/) and [TestData/APISchemas/](TestData/APISchemas/)
- Example: [tests/API_Testing/Post.spec.ts](tests/API_Testing/Post.spec.ts#L18) validates response against schema with `ajv.compile()` and `validate(json)`
- Separate API project in config ensures isolation from browser tests

## Setup & Installation

### Prerequisites
1. Install Node.js and npm
2. Install Playwright dependencies:
```bash
npm install
npx playwright install
npx playwright --version  # Verify installation
```

## Running Tests

### Local Execution (Default)
Run all browsers (Chromium, Firefox, Edge):
```bash
npx playwright test --headed
```

Run specific browser:
```bash
npx playwright test --project=chromium --headed
npx playwright test --project=firefox --headed
npx playwright test --project=Edge --headed
```

Run specific spec file:
```bash
npx playwright test tests/Web_Testing/ambTestLab/LoginRegister.spec.ts --headed
```

Run tests by tag:
```bash
npx playwright test --grep "@regression" --headed
npx playwright test --grep "@smoke" --headed
```

Debug a single test:
```bash
npx playwright test tests/Web_Testing/ambTestLab/AdminMutualFunds.spec.ts --project=firefox --debug
```

### Environment-Specific Execution
Tests run against `local` environment by default. Override with:
```bash
# QA Auto environment
$env:ENV="qaauto"; npx playwright test --grep "@smoke" --project=firefox --headed

# Staging
$env:test_env="staging"; npx playwright test --headed
```

### Remote Playwright Server
Execute against a remote WebSocket endpoint:
```bash
$env:ENV="qaauto"
$env:REMOTE_WS="ws://IpAddress:port/playwright"
npx playwright test --grep "@regression" --project=chromium --headed
```

### API Testing
```bash
npm run test:api:crud                          # Run all CRUD operations (GET, POST, PUT, DELETE)
npx playwright test --project=api              # Run API project only
npx playwright test tests/API_Testing/Post.spec.ts --project=api
```

### CLI Test Runner
Use [RunTestCli.ts](RunTestCli.ts) to run tests by name with optional tag filtering:
```bash
npx ts-node RunTestCli.ts login @smoke                      # Run login tests tagged @smoke
npx ts-node RunTestCli.ts login,orders @health_check        # Multiple tests
npx ts-node RunTestCli.ts AdminMutualFunds @regression      # Admin test suite
```
⚠️ Requires entry in [TestData/testsList.json](TestData/testsList.json)

### Reporting & Results
```bash
npx playwright show-report                 # Open HTML report
npm run allure:report                       # Generate and open Allure report
npm run results                             # Alternative: open HTML test report
npm run debug-testapp-prod                  # Debug with prod env, headless, single worker
```

Reports generated to:
- **HTML**: `playwright-report/`
- **JUnit XML**: `results/results.xml` (for CI/CD)
- **Allure**: `allure-results/`

### Environment Variables
- `ENV`: Environment name (`local`, `qaauto`, `qa`, `staging`) → defaults to `local`
- `test_env`: Alternative env selector (`qa`, `staging`, `prod`) → maps to `*.properties` files
- `BASE_URL`: Override base URL (default: Heroku booker API)
- `REMOTE_WS`: WebSocket endpoint for remote Playwright execution
- `CI`: Set to `true` in CI pipelines (enables 2 retries, 1 worker)

## Test Flow & Architecture

The automation framework follows a clear, layered pattern:

```
┌─────────────────────────────────────────────────────┐
│  Fixtures (Fixtuers/Login.ts)                      │
│  - Sets up authenticated state                     │
│  - Provides consistent auth across tests           │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Locators (src/locators/appName/*.ts)              │
│  - Define all CSS/XPath selectors                  │
│  - Organized by page/component                     │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Page Objects (src/pages/appName/*.ts)             │
│  - Encapsulate interactions using locators         │
│  - Methods like fillUsername(), submitForm()       │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Test Specs (tests/Web_Testing/ambTestLab/*.spec.ts)
│  - Orchestrate page objects                        │
│  - Use tags (@smoke, @regression, @admin)          │
│  - Assert outcomes                                 │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Reporters                                          │
│  - Custom Logger → logs test lifecycle events      │
│  - HTML Report → browser-readable results          │
│  - JUnit XML → CI/CD integration                   │
│  - Allure → detailed analytics & trends            │
└─────────────────────────────────────────────────────┘
```

### Key Test Page Objects
- **LoginPage** → email/password inputs, OTP login, register link
- **AdminMutualFunds** → add/edit/delete fund, search, pagination, export/import
- **AdminUserManagement** → user table, card view, export users
- **UserProfile** → edit profile fields, save changes, verification locators
- **Portfolio** → cart, summary totals, secure payment, purchase verification
- **Spi_Calculator** → SIP inputs, results, multiple graph locators
- **FundsPage** → funds tab, SIP calculator tab, dashboard tab, buy/add buttons
- **DashboardPage** → overview, market snapshot, investor counts, charts
- **Purchases** → orders, gross volume, export, table actions
- **Ecommerce** → add/edit/delete product, card title verification

### Spec Files Organization
- `LoginRegister.spec.ts` → login and registration flows
- `UserProfile.spec.ts` → profile editing and verification
- `UseraddFunds.spec.ts` → adding funds and portfolio updates
- `AdminMutualFunds.spec.ts` → mutual fund management by admin
- `AdminUserManagement.spec.ts` → user management scenarios
- `Ecommerce.spec.ts` → product add/edit/delete flows
- `Full_E2e.spec.ts` → end-to-end regression scenarios
- `UserSipCalculator.spec.ts` → SIP calculation and graph validation
- `AdminSetting.spec.ts` → admin settings update and export

## Development Workflow

### Adding a New Test
1. Create locators in `src/locators/appName/componentName.ts` (extends with new selectors)
2. Create or extend page class in `src/pages/appName/` using locator class
3. Write spec file in `tests/Web_Testing/appName/` using page objects
4. Add test entry to [TestData/testsList.json](TestData/testsList.json) if using CLI runner
5. Tag tests appropriately: `@smoke`, `@regression`, `@critical`, or custom user tags

### Adding a New Page Object
```typescript
import { Page, Locator } from '@playwright/test';
import { MyLocator } from '../locators/myComponent.locator';

export class MyPage {
    page: Page;
    readonly locator: MyLocator;

    constructor(page: Page) {
        this.page = page;
        this.locator = new MyLocator(this.page);
    }

    async performAction() {
        await this.locator.button.click();
    }
}
```

### Adding Test Data
- Static data: [TestData/](TestData/) organized by type (API payloads, schemas, QA fixtures)
- User data: [src/env/users.appname.json](src/env/users.appname.json) with tags for selection
- Reference test data in spec: `import bookingData from '../../TestData/APIPayloads/createBookingData.json'`

## Critical Developer Notes
- **Parallel execution**: Tests run on 3 workers by default (CI: 1 worker, 2 retries)
- **Timeout**: Global 3,000,000ms (50 min) per test to support long-running workflows
- **Headless default**: Tests run headless in config unless overridden via `--headed` flag
- **Video/trace on failure**: Automatically captured for failed tests via `trace: 'on-first-retry'` and `video: 'on'`
- **Module imports**: Use CommonJS (`"module": "commonjs"`) in [tsconfig.json](tsconfig.json), not ESM
- **Browser channels**: Edge uses Chromium with `channel: 'msedge'` flag; configure in [playwright.config.ts](playwright.config.ts#L27)
- **Browser window sizing**:
  - **Chromium & Edge**: Maximized via `--start-maximized` launch argument
  - **Firefox & WebKit**: Full screen via `viewport: null`
- **Slow motion**: Tests run with `slowMo: 500ms` for better visibility during debugging
- **Multi-browser default**: If no `--project` specified, Playwright runs Chromium, Firefox, and Edge automatically

## File Organization Reference
```
src/locators/          ← Selector definitions (organized by app/module)
src/pages/             ← Page object classes using locators
src/actions/           ← Reusable action helpers (if needed)
src/objects/           ← Data models: User, TestData, AppName, Environment
src/utils/             ← Logger, testContext helper, Mouse helper, schema reader
src/reporters/         ← Custom Playwright reporters
tests/Web_Testing/     ← Spec files for browser automation
tests/API_Testing/     ← Spec files for API testing
TestData/              ← Fixtures, payloads, schemas, environment configs
config/                ← Environment-specific .properties files
Fixtuers/              ← Fixtures directory (note: misspelling in original, preserve as-is)
```

## TypeScript & Build
- **Compiler**: TypeScript 5.9.3 with CommonJS module system
- **Validation**: Run `npm run typecheck` before committing
- **No transpilation needed**: ts-node handles TypeScript directly for specs and utilities

## Integration Points
- **Schema validation**: Use AJV with custom date format: `ajv.addFormat('date', /^\d{4}-\d{2}-\d{2}$/)`
- **Config at runtime**: `process.env.globalSettings` (parsed JSON), `process.env.testData` (env-specific)
- **Logging**: Always use logger from [src/utils/logger.ts](src/utils/logger.ts) for consistency
- **Reporting**: CustomLoggerReporter auto-integrates; Allure annotations added via test hooks

## Common Pitfalls
- **Missing tags**: Test won't match user if tag set mismatch (check [src/env/users.appname.json](src/env/users.appname.json))
- **Config file typo**: Ensure `.properties` file matches `test_env` value exactly
- **Selector issues**: Verify locator class selector is accurate before debugging page interactions
- **API schema**: Ensure schema JSON matches response structure (AJV is strict)
