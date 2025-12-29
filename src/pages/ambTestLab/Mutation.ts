import { Page, Locator, expect } from '@playwright/test';
import logger from '../../../src/utils/logger';

export class ShowInputMethodPage {

    readonly page: Page;
    readonly InputShowcase: Locator;

    readonly HideAllInputs: Locator;
    readonly ShowCaseInputs: Locator;
    readonly MutationUsername: Locator;

    constructor(page: Page) {
        this.page = page;

        // Sidebar buttons
        this.HideAllInputs = page.locator("//div[@id='sidebar']//span[normalize-space(.)='Hide All Inputs']");
        this.ShowCaseInputs = page.locator("//div[@id='sidebar']//span[normalize-space(.)='Show All Inputs']");
        this.InputShowcase = page.locator("//div[@id='sidebar']//a[@data-page='input-showcase']");

        // Form input
        this.MutationUsername = page.locator("//div[@class='card-body']//input[@id='mutation-username']");
    }

    // ✅ Navigate to Input Showcase
    async InputsShowcase() {
        logger.info("🔹 Navigating to Input Showcase page");
        await this.InputShowcase.click();
        await expect(this.MutationUsername).toBeVisible(); // default state
    }

    // ✅ Hide inputs (only if visible)
    async hideInputs() {
        logger.info("🔹 Clicking Hide All Inputs");

        // ✅ Always click first
        await this.HideAllInputs.click();

        //// ✅ Now check the result
        //if (await this.MutationUsername.isHidden()) {
        //    logger.info("✅ Username is hidden after clicking Hide All Inputs");
        //} else {
        //    logger.error("❌ Username is STILL visible after clicking Hide All Inputs");
        //}

        // ✅ Final assertion
        await expect(this.MutationUsername).toBeHidden();
    }

    // ✅ Show inputs (only if hidden)
    async showInputs() {
        logger.info("🔹 Clicking Show All Inputs");

        //if (await this.MutationUsername.isHidden()) {
        //    await this.ShowCaseInputs.click();
        //} else {
        //    logger.info("⚠️ Username already visible — skipping Show All Inputs click");
        //}

        await expect(this.MutationUsername).toBeVisible();
    }

    // ✅ Fill username only if visible
    //async fillUsernameIfVisible(value: string = "test") {
    //    logger.info("🔍 Checking if Mutation Username is visible before filling");

    //    if (await this.MutationUsername.isVisible()) {
    //        logger.info(`✏️ Filling Mutation Username with: ${value}`);
    //        await this.MutationUsername.fill(value);
    //    } else {
    //        logger.warn("⚠️ Mutation Username is hidden — skipping fill action");
    //    }
    //}

    // ✅ Explicit visibility checks
    //async verifyUsernameVisible() {
    //    logger.info("✅ Checking Mutation Username is visible");
    //    await expect(this.MutationUsername).toBeVisible();
    //}

    //async verifyUsernameHidden() {
    //    logger.info("✅ Checking Mutation Username is hidden");
    //    await expect(this.MutationUsername).toBeHidden();
    //}
}
