/**
 * @class Purchases
 * @description Locator class for the Admin Purchases/Orders management page
 * 
 * Encapsulates all CSS/XPath selectors for the customer purchases dashboard and order management interface.
 * Organized into logical sections for maintainability:
 * - Page Header: Title and search functionality
 * - Dashboard Metrics: Summary statistics (Total Orders, Gross Volume, Items Sold, Avg Ticket Size)
 * - Export: Data export functionality
 * - Order Table: Rows and action buttons for order line items
 * - Modal Controls: Purchase detail modal open/close buttons
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (AdminPurchasesActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - Uses XPath with normalize-space() to handle dynamic/whitespace text
 * - Dashboard metrics use IDs for reliable selection
 * - Table rows target column 3 (likely order ID or date)
 * - Modal has two close button variants (text-based and aria-label)
 * 
 * @see AdminPurchasesActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/Purchases.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { Page, Locator, expect } from '@playwright/test';

/**
 * Purchases Locator Class
 * 
 * Contains all selectors for the customer purchases admin page including:
 * - Page title and search functionality
 * - Purchase summary metrics
 * - Export controls
 * - Order table rows and actions
 * - Purchase detail modal controls
 */
export class Purchases {

    private readonly page: Page;

    // ============================================
    // Page Header & Search
    // ============================================
    readonly title: Locator;
    readonly searchInput: Locator;

    // ============================================
    // Dashboard Metrics / Summary Statistics
    // ============================================
    readonly totalOrders: Locator;
    readonly grossVolume: Locator;
    readonly itemsSold: Locator;
    readonly avgTicketSize: Locator;

    // ============================================
    // Export Functionality
    // ============================================
    readonly exportButton: Locator;

    // ============================================
    // Order Table Elements
    // ============================================
    readonly tableRows: Locator;
    readonly tableActionbtn: Locator;

    // ============================================
    // Purchase Details Modal
    // ============================================
    readonly closebtn: Locator;
    readonly closeModalbtn: Locator;

    /**
     * Initialize all purchases page locators
     * 
     * @param {Page} page - Playwright page instance for DOM querying
     * 
     * @remarks
     * All locators are initialized with readonly modifiers to prevent accidental reassignment.
     * Dashboard metrics use element IDs (purchasesSummaryOrders, etc.) for reliable selection.
     * Table rows are selected by column 3 content (likely order identifier).
     * Modal provides two close button options for flexibility in test scenarios.
     */
    constructor(page: Page) {
        this.page = page;

        // ============================================
        // Page Header & Search
        // ============================================
        /** Page title verification - "Customer Purchases" */
        this.title = page.locator("//div[@id='purchases-page']//following::h2[normalize-space(.)='Customer Purchases']");
        /** Search input for filtering purchases by order/customer/date */
        this.searchInput = page.locator("//input[@id='purchaseSearchInput']");

        // ============================================
        // Dashboard Metrics / Summary Statistics
        // ============================================
        /** Total number of orders placed */
        this.totalOrders = page.locator("//p[text()='Total Orders']//parent::div//h3[@id='purchasesSummaryOrders']");
        /** Total revenue/gross volume from all orders */
        this.grossVolume = page.locator("//p[text()='Gross Volume']//parent::div//h3[@id='purchasesSummaryRevenue']");
        /** Total number of items sold across all orders */
        this.itemsSold = page.locator("//p[text()='Items Sold']//parent::div//h3[@id='purchasesSummaryItems']");
        /** Average order value/ticket size */
        this.avgTicketSize = page.locator("//p[text()='Avg. Ticket Size']//parent::div//h3[@id='purchasesSummaryAverage']");

        // ============================================
        // Export Functionality
        // ============================================
        /** Export purchases data (likely CSV or similar format) */
        this.exportButton = page.locator("//button[@id='exportPurchasesBtn']");

        // ============================================
        // Order Table Elements
        // ============================================
        /** Table rows - targets column 3 content (order identifier or date) */
        this.tableRows = page.locator("//table[@id='purchasesTable']//tbody//tr//td[3]");
        /** Action button on table row - for order details or operations */
        this.tableActionbtn = page.locator("//table[@id='purchasesTable']//tbody//trtr[${rowIndex}]//td[button]");

        // ============================================
        // Purchase Details Modal
        // ============================================
        /** Close button in modal using text "Close" */
        this.closebtn = page.locator("//div[@id='purchaseDetailsModal']//button[normalize-space(text())='Close']");
        /** Close button in modal using aria-label (X button variant) */
        this.closeModalbtn = page.locator("//div[@id='purchaseDetailsModal']//div[@class='modal-header']//button[@aria-label='Close']");
    }
}



