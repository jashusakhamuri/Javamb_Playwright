import { Page, Locator } from '@playwright/test';

export class SipCalculatorPage {
    private readonly page: Page;

    readonly sipCalculatorDataTitleHead: Locator;
    readonly monthlyInvestmentDistributionRects: Locator;
    readonly returnRateDistributionPaths: Locator;
    readonly allSipMonthlyAmounts: Locator;
    readonly allSipYears: Locator;
    readonly allSipReturnRates: Locator;
    readonly allSipTotalInvested: Locator;
    readonly allSipFutureValues: Locator;
    readonly allSipEstimatedReturns: Locator;
    readonly allSipDates: Locator;
    readonly exportButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.sipCalculatorDataTitleHead = page.locator("//div[@id='sip-calculations-page']//h2[text()='SIP Calculator Data']");
        this.monthlyInvestmentDistributionRects = page.locator("//h5[text()='Monthly Investment Distribution']//ancestor::div[@class='card']//*[name()='g']//*[name()='rect']");
        this.returnRateDistributionPaths = page.locator("//h5[text()='Return Rate Distribution']//ancestor::div[@class='card']//*[name()='g']//*[name()='path']");
        this.allSipMonthlyAmounts = page.locator("//table[@id='calculationsTable']//td[1]");
        this.allSipYears = page.locator("//table[@id='calculationsTable']//td[2]");
        this.allSipReturnRates = page.locator("//table[@id='calculationsTable']//td[3]");
        this.allSipTotalInvested = page.locator("//table[@id='calculationsTable']//td[4]");
        this.allSipFutureValues = page.locator("//table[@id='calculationsTable']//td[5]");
        this.allSipEstimatedReturns = page.locator("//table[@id='calculationsTable']//td[6]");
        this.allSipDates = page.locator("//table[@id='calculationsTable']//td[7]");
        this.exportButton = page.locator("//div[@class='card']//button[@id='exportCalculationsBtn']");
        this.logoutButton = page.locator("//div[@id='sidebar']//a[@id='logoutBtn']");
    }
}
