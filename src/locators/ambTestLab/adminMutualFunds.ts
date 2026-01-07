/**
 * @class AdimnMutualFunds
 * @description Locator class for the Admin Mutual Funds management interface
 * 
 * Encapsulates all CSS/XPath selectors for the mutual fund CRUD operations page.
 * Organized into logical sections for maintainability:
 * - Page Controls: Fund list actions (Add, Search, Export, Import, Pagination)
 * - Edit Fund Modal: Form fields and buttons for updating existing funds
 * - Add Fund Modal: Comprehensive form fields for creating new mutual funds
 * - Dynamic Modals: Both edit and add use the same form with title/button changes
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (AdminMutualFundsActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - Uses XPath with normalize-space() to handle dynamic/whitespace text
 * - Edit and Add forms reuse the same HTML form (id='fundForm') - differentiated by modal title
 * - Specific fund 'Emily Johnson' used as test fixture reference
 * - Form inputs include financial metrics: NAV, returns (1Y, 3Y, 5Y), original/offer pricing
 * - Category and Risk Level use dropdown selects
 * - Image field accepts URL input (not file upload)
 * 
 * @see AdminMutualFundsActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/AdminMutualFunds.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { Page, Locator, } from '@playwright/test';

/**
 * AdimnMutualFunds Locator Class
 * 
 * Contains all selectors for the mutual fund management interface including:
 * - Fund list controls (add, search, export, import)
 * - Pagination controls
 * - Edit fund modal form
 * - Add fund modal form
 * - Modal verification elements
 */
export class AdimnMutualFunds {
    private readonly page: Page;

    // ============================================
    // Page Controls & Actions
    // ============================================
    readonly AddFundButton: Locator;
    readonly ClickToSeeAddFundForm: Locator;
    readonly SearchBar: Locator;
    readonly ExportButton: Locator;
    readonly importButton: Locator;

    // ============================================
    // Card-Level Actions (Test Fixture: 'Emily Johnson')
    // ============================================
    readonly EditButton: Locator;
    readonly DeleteButton: Locator;

    // ============================================
    // Edit Fund Modal Form
    // ============================================
    /** Modal title verification for Edit Fund form */
    readonly EditTittle: Locator;
    readonly EditFundName: Locator;
    readonly EditFundCode: Locator;
    readonly EditCategoryDropDown: Locator;
    readonly Editimage: Locator;
    readonly EditOfferPrice: Locator;
    readonly EditRiskLevel: Locator;
    readonly UpdateFund: Locator;

    // ============================================
    // Add Fund Modal Form
    // ============================================
    /** Modal title verification for Add Fund form */
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

    // ============================================
    // Pagination Controls
    // ============================================
    readonly PrevButton: Locator;
    readonly NxtButton: Locator;

    /**
     * Initialize all mutual funds locators
     * 
     * @param {Page} page - Playwright page instance for DOM querying
     * 
     * @remarks
     * All locators are initialized with readonly modifiers to prevent accidental reassignment.
     * Edit and Add forms share the same form element (id='fundForm') and reuse most input IDs.
     * Form titles (EditTittle, AddTittle) differ to distinguish between modes.
     * Image field accepts URL strings, not file uploads.
     * Returns fields include 1-year, 3-year, and 5-year performance metrics.
     * Category and Risk Level are dropdown selects, not text inputs.
     * Pagination uses list-based navigation (Prev/Next).
     */
    constructor(page: Page) {
        this.page = page;

        // ============================================
        // Page Controls & Actions
        // ============================================
        /** Button to trigger Add Fund form/modal */
        this.AddFundButton = page.locator("//div[@id='mutual-funds-data-page']//button[@id='addFundBtn']");
        /** Link to expand all form fields in the modal */
        this.ClickToSeeAddFundForm = page.locator("//form[@id='fundForm']//span[normalize-space(text())='Show All Form Fields']");
        /** Search input for filtering mutual funds by name/code */
        this.SearchBar = page.locator("//div[@id='mutual-funds-data-page']//input[@id='mutualFundsSearch']");
        /** Button to export mutual funds list (likely CSV) */
        this.ExportButton = page.locator("//div[@id='mutual-funds-data-page']//button[@id='exportFundsBtn']");
        /** Label/button for import functionality */
        this.importButton = page.locator("//div[@id='mutual-funds-data-page']//label[normalize-space(.)='Import']");

        // ============================================
        // Card-Level Actions (Specific Fund: 'Emily Johnson')
        // ============================================
        /** Edit button on the 'Emily Johnson' fund card */
        this.EditButton = page.locator("//h5[normalize-space(text())='Emily Johnson']//ancestor::div[@class='fund-card-body']//button[normalize-space(text())='Edit']");
        /** Delete button on the 'Emily Johnson' fund card */
        this.DeleteButton = page.locator("//h5[normalize-space(text())='Emily Johnson']//ancestor::div[@class='fund-card-body']//button[normalize-space(text())='Delete']");

        // ============================================
        // Edit Fund Modal Form (Reuses fundForm)
        // ============================================
        /** Modal title verification - should display "Edit Fund" */
        this.EditTittle = page.locator("//form[@id='fundForm']//h5[@id='fundModalTitle']");
        this.EditFundName = page.locator("//form[@id='fundForm']//input[@id='fundNameInput']");
        this.EditFundCode = page.locator("//form[@id='fundForm']//input[@id='fundCodeInput']");
        this.EditCategoryDropDown = page.locator("//form[@id='fundForm']//select[@id='fundCategoryInput']");
        /** Image field accepts URL string as input (not file upload) */
        this.Editimage = page.locator("//form[@id='fundForm']//input[@id='fundImageInput']");
        this.EditOfferPrice = page.locator("//form[@id='fundForm']//input[@id='fundPriceInput']");
        this.EditRiskLevel = page.locator("//form[@id='fundForm']//select[@id='fundRiskInput']");
        /** Save/Update button for Edit Fund form */
        this.UpdateFund = page.locator("//form[@id='fundForm']//button[@id='saveFundBtn']");

        // ============================================
        // Add Fund Modal Form (Reuses fundForm)
        // ============================================
        /** Modal title verification - should display "Add Fund" */
        this.AddTittle = page.locator("//form[@id='fundForm']//h5[@id='fundModalTitle']");
        this.AddFundName = page.locator("//form[@id='fundForm']//input[@id='fundNameInput']");
        this.AddFundCode = page.locator("//form[@id='fundForm']//input[@id='fundCodeInput']");
        this.AddCategoryDropDown = page.locator("//form[@id='fundForm']//select[@id='fundCategoryInput']");
        /** Image field accepts URL string as input (not file upload) */
        this.Addimage = page.locator("//form[@id='fundForm']//input[@id='fundImageInput']");
        this.AddOfferPrice = page.locator("//form[@id='fundForm']//input[@id='fundPriceInput']");
        this.AddRiskLevel = page.locator("//form[@id='fundForm']//select[@id='fundRiskInput']");
        /** NAV (Net Asset Value) input */
        this.AddFundNav = page.locator("//form[@id='fundForm']//input[@id='fundNavInput']");
        /** Original price before discount/offer */
        this.AddOriginalPrice = page.locator("//form[@id='fundForm']//input[@id='fundOriginalPriceInput']");
        /** 1-year return performance metric */
        this.AddYearReturn = page.locator("//form[@id='fundForm']//input[@id='fundReturn1YInput']");
        /** 3-year return performance metric */
        this.Add3YearReturn = page.locator("//form[@id='fundForm']//input[@id='fundReturn3YInput']");
        /** 5-year return performance metric */
        this.Addd5YearReturn = page.locator("//form[@id='fundForm']//input[@id='fundReturn5YInput']");
        /** Fund house/vendor name */
        this.AddFundHouse = page.locator("//form[@id='fundForm']//input[@id='fundVendorInput']");
        /** Fund location/headquarters */
        this.location = page.locator("//form[@id='fundForm']//input[@id='fundLocationInput']");
        /** Save button for Add Fund form (same button as UpdateFund) */
        this.SaveButton = page.locator("//form[@id='fundForm']//button[@id='saveFundBtn']");

        // ============================================
        // Pagination Controls
        // ============================================
        this.PrevButton = page.locator("//ul[@id='mutualFundsPagination']//a[normalize-space(.)='Prev']");
        this.NxtButton = page.locator("//ul[@id='mutualFundsPagination']//a[normalize-space(.)='Next']");
    }
}