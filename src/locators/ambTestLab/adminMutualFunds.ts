import { Page, Locator, } from '@playwright/test';
export class AdimnMutualFunds {
    private readonly page: Page;
    readonly AddFundButton: Locator;
    readonly ClickToSeeAddFundForm: Locator;
    readonly SearchBar: Locator;
    readonly ExportButton: Locator;
    readonly importButton: Locator;
    readonly EditButton: Locator;
    readonly DeleteButton: Locator;
    readonly EditTittle: Locator;
    readonly EditFundName: Locator;
    readonly EditFundCode: Locator;
    readonly EditCategoryDropDown: Locator;
    readonly Editimage: Locator;
    readonly EditOfferPrice: Locator;
    readonly EditRiskLevel: Locator;
    readonly UpdateFund: Locator;
    readonly AddTittle: Locator;
    readonly AddFundName: Locator;
    readonly AddFundCode: Locator;
    readonly AddCategoryDropDown: Locator;
    readonly Addimage: Locator;
    readonly AddOfferPrice: Locator;
    readonly AddRiskLevel: Locator;
    readonly AddFundNav: Locator;
    readonly AddOriginalPrice: Locator;
    readonly AddYearReturn: Locator;
    readonly Add3YearReturn: Locator;
    readonly Addd5YearReturn: Locator;
    readonly AddFundHouse: Locator;
    readonly location: Locator;
    readonly SaveButton: Locator;
    readonly PrevButton: Locator;
    readonly NxtButton: Locator;



    constructor(page: Page) {
        this.page = page;
        //-------------Buttons------
        this.AddFundButton = page.locator("//div[@id='mutual-funds-data-page']//button[@id='addFundBtn']")
        this.ClickToSeeAddFundForm = page.locator("//form[@id='fundForm']//span[normalize-space(text())='Show All Form Fields']")
        this.SearchBar = page.locator("//div[@id='mutual-funds-data-page']//input[@id='mutualFundsSearch']")
        this.ExportButton = page.locator("//div[@id='mutual-funds-data-page']//button[@id='exportFundsBtn']")
        this.importButton = page.locator("//div[@id='mutual-funds-data-page']//label[normalize-space(.)='Import']")
        this.EditButton = page.locator("//h5[normalize-space(text())='Emily Johnson']//ancestor::div[@class='fund-card-body']//button[normalize-space(text())='Edit']")
        this.DeleteButton = page.locator("//h5[normalize-space(text())='Emily Johnson']//ancestor::div[@class='fund-card-body']//button[normalize-space(text())='Delete']")
        this.PrevButton = page.locator("//ul[@id='mutualFundsPagination']//a[normalize-space(.)='Prev']")
        this.NxtButton = page.locator("//ul[@id='mutualFundsPagination']//a[normalize-space(.)='Next']")
        //// EDIT FRAME--- afer clicking Edit button in  card
        this.EditTittle = page.locator("//form[@id='fundForm']//h5[@id='fundModalTitle']")  // tobehavetxt("Edit Fund")
        this.EditFundName = page.locator("//form[@id='fundForm']//input[@id='fundNameInput']")
        this.EditFundCode = page.locator("//form[@id='fundForm']//input[@id='fundCodeInput']")
        this.EditCategoryDropDown = page.locator("//form[@id='fundForm']//select[@id='fundCategoryInput']")
        this.Editimage = page.locator("//form[@id='fundForm']//input[@id='fundImageInput']") // pass ulr image as input
        this.EditOfferPrice = page.locator("//form[@id='fundForm']//input[@id='fundPriceInput']")
        this.EditRiskLevel = page.locator("//form[@id='fundForm']//select[@id='fundRiskInput']")
        this.UpdateFund = page.locator("//form[@id='fundForm']//button[@id='saveFundBtn']")

        //ADD Frame----- affter clicking above button
        this.AddTittle = page.locator("//form[@id='fundForm']//h5[@id='fundModalTitle']")  // tobehavetxt("Add Fund")
        this.AddFundName = page.locator("//form[@id='fundForm']//input[@id='fundNameInput']")
        this.AddFundCode = page.locator("//form[@id='fundForm']//input[@id='fundCodeInput']")
        this.AddCategoryDropDown = page.locator("//form[@id='fundForm']//select[@id='fundCategoryInput']")
        this.Addimage = page.locator("//form[@id='fundForm']//input[@id='fundImageInput']") // pass ulr image as input
        this.AddOfferPrice = page.locator("//form[@id='fundForm']//input[@id='fundPriceInput']")
        this.AddRiskLevel = page.locator("//form[@id='fundForm']//select[@id='fundRiskInput']")
        this.AddFundNav = page.locator("//form[@id='fundForm']//input[@id='fundNavInput']")
        this.AddOfferPrice = page.locator("//form[@id='fundForm']//input[@id='fundPriceInput']")
        this.AddOriginalPrice = page.locator("//form[@id='fundForm']//input[@id='fundOriginalPriceInput']")
        this.AddYearReturn = page.locator("//form[@id='fundForm']//input[@id='fundReturn1YInput']")
        this.Add3YearReturn = page.locator("//form[@id='fundForm']//input[@id='fundReturn3YInput']")
        this.Addd5YearReturn = page.locator("//form[@id='fundForm']//input[@id='fundReturn5YInput']")
        this.AddFundHouse = page.locator("//form[@id='fundForm']//input[@id='fundVendorInput']")
        this.location = page.locator("//form[@id='fundForm']//input[@id='fundLocationInput']")
        this.SaveButton = page.locator("//form[@id='fundForm']//button[@id='saveFundBtn']")
    }
}