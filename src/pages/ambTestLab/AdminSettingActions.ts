// src/pages/ambTestLab/AdminSettingActions.ts
import { Page, expect } from '@playwright/test';
import { AdminSetting } from '../../locators/ambTestLab/adminSetting';
import { DashboardPage } from '../../locators/ambTestLab/adminDashBoard'
import logger from '../../utils/logger';

/**
 * AdminSettingActions
 *
 * Encapsulates admin operations for the Settings area in the AmbTestLab application.
 * Responsibilities:
 * - Navigate to the admin Settings page.
 * - Update admin credentials (e.g., name; email field is available but commented).
 * - Export and clear application data.
 *
 * Notes:
 * - Methods perform UI interactions and log progress; they do not include strict assertions by default.
 *   Add `expect` assertions inside the method or in the calling spec when required.
 * - Use `clearData()` with caution; prefer isolated or test environments when clearing data.
 */
export class AdminSettingActions {
    readonly page: Page;
    readonly locators: AdminSetting;
     readonly DashboardLoc : DashboardPage


    constructor(page: Page) {
        this.page = page;
        this.locators = new AdminSetting(page);
        this.DashboardLoc = new DashboardPage(page)
    }

    /**
     * Navigate to the Settings admin section.
     * - Clicks Dashboard -> Settings to open the admin Settings view.
     */
    async navigateToSettings() {
        await this.DashboardLoc.DashboardSettings.click()
    }

    /**
     * Update admin credentials (currently supports name).
     * - Fills the Change Admin Name field and clicks Update.
     * - If stricter verification is required, add `expect` assertions here or assert in the spec.
     */
    async updateAdminCredentials( name: string) {
        //await this.locators.ChangeAdminEmail.fill(email);
        await this.locators.ChangeAdminName.fill(name);
        logger.info("Updating admin credentials...");
        logger.info('Validating updated admin name...');
        await expect(this.locators.ChangeAdminName).toHaveValue(name);
        logger.info(`Admin name updated to: ${name} is expected value`);
        await this.locators.UpdateButton.click();
        //await expect(this.page.locator('text=Settings updated successfully')).toBeVisible();
    }

    /**
     * Export application data.
     * - Triggers the Export action via the Export button and logs the operation.
     */
    async exportData() {
        logger.info("Exporting all data...");
        await this.locators.ExportButton.click();
        //await expect(this.page.locator('text=Data exported successfully')).toBeVisible();
    }

    /**
     * Clear application data.
     * - Clicks the Clear button to remove stored data; use with caution in non-test environments.
     */
    async clearData() {
        
        await this.locators.ClearButton.click();
        logger.info("Clearing all data...");
        //await expect(this.page.locator('text=All data cleared')).toBeVisible();
    }
}
