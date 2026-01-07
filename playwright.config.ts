/**
 * @file Playwright Test Configuration
 * @description Comprehensive test execution configuration for web and API testing automation framework
 * 
 * **Purpose**:
 * Defines all Playwright test execution parameters including:
 * - Global test timeout and retry strategies
 * - Browser projects with platform-specific configurations
 * - Reporter integrations (HTML, JUnit XML, Custom Logger, Allure)
 * - Base URLs and HTTP headers for test requests
 * - Artifact collection (videos, traces) for debugging
 * - API testing isolation via separate project
 * 
 * **Test Execution Matrix**:
 * ```
 * ┌────────────────────────────────────────────────────────────────┐
 * │  Playwright Config (this file)                                 │
 * │  Defines global + per-project settings                         │
 * └─────────────┬──────────────────────────────────────────────────┘
 *               │
 *      ┌────────┴────────┬────────────────┬────────────────┐
 *      ▼                 ▼                ▼                ▼
 * ┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐
 * │Chromium │      │ Firefox │      │   Edge  │      │   API   │
 * │ Project │      │ Project │      │ Project │      │ Project │
 * └─────────┘      └─────────┘      └─────────┘      └─────────┘
 *     Web              Web              Web            API Tests
 *   Testing         Testing          Testing         (Separate)
 * (Headless)       (Headless)       (Headless)
 * ```
 * 
 * **Project Execution Modes**:
 * - **Chromium**: Default Chromium browser for cross-platform testing
 * - **Firefox**: Firefox ESR for browser diversity testing
 * - **Edge**: Microsoft Edge (uses Chromium engine with msedge channel)
 * - **API**: Separate Node.js project for API testing (no browser)
 * 
 * **Execution Contexts**:
 * 1. **Local Development** (default):
 *    - 0 retries (fail fast for debugging)
 *    - 1 worker (sequential, easier to debug)
 *    - Headless: true (faster, no display)
 *    - Videos/Traces: Always recorded for artifacts
 * 
 * 2. **CI/CD Pipeline** (when process.env.CI=true):
 *    - 2 retries (handle flakiness in CI)
 *    - 1 worker (prevent resource contention)
 *    - forbidOnly: true (prevent @only tags from blocking CI)
 *    - Parallel execution disabled for stability
 * 
 * **Artifact Collection**:
 * - Videos: Recorded for all test executions (for debugging)
 * - Traces: On-first-retry (captures detailed interaction logs)
 * - Reports: HTML, JUnit XML, Custom Logger, Line, List formats
 * - Locations: playwright-report/, results/results.xml, allure-results/
 * 
 * **Browser Configuration Strategies**:
 * - **Chromium/Edge**: Maximize window via --start-maximized flag
 * - **Firefox/WebKit**: Full screen via viewport: null
 * - **Remote Execution**: Optional WebSocket connection for distributed testing
 * - **Slow Motion**: 500ms delay between actions for visibility
 * 
 * **Environment Integration**:
 * - BASE_URL: Override application URL (default: Heroku Restful Booker API)
 * - CI: Set to true in CI pipelines for special handling
 * - REMOTE_WS: WebSocket endpoint for remote Playwright server
 * - Fallback defaults ensure tests work without env variable setup
 * 
 * **Key Configuration Decisions**:
 * - Timeout: 3,000,000ms (50 minutes) for long-running workflows
 * - Headless: true by default (can override with --headed flag)
 * - Video: Always on (aids debugging failed tests)
 * - Trace: on-first-retry (captures only after first failure)
 * - forbidOnly: Prevents accidental @only tags blocking CI
 * - fullyParallel: Enables parallel execution across workers
 * 
 * **Test Execution Commands**:
 * ```bash
 * # All browsers, local
 * npx playwright test --headed
 * 
 * # Single browser
 * npx playwright test --project=chromium --headed
 * 
 * # API tests only
 * npx playwright test --project=api
 * 
 * # CI execution
 * $env:CI="true"; npx playwright test
 * 
 * # Custom base URL
 * $env:BASE_URL="https://staging-app.com"; npx playwright test
 * 
 * # Remote Playwright server
 * $env:REMOTE_WS="ws://remote-server:3000/playwright"; npx playwright test
 * ```
 * 
 * @see Fixtuers/Login.ts - Uses baseURL from this config
 * @see src/pages/ - All page objects use baseURL for navigation
 * @see tests/Web_Testing/ - Web test specs execute with Web projects
 * @see tests/API_Testing/ - API test specs execute with API project
 * @see src/reporters/CustomLoggerReporter.ts - Custom reporter integration
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { defineConfig } from '@playwright/test';

/**
 * Browser Type Definition
 * 
 * @typedef {('chromium' | 'firefox' | 'msedge')} BrowserName
 * Supported browser types for test execution
 */
type BrowserName = 'chromium' | 'firefox' | 'msedge';

/**
 * Browser Configuration Helper Function
 * 
 * **Purpose**:
 * Generates platform-specific browser launch configuration based on browser type.
 * Handles browser detection, channel selection, launch arguments, and remote connections.
 * 
 * **Configuration Strategy by Browser**:
 * 
 * 1. **Chromium**:
 *    - Uses native Chromium engine
 *    - Maximize window via --start-maximized for full viewport
 *    - No channel override needed
 *    - Supports remote WebSocket connections
 * 
 * 2. **Firefox**:
 *    - Uses native Firefox engine
 *    - No launch arguments (doesn't support --start-maximized)
 *    - Full screen via viewport: null (set in main config)
 *    - Supports remote WebSocket connections
 * 
 * 3. **Microsoft Edge (msedge)**:
 *    - ⚠️ IMPORTANT: Uses Chromium engine (not EdgeHTML)
 *    - browserName set to 'chromium' (Playwright requirement)
 *    - channel: 'msedge' flag tells Playwright to launch Edge instead of Chromium
 *    - Maximize window via --start-maximized
 *    - Supports remote WebSocket connections
 * 
 * **Remote Execution**:
 * - If process.env.REMOTE_WS is set, uses connectOptions instead of local launch
 * - WebSocket endpoint: ws://hostname:port/playwright
 * - Enables distributed testing across remote Playwright servers
 * - Example: ws://192.168.1.100:3000/playwright
 * 
 * **Configuration Object Properties**:
 * - browserName: 'chromium' | 'firefox' (Playwright recognizes these)
 * - headless: false (overridden by global use.headless: true in main config)
 * - viewport: null (full screen, overridden per browser in main config)
 * - deviceScaleFactor: undefined (no scaling)
 * - channel: 'msedge' | undefined (tells Playwright which browser distribution to use)
 * - launchOptions.args: Browser-specific launch arguments
 *   - ['--start-maximized']: Maximize Chromium/Edge windows
 *   - []: No args for Firefox/WebKit
 * - connectOptions: WebSocket connection details (optional, for remote execution)
 * 
 * @param {BrowserName} browser - Browser type: 'chromium', 'firefox', or 'msedge'
 * @returns {Object} Browser configuration object for Playwright
 * 
 * @example
 * // Local Chromium execution with maximized window
 * const chromiumConfig = browserUse('chromium');
 * // Result: { browserName: 'chromium', headless: false, viewport: null, ... }
 * 
 * @example
 * // Edge execution with msedge channel
 * const edgeConfig = browserUse('msedge');
 * // Result: { browserName: 'chromium', channel: 'msedge', ... }
 * 
 * @example
 * // Remote execution (environment variable REMOTE_WS set)
 * process.env.REMOTE_WS = 'ws://remote-server:3000/playwright';
 * const remoteConfig = browserUse('chromium');
 * // Result includes: { connectOptions: { wsEndpoint: 'ws://remote-server:3000/playwright' } }
 * 
 * @remarks
 * **Critical Notes**:
 * - Edge always uses Chromium engine (browserName: 'chromium')
 * - channel: 'msedge' flag is essential for Edge detection
 * - viewport: null configured here, individual browsers adjust in main config
 * - launchOptions.slowMo: 500ms configured globally, can be overridden per test
 * - Remote execution bypasses local launch, connects via WebSocket instead
 * 
 * **Browser Window Sizing Strategy**:
 * - Chromium & Edge: Use --start-maximized to fill available screen space
 * - Firefox & WebKit: Use viewport: null (full screen, more compatible)
 * - Solves issues with responsive design testing at different resolutions
 * 
 * **Slow Motion Configuration**:
 * - Global slowMo: 500ms (half-second delay between actions)
 * - Improves visibility during debugging
 * - Can be overridden per test: test.use({ slowMo: 1000 })
 */
function browserUse(browser: BrowserName) {
    return {
        /**
         * @property {string} browserName
         * Playwright engine to use: 'chromium' or 'firefox'
         * 
         * Edge maps to 'chromium' (Chromium engine) with channel override
         * Firefox uses native Firefox engine
         */
        browserName: browser === 'msedge' ? 'chromium' : browser, // ✅ Edge uses chromium

        /**
         * @property {boolean} headless
         * Display browser UI: false (overridden by global config: true)
         * This property is superseded by global use.headless setting
         */
        headless: false,

        /**
         * @property {null} viewport
         * Window size: null (use full screen)
         * Individual viewport settings applied per browser in main config
         */
        viewport: null, // use full screen size

        /**
         * @property {undefined} deviceScaleFactor
         * DPI scaling: undefined (use default)
         * No scaling applied for automated tests
         */
        deviceScaleFactor: undefined,

        /**
         * @property {string|undefined} channel
         * Browser distribution channel
         * - 'msedge' for Microsoft Edge (Chromium-based)
         * - undefined for Chromium/Firefox (use default distribution)
         */
        channel: browser === 'msedge' ? 'msedge' : undefined, // ✅ tell Playwright to launch Edge

        /**
         * @property {Object} launchOptions
         * Browser process launch arguments
         * 
         * args: Command-line flags passed to browser process
         * - ['--start-maximized']: Chromium/Edge maximize window on launch
         * - []: Firefox/WebKit don't support this flag
         */
        launchOptions: {
            args: browser === 'chromium' || browser === 'msedge' ? ['--start-maximized'] : [],
        },

        /**
         * @property {Object} connectOptions (conditional)
         * Remote Playwright server connection
         * 
         * Only included if REMOTE_WS environment variable is set
         * Example: $env:REMOTE_WS="ws://192.168.1.100:3000/playwright"
         * 
         * wsEndpoint: WebSocket URL of remote Playwright server
         * - Enables distributed test execution
         * - Browser runs on remote machine, test controls locally
         * - Useful for cloud testing, parallel labs, CI/CD integrations
         */
        ...(process.env.REMOTE_WS
            ? { connectOptions: { wsEndpoint: process.env.REMOTE_WS } }
            : {}),
    };
}

/**
 * Playwright Test Configuration Object
 * 
 * **Configuration Sections**:
 * 1. Global Test Execution Settings
 * 2. Reporter Configuration
 * 3. Global Use Settings (HTTP headers, artifacts)
 * 4. Projects (Chromium, Firefox, Edge, API)
 * 
 * **Global Execution Flow**:
 * ```
 * Test Execution Starts
 *    ↓
 * Timeout Check: 3,000,000ms per test
 *    ↓
 * Parallel Execution: All projects run in parallel
 *    ↓
 * Per-Test Logic:
 *    - Setup artifacts (video, trace)
 *    - Navigate to baseURL
 *    - Execute test scenario
 *    - Collect artifacts on failure/retry
 *    ↓
 * Retry Logic:
 *    - Local: 0 retries (fail fast)
 *    - CI: 2 retries (handle flakiness)
 *    ↓
 * Reporting:
 *    - HTML report (playwright-report/)
 *    - JUnit XML (results/results.xml)
 *    - Custom Logger (console + file)
 *    - Line output (test progress)
 *    ↓
 * Test Execution Complete
 * ```
 */
export default defineConfig({
    /**
     * @property {number} timeout
     * Maximum test execution time in milliseconds
     * 
     * Value: 3,000,000ms = 50 minutes
     * 
     * **Purpose**:
     * - Prevents tests hanging indefinitely
     * - Allows time for long-running workflows (multi-step processes)
     * - Includes setup, execution, and cleanup phases
     * 
     * **When This Timeout Applies**:
     * - Per individual test (not per describe block)
     * - Includes all test actions, assertions, and retries
     * - Does not include reporter/artifact collection time
     * 
     * **Timeout Escalation**:
     * - Test timeout exceeded → Playwright forces test termination
     * - Browser session killed
     * - Test marked as FAILED
     * - Error: "Timeout of 3000000ms exceeded"
     * 
     * **Customization**:
     * - Per test: test.setTimeout(10000) // 10 seconds
     * - Per test group: test.describe.configure({ timeout: 60000 })
     * - Global override: test.use({ timeout: 120000 })
     * 
     * @type {number}
     */
    timeout: 3_000_000,

    /**
     * @property {string} testDir
     * Root directory containing test specifications
     * 
     * Value: './tests'
     * 
     * **Playwright Test Discovery**:
     * - Scans testDir recursively for *.spec.ts files
     * - Ignores node_modules and other excluded paths
     * - Includes: tests/Web_Testing/ambTestLab/*.spec.ts
     * - Includes: tests/API_Testing/*.spec.ts
     * - Includes: tests/example.spec.ts
     * 
     * **Directory Structure**:
     * ```
     * tests/
     *   ├── example.spec.ts (picked up)
     *   ├── Web_Testing/
     *   │   ├── ambTestLab/
     *   │   │   ├── LoginRegister.spec.ts (picked up)
     *   │   │   ├── AdminMutualFunds.spec.ts (picked up)
     *   │   │   └── ... more specs
     *   │   └── Surgical_Test/ (picked up)
     *   ├── API_Testing/ (separate project with own testDir)
     *   │   ├── Post.spec.ts (picked up by api project)
     *   │   └── Get.spec.ts (picked up by api project)
     *   └── data/ (not picked up, no .spec.ts extension)
     * ```
     * 
     * **Override at Runtime**:
     * - Individual test file: npx playwright test tests/specific.spec.ts
     * - Pattern match: npx playwright test tests/Web_Testing/**
     * - Tag filter: npx playwright test --grep "@smoke"
     * 
     * @type {string}
     */
    testDir: './tests',

    /**
     * @property {boolean} fullyParallel
     * Execute all tests in parallel across workers
     * 
     * Value: true
     * 
     * **Parallel Execution Strategy**:
     * - Tests run simultaneously (not sequentially)
     * - Number of parallel workers: process.env.CI ? 1 : 1 (both use 1 worker)
     * - Each worker gets subset of tests
     * - Reduces total execution time for large suites
     * 
     * **Impact on Execution**:
     * - Local: 1 worker = sequential (easier debugging)
     * - CI: 1 worker = sequential (prevents resource conflicts)
     * - Can override: workers: 4 for multi-worker parallel
     * 
     * **Implications**:
     * - Tests must be independent (no shared state)
     * - Fixtures create isolated state per test
     * - Avoid relying on test execution order
     * - Data cleanup should happen in tests, not between tests
     * 
     * @type {boolean}
     */
    fullyParallel: true,

    /**
     * @property {boolean} forbidOnly
     * Prevent @only-tagged tests from running in CI
     * 
     * Value: !!process.env.CI (true if CI=true, false otherwise)
     * 
     * **Purpose**:
     * - Prevents developers accidentally committing @only tags
     * - Forces removal of .only before pushing to CI
     * - Catches debugging code before merging
     * 
     * **Behavior**:
     * - Local (CI not set): forbidOnly = false (allow @only for debugging)
     * - CI Pipeline (CI=true): forbidOnly = true (reject @only tags)
     * 
     * **Error When Violated**:
     * ```
     * Error: .only is not allowed in CI
     * Playwright fails immediately if @only tag is found in CI
     * ```
     * 
     * **Debugging with @only**:
     * ```typescript
     * test.only('specific test', async => {
     *   // Local: runs only this test
     *   // CI: causes test failure - remove @only before push
     * });
     * ```
     * 
     * @type {boolean}
     */
    forbidOnly: !!process.env.CI,

    /**
     * @property {number} retries
     * Number of times to retry failed tests
     * 
     * Value: process.env.CI ? 2 : 0
     * 
     * **Retry Strategy**:
     * - Local execution: 0 retries (fail fast, quick feedback)
     *   - Failures happen immediately for debugging
     *   - Faster iteration during development
     *   - Easier to reproduce issues
     * 
     * - CI Pipeline: 2 retries (handle flakiness)
     *   - First failure triggers first retry
     *   - Continues if all tests pass
     *   - Captures additional artifacts on first retry
     * 
     * **Retry Behavior**:
     * - Test runs once initially
     * - On failure: Check if retries remaining
     * - If retries > 0: Run test again with fresh context
     * - Repeat until success or retries exhausted
     * - Mark as FAILED if all retries exhausted
     * 
     * **Artifacts on Retry**:
     * - Video: Always recorded (all runs)
     * - Trace: Only on first retry (trace: 'on-first-retry')
     * - Screenshot: Can be configured
     * - Logs: Preserved from all runs
     * 
     * **CI Example**:
     * ```
     * Test fails → Retry 1 → Fails → Retry 2 → Fails → FAILED
     * Test fails → Retry 1 → Passes → PASSED
     * ```
     * 
     * **Common Use Cases for Retries**:
     * - Network flakiness
     * - Timing-related issues
     * - Asynchronous state inconsistencies
     * - Resource availability
     * 
     * @type {number}
     */
    retries: process.env.CI ? 2 : 0,

    /**
     * @property {number} workers
     * Number of parallel test workers
     * 
     * Value: process.env.CI ? 1 : 1 (both environments use 1 worker)
     * 
     * **Worker Distribution**:
     * - Workers run tests in parallel
     * - Each worker executes subset of test queue
     * - Tests distributed across workers
     * - Resources allocated per worker
     * 
     * **Current Configuration**:
     * - Local: 1 worker = sequential execution
     *   - Easier debugging (single execution context)
     *   - Simpler to trace issues
     *   - Slower overall execution
     * 
     * - CI: 1 worker = sequential execution
     *   - Prevents resource contention
     *   - Ensures stable CI pipeline
     *   - Predictable execution
     *   - Conservative approach for CI stability
     * 
     * **Potential Optimization**:
     * - Change to: workers: process.env.CI ? 1 : 3
     *   - Local: 3 parallel workers (faster testing)
     *   - CI: 1 worker (stable CI)
     * 
     * **Considerations for Multi-Worker**:
     * - Tests must be independent (no shared database state)
     * - Fixtures provide isolation (loginAsUser creates new account per test)
     * - API tests need separate database (don't conflict)
     * - Resource contention possible (database, memory, CPU)
     * 
     * @type {number}
     */
    workers: process.env.CI ? 1 : 1,

    /**
     * @property {Array} reporter
     * Test reporting outputs and formats
     * 
     * **Reporter Stack** (in execution order):
     * 
     * 1. CustomLoggerReporter (custom implementation)
     *    - Location: src/reporters/CustomLoggerReporter.ts
     *    - Logs test lifecycle events (started, passed, failed)
     *    - Writes to logger (Winston) and console
     *    - Provides detailed execution visibility
     * 
     * 2. HTML Reporter (built-in)
     *    - Location: playwright-report/
     *    - Creates interactive HTML dashboard
     *    - Shows test results, videos, traces
     *    - Command: npx playwright show-report
     * 
     * 3. Line Reporter (built-in)
     *    - Console output: Single line per test
     *    - Shows progress as tests execute
     *    - Format: [✓] Test name (123ms)
     * 
     * 4. List Reporter (built-in)
     *    - Console output: List of all tests
     *    - Shows final results summary
     *    - Format: PASSED/FAILED with counts
     * 
     * 5. JUnit Reporter (built-in)
     *    - Location: results/results.xml
     *    - Format: JUnit XML (CI/CD standard)
     *    - Integration: Jenkins, GitLab CI, GitHub Actions
     *    - Contains: Test counts, durations, failure details
     * 
     * **Artifact Structure**:
     * ```
     * Project Root/
     *   ├── playwright-report/  (HTML report)
     *   │   ├── index.html
     *   │   ├── test-results/
     *   │   └── videos/
     *   ├── allure-results/     (Allure report data)
     *   ├── results/
     *   │   └── results.xml     (JUnit XML)
     *   └── .playwright/        (Traces)
     * ```
     * 
     * **Accessing Reports**:
     * ```bash
     * npx playwright show-report         # HTML report
     * npm run allure:report              # Allure report
     * cat results/results.xml            # JUnit XML
     * ```
     * 
     * **Configuration Details**:
     * - outputFile: 'results/results.xml' for JUnit
     *   - Creates results/ directory if missing
     *   - Overwrites on each test run
     *   - CI/CD parses this file for integration
     */
    reporter: [
        ['./src/reporters/CustomLoggerReporter.ts'],
        ['html'],
        ['line'],
        ['list'],
        ['junit', { outputFile: 'results/results.xml' }],
    ],

    /**
     * @property {Object} use
     * Global test context settings applied to all projects
     * 
     * Configuration shared across Chromium, Firefox, Edge projects
     * (API project has separate use settings)
     * 
     * @remarks
     * Per-project use settings override global use settings
     * Example: projects[0].use.baseURL overrides this global baseURL
     */
    use: {
        /**
         * @property {string} baseURL
         * Base URL for all page.goto() calls
         * 
         * Value: process.env.BASE_URL || 'https://restful-booker.herokuapp.com'
         * 
         * **Purpose**:
         * - Simplifies page navigation (relative URLs work)
         * - Enables environment switching without code changes
         * - Defaults to Heroku Restful Booker API for testing
         * 
         * **Usage in Tests**:
         * ```typescript
         * await page.goto('/dashboard'); // Navigates to baseURL + /dashboard
         * // With default: https://restful-booker.herokuapp.com/dashboard
         * ```
         * 
         * **Override at Runtime**:
         * ```bash
         * $env:BASE_URL="https://staging-app.com"; npx playwright test
         * $env:BASE_URL="https://prod-app.com"; npx playwright test
         * ```
         * 
         * **Environment-Specific URLs**:
         * - QA: https://qa-app.ambmindspace.com
         * - Staging: https://staging-app.ambmindspace.com
         * - Production: https://prod-app.ambmindspace.com
         * 
         * @type {string}
         */
        baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',

        /**
         * @property {Object} extraHTTPHeaders
         * Custom HTTP headers for all page requests
         * 
         * Applied to all requests (navigation, fetch, XHR)
         * 
         * **Headers Configured**:
         * - Accept: 'application/json'
         *   - Tells server to respond with JSON
         *   - Overrides browser defaults
         * 
         * - Content-Type: 'application/json'
         *   - Indicates request body is JSON
         *   - Required for API testing
         *   - May be overridden per request
         * 
         * **Use Cases**:
         * - API testing with JSON payloads
         * - Authentication headers (not set globally, set per test)
         * - Custom application headers
         * - Browser compatibility headers
         * 
         * **Per-Request Override**:
         * ```typescript
         * await page.fetch('/api/endpoint', {
         *   headers: {
         *     'Authorization': 'Bearer token',
         *     'X-Custom-Header': 'value'
         *   }
         * });
         * ```
         * 
         * @type {Object}
         */
        extraHTTPHeaders: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        /**
         * @property {string} trace
         * Artifact recording for test execution tracing
         * 
         * Value: 'on-first-retry'
         * 
         * **Trace Modes**:
         * - 'on': Always record trace
         * - 'off': Never record trace
         * - 'on-first-retry': Record on first retry (default here)
         *   - Test passes → No trace (saves storage)
         *   - Test fails → Trace recorded on retry
         *   - Captures detailed interaction logs
         * 
         * **Trace Contents**:
         * - Network requests/responses
         * - Browser console messages
         * - Screenshots at each action
         * - Detailed timing information
         * - DOM snapshots
         * - User input events
         * 
         * **Viewing Traces**:
         * ```bash
         * npx playwright show-trace .playwright/traces/*.zip
         * ```
         * Interactive viewer shows:
         * - Action timeline
         * - Network requests
         * - Console logs
         * - Screenshots
         * 
         * **Storage Considerations**:
         * - on-first-retry: Minimal storage (only failed tests)
         * - Traces are .zip files (compressed)
         * - Large projects can generate significant storage
         * 
         * @type {string}
         */
        trace: 'on-first-retry',

        /**
         * @property {string} video
         * Screen recording of test execution
         * 
         * Value: 'on'
         * 
         * **Video Modes**:
         * - 'on': Always record video (used here)
         * - 'off': Never record video
         * - 'retain-on-failure': Only keep video if test fails
         * 
         * **Video Contents**:
         * - Full browser screen recording
         * - All user interactions
         * - Navigation and page loads
         * - Dynamic content changes
         * - Error states
         * 
         * **Video Format**:
         * - Container: WebM format
         * - Codec: VP9 (compressed, efficient)
         * - Frame rate: 25 FPS
         * - Resolution: Matches test viewport
         * 
         * **Accessing Videos**:
         * - Location: playwright-report/data/videos/
         * - Playable in browser video player
         * - Downloadable from HTML report
         * - Sharable for debugging remote issues
         * 
         * **Use Cases**:
         * - Debugging test failures
         * - Demonstrating test execution
         * - Capturing UI defects
         * - Sharing issues with team
         * 
         * **Storage Considerations**:
         * - on: All videos recorded (largest storage)
         * - Large test suites can generate GBs of video
         * - Consider retain-on-failure for large suites
         * 
         * @type {string}
         */
        video: 'on',

        /**
         * @property {boolean} headless
         * Run browser in headless mode (no UI)
         * 
         * Value: true
         * 
         * **Headless Mode**:
         * - true: Browser runs without GUI (headless)
         *   - Faster execution
         *   - Less resource usage
         *   - Suitable for CI/CD
         *   - Default mode
         * 
         * - false: Browser displays UI
         *   - Slower execution
         *   - Useful for debugging
         *   - Can override with --headed flag
         * 
         * **Command-Line Override**:
         * ```bash
         * npx playwright test --headed    # Override to headless: false
         * npx playwright test --no-headed # Override to headless: true
         * ```
         * 
         * **Per-Test Override**:
         * ```typescript
         * test.use({ headless: false });
         * test('debug test', async ({ page }) => {
         *   // Browser displays UI for this test
         * });
         * ```
         * 
         * **Performance Impact**:
         * - Headless ~2x faster
         * - Headless uses less memory
         * - Headless reduces CPU usage
         * 
         * @type {boolean}
         */
        headless: true,

        /**
         * @property {Object} launchOptions
         * Browser launch configuration options
         * 
         * Applied when starting browser process
         * 
         * **Options Configured**:
         * - slowMo: 500 (milliseconds delay between actions)
         *   - Adds 500ms pause between Playwright actions
         *   - Makes test execution visible in real-time
         *   - Helps debugging by slowing down UI changes
         *   - Can override: test.use({ slowMo: 1000 })
         * 
         * **Why slowMo Matters**:
         * - Actions execute instantly without slowMo
         * - UI doesn't catch up visually
         * - Debugging slow-motion videos easier to follow
         * - Prevents race conditions with async rendering
         * 
         * **Per-Test slowMo**:
         * ```typescript
         * test('slow test', async ({ page }) => {
         *   // Uses default 500ms slowMo
         * });
         * 
         * test('fast test', async ({ page }) => {
         *   // Override slowMo to 0 for faster execution
         *   test.use({ slowMo: 0 });
         * });
         * ```
         * 
         * @type {Object}
         */
        launchOptions: { slowMo: 500 },
    },

    /**
     * @property {Array} projects
     * Test execution projects (browser types and special projects)
     * 
     * **Project Categories**:
     * 1. Web Testing Projects: Chromium, Firefox, Edge
     *    - Run Web tests (tests/Web_Testing/)
     *    - Use browserUse() helper for platform-specific config
     *    - Execute in browser
     * 
     * 2. API Testing Project: api
     *    - Run API tests (tests/API_Testing/)
     *    - No browser (Node.js only)
     *    - Separate testDir isolation
     * 
     * **Project Execution**:
     * - All projects run parallel (if workers > 1)
     * - Each project gets independent execution context
     * - Shared global settings (timeout, reporters)
     * - Project-specific settings override global
     */
    projects: [
        /**
         * CHROMIUM PROJECT
         * 
         * Default Chromium browser for cross-platform web testing
         * 
         * **Configuration**:
         * - Browser: Chromium (Open source, widely tested)
         * - Display: Headless (no UI)
         * - Window: Maximized via --start-maximized
         * - Remote: Optional WebSocket support
         * 
         * **Use Cases**:
         * - Primary browser for automation
         * - CI/CD default execution
         * - Performance testing
         * - Cross-browser baseline
         * 
         * **Test Coverage**:
         * - All Web_Testing specs run with Chromium
         * - API tests run separate (api project)
         */
        { name: 'chromium', use: browserUse('chromium') },

        /**
         * FIREFOX PROJECT
         * 
         * Firefox ESR for browser diversity testing
         * 
         * **Configuration**:
         * - Browser: Firefox (Different engine than Chrome)
         * - Display: Headless (no UI)
         * - Window: Full screen via viewport: null
         * - Remote: Optional WebSocket support
         * 
         * **Why Test Firefox**:
         * - Different rendering engine (Gecko)
         * - Different JavaScript engine (SpiderMonkey)
         * - Catches browser-specific issues
         * - Ensures cross-browser compatibility
         * 
         * **Test Coverage**:
         * - All Web_Testing specs run with Firefox
         * - Separate execution from Chromium
         * - Can be disabled for faster local iteration
         */
        { name: 'firefox', use: browserUse('firefox') },

        /**
         * EDGE PROJECT
         * 
         * Microsoft Edge (Chromium-based) for Windows-specific testing
         * 
         * **Configuration**:
         * - Browser: Chromium engine with msedge channel
         * - Display: Headless (no UI)
         * - Window: Maximized via --start-maximized
         * - Remote: Optional WebSocket support
         * 
         * **Important**: Edge uses Chromium Engine
         * - browserName: 'chromium' (required by Playwright)
         * - channel: 'msedge' (tells Playwright to launch Edge)
         * - Behaves similar to Chrome but with Edge branding/features
         * 
         * **Use Cases**:
         * - Windows environment testing
         * - Enterprise compatibility (Edge common in companies)
         * - Windows-specific features
         * - DevTools integration testing
         * 
         * **Test Coverage**:
         * - All Web_Testing specs run with Edge
         * - Separate execution from Chromium/Firefox
         * - Can be disabled for faster local iteration
         */
        { name: 'Edge', use: browserUse('msedge') }, // ✅ Edge project

        /**
         * API PROJECT
         * 
         * Node.js project for API testing (no browser)
         * 
         * **Configuration**:
         * - No browser (pure Node.js)
         * - testDir: './tests/API_Testing' (isolated from Web tests)
         * - baseURL: Same as Web projects (can be overridden)
         * - HTTP Headers: Same as Web projects
         * 
         * **Purpose**:
         * - Isolate API tests from browser tests
         * - Prevent API tests from using Web project timeout/retries
         * - Faster execution (no browser overhead)
         * - Clean separation of concerns
         * 
         * **Test Specs**:
         * - GET.spec.ts: GET request testing
         * - POST.spec.ts: POST/CREATE testing
         * - PUT.spec.ts: PUT/UPDATE testing
         * - DELETE.spec.ts: DELETE testing
         * - Fetch_Validate.spec.ts: Response validation
         * - schema_validation.spec.ts: JSON schema validation (AJV)
         * 
         * **Execution Command**:
         * ```bash
         * npx playwright test --project=api         # API tests only
         * npx playwright test --project=api --headed # API with headed (N/A, no browser)
         * ```
         * 
         * **Key Difference from Web Projects**:
         * - No headless/headful concept (no browser)
         * - No videos/traces (no UI to record)
         * - No browserUse() configuration
         * - Pure HTTP request/response testing
         * 
         * **Test Data**:
         * - Payloads: TestData/APIPayloads/
         * - Schemas: TestData/APISchemas/
         * - Validation: AJV (JSON schema validation)
         */
        {
            name: 'api',
            testDir: './tests/API_Testing',
            use: {
                baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
                extraHTTPHeaders: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        },
    ],
});
