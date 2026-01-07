import { Page } from '@playwright/test';
import { Register } from '../../locators/ambTestLab/registerUser';
import logger from '../../utils/logger';

/**
 * RegisterActions
 *
 * Encapsulates user registration flows for AmbTestLab.
 * Responsibilities:
 * - Navigate to the registration page.
 * - Fill the registration form and submit new user details.
 * - Navigate from registration back to the login page.
 *
 * Notes:
 * - This class performs UI interactions only; add explicit `expect` checks in specs when you need
 *   stronger validation (e.g., confirmation messages or successful login after registration).
 */
export class RegisterActions {
    private readonly locators: Register;

    constructor(page: Page) {
        this.locators = new Register(page);
    }
    /**
     * Navigate to the Register page.
     * - Clicks the Register entry to open the registration form.
     */
    async navigateToRegisterPage() {
        logger.info("Navigating to Register Page...");
        await this.locators.GOTORegisterPage.click();
    }


    /**
     * Register a new user.
     * - Fills registration fields (first/middle/last name, email, password, mobile, location, address) and submits the form.
     * - Tests should use unique emails and clean up created users when necessary to keep runs idempotent.
     */
    async registerUser(
        firstName: string,
        middleName: string,
        lastName: string,
        email: string,
        password: string,
        mobile: string,
        location: string,
        address: string
    ) {
        await this.locators.Firstname.fill(firstName);
        await this.locators.MiddlName.fill(middleName);
        await this.locators.lastName.fill(lastName);
        await this.locators.Email.fill(email);
        await this.locators.Password.fill(password);
        await this.locators.ConfirmPassword.fill(password);
        await this.locators.MobileNumber.fill(mobile);
        await this.locators.Location.fill(location);
        await this.locators.Address.fill(address);
        await this.locators.RegisterButton.click();
    }

    /**
     * Navigate to the Login page from the registration view.
     */
    async navigateToLogin() {
        await this.locators.GoTOLoginPage.click();
    }
}
