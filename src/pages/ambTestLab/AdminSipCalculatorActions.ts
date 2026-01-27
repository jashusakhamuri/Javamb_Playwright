// src/pages/ambTestLab/SipCalculatorActions.ts
import { Page, expect } from '@playwright/test';
import { SipCalculatorPage } from '../../locators/ambTestLab/adminSipCalculator';
import { DashboardPage } from '../../locators/ambTestLab/adminDashBoard'
import logger from '../../utils/logger';

/**
 * SipCalculatorActions (Admin)
 *
 * Encapsulates administrative interactions with the SIP Calculator area in AmbTestLab.
 * Responsibilities:
 * - Navigate to the SIP Calculator admin page.
 * - Verify that the calculator page and its expected UI elements are loaded.
 * - Validate table data rows and export calculation results.
 * - Provide a safe logout operation.
 *
 * Notes:
 * - Methods perform UI interactions and include basic verification (`expect`) where appropriate.
 * - Avoid destructive operations in production; export/validation helpers are intended for test environments.
 */
export class SipCalculatorActions {
    private readonly page: Page;
    private readonly locators: SipCalculatorPage;
	readonly DashboardLoc: DashboardPage

    constructor(page: Page) {
        this.page = page;
        this.locators = new SipCalculatorPage(page);
		this.DashboardLoc = new DashboardPage(page)
    }

    /**
     * Navigate to the SIP Calculator admin section.
     * - Waits for the dashboard entry to be visible and clicks it.
     * - Logs progress to the test logger.
     */
    async navigateToSipCalculator() { 
		logger.info("Navigating to SIP Calculator section...");
        await this.DashboardLoc.DashboardSipCalculator.waitFor({ state: 'visible' });
        await this.DashboardLoc.DashboardSipCalculator.click();
		logger.info("✅ Navigated to SIP Calculator section.");
    }



    /**
     * Verify the SIP Calculator page has loaded.
     * - Waits for the page header/title to be visible and logs the result.
     */
    async verifyCalculatorPageLoaded() {
        await this.locators.sipCalculatorDataTitleHead.waitFor({ state: 'visible' });
        logger.info("✅ SIP Calculator page loaded");
    }

    // ❌ Remove chart validation from Admin flow
    // async validateCharts() { ... }

    /**
     * Validate the SIP calculations table data.
     * - Ensures at least one row exists, logs row summaries, and verifies key result columns are visible.
     * - Designed for admin-level verification of table integrity and basic correctness.
     */
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
        logger.info("✅ Future values are visible");
        await expect(this.locators.allSipEstimatedReturns.first()).toBeVisible();
        logger.info("✅ Estimated returns are visible");
    }

    /**
     * Export SIP calculations.
     * - Clicks the export button and verifies the expected export element is visible.
     * - Useful for validating export workflows in tests.
     */
    async exportCalculations() {
        await this.locators.exportButton.waitFor({ state: 'visible' });
        await this.locators.exportButton.click(); logger.info("📤 Exported SIP calculations");
        // ✅ Use a unique locator to avoid strict mode violation 
        await expect(this.page.locator('#exportCalculationsBtn')).toBeVisible();
    }

    /**
     * Logout from the SIP Calculator area.
     * - Clicks logout and logs the action; intended for test cleanup.
     */
    async logout() {
        await this.locators.logoutButton.waitFor({ state: 'visible' });
        await this.locators.logoutButton.click();
        logger.info("🚪 Logged out from SIP Calculator");
    }
}
