import { expect, Page } from '@playwright/test';
import { LoginPage } from '../../locators/ambTestLab/Login';
import logger from '../../utils/logger';

/**
 * LoginActions
 *
 * Encapsulates login-related interactions for AmbTestLab.
 * Responsibilities:
 * - Navigate to the login page from the app flow.
 * - Fill credentials and submit the login form.
 *
 * Notes:
 * - Methods are intentionally lightweight and side-effect free where possible; add assertions in
 *   specs when additional verification is required (e.g., successful redirect or presence of user menu).
 */
export class LoginActions {
     readonly locators: LoginPage;

    constructor(page: Page) {
        this.locators = new LoginPage(page);
    }
    /**
     * Navigate to the Login page.
     * - Clicks the login entry/button and waits for navigation where appropriate.
     */
    async navigateToLoginPage() {
        logger.info("Navigating to Login Page...");
        await expect(this.locators.loginPageButton).toBeVisible();
        logger.info("✅ Login Page Button is visible.");
        await this.locators.loginPageButton.click();
        logger.info("✅ Navigated to Login Page.");
    }


    /**
     * Login using provided credentials.
     * - Fills email and password fields, waits for network idle, and clicks login.
     * - Specs should verify subsequent landing page or user menu to confirm success.
     */
    async loginWithCredentials(email: string, password: string) {
        await this.locators.page.waitForLoadState('networkidle');
        await this.locators.emailInput.fill(email);
        await expect(this.locators.emailInput).toHaveValue(email);
        logger.info(`Email set to: ${email} is expected value`);
        await this.locators.passwordInput.fill(password);
        await this.locators.page.waitForLoadState('networkidle');
        await expect(this.locators.loginButton).toBeVisible();
        logger.info("✅ Login Button is visible.");
        await this.locators.loginButton.click();
    }
}
