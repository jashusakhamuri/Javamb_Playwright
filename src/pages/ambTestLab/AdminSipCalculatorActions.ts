// src/pages/ambTestLab/SipCalculatorActions.ts
import { Page, expect } from '@playwright/test';
import { SipCalculatorPage } from '../../locators/ambTestLab/adminSipCalculator';
import { DashboardPage } from '../../locators/ambTestLab/adminDashBoard'
import logger from '../../utils/logger';

export class SipCalculatorActions {
    private readonly page: Page;
    private readonly locators: SipCalculatorPage;
	readonly DashboardLoc: DashboardPage

    constructor(page: Page) {
        this.page = page;
        this.locators = new SipCalculatorPage(page);
		this.DashboardLoc = new DashboardPage(page)
    }

    async navigateToSipCalculator() { 
		logger.info("Navigating to SIP Calculator section...");
        await this.DashboardLoc.DashboardSipCalculator.waitFor({ state: 'visible' });
        await this.DashboardLoc.DashboardSipCalculator.click();
		logger.info("✅ Navigated to SIP Calculator section.");
      
    }



    async verifyCalculatorPageLoaded() {
        await this.locators.sipCalculatorDataTitleHead.waitFor({ state: 'visible' });
        logger.info("✅ SIP Calculator page loaded");
    }

    // ❌ Remove chart validation from Admin flow
    // async validateCharts() { ... }

    async validateTableData() {
        const rows = await this.locators.allSipMonthlyAmounts.count();
        expect(rows).toBeGreaterThan(0); // ✅ ensure table has data
        logger.info(`📊 Found ${rows} SIP rows in table`);

        for (let i = 0; i < rows; i++) {
            const monthlyAmount = await this.locators.allSipMonthlyAmounts.nth(i).textContent();
            const years = await this.locators.allSipYears.nth(i).textContent();
            const returnRate = await this.locators.allSipReturnRates.nth(i).textContent();
            logger.info(`Row ${i + 1}: Amount=${monthlyAmount}, Years=${years}, ReturnRate=${returnRate}`);
        }

        await expect(this.locators.allSipFutureValues.first()).toBeVisible();
        await expect(this.locators.allSipEstimatedReturns.first()).toBeVisible();
    }

    async exportCalculations() {
        await this.locators.exportButton.waitFor({ state: 'visible' });
        await this.locators.exportButton.click(); logger.info("📤 Exported SIP calculations");
        // ✅ Use a unique locator to avoid strict mode violation 
        await expect(this.page.locator('#exportCalculationsBtn')).toBeVisible();
    }

    async logout() {
        await this.locators.logoutButton.waitFor({ state: 'visible' });
        await this.locators.logoutButton.click();
        logger.info("🚪 Logged out from SIP Calculator");
    }
}
