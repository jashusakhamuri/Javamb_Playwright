// src/pages/ambTestLab/AdminSettingActions.ts
import { Page, expect } from '@playwright/test';
import { AdminSetting } from '../../locators/ambTestLab/adminSetting';
import { DashboardPage } from '../../locators/ambTestLab/adminDashBoard'
import logger from '../../utils/logger';

export class AdminSettingActions {
    readonly page: Page;
    readonly locators: AdminSetting;
     readonly DashboardLoc : DashboardPage


    constructor(page: Page) {
        this.page = page;
        this.locators = new AdminSetting(page);
        this.DashboardLoc = new DashboardPage(page)
    }

    async navigateToSettings() {
        await this.DashboardLoc.DashboardSettings.click()
   
    }

    async updateAdminCredentials( name: string) {
        //await this.locators.ChangeAdminEmail.fill(email);
        await this.locators.ChangeAdminName.fill(name);
        await this.locators.UpdateButton.click();
        //await expect(this.page.locator('text=Settings updated successfully')).toBeVisible();
    }

    async exportData() {
        logger.info("Exporting all data...");
        await this.locators.ExportButton.click();
        //await expect(this.page.locator('text=Data exported successfully')).toBeVisible();
    }

    async clearData() {
        
        await this.locators.ClearButton.click();
        logger.info("Clearing all data...");
        //await expect(this.page.locator('text=All data cleared')).toBeVisible();
    }
}
