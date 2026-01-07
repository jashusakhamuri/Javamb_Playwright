/**
 * @class Portfolio
 * @description Locator class for user portfolio management, checkout flow, and purchase verification
 * 
 * Encapsulates all CSS/XPath selectors for the multi-step purchase journey:
 * 1. Portfolio View: Display user's selected funds, summary metrics, delete items
 * 2. Checkout Flow: Proceed to purchase, secure payment processing
 * 3. Payment Verification: Confirm successful payment and purchase details
 * 4. Purchase Summary: Review total invested, savings, returns across portfolio
 * 5. Return Navigation: Navigate back to portfolio dashboard
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (PortfolioActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - Uses XPath with normalize-space() to handle whitespace in text matching
 * - Summary metrics use IDs (summaryCount, summaryTotal, summarySavings) for reliable selection
 * - Purchase summary verification uses parent/sibling navigation for dynamic content
 * - Covers complete purchase workflow from cart to confirmation
 * 
 * @see PortfolioActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/UseraddFunds.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */
import { Page, Locator, } from '@playwright/test';

/**
 * Portfolio Locator Class
 * 
 * Contains all selectors for the complete user portfolio and purchase workflow including:
 * - Portfolio summary and cart management
 * - Checkout and payment processing
 * - Payment success verification
 * - Purchase summary and financial metrics verification
 * - Navigation controls
 * 
 * Organized by user journey stages for logical grouping and maintainability
 */
export class Portfolio {

    readonly page: Page;

    // ========================================================
    // PORTFOLIO SUMMARY VERIFICATION
    // ========================================================
    /**
     * Cart count verification element
     * Displays total number of funds currently in user's portfolio
     * Used to verify items were added/removed correctly
     */
    readonly ToVerifyCartCount: Locator;

    /**
     * Summary total price element
     * Shows combined portfolio price across all selected funds
     * Verification point for total cart value calculation
     */
    readonly SummaryTotal: Locator;

    /**
     * Summary savings verification element
     * Displays total savings compared to MRP (Maximum Retail Price)
     * Used to verify discount calculations are correct
     */
    readonly SummarySavings: Locator;

    /**
     * Product card name element
     * Matches fund/product names displayed on portfolio cards
     * Generic selector for iterating through all products
     */
    readonly ProductCardName: Locator;

    /**
     * Delete button on portfolio cards
     * Removes selected fund from portfolio
     * Used for managing cart contents
     */
    readonly DeleteButton: Locator;

    // ========================================================
    // CHECKOUT FLOW & PAYMENT INITIATION
    // ========================================================
    /**
     * "Proceed to Buy" button
     * Initiates checkout flow from portfolio view
     * Navigates user to payment/review screen
     */
    readonly ProccerdTOBuyButton: Locator;

    /**
     * "Complete Secure Payment" button
     * Finalizes payment transaction after review
     * Triggers payment gateway processing
     */
    readonly SecurePayment: Locator;

    /**
     * "Return to Portfolio" button/link
     * Allows user to go back to portfolio from checkout
     * Used to abort checkout and return to cart
     */
    readonly ReturnToPortfolio: Locator;

    // ========================================================
    // PAYMENT VERIFICATION & SUCCESS
    // ========================================================
    /**
     * Payment successful verification element
     * Success card displaying "Payment Successful" message
     * Confirms transaction completed and order placed
     */
    readonly ToVerifyPaymentSuccessful: Locator;

    /**
     * "View Purchase Summary" link/button
     * Located on success card after payment completion
     * Navigates to detailed purchase summary page
     */
    readonly ViewPurchaseSummary: Locator;

    // ========================================================
    // PURCHASE REVIEW & CONFIRMATION
    // ========================================================
    /**
     * Review & Confirm heading element
     * Marks the review section before final payment
     * Contains item count of funds to be purchased
     */
    readonly ReviewConfirm: Locator;

    /**
     * Funds count verification in purchase summary
     * Shows number of funds included in purchase
     * Used to verify correct portfolio size
     */
    readonly VerifyFunds: Locator;

    /**
     * Product name verification element
     * Displays names of funds being purchased
     * Used to verify correct funds included in order
     */
    readonly VerifyNameOfProduct: Locator;

    /**
     * Total invested amount verification
     * Shows cumulative principal investment amount
     * Verification point for investment calculation
     */
    readonly VerifySummaryInvested: Locator;

    /**
     * Savings comparison verification element
     * Displays total savings vs original/MRP pricing
     * Used to verify discount aggregation across portfolio
     */
    readonly VerifySummarySavings: Locator;

    /**
     * Average 5-year returns verification element
     * Shows projected average returns over 5 years
     * Used to verify performance metrics calculation
     */
    readonly verifysummaryReturns: Locator;

    // ========================================================
    // NAVIGATION & RETURN POINTS
    // ========================================================
    /**
     * Portfolio navigation element in main container
     * Returns user to main portfolio dashboard
     * Final navigation point after purchase completion
     */
    readonly ToReturnPortfilo: Locator;

    /**
     * Initialize all portfolio and checkout page locators
     * 
     * @param {Page} page - Playwright page instance for DOM querying
     * 
     * @remarks
     * All locators are initialized with readonly modifiers to prevent accidental reassignment.
     * Portfolio summary uses element IDs (summaryCount, summaryTotal, summarySavings) for reliable selection.
     * Button selectors use normalize-space() to handle text with extra whitespace.
     * Success card and purchase summary use class-based and nested selectors for context.
     * Navigation elements use container-fluid and semantic text matching.
     * Covers complete user journey from cart management through post-purchase summary.
     */
    constructor(page: Page) {
        this.page = page;

        // ========================================================
        // PORTFOLIO SUMMARY VERIFICATION INITIALIZATION
        // ========================================================
        this.ToVerifyCartCount = page.locator("//span[normalize-space(text())='Total funds in portfolio']//parent::div//div[@id='summaryCount']")
        this.SummaryTotal = page.locator("//span[normalize-space(text())='Combined portfolio price']/parent::div//div[@id='summaryTotal']")
        this.SummarySavings = page.locator("//span[normalize-space(text())='Total savings vs MRP']/parent::div//div[@id='summarySavings']")
        this.ProductCardName = page.locator(" //div[@class='doc - pro - name']//span[not(preceding-sibling::span)]")
        this.DeleteButton = page.locator("//button[normalize-space(.)='Delete']")

        // ========================================================
        // CHECKOUT FLOW INITIALIZATION
        // ========================================================
        this.ProccerdTOBuyButton = page.locator("//button[normalize-space(.)='Proceed to Buy']")
        this.SecurePayment = page.locator("//button[normalize-space(.)='Complete Secure Payment']")
        this.ReturnToPortfolio = page.locator("Return to Portfolio = //button[contains(normalize-space(text()), 'Return to Portfolio')]")

        // ========================================================
        // PAYMENT VERIFICATION INITIALIZATION
        // ========================================================
        this.ToVerifyPaymentSuccessful = page.locator(" //div[@class='success-card']//h1[normalize-space(text())='Payment Successful'] ")
        this.ViewPurchaseSummary = page.locator("//div[@class='success-card']//a[normalize-space(text())='View Purchase Summary']")

        // ========================================================
        // PURCHASE REVIEW INITIALIZATION
        // ========================================================
        this.ReviewConfirm = page.locator("//h3[normalize-space(text())='Review & Confirm']/following-sibling::span[@id='itemCount']")
        this.VerifyFunds = page.locator("//div[@id='summaryMeta']//following-sibling::span[contains(normalize-space(text()), 'funds')]")
        this.VerifyNameOfProduct = page.locator("//tbody[@id='summaryBody']//div")
        this.VerifySummaryInvested = page.locator("//div[text()='Total Invested']//parent::div//div[@id='summaryInvested']")
        this.VerifySummarySavings = page.locator("//div[text()='Savings vs Original']//parent::div//div[@id='summarySavings']")
        this.verifysummaryReturns = page.locator("//div[text()='Average 5Y Returns']//parent::div//div[@id='summaryReturns']")

        // ========================================================
        // NAVIGATION INITIALIZATION
        // ========================================================
        this.ToReturnPortfilo = page.locator("//div[@class='container-fluid']//span[text()='Portfolio']")
    }

}