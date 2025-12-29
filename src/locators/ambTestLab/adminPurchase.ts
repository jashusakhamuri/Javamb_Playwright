
import { Page, Locator, expect } from '@playwright/test';

export class Purchases {

    private readonly page: Page;
    readonly title: Locator;
    readonly searchInput: Locator;
    readonly totalOrders: Locator;
    readonly grossVolume: Locator;
    readonly itemsSold: Locator;
    readonly avgTicketSize: Locator;
    readonly exportButton: Locator;

    //table
    readonly tableRows: Locator;
    readonly tableActionbtn: Locator;


    //modal
    readonly closebtn: Locator;
    readonly closeModalbtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.title = page.locator("//div[@id='purchases-page']//following::h2[normalize-space(.)='Customer Purchases']");
        this.searchInput = page.locator("//input[@id='purchaseSearchInput']");
        this.totalOrders = page.locator("//p[text()='Total Orders']//parent::div//h3[@id='purchasesSummaryOrders']");
        this.grossVolume = page.locator("//p[text()='Gross Volume']//parent::div//h3[@id='purchasesSummaryRevenue']");
        this.itemsSold = page.locator("//p[text()='Items Sold']//parent::div//h3[@id='purchasesSummaryItems']");
        this.avgTicketSize = page.locator("//p[text()='Avg. Ticket Size']//parent::div//h3[@id='purchasesSummaryAverage']");
        this.exportButton = page.locator("//button[@id='exportPurchasesBtn']");
        //table
        this.tableRows = page.locator("//table[@id='purchasesTable']//tbody//tr//td[3]");
        this.tableActionbtn = page.locator("//table[@id='purchasesTable']//tbody//trtr[${rowIndex}]//td[button]");

        //modal
        this.closebtn = page.locator("//div[@id='purchaseDetailsModal']//button[normalize-space(text())='Close']");
        this.closeModalbtn = page.locator("//div[@id='purchaseDetailsModal']//div[@class='modal-header']//button[@aria-label='Close']");



    }


}



