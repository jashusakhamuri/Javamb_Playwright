/**
 * @class FundsPage
 * @description Locator class for user funds discovery page
 */
import { Page, Locator, expect } from '@playwright/test';

export class FundsPage {
     readonly page: Page;

    // Navigation tabs
    readonly fundsTab: Locator;
    readonly sipCalculationsTab: Locator;
    readonly dashboardTab: Locator;
    readonly logoutTab: Locator;
    readonly portfolioTab: Locator;
    readonly mutualFundsTab: Locator;

    // Page controls
    readonly refreshButton: Locator;
    readonly cardHolderNames: Locator;

    // Fund actions (test fixtures: Emily Johnson, James Davis)
    readonly addButtonForEmilyJohnson: Locator;
    readonly buyNowButtonForEmilyJohnson: Locator;

    // Pagination
    readonly prevButton: Locator;
    readonly nextButton: Locator;

    // Page verification
    readonly discoverFundsHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.fundsTab = page.locator("//div[@class='container-fluid']//a[text()='Funds']");
        this.sipCalculationsTab = page.locator("//div[@class='container-fluid']//a[normalize-space(text())='SIP Calculator']");
        this.dashboardTab = page.locator("//div[@class='container-fluid']//a[text()='Dashboard']");
        this.logoutTab = page.locator("//div[@class='container-fluid']//a[text()='Logout']");
        this.portfolioTab = page.locator("//div[@class='container-fluid']//span[text()='My Portfolio']");
        this.mutualFundsTab = page.locator("//div[@class='container-fluid']//a[text()='Mutual Funds']");
        this.refreshButton = page.locator("//div//button[@id='refreshBtn']");
        this.cardHolderNames = page.locator("//div[@id='fundsContainer']//div[contains(@class,'pro-name')]");
        this.addButtonForEmilyJohnson = page.locator("//div[@class='doc-pro-name']//a[normalize-space(text())='James Davis']/ancestor::div[contains(@class,'doctor-profile-widget')]//div[@class='doc-content flex-grow-1']//button//span[normalize-space(text())='Add']");
        this.buyNowButtonForEmilyJohnson = page.locator("//div[@class='doc-pro-name']//a[normalize-space(text())='Emily Johnson']   /ancestor::div[contains(@class,'doctor-profile-widget')]//div[@class='doc-content flex-grow-1']//button//span[normalize-space(text())='Buy Now']");
        this.prevButton = page.locator("//nav[@aria-label='Page navigation']//li//a[text()='Prev']");
        this.nextButton = page.locator("//nav[@aria-label='Page navigation']//li//a[text()='Next']");
        this.discoverFundsHeading = page.locator("//div[@class='page-heading']//h2[text()='Discover Funds']");
    }

    async waitForPortfolioNavigation() {
        await this.page.waitForURL('**/portfolio', { timeout: 60000 });
    }

    async waitForCheckout() {
        await this.page.waitForURL('**/checkout.html', { waitUntil: 'networkidle' });
    }
}

