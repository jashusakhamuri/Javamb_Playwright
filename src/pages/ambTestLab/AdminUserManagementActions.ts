import { Page, expect } from '@playwright/test';
import { AdminUserMangement } from '../../locators/ambTestLab/adminUserMangement';
import { DashboardPage } from '../../locators/ambTestLab/adminDashBoard'
import logger from '../../utils/logger';

export class AdminUserManagementActions {
    readonly locators: AdminUserMangement;
    readonly dashboardLocators: DashboardPage;


    constructor(page: Page) {
        this.locators = new AdminUserMangement(page);
        this.dashboardLocators = new DashboardPage(page);
    }

    async navigateToUserManagementSection() {
        logger.info("Navigating to User Management section...");
        await expect(this.dashboardLocators.DashbaordUsers).toBeVisible();
        await this.dashboardLocators.DashbaordUsers.click();
        logger.info("✅ Navigated to User Management section.");
    }



    async verifyTitle() {
        logger.info("Verifying User Management page title...");
        await expect(this.locators.TittleUSerMangement).toBeVisible();
        await expect(this.locators.TittleUSerMangement).toHaveText("User Management");
        logger.info("✅ User Management title verified.");
    }

    async checkNoUsersCardView() {
        logger.info("Checking for no registered users in card view...");
        await expect(this.locators.NoRegisterCheck).toBeVisible();
        logger.info("✅ No registered users message displayed in card view.");
    }

    async checkNoUsersTableView() {
        logger.info("Switching to table view...");
        await this.locators.CardViewButton.click();
        await expect(this.locators.NoUserFOundTable).toBeVisible();
        logger.info("✅ No users found message displayed in table view.");
    }

    async TableViewButton() {

        logger.info("Switching back to card view...");
        await this.locators.CardViewButton.click();
        logger.info("✅ Switched back to card view.");
    }

    async exportUsers() {
        logger.info("Exporting users...");
        await this.locators.ExportUsersButton.click();
        logger.info("✅ Export users button clicked.");
    }
}
