/**
 * @class Ecommerce
 * @description Locator class for the E-Commerce Admin panel
 * 
 * Encapsulates all CSS/XPath selectors for the e-commerce product management interface.
 * Organized into logical sections for maintainability:
 * - Page Navigation: View selector dropdown
 * - Action Buttons: Add, Edit, Delete, Export product operations
 * - Product Cards: Common selectors for product card elements
 * - Edit Product Modal: Form fields and controls for updating existing products
 * - Add Product Modal: Form fields and controls for creating new products
 * - Verification Locators: Elements used to validate successful operations
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (AdminEcommerceActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note 
 * - Uses XPath with normalize-space() to handle dynamic/whitespace text
 * - Includes common card selectors for product list iteration
 * - Modal forms use unique form IDs for clear identification
 * - Specific product 'Mens Cotton Jacket' used as test fixture reference
 * 
 * @see AdminEcommerceActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/Ecommerce.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { Page, Locator } from '@playwright/test';

/**
 * Ecommerce Locator Class
 * 
 * Contains all selectors for the e-commerce product management interface including:
 * - Navigation and action buttons
 * - Product card elements
 * - Add Product modal form fields
 * - Edit Product modal form fields
 * - Verification and validation locators
 */
export class Ecommerce {
    private readonly page: Page;

    // ============================================
    // Page Navigation
    // ============================================
    readonly EcommercePage: Locator;

    // ============================================
    // Action Buttons
    // ============================================
    readonly AddButton: Locator;
    readonly ExportButton: Locator;
    readonly EditCardButton: Locator;
    readonly DeleteCardButton: Locator;

    // ============================================
    // Product Card - Common/Generic Selectors
    // ============================================
    /** Generic product card container */
    readonly CommonCard: Locator;
    /** Product title/name in card */
    readonly CommonCardName: Locator;
    /** Delete button on any product card */
    readonly CommonDeleteButton: Locator;
    /** Verification locator for product card titles */
    readonly CardTitileVerify: Locator;

    // ============================================
    // Edit Product Modal - Form Fields
    // ============================================
    /** Modal header title verification for Edit form */
    readonly EditTittleCheck: Locator;
    readonly EditProductName: Locator;
    readonly EditProductPrice: Locator;
    readonly EditProductStock: Locator;
    readonly EditProductRating: Locator;
    readonly EditProductImageUrl: Locator;
    readonly SaveChangesButton: Locator;
    readonly CancelChangesButton: Locator;

    // ============================================
    // Add Product Modal - Form Fields
    // ============================================
    /** Modal header title verification for Add form */
    readonly ADDTittleCheck: Locator;
    readonly AddProductName: Locator;
    readonly AddDescription: Locator;
    readonly AddProductPrice: Locator;
    readonly AddProductStock: Locator;
    readonly AddCategory: Locator;
    readonly AddProductRating: Locator;
    readonly AddProductImageUrl: Locator;
    readonly AddProductSaveButton: Locator;
    readonly CanceAddButton: Locator;

    /**
     * Initialize all e-commerce locators
     * 
     * @param {Page} page - Playwright page instance for DOM querying
     * 
     * @remarks
     * All locators are initialized with readonly modifiers to prevent accidental reassignment.
     * Product cards and buttons are queryable generically (CommonCard, CommonDeleteButton) 
     * and specifically ('Mens Cotton Jacket' as fixture reference).
     * Forms use unique IDs (addProductForm, editProductForm) for reliable selection.
     * Modal headers include verification locators for testing form appearance.
     */
    constructor(page: Page) {
        this.page = page;

        // ============================================
        // Page Navigation
        // ============================================
        /** View selector dropdown to navigate to E-commerce view */
        this.EcommercePage = page.locator("//select[@id='viewSelector']");

        // ============================================
        // Action Buttons
        // ============================================
        this.AddButton = page.locator("//div[@id='e-commerce-view']//button[@id='addProductBtn']");
        this.ExportButton = page.locator("//div[@id='e-commerce-view']//button[@id='exportProductsBtn']");
        this.EditCardButton = page.locator("//h5[normalize-space(text())='Mens Cotton Jacket']//parent::div//button[normalize-space(.)='Edit Product']");
        this.DeleteCardButton = page.locator("//h5[normalize-space(text())='Mens Cotton Jacket']//parent::div//button[normalize-space(.)='Delete']");

        // ============================================
        // Product Card - Generic/Common Selectors
        // ============================================
        /** Generic product card container - matches all product cards */
        this.CommonCard = page.locator("//div[contains(@class,'card product-card')]");
        /** Product card title element - matches all product titles */
        this.CommonCardName = page.locator("//div[contains(@class,'card product-card')]//h5[@class='card-title']");
        /** Generic delete button on any product card */
        this.CommonDeleteButton = page.locator("//div[contains(@class,'card product-card')]//h5[@class='card-title']//parent::div//button[normalize-space(.)='Delete']");

        // ============================================
        // Edit Product Modal Form
        // ============================================
        /** Modal header verification - confirms Edit Product dialog is open */
        this.EditTittleCheck = page.locator("//div[@class='modal-header']//h5[normalize-space(text())='Edit Product']");
        this.EditProductName = page.locator("//form[@id='editProductForm']//input[@id='editProductName']");
        this.EditProductPrice = page.locator("//form[@id='editProductForm']//input[@id='editProductPrice']");
        this.EditProductStock = page.locator("//form[@id='editProductForm']//input[@id='editProductStock']");
        this.EditProductRating = page.locator("//form[@id='editProductForm']//input[@id='editProductRating']");
        this.EditProductImageUrl = page.locator("//form[@id='editProductForm']//input[@id='editProductImage']");
        this.SaveChangesButton = page.locator("//div[@class='modal-footer']//button[@id='saveProductBtn']");
        this.CancelChangesButton = page.locator("//h5[normalize-space(text())='Edit Product']//parent::div[@class='modal-header']//following-sibling::div//button[normalize-space(text())='Cancel']");

        // ============================================
        // Add Product Modal Form
        // ============================================
        /** Modal header verification - confirms Add New Product dialog is open */
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

        // ============================================
        // Verification Locators
        // ============================================
        /** Verify product card titles after add/edit operations */
        this.CardTitileVerify = page.locator("//div[contains(@class,'card product-card')]//h5[@class='card-title']");
    }
}
