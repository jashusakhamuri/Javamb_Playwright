import { Page } from '@playwright/test';
import { Register } from '../../locators/ambTestLab/registerUser';
import logger from '../../utils/logger';

export class RegisterActions {
    private readonly locators: Register;

    constructor(page: Page) {
        this.locators = new Register(page);
    }
    async navigateToRegisterPage() {
        logger.info("Navigating to Register Page...");
        await this.locators.GOTORegisterPage.click();
          
    }


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

    async navigateToLogin() {
        await this.locators.GoTOLoginPage.click();
    }
}
