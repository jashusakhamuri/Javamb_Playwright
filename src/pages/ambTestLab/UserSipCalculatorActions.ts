import { Page, expect } from '@playwright/test';
import { Spi_Calculator } from '../../locators/ambTestLab/userSipCalculator';
import logger from '../../utils/logger';



export class UserSipCalculatorActions {
    readonly locators: Spi_Calculator;
    readonly page: Page;

    constructor(page: Page) {
        this.locators = new Spi_Calculator(page);
        this.page = page;
    }

    async openCalculator() {
        logger.info("Navigating to SIP Calculator tab...");
        await this.locators.NAvigateTOSipCaluculator.click();
        await expect(this.locators.title).toBeVisible();
        logger.info("✅ SIP Calculator opened successfully.");
    }

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

    async deleteCalculation() {
        logger.info("Deleting 3rd SIP calculation row...");
        // Playwright uses zero-based index, so nth(2) = 3rd element 
        await this.locators.deletebtn.nth(2).click();
        logger.info("✅ 3rd SIP calculation deleted.");
    }


    // 🔥 New helper: repeat SIP calculation with scroll up
    //async repeatSipCalculation(monthlyAmount: string, years: string, expectedReturn: string, repeatCount: number) {
    //    for (let i = 0; i < repeatCount; i++) {
    //        logger.info(`🔄 Repetition ${i + 1}: scrolling up and refilling SIP form...`);
    //        // Scroll to top before filling again
    //        await this.page.evaluate(() => window.scrollTo(0, 0));
    //        // Clear old values await this.locators.minimunAmount.fill('');
    //        await this.locators.years.fill(''); await this.locators.expectedAnnualReturn.fill('');
    //        // Fill new values await this.locators.minimunAmount.fill(monthlyAmount);
    //        await this.locators.years.fill(years); await this.locators.expectedAnnualReturn.fill(expectedReturn);
    //        // Submit a
    //        await this.locators.submitbutton.click();
    //        // Confirm results visible
    //        await expect(this.locators.totalinvested).toBeVisible();
    //        await expect(this.locators.estfutureValue).toBeVisible();
    //        await expect(this.locators.estReturns).toBeVisible();
    //        logger.info(`✅ Repetition ${i + 1} completed`);
    //    }


    // UserSipCalculatorActions.ts
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




