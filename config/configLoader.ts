/**
 * @file Configuration Loader Module
 * @description Dynamic environment-specific configuration management for Playwright automation framework
 * 
 * Provides centralized, environment-agnostic configuration loading from properties files.
 * Enables seamless test execution across multiple deployment environments (QA, Staging, Production, QA Auto, Local)
 * without code modifications.
 * 
 * **Core Responsibility**:
 * - Read environment-specific .properties files (qa.properties, staging.properties, etc.)
 * - Parse key-value configuration pairs
 * - Return configuration object for use in tests, fixtures, and page objects
 * - Handle environment selection via ENV variable or explicit parameter
 * 
 * **Configuration Architecture**:
 * ```
 * ┌─────────────────────────────────────────────────┐
 * │  Environment Selection (ENV variable)            │
 * │  - Default: 'qa'                               │
 * │  - Override: $env:ENV="staging"                │
 * └────────────────┬────────────────────────────────┘
 *                  │
 *                  ▼
 * ┌─────────────────────────────────────────────────┐
 * │  configLoader.loadProperties(env)               │
 * │  - Resolves path to env.properties file        │
 * │  - Validates file existence                    │
 * │  - Parses key-value pairs                      │
 * └────────────────┬────────────────────────────────┘
 *                  │
 *                  ▼
 * ┌─────────────────────────────────────────────────┐
 * │  Configuration Object                           │
 * │  {                                              │
 * │    baseURL: "https://app-qa.ambmindspace.com",│
 * │    apiBaseURL: "https://api-qa.ambmindspace", │
 * │    timeout: "30000",                          │
 * │    ...                                         │
 * │  }                                              │
 * └─────────────────────────────────────────────────┘
 * ```
 * 
 * **Supported Environments**:
 * - **qa**: Quality Assurance environment (config/qa.properties)
 * - **staging**: Staging/Pre-Production environment (config/staging.properties)
 * - **prod**: Production environment (config/prod.properties)
 * - **qaauto**: QA Automation environment (config/qaauto.properties)
 * - **local**: Local development environment (config/local.properties)
 * 
 * **Usage Patterns**:
 * 1. In Fixtures:
 *    ```typescript
 *    const { baseURL } = loadProperties('qa');
 *    await page.goto(baseURL);
 *    ```
 * 
 * 2. In Page Objects:
 *    ```typescript
 *    const config = loadProperties(process.env.ENV || 'qa');
 *    this.apiBaseURL = config.apiBaseURL;
 *    ```
 * 
 * 3. In Tests:
 *    ```typescript
 *    const env = process.env.test_env || 'qa';
 *    const { timeout } = loadProperties(env);
 *    ```
 * 
 * **Configuration File Format** (.properties):
 * ```
 * # Comment lines start with #
 * key1=value1
 * key2=value2
 * 
 * # Special characters and spaces in values are preserved
 * baseURL=https://staging-app.com
 * apiTimeout=45000
 * ```
 * 
 * **Error Handling**:
 * - Throws Error if properties file not found for selected environment
 * - Error message includes environment name for debugging
 * - Prevents silent failures from missing configuration
 * 
 * **Key Properties Usually Defined**:
 * - `baseURL`: Application base URL for browser navigation
 * - `apiBaseURL`: API base URL for API testing
 * - `timeout`: Test execution timeout in milliseconds
 * - `retries`: Number of test retries on failure
 * - `workers`: Parallel test execution workers
 * - `adminEmail`: Admin user email (optional, can use env var instead)
 * - `adminPassword`: Admin user password (optional, can use env var instead)
 * - `dbHost`: Database hostname (if needed)
 * - `dbPort`: Database port (if needed)
 * - Custom application-specific properties
 * 
 * **Integration Points**:
 * - Fixtures (Login.ts): Load baseURL for page.goto()
 * - Config (playwright.config.ts): Load timeout and retry settings
 * - Test specs: Access environment-specific test data URLs
 * - API tests: Construct API endpoints from apiBaseURL
 * 
 * @see Fixtuers/Login.ts - Uses loadProperties for baseURL
 * @see playwright.config.ts - Uses loadProperties for test configuration
 * @see config/qa.properties - QA environment configuration
 * @see config/staging.properties - Staging environment configuration
 * @see config/prod.properties - Production environment configuration
 * @see config/qaauto.properties - QA Automation environment configuration
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';

/**
 * Load environment-specific configuration from properties file
 * 
 * **Function Purpose**:
 * Dynamically loads and parses .properties configuration file for specified environment.
 * Returns key-value pairs as JavaScript object for use throughout test framework.
 * 
 * **Workflow**:
 * 1. Resolve full file path: config/{env}.properties
 * 2. Validate file exists (throw error if missing)
 * 3. Read file content as UTF-8 string
 * 4. Parse line-by-line, extracting key=value pairs
 * 5. Filter out empty lines and comments (lines starting with #)
 * 6. Trim whitespace from keys and values
 * 7. Return configuration object
 * 
 * **Path Resolution**:
 * - Uses path.resolve() to construct absolute path
 * - __dirname resolves to config/ directory
 * - Supports cross-platform path separators (Windows, Linux, Mac)
 * 
 * **File Format**:
 * ```
 * # Comments start with # and are ignored
 * # Empty lines are also ignored
 * baseURL=https://qa-app.com
 * apiBaseURL=https://qa-api.com
 * timeout=30000
 * ```
 * 
 * **Parsing Logic**:
 * - Split file content by newline characters
 * - For each line:
 *   - Trim leading/trailing whitespace
 *   - Skip empty lines (after trim, if length is 0)
 *   - Skip comment lines (start with #)
 *   - Split by = delimiter
 *   - Extract key and value
 *   - Trim key and value individually
 *   - Add to properties object if both key and value exist
 * 
 * **Error Handling**:
 * Throws descriptive Error if configuration file not found:
 * ```
 * Error: ❌ Config file not found for environment: staging
 * ```
 * This prevents tests running with incomplete configuration.
 * 
 * **Return Type**: `Record<string, string>`
 * All configuration values are strings. Type coercion handled by consumers:
 * - parseInt() for numeric values
 * - JSON.parse() for complex objects
 * - Direct string usage for URLs and identifiers
 * 
 * **Common Properties Returned**:
 * - baseURL: string - Application base URL for browser tests
 * - apiBaseURL: string - API base URL for API tests
 * - timeout: string - Test timeout in milliseconds (as string, parse to number)
 * - retries: string - Number of retries (as string, parse to number)
 * - workers: string - Parallel workers (as string, parse to number)
 * - [custom]: string - Any custom properties defined in .properties file
 * 
 * **Usage Examples**:
 * ```typescript
 * // Load QA environment config
 * const qaConfig = loadProperties('qa');
 * console.log(qaConfig.baseURL); // "https://qa-app.com"
 * 
 * // Load config from ENV variable
 * const env = process.env.ENV || 'qa';
 * const config = loadProperties(env);
 * await page.goto(config.baseURL);
 * 
 * // Destructure specific properties
 * const { baseURL, apiBaseURL, timeout } = loadProperties('staging');
 * 
 * // Parse numeric values
 * const { timeout } = loadProperties('prod');
 * const timeoutMs = parseInt(timeout, 10);
 * 
 * // Access custom properties
 * const config = loadProperties('qaauto');
 * const customProp = config['my.custom.property'];
 * ```
 * 
 * **Error Scenarios**:
 * 1. File not found:
 *    ```
 *    loadProperties('invalid')
 *    // Throws: Error: ❌ Config file not found for environment: invalid
 *    ```
 * 
 * 2. File path resolution:
 *    - Uses __dirname for consistent path resolution
 *    - Works from any directory (not cwd-dependent)
 *    - Cross-platform compatible
 * 
 * **Performance**:
 * - Synchronous file read (fs.readFileSync)
 * - Suitable for test setup phase (one-time load)
 * - File caching handled by Node.js internally
 * - Consider memoization if calling multiple times per test
 * 
 * **Parameter**:
 * @param {string} env - Environment name (qa, staging, prod, qaauto, local)
 *                       Maps to config/{env}.properties file name
 * 
 * **Return Value**:
 * @returns {Record<string, string>} Object with configuration key-value pairs
 *                                   All values are strings; consumers must parse if needed
 * 
 * **Throws**:
 * @throws {Error} If properties file not found for specified environment
 *                 Error message: "❌ Config file not found for environment: {env}"
 * 
 * @example
 * // Basic usage in fixture
 * const { baseURL } = loadProperties('qa');
 * await page.goto(baseURL);
 * 
 * @example
 * // Environment-aware loading
 * const env = process.env.ENV || 'qa';
 * const config = loadProperties(env);
 * const apiURL = config.apiBaseURL;
 * const timeout = parseInt(config.timeout, 10);
 * 
 * @example
 * // In test setup
 * test('example', async () => {
 *     const { baseURL } = loadProperties('staging');
 *     await page.goto(baseURL);
 * });
 */
export function loadProperties(env: string) {
    /**
     * Resolve absolute path to properties file
     * 
     * @constant {string} filePath
     * Constructed as: {configDirectory}/{env}.properties
     * 
     * Example paths:
     * - /app/config/qa.properties
     * - /app/config/staging.properties
     * - /app/config/prod.properties
     * - /app/config/qaauto.properties
     * - /app/config/local.properties
     */
    const filePath = path.resolve(__dirname, `${env}.properties`);
    
    /**
     * Validate properties file existence
     * 
     * Uses fs.existsSync() for synchronous file check
     * Prevents silent failures from missing configuration
     * Provides immediate feedback if environment not configured
     */
    if (!fs.existsSync(filePath)) {
        throw new Error(`❌ Config file not found for environment: ${env}`);
    }

    /**
     * Read properties file content
     * 
     * @param {string} filePath - Absolute path to properties file
     * @param {string} encoding - UTF-8 encoding for text file
     * 
     * Returns raw file content as string with preserved line breaks
     * Synchronous operation suitable for test initialization
     */
    const raw = fs.readFileSync(filePath, 'utf-8');
    
    /**
     * Initialize empty properties object
     * Will be populated with parsed key-value pairs
     * 
     * @type {Record<string, string>}
     * Type ensures all values are strings for consistent handling
     */
    const props: Record<string, string> = {};

    /**
     * Parse properties file line-by-line
     * 
     * **Parsing Algorithm**:
     * 1. Split raw content by newline characters (\n)
     * 2. Iterate each line
     * 3. Trim whitespace (removes leading/trailing spaces, tabs, etc.)
     * 4. Skip empty lines (empty string after trim)
     * 5. Skip comment lines (start with # after trim)
     * 6. Split remaining lines by = delimiter
     * 7. Extract key and value from split result
     * 8. Validate both key and value exist
     * 9. Add to props object with trimmed key and value
     * 
     * **Comment Support**:
     * Lines starting with # are treated as comments and ignored
     * Enables configuration documentation within file:
     * ```
     * # Database Configuration
     * dbHost=localhost
     * dbPort=5432
     * 
     * # Application Settings
     * timeout=30000
     * ```
     * 
     * **Whitespace Handling**:
     * - Leading/trailing whitespace trimmed from all lines
     * - Whitespace around = is trimmed from key and value
     * - Preserves internal whitespace in values
     * Example:
     * ```
     * baseURL   =   https://app.com   
     * // Results in: baseURL = "https://app.com"
     * ```
     * 
     * **Invalid Line Handling**:
     * - Lines without = delimiter are silently ignored
     * - Lines with empty key or value are skipped
     * - Enables graceful handling of malformed entries
     */
    raw.split('\n').forEach(line => {
        /**
         * Trim whitespace from current line
         * Removes leading/trailing spaces, tabs, newlines
         */
        const trimmed = line.trim();
        
        /**
         * Skip empty lines (after trim, length is 0)
         * Allows blank lines for readability in .properties files
         */
        if (!trimmed || trimmed.startsWith('#')) return;
        
        /**
         * Split line by = delimiter
         * Results in [key, value] array
         * 
         * Example: "baseURL=https://app.com"
         * Results: ["baseURL", "https://app.com"]
         */
        const [key, value] = trimmed.split('=');
        
        /**
         * Validate key and value exist, then add to properties
         * 
         * Conditions:
         * - key must exist (not undefined, not empty after trim)
         * - value must exist (not undefined, not empty after trim)
         * 
         * Both are individually trimmed to remove surrounding whitespace
         * Example: " baseURL = https://app.com "
         * Results: props["baseURL"] = "https://app.com"
         */
        if (key && value) {
            props[key.trim()] = value.trim();
        }
    });

    /**
     * Return parsed configuration object
     * 
     * @returns {Record<string, string>} Properties object with configuration key-value pairs
     * 
     * All values are strings; consumers responsible for type conversion:
     * - parseInt(value, 10) for numeric values
     * - JSON.parse(value) for complex objects
     * - Direct usage for string values (URLs, identifiers, etc.)
     * 
     * Empty if no valid key-value pairs found in file
     * (Parsing silently skips invalid lines)
     */
    return props;
}
