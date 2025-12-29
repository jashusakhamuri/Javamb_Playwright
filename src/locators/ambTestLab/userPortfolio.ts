import { Page, Locator, } from '@playwright/test';
export class Portfolio {

    readonly page: Page;  // just *declares* a place to store a Page (empty for now)
    readonly ToVerifyCartCount: Locator;
    readonly SummaryTotal: Locator;
    readonly SummarySavings: Locator;
    readonly ProductCardName: Locator;
    readonly DeleteButton: Locator;
    readonly ProccerdTOBuyButton: Locator;
    readonly SecurePayment: Locator;
    readonly ReturnToPortfolio: Locator;
    readonly ToVerifyPaymentSuccessful: Locator;
    readonly ViewPurchaseSummary: Locator;
    readonly ReviewConfirm: Locator;
    readonly VerifyFunds: Locator;
    readonly VerifyNameOfProduct: Locator;
    readonly VerifySummaryInvested: Locator;
    readonly VerifySummarySavings: Locator;
    readonly verifysummaryReturns: Locator;
    readonly ToReturnPortfilo: Locator;
    constructor(page: Page) {
        this.page = page;
        // ----------------verification--------------
        this.ToVerifyCartCount = page.locator("//span[normalize-space(text())='Total funds in portfolio']//parent::div//div[@id='summaryCount']")
        this.SummaryTotal = page.locator("//span[normalize-space(text())='Combined portfolio price']/parent::div//div[@id='summaryTotal']")
        this.SummarySavings = page.locator("//span[normalize-space(text())='Total savings vs MRP']/parent::div//div[@id='summarySavings']")
        this.ProductCardName = page.locator(" //div[@class='doc - pro - name']//span[not(preceding-sibling::span)]")
        this.DeleteButton = page.locator("//button[normalize-space(.)='Delete']")
        //--------------- TO BUY ---------------
        this.ProccerdTOBuyButton = page.locator("//button[normalize-space(.)='Proceed to Buy']")
        this.SecurePayment = page.locator("//button[normalize-space(.)='Complete Secure Payment']")
        this.ReturnToPortfolio = page.locator("Return to Portfolio = //button[contains(normalize-space(text()), 'Return to Portfolio')]")
        //----------------TO verify Payment----------------------
        this.ToVerifyPaymentSuccessful = page.locator(" //div[@class='success-card']//h1[normalize-space(text())='Payment Successful'] ")

        this.ViewPurchaseSummary = page.locator("//div[@class='success-card']//a[normalize-space(text())='View Purchase Summary']")

        this.ReviewConfirm = page.locator("//h3[normalize-space(text())='Review & Confirm']/following-sibling::span[@id='itemCount']")
        //-----------------------------Purchase summary verfication-----------------------------------///////
        this.VerifyFunds = page.locator("//div[@id='summaryMeta']//following-sibling::span[contains(normalize-space(text()), 'funds')]")
        this.VerifyNameOfProduct = page.locator("//tbody[@id='summaryBody']//div")  /// to get value
        this.VerifySummaryInvested = page.locator("//div[text()='Total Invested']//parent::div//div[@id='summaryInvested']")

        this.VerifySummarySavings = page.locator("//div[text()='Savings vs Original']//parent::div//div[@id='summarySavings']")

        this.verifysummaryReturns = page.locator("//div[text()='Average 5Y Returns']//parent::div//div[@id='summaryReturns']")
        //TOO---return--portfilo Dashborad vrom Summary Verifcation----------
        this.ToReturnPortfilo = page.locator("//div[@class='container-fluid']//span[text()='Portfolio']")

    }

}