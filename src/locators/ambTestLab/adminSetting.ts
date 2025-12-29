import { Page, Locator } from '@playwright/test';
export class AdminSetting {

    private readonly page: Page;
    readonly SettingHeader: Locator;
    readonly ChangeAdminEmail: Locator;
    readonly ChangeAdminName: Locator;
    readonly UpdateButton: Locator; 
    readonly ExportButton: Locator;
    readonly ClearButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.SettingHeader = page.locator("//div[@id='settings-page']//h2[normalize-space(text())='Admin Settings']");
        //Change Admin Credentials
        this.ChangeAdminEmail = page.locator("//form[@id='adminSettingsForm']//input[@id='adminEmail']")
        this.ChangeAdminName = page.locator("//form[@id='adminSettingsForm']//input[@id='adminNameInput']")
        this.UpdateButton = page.locator("//form[@id='adminSettingsForm']//button[normalize-space(text())='Update Settings']")
        //Data Management
        this.ExportButton = page.locator("//div[@class='card-body']//button[@id='exportAllDataBtn']")
        this.ClearButton = page.locator("//div[@class='card-body']//button[@id='clearAllDataBtn']")
    }
}
