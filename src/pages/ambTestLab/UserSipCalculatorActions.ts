import { Page, expect } from '@playwright/test';
import { Spi_Calculator } from '../../locators/ambTestLab/userSipCalculator';
import logger from '../../utils/logger';

/**
 * UserSipCalculatorActions
 *
 * Provides user-focused interactions with the SIP Calculator in AmbTestLab.
 * Responsibilities:
 * - Open and interact with the SIP Calculator UI.
 * - Submit SIP calculation inputs and verify results are shown.
 * - Scroll and inspect graphs, and remove specific calculation rows when needed.
 *
 * Notes:
 * - Methods include basic `expect` checks to ensure results are visible. For stricter validation,
 *   add more assertions in the calling specs or extend these helpers.
 */
export class UserSipCalculatorActions {
    readonly locators: Spi_Calculator;
    readonly page: Page;

    constructor(page: Page) {
        this.locators = new Spi_Calculator(page);
        this.page = page;
    }

    /**
     * Open the SIP Calculator.
     * - Clicks the SIP Calculator nav item and verifies the page title is visible.
     */
    async openCalculator() {
        logger.info("Navigating to SIP Calculator tab...");
        await this.locators.NAvigateTOSipCaluculator.click();
        await expect(this.locators.title).toBeVisible();
        logger.info("✅ SIP Calculator opened successfully.");
    }

    /**
     * calculateSip
     * - Fills SIP inputs (monthly amount, years, expected return), submits the form and verifies results.
     * - Logs the invested amount, future value and estimated returns for debugging.
     */
    async calculateSip(monthlyAmount: string, years: string, expectedReturn: string) {
        logger.info(`Filling SIP form: Amount=${monthlyAmount}, Years=${years}, Return=${expectedReturn}`);
        await this.locators.minimunAmount.fill(monthlyAmount);
        await this.locators.years.fill(years);
        await this.locators.expectedAnnualReturn.fill(expectedReturn);

        logger.info("Submitting SIP form...");
        await this.locators.submitbutton.click();

        const invested = await this.locators.totalinvested.textContent();
        const futureValue = await this.locators.estfutureValue.textContent();
        const returns = await this.locators.estReturns.textContent();

        logger.info(`Results -> Invested: ${invested}, Future Value: ${futureValue}, Returns: ${returns}`);

        await expect(this.locators.totalinvested).toBeVisible();
        await expect(this.locators.estfutureValue).toBeVisible();
        await expect(this.locators.estReturns).toBeVisible();
    }


    /**
     * validateGraphs
     * - Scrolls the page to render charts and waits briefly to allow rendering; intended for visual validation.
     */
    async validateGraphs() {
        logger.info("Scrolling through SIP Calculator page to view graphs...");

        // Scroll to bottom of the page
        await this.locators.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        // Optionally wait a bit for charts/images to render
        await this.locators.page.waitForTimeout(1000);

        logger.info("✅ Finished scrolling through SIP Calculator graphs.");
    }

    /**
     * deleteCalculation
     * - Deletes the 3rd SIP calculation row (zero-based index `nth(2)`). Use carefully if rows are fewer than 3.
     */
    async deleteCalculation() {
        logger.info("Deleting 3rd SIP calculation row...");
        // Playwright uses zero-based index, so nth(2) = 3rd element 
        await this.locators.deletebtn.nth(2).click();
        logger.info("✅ 3rd SIP calculation deleted.");
    }




    // UserSipCalculatorActions.ts
    /**
     * repeatSipCalculation
     * - Repeats SIP calculations for an array of input sets. Scrolls up before each iteration and verifies results.
     */
    async repeatSipCalculation(data: { monthlyAmount: string; years: string; expectedReturn: string }[]) {
        for (const { monthlyAmount, years, expectedReturn } of data) {
            logger.info(`🔄 Filling SIP form with ${monthlyAmount}, ${years}, ${expectedReturn}`);

            await this.page.evaluate(() => window.scrollTo(0, 0));

            await this.locators.minimunAmount.fill('');
            await this.locators.years.fill('');
            await this.locators.expectedAnnualReturn.fill('');

            await this.locators.minimunAmount.fill(monthlyAmount);
            await this.locators.years.fill(years);
            await this.locators.expectedAnnualReturn.fill(expectedReturn);

            await this.locators.submitbutton.click();

            await expect(this.locators.totalinvested).toBeVisible();
            await expect(this.locators.estfutureValue).toBeVisible();
            await expect(this.locators.estReturns).toBeVisible();

            logger.info("✅ SIP calculation completed");
        }
    }




    }




