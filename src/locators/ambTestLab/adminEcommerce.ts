import { Page, Locator } from '@playwright/test';

export class Ecommerce {
    private readonly page: Page;
    readonly EcommercePage: Locator;
    readonly AddButton: Locator;
    readonly ExportButton: Locator;
    readonly EditCardButton: Locator;
    readonly DeleteCardButton: Locator;
    readonly EditTittleCheck: Locator;
    readonly EditProductName: Locator;
    readonly EditProductPrice: Locator;
    readonly EditProductStock: Locator;
    readonly EditProductRating: Locator;
    readonly EditProductImageUrl: Locator;
    readonly SaveChangesButton: Locator;
    readonly CancelChangesButton: Locator;
    readonly ADDTittleCheck: Locator;
    readonly AddProductName: Locator;
    readonly AddDescription: Locator;
    readonly AddProductPrice: Locator;
    readonly AddProductStock: Locator;
    readonly AddCategory: Locator;
    readonly AddProductRating: Locator;
    readonly AddProductImageUrl: Locator;
    readonly AddProductSaveButton: Locator; // renamed to avoid duplicate
    readonly CanceAddButton: Locator;
    readonly CardTitileVerify: Locator;
    readonly CommonCard: Locator;
    readonly CommonCardName: Locator;
    readonly CommonDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        //TO goto Ecommerce page
        this.EcommercePage = page.locator("//select[@id='viewSelector']"); //DropDown
        //Buttons
        this.AddButton = page.locator("//div[@id='e-commerce-view']//button[@id='addProductBtn']");
        this.ExportButton = page.locator("//div[@id='e-commerce-view']//button[@id='exportProductsBtn']");
        this.EditCardButton = page.locator("//h5[normalize-space(text())='Mens Cotton Jacket']//parent::div//button[normalize-space(.)='Edit Product']");
        /// Common Xpaht 
        this.CommonCard = page.locator("//div[contains(@class,'card product-card')]")
        this.CommonCardName = page.locator("//div[contains(@class,'card product-card')]//h5[@class='card-title']");
        this.DeleteCardButton = page.locator("//h5[normalize-space(text())='Mens Cotton Jacket']//parent::div//button[normalize-space(.)='Delete']");
        this.CommonDeleteButton = page.locator("//div[contains(@class,'card product-card')]//h5[@class='card-title']//parent::div//button[normalize-space(.)='Delete']")
        /// Editproduct Form after clicking
        this.EditTittleCheck = page.locator("//div[@class='modal-header']//h5[normalize-space(text())='Edit Product']"); // used to verify the titile Edit form
        this.EditProductName = page.locator("//form[@id='editProductForm']//input[@id='editProductName']");
        this.EditProductPrice = page.locator("//form[@id='editProductForm']//input[@id='editProductPrice']");
        this.EditProductStock = page.locator("//form[@id='editProductForm']//input[@id='editProductStock']");
        this.EditProductRating = page.locator("//form[@id='editProductForm']//input[@id='editProductRating']");
        this.EditProductImageUrl = page.locator("//form[@id='editProductForm']//input[@id='editProductImage']");
        this.SaveChangesButton = page.locator("//div[@class='modal-footer']//button[@id='saveProductBtn']");
        this.CancelChangesButton = page.locator("//h5[normalize-space(text())='Edit Product']//parent::div[@class='modal-header']//following-sibling::div//button[normalize-space(text())='Cancel']");
        //// ADD Product FOrm after cliclking ADD button
        this.ADDTittleCheck = page.locator("//div[@class='modal-header']//h5[normalize-space(text())='Add New Product']");
        this.AddProductName = page.locator("//form[@id='addProductForm']//input[@id='addProductName']");
        this.AddDescription = page.locator("//form[@id='addProductForm']//textarea[@id='addProductDescription']");
        this.AddProductPrice = page.locator("//form[@id='addProductForm']//input[@id='addProductPrice']");
        this.AddProductStock = page.locator("//form[@id='addProductForm']//input[@id='addProductStock']");
        this.AddCategory = page.locator("//form[@id='addProductForm']//input[@id='addProductCategory']");
        this.AddProductRating = page.locator("//form[@id='addProductForm']//input[@id='addProductRating']");
        this.AddProductImageUrl = page.locator("//form[@id='addProductForm']//input[@id='addProductImage']");
        this.AddProductSaveButton = page.locator("//h5[normalize-space(text())='Add New Product']//parent::div[@class='modal-header']//following-sibling::div//button[@id='saveNewProductBtn']");
        this.CanceAddButton = page.locator("//h5[normalize-space(text())='Add New Product']//parent::div[@class='modal-header']//following-sibling::div//button[normalize-space(text())='Cancel']");
        ///verify Added Cart]
        this.CardTitileVerify = page.locator("//div[contains(@class,'card product-card')]//h5[@class='card-title']");
    }
}////parent::div//button[normalize-space(.)='Delete']
