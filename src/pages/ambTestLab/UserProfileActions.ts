import { Page, expect } from '@playwright/test';
import { UserProfile } from '../../locators/ambTestLab/userProfile';
import logger from '../../utils/logger';

export class UserProfileActions {
    private readonly locators: UserProfile;

    constructor(page: Page) {
        this.locators = new UserProfile(page);
    }

    async openProfile() {
        logger.info("Navigating to Profile tab...");
        await this.locators.ProfileTab.click();
        await expect(this.locators.EditProfilebutton).toBeVisible();
        logger.info("✅ Profile page opened successfully.");
    }

    async editProfile(firstName: string, lastName: string, mobile: string){
        logger.info("Editing user profile...");

        await this.locators.EditProfilebutton.click();

        await this.locators.EditFirstName.fill(firstName);
        await this.locators.Editlastname.fill(lastName);
        await this.locators.EditMobileNo.fill(mobile);
       

        // ⚠️ Email field is readonly, skip filling
   

        await this.locators.VisiblityButton.click();
        await this.locators.SaveChangeButton.click();

        logger.info("✅ Profile changes saved.");
    }

    async verifyProfile(expectedFirst: string, expectedLast: string, expectedMobile: string) {
        logger.info("Verifying updated profile details...");

        const nameText = await this.locators.FullName.textContent();
        const mobileText = await this.locators.mobieNumber.textContent();
        const emailText = await this.locators.EmailID.textContent();

        // Log actual values
        logger.info(`🔎 Actual Profile -> Name: ${nameText}, Mobile: ${mobileText}, Email: ${emailText}`);

        // Log expected values
        logger.info(`✅ Expected Profile -> Name: ${expectedFirst} ${expectedLast}, Mobile: ${expectedMobile}`);

        // Allow for middle names between first and last
        const namePattern = new RegExp(`${expectedFirst}.*${expectedLast}`);
        logger.info(`Comparing FullName: expected pattern ${namePattern}, actual "${nameText}"`);
        await expect(this.locators.FullName).toHaveText(namePattern);

        logger.info(`Comparing Mobile: expected "${expectedMobile}", actual "${mobileText}"`);
        await expect(this.locators.mobieNumber).toHaveText(expectedMobile);


        logger.info("✅ Profile verification completed successfully.");
    }


}
