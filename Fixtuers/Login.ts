
/**
 * @file Fixture: Authentication Setup for Playwright Tests
 * @description Provides reusable fixtures for user authentication in ambTestLab application
 * 
 * Handles two critical authentication scenarios:
 * 1. **loginAsUser**: Complete user registration + login workflow
 *    - Generates random user credentials using Faker.js
 *    - Registers new user with complete profile data
 *    - Logs in with registered credentials
 *    - Returns email and password for test assertions
 * 
 * 2. **loginAsAdmin**: Direct admin login with predefined credentials
 *    - Logs in using admin account (environment-based credentials)
 *    - No registration step (assumes admin account exists)
 *    - Used for admin-specific test scenarios
 * 
 * **Fixture Pattern Benefits**:
 * - Eliminating repetitive auth code in every test
 * - Ensuring consistent authenticated state across test suite
 * - Reducing setup time and improving test execution speed
 * - Enabling data isolation (unique user per test)
 * 
 * **Credential Management**:
 * - User credentials: Randomly generated via Faker.js for test isolation
 * - Admin credentials: Read from environment variables with fallback defaults
 * - Base URL: Loaded dynamically from environment-specific .properties files
 * 
 * **Environment Configuration**:
 * - Supports multiple environments: qa, staging, prod, qaauto, local
 * - baseURL automatically loaded from config/qa.properties or equivalent
 * - ENV variable defaults to 'qa' if not set
 * 
 * @see tests/Web_Testing/ambTestLab - Spec files consuming these fixtures
 * @see config/configLoader.ts - Properties loader for environment-specific config
 * @see src/pages/ambTestLab/register.ts - Registration page object
 * @see src/pages/ambTestLab/login.ts - Login page object
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { test as base } from '@playwright/test';
import { RegisterActions } from '../src/pages/ambTestLab/register';
import { LoginActions } from '../src/pages/ambTestLab/login';
import { faker } from '@faker-js/faker';
import { loadProperties } from '../config/configLoader';

/**
 * Type definition for custom authentication fixtures
 * 
 * @typedef {Object} AuthFixtures
 * 
 * @property {Function} loginAsUser - Fixture for user registration + login workflow
 * - Returns registered user credentials (email, password)
 * - Creates unique user for each test execution
 * - Provides authenticated session for regular user tests
 * - Enables test isolation via unique credentials per execution
 * 
 * @property {Function} loginAsAdmin - Fixture for direct admin login
 * - No return value (void)
 * - Uses predefined admin credentials from environment
 * - Provides authenticated admin session
 * - Used for admin-only test scenarios
 */
type AuthFixtures = {
    loginAsUser: () => Promise<{ email: string; password: string }>;
    loginAsAdmin: () => Promise<void>;
};

/**
 * Environment Configuration Initialization
 * 
 * @constant {string} env - Target environment from ENV variable or 'qa' default
 * - Matches .properties file names (qa.properties, staging.properties, etc.)
 * - Used by configLoader to read environment-specific settings
 * - Determines baseURL and other configuration values
 * 
 * @constant {string} baseURL - Application URL loaded from properties file
 * - Read from environment-specific properties file
 * - Used for page.goto() in fixture setup
 * - Enables testing across multiple deployment environments
 * 
 * @remarks
 * Environment can be overridden at test execution:
 * $env:ENV="staging"; npx playwright test
 * $env:ENV="prod"; npx playwright test
 */
const env = process.env.ENV || 'qa';
const { baseURL } = loadProperties(env);

/**
 * Extended Playwright Test Object with Custom Authentication Fixtures
 * 
 * Extends base Playwright test with two authentication fixtures:
 * 1. loginAsUser - Register new user and return credentials
 * 2. loginAsAdmin - Login as predefined admin account
 * 
 * Usage in tests:
 * ```typescript
 * import { test } from '../../Fixtuers/Login';
 * 
 * test('user scenario', async ({ page, loginAsUser }) => {
 *     const { email, password } = await loginAsUser();
 *     // user is now authenticated and can perform actions
 * });
 * 
 * test('admin scenario', async ({ page, loginAsAdmin }) => {
 *     await loginAsAdmin();
 *     // admin is now authenticated and can perform admin actions
 * });
 * ```
 * 
 * @remarks
 * - Fixtures are auto-setup before each test that requests them
 * - Ensures clean, authenticated state for every test execution
 * - Reduces boilerplate auth code across test suite
 * - Provides test isolation via unique credentials per test
 */
export const test = base.extend<AuthFixtures>({
    /**
     * FIXTURE: loginAsUser
     * 
     * Complete user registration and login workflow with auto-generated credentials
     * 
     * **Workflow**:
     * 1. Generate random user profile using Faker.js:
     *    - First name, middle name, last name
     *    - Email address (based on generated names)
     *    - Password (10 characters, random)
     *    - Mobile number (9-digit starting with '9')
     *    - Location (city)
     *    - Address (street address)
     * 
     * 2. Navigate to application base URL
     * 
     * 3. Register new user via RegisterActions page object:
     *    - Fill registration form with generated data
     *    - Submit registration
     *    - Complete user profile setup
     * 
     * 4. Navigate to login page
     * 
     * 5. Login with registered credentials via LoginActions
     * 
     * 6. Return credentials for test assertions:
     *    - email: Generated email address
     *    - password: Generated password
     * 
     * **Return Value**: `{ email: string; password: string }`
     * Credentials can be used in tests for:
     * - Logging in as same user in subsequent steps
     * - Asserting user profile data
     * - Validating account settings
     * - Testing profile-specific features
     * 
     * **Benefits**:
     * - Unique credentials per test execution (prevents conflicts)
     * - Realistic user data via Faker.js
     * - Eliminates registration code duplication in tests
     * - Provides clean, authenticated session for user tests
     * - Enables testing complete user journeys (register → login → actions)
     * 
     * @async
     * @returns {Promise<{email: string; password: string}>} Registered user credentials
     * 
     * @example
     * test('user creates portfolio', async ({ page, loginAsUser }) => {
     *     const { email, password } = await loginAsUser();
     *     // user is now logged in and ready for test actions
     *     const portfolioPage = new PortfolioPage(page);
     *     await portfolioPage.addFund('HDFC');
     *     await expect(portfolioPage.fundsList).toContainText('HDFC');
     * });
     * 
     * @remarks
     * Uses faker.js for realistic random data generation:
     * - faker.name.firstName() - Generates first names (e.g., "John", "Sarah")
     * - faker.name.middleName() - Generates middle names (e.g., "Michael", "Anne")
     * - faker.name.lastName() - Generates last names (e.g., "Smith", "Johnson")
     * - faker.internet.email() - Creates email from first/last names
     * - faker.internet.password() - 10-character secure password
     * - faker.random.numeric() - 9 digits appended after '9' for phone
     * - faker.address.city() - Real city names
     * - faker.address.streetAddress() - Complete street addresses
     * 
     * Mobile number pattern: '9' + 9 random digits = 10-digit Indian mobile format
     * All generated data is unique per test execution, ensuring test isolation
     */
    loginAsUser: async ({ page }, use) => {
        async function loginAsUser() {
            const firstName = faker.name.firstName();
            const middleName = faker.name.middleName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email(firstName, lastName);
            const password = faker.internet.password(10);
            const mobile = '9' + faker.random.numeric(9);
            const location = faker.address.city();
            const address = faker.address.streetAddress();

            const register = new RegisterActions(page);
            await page.goto(baseURL); // ✅ dynamic from .properties
            await register.navigateToRegisterPage();

            await register.registerUser(
                firstName,
                middleName,
                lastName,
                email,
                password,
                mobile,
                location,
                address
            );

            await register.navigateToLogin();

            const login = new LoginActions(page);
            await login.loginWithCredentials(email, password);

            return { email, password };
        }

        await use(loginAsUser);
    },

    /**
     * FIXTURE: loginAsAdmin
     * 
     * Direct admin login using predefined credentials from environment
     * 
     * **Workflow**:
     * 1. Navigate to application base URL
     * 
     * 2. Navigate to login page
     * 
     * 3. Login with admin credentials via LoginActions:
     *    - Email: Read from ADMIN_EMAIL environment variable
     *       - Fallback: 'ambtestlab@ambmindspace.com'
     *    - Password: Read from ADMIN_PASS environment variable
     *       - Fallback: 'test1234'
     * 
     * 4. Fixture completes with admin user authenticated
     * 
     * **Return Value**: `void` (no return, just authenticated session)
     * Fixture itself handles authentication; tests just perform admin actions
     * 
     * **Benefits**:
     * - Reuses existing admin account (no registration needed)
     * - Faster execution compared to user registration flow
     * - Centralized credential management via environment variables
     * - Enables easy credential rotation without code changes
     * - Provides authenticated admin session for admin-only tests
     * 
     * **Environment Variables**:
     * - `ADMIN_EMAIL`: Admin account email address
     *   - Default: 'ambtestlab@ambmindspace.com'
     *   - Override: $env:ADMIN_EMAIL="admin@custom.com"
     * 
     * - `ADMIN_PASS`: Admin account password
     *   - Default: 'test1234'
     *   - Override: $env:ADMIN_PASS="securepassword"
     * 
     * **Use Cases**:
     * - Admin user management scenarios (@admin tag tests)
     * - Admin dashboard access and operations
     * - Admin fund/product management
     * - Admin settings and configuration changes
     * - Admin report generation and exports
     * 
     * @async
     * @returns {Promise<void>} No return value; admin is authenticated on fixture completion
     * 
     * @example
     * test('admin adds new fund', async ({ page, loginAsAdmin }) => {
     *     await loginAsAdmin();
     *     // admin is now logged in
     *     const adminFunds = new AdminMutualFunds(page);
     *     await adminFunds.addNewFund('HDFC Growth', 50.25);
     *     await expect(adminFunds.fundsList).toContainText('HDFC Growth');
     * });
     * 
     * @remarks
     * Fallback credentials ensure tests can run without environment variable setup:
     * - ADMIN_EMAIL fallback: 'ambtestlab@gmail.com'
     * - ADMIN_PASS fallback: 'test2'
     * 
     * For CI/CD pipelines, set environment variables to override fallbacks:
     * $env:ADMIN_EMAIL="ci-admin@testapp.com"
     * $env:ADMIN_PASS="ci-admin-password"
     * 
     * admin account should exist before test execution
     * Credentials must be valid in target environment (qa/staging/prod)
     */
    loginAsAdmin: async ({ page }, use) => {
        async function loginAsAdmin() {
            const login = new LoginActions(page);
            await page.goto(baseURL); // ✅ dynamic from .properties

            await login.navigateToLoginPage();

            await login.loginWithCredentials(
                process.env.ADMIN_EMAIL ?? 'ambtestlab@ambmindspace.com',
                process.env.ADMIN_PASS ?? 'test1234'
            );
        }

        await use(loginAsAdmin);
    },
});

