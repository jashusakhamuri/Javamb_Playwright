import { Page, expect } from '@playwright/test';
import { UserProfile } from '../../locators/ambTestLab/userProfile';
import logger from '../../utils/logger';

/**
 * UserProfileActions
 *
 * Encapsulates user profile related flows for AmbTestLab.
 * Responsibilities:
 * - Open the profile tab and access edit controls.
 * - Edit user attributes (first name, last name, mobile) and save changes.
 * - Verify profile fields using flexible matching (supports middle names).
 *
 * Notes:
 * - Methods perform UI interactions and logging; add additional `expect` assertions in specs when
 *   stronger end-to-end verification is required (e.g., cross-page assertions after updates).
 */
export class UserProfileActions {
    private readonly locators: UserProfile;

    constructor(page: Page) {
        this.locators = new UserProfile(page);
    }

    /**
     * Open the Profile tab.
     * - Clicks the Profile tab and verifies the Edit button is visible.
     */
    async openProfile() {
        logger.info("Navigating to Profile tab...");
        await this.locators.ProfileTab.click();
        await expect(this.locators.EditProfilebutton).toBeVisible();
        logger.info("✅ Profile page opened successfully.");
    }

    /**
     * Edit the user's profile fields.
     * - Opens the edit dialog, fills first name, last name and mobile, toggles visibility and saves changes.
     * - Email is read-only in the current UI; do not attempt to change it here.
     */
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

    /**
     * Verify profile values match expectations.
     * - Reads displayed name, mobile and email, logs actual vs expected values, uses a flexible name
     *   pattern to allow middle names between first and last.
     */
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
