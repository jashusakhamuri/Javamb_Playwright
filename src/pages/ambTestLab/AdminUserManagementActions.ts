import { Page, expect } from '@playwright/test';
import { AdminUserMangement } from '../../locators/ambTestLab/adminUserMangement';
import { DashboardPage } from '../../locators/ambTestLab/adminDashBoard'
import logger from '../../utils/logger';

/**
 * AdminUserManagementActions
 *
 * Encapsulates admin interactions for User Management in the AmbTestLab application.
 * Responsibilities:
 * - Navigate to the User Management admin page.
 * - Verify page title and UI elements in both card and table views.
 * - Export user data and toggle view states.
 *
 * Notes:
 * - Methods use Playwright `expect` checks for basic verification; add more assertions in specs if needed.
 * - Naming follows existing locator conventions; update locators in `src/locators/ambTestLab/adminUserMangement` if UI changes.
 */
export class AdminUserManagementActions {
    readonly locators: AdminUserMangement;
    readonly dashboardLocators: DashboardPage;


    constructor(page: Page) {
        this.locators = new AdminUserMangement(page);
        this.dashboardLocators = new DashboardPage(page);
    }

    /**
     * Navigate to the User Management admin section.
     * - Waits for the dashboard Users entry to be visible and clicks it.
     */
    async navigateToUserManagementSection() {
        logger.info("Navigating to User Management section...");
        await expect(this.dashboardLocators.DashbaordUsers).toBeVisible();
        await this.dashboardLocators.DashbaordUsers.click();
        logger.info("✅ Navigated to User Management section.");
    }



    /**
     * Verify the User Management page title and visibility.
     * - Ensures the page title is visible and matches the expected text.
     */
    async verifyTitle() {
        logger.info("Verifying User Management page title...");
        await expect(this.locators.TittleUSerMangement).toBeVisible();
        await expect(this.locators.TittleUSerMangement).toHaveText("User Management");
        logger.info("✅ User Management title verified.");
    }

    /**
     * Check the card view for absence of registered users.
     * - Verifies the 'no registered users' message is displayed in card view.
     */
    async checkNoUsersCardView() {
        logger.info("Checking for no registered users in card view...");
        await expect(this.locators.NoRegisterCheck).toBeVisible();
        logger.info("✅ No registered users message displayed in card view.");
    }

    /**
     * Check the table view for absence of registered users.
     * - Switches to table view and verifies the 'no users found' message is visible.
     */
    async checkNoUsersTableView() {
        logger.info("Switching to table view...");
        await this.locators.CardViewButton.click();
        await expect(this.locators.NoUserFOundTable).toBeVisible();
        logger.info("✅ No users found message displayed in table view.");
    }

    /**
     * Toggle view back to card view.
     * - Clicks the CardView button to return to card-based user presentation.
     */
    async TableViewButton() {

        logger.info("Switching back to card view...");
        await this.locators.CardViewButton.click();
        logger.info("✅ Switched back to card view.");
    }

    /**
     * Export users.
     * - Triggers user export via the Export button and logs completion.
     */
    async exportUsers() {
        logger.info("Exporting users...");
        await this.locators.ExportUsersButton.click();
        logger.info("✅ Export users button clicked.");
    }
}
