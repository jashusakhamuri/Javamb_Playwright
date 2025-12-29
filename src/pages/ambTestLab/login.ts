import { Page } from '@playwright/test';
import { LoginPage } from '../../locators/ambTestLab/Login';
import logger from '../../utils/logger';

export class LoginActions {
     readonly locators: LoginPage;

    constructor(page: Page) {
        this.locators = new LoginPage(page);
    }
    async navigateToLoginPage() {
        logger.info("Navigating to Login Page...");
        await this.locators.loginPageButton.click();
        logger.info("✅ Navigated to Login Page.");
    }


    async loginWithCredentials(email: string, password: string) {
        await this.locators.page.waitForLoadState('networkidle');
        await this.locators.emailInput.fill(email);
        await this.locators.passwordInput.fill(password);
        await this.locators.page.waitForLoadState('networkidle');
        await this.locators.loginButton.click();
    }
}
