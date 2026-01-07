/**
 * @class SipCalculatorPage
 * @description Locator class for the SIP Calculator Data analytics page
 * 
 * Encapsulates all CSS/XPath selectors for the Systematic Investment Plan (SIP) calculator results and visualization interface.
 * Organized into logical sections for maintainability:
 * - Page Header: SIP calculator page title verification
 * - Chart Visualizations: SVG chart elements (rect for bar charts, path for line/distribution charts)
 * - Calculation Results Table: Multiple columns with detailed SIP computation data
 * - Table Columns: Monthly amounts, years, rates, invested capital, future values, returns, dates
 * - Actions: Export results and logout functionality
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (SipCalculatorActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - Uses XPath with SVG element targeting ([name()='rect'], [name()='path']) for chart elements
 * - Table columns use positional selectors (td[1] through td[7]) - order matters
 * - Chart visualizations include: Monthly Investment Distribution (bar rects) and Return Rate Distribution (line paths)
 * - All SIP calculations data is tabulated with 7 columns of financial metrics
 * - Sidebar navigation includes logout control
 * 
 * @see SipCalculatorActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/UserSipCalculator.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { Page, Locator } from '@playwright/test';

/**
 * SipCalculatorPage Locator Class
 * 
 * Contains all selectors for the SIP calculator data visualization and results page including:
 * - Page header and title
 * - Chart visualization elements (SVG rects and paths)
 * - Calculation results table with 7 data columns
 * - Export and navigation controls
 */
export class SipCalculatorPage {
    private readonly page: Page;

    // ============================================
    // Page Header & Verification
    // ============================================
    readonly sipCalculatorDataTitleHead: Locator;

    // ============================================
    // Chart Visualizations (SVG Elements)
    // ============================================
    readonly monthlyInvestmentDistributionRects: Locator;
    readonly returnRateDistributionPaths: Locator;

    // ============================================
    // Calculation Results Table Columns
    // ============================================
    /** Table Column 1: Monthly Investment Amount (SIP amount) */
    readonly allSipMonthlyAmounts: Locator;
    /** Table Column 2: Investment Duration (years) */
    readonly allSipYears: Locator;
    /** Table Column 3: Return Rate (percentage) */
    readonly allSipReturnRates: Locator;
    /** Table Column 4: Total Invested (cumulative principal) */
    readonly allSipTotalInvested: Locator;
    /** Table Column 5: Future Value (projected maturity amount) */
    readonly allSipFutureValues: Locator;
    /** Table Column 6: Estimated Returns (gains from investment) */
    readonly allSipEstimatedReturns: Locator;
    /** Table Column 7: Date (calculation or maturity date) */
    readonly allSipDates: Locator;

    // ============================================
    // Action Buttons
    // ============================================
    readonly exportButton: Locator;
    readonly logoutButton: Locator;

    /**
     * Initialize all SIP calculator page locators
     * 
     * @param {Page} page - Playwright page instance for DOM querying
     * 
     * @remarks
     * All locators are initialized with readonly modifiers to prevent accidental reassignment.
     * Chart elements use SVG-specific XPath selectors ([name()='rect'], [name()='path']).
     * Table columns use positional selectors (td[1] through td[7]) - column order is critical.
     * All "allSip" prefixed locators target table data cells (td) across rows.
     * Monthly Investment Distribution uses rect elements (bar chart).
     * Return Rate Distribution uses path elements (line/area chart).
     * Sidebar logout button provides navigation control from calculator page.
     */
    constructor(page: Page) {
        this.page = page;

        // ============================================
        // Page Header & Verification
        // ============================================
        /** Page title verification - "SIP Calculator Data" */
        this.sipCalculatorDataTitleHead = page.locator("//div[@id='sip-calculations-page']//h2[text()='SIP Calculator Data']");

        // ============================================
        // Chart Visualizations (SVG Elements)
        // ============================================
        /** Monthly Investment Distribution chart - rect elements represent bar segments */
        this.monthlyInvestmentDistributionRects = page.locator("//h5[text()='Monthly Investment Distribution']//ancestor::div[@class='card']//*[name()='g']//*[name()='rect']");
        /** Return Rate Distribution chart - path elements represent line/area visualization */
        this.returnRateDistributionPaths = page.locator("//h5[text()='Return Rate Distribution']//ancestor::div[@class='card']//*[name()='g']//*[name()='path']");

        // ============================================
        // Calculation Results Table Columns
        // ============================================
        /** Column 1: Monthly SIP investment amount */
        this.allSipMonthlyAmounts = page.locator("//table[@id='calculationsTable']//td[1]");
        /** Column 2: Investment tenure in years */
        this.allSipYears = page.locator("//table[@id='calculationsTable']//td[2]");
        /** Column 3: Annual return rate percentage */
        this.allSipReturnRates = page.locator("//table[@id='calculationsTable']//td[3]");
        /** Column 4: Total amount invested (principal sum) */
        this.allSipTotalInvested = page.locator("//table[@id='calculationsTable']//td[4]");
        /** Column 5: Future value at maturity (projected amount) */
        this.allSipFutureValues = page.locator("//table[@id='calculationsTable']//td[5]");
        /** Column 6: Estimated earnings/returns from investment */
        this.allSipEstimatedReturns = page.locator("//table[@id='calculationsTable']//td[6]");
        /** Column 7: Associated date (calculation start or maturity date) */
        this.allSipDates = page.locator("//table[@id='calculationsTable']//td[7]");

        // ============================================
        // Action Buttons
        // ============================================
        /** Export SIP calculations data (likely CSV or PDF) */
        this.exportButton = page.locator("//div[@class='card']//button[@id='exportCalculationsBtn']");
        /** Logout button from sidebar navigation */
        this.logoutButton = page.locator("//div[@id='sidebar']//a[@id='logoutBtn']");
    }
}
