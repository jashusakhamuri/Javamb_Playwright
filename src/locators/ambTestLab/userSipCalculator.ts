/**
 * @class Spi_Calculator
 * @description Locator class for SIP (Systematic Investment Plan) calculator interface
 * 
 * Encapsulates all CSS/XPath selectors for the comprehensive SIP calculation and visualization tool:
 * - Navigation: Access to SIP calculator from main application
 * - Input Form: Monthly amount, investment duration (years), expected annual return
 * - Calculation Results: Total invested, future value, estimated returns
 * - Results Table: Previous calculations history with delete option
 * - Visualization Charts: 18+ chart types for investment analysis and insights
 *   - Distribution Charts: Bar, Column, Pie, Donut, Waterfall
 *   - Trend Charts: Line, Area, Scatter, Bubble
 *   - Advanced Charts: Funnel, Radar, Treemap, Heatmap, Timeline (Gantt), Box Plot
 * 
 * Organized into logical sections:
 * 1. Navigation: Access to calculator
 * 2. Form Inputs: SIP parameters and calculation inputs
 * 3. Form Controls: Submit button for calculation
 * 4. Calculation Results: Key metrics display
 * 5. Results Table: History and management
 * 6. Visualization Charts: Comprehensive investment analysis charts (18 chart types)
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (SipCalculatorActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - Uses XPath with normalize-space() for flexible text matching in chart headings
 * - Form fields use unique IDs (monthlyAmount, years, expectedReturn) for reliable selection
 * - Result metrics use specific element IDs (totalInvested, futureValue, estimatedReturns)
 * - Chart locators target <img> elements following chart heading h5 tags
 * - Some chart aliases share same <img> selector (distribution values/range patterns)
 * - Covers extensive investment analysis with diverse chart visualizations
 * 
 * @see SipCalculatorActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/UserSipCalculator.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */
import { Page, Locator } from '@playwright/test';

/**
 * Spi_Calculator Locator Class
 * 
 * Contains all selectors for the SIP calculator interface including:
 * - Navigation and form access
 * - SIP calculation input parameters
 * - Calculation results and metrics
 * - Previous calculations table and management
 * - 18+ visualization charts for investment analysis
 * 
 * Organized by user workflow and functionality for logical grouping
 */
export class Spi_Calculator {
    readonly page: Page;

    // ========================================================
    // NAVIGATION
    // ========================================================
    /**
     * SIP Calculator navigation link
     * Navigates to SIP calculator page from main application menu
     * Entry point for accessing calculator interface
     */
    readonly NAvigateTOSipCaluculator: Locator;

    // ========================================================
    // SIP CALCULATION INPUT FORM
    // ========================================================
    /**
     * Page title heading
     * Displays "SIP Calculator" as page identification
     * Used for page load verification
     */
    readonly title: Locator;

    /**
     * Monthly investment amount input field
     * Accepts numeric value for regular SIP contribution
     * Core parameter for SIP calculation
     */
    readonly minimunAmount: Locator;

    /**
     * Investment duration input field
     * Accepts number of years for investment horizon
     * Determines total calculation period
     */
    readonly years: Locator;

    /**
     * Expected annual return input field
     * Accepts percentage rate for assumed investment returns
     * Critical for projecting future value
     */
    readonly expectedAnnualReturn: Locator;

    /**
     * Submit button to execute SIP calculation
     * Processes entered parameters and generates results
     * Triggers calculation and chart generation
     */
    readonly submitbutton: Locator;

    // ========================================================
    // CALCULATION RESULTS / KEY METRICS
    // ========================================================
    /**
     * Total invested amount display
     * Shows cumulative principal amount invested
     * Monthly Amount × (Years × 12)
     */
    readonly totalinvested: Locator;

    /**
     * Estimated future value display
     * Shows projected portfolio value at maturity
     * Based on total invested + compound returns
     */
    readonly estfutureValue: Locator;

    /**
     * Estimated returns/gains display
     * Shows projected earnings from investment
     * Future Value - Total Invested
     */
    readonly estReturns: Locator;

    // ========================================================
    // PREVIOUS CALCULATIONS TABLE
    // ========================================================
    /**
     * Table data rows from calculation history
     * Displays previous SIP calculations
     * Used for viewing and managing past calculations
     */
    readonly tabledata: Locator;

    /**
     * Delete button for calculation records
     * Removes specific calculation from history
     * One delete button per table row
     */
    readonly deletebtn: Locator;

    // ========================================================
    // VISUALIZATION CHARTS - DISTRIBUTION ANALYSIS
    // ========================================================
    /**
     * Monthly Investment Distribution Bar Chart
     * Shows monthly contribution breakdown visually
     * Bar chart format for period-wise investment display
     */
    readonly monthlyInvestmentDistribution: Locator;

    /**
     * Monthly Investment Distribution Column Chart
     * Shows monthly investment breakdown in column format
     * Alternative visualization of monthly contributions
     */
    readonly monthlyInvestmentDistributionColumn: Locator;

    /**
     * Future Value Histogram Chart
     * Distribution of projected future values
     * Shows frequency/density of future value outcomes
     */
    readonly futureValueHistogram: Locator;

    /**
     * Return Rate Distribution Pie Chart
     * Percentage breakdown of return components
     * Principal vs returns visualization
     */
    readonly returnRateDistributionValues: Locator;

    /**
     * Return Rate Distribution Range (alias for Pie Chart)
     * Alternative reference to return rate distribution
     * Shares same <img> element as returnRateDistributionValues
     */
    readonly returnRateDistributionRange: Locator;

    /**
     * Investment Duration Donut Chart
     * Visual breakdown of investment tenure components
     * Shows time period allocation
     */
    readonly investmentDurationValues: Locator;

    /**
     * Investment Duration Range (alias for Donut Chart)
     * Alternative reference to duration visualization
     * Shares same <img> element as investmentDurationValues
     */
    readonly investmentDurationRange: Locator;

    // ========================================================
    // VISUALIZATION CHARTS - TREND & GROWTH ANALYSIS
    // ========================================================
    /**
     * Investment Journey Funnel Chart
     * Shows progression/flow of investment stages
     * Funnel visualization of investment journey
     */
    readonly investmentJourneyFunnelValue: Locator;

    /**
     * Investment Journey Funnel Range (alias)
     * Alternative reference to funnel visualization
     * Shares same <img> element as investmentJourneyFunnelValue
     */
    readonly investmentJourneyFunnelRange: Locator;

    /**
     * Future Value Trends Line Chart
     * Timeline showing projected value growth over investment period
     * Line chart for trend analysis
     */
    readonly futureValueTrends: Locator;

    /**
     * Returns Analysis Area Chart
     * Stacked area showing principal vs returns accumulation
     * Visualization of earnings growth over time
     */
    readonly returnsAnalysis: Locator;

    /**
     * Returns Contribution Waterfall Chart
     * Step-by-step breakdown of how returns accumulate
     * Shows contribution flow from principal to final value
     */
    readonly returnsContribution: Locator;

    // ========================================================
    // VISUALIZATION CHARTS - COMPARATIVE & ADVANCED ANALYSIS
    // ========================================================
    /**
     * Amount vs Return Scatter Chart
     * Relationship between investment amount and returns generated
     * Scatter plot showing correlation
     */
    readonly amountvsReturn: Locator;

    /**
     * Tenure vs Growth Bubble Chart
     * Relationship between investment duration and portfolio growth
     * Bubble size represents portfolio value
     */
    readonly tenurevsGrowth: Locator;

    /**
     * Duration Radar Profile Chart
     * Multi-dimensional analysis of investment metrics across duration
     * Radar/spider chart visualization
     */
    readonly durationRadarProfile: Locator;

    /**
     * Future Value Treemap Chart
     * Hierarchical visualization of value composition
     * Shows proportional contribution of different components
     */
    readonly futureValueTreemap: Locator;

    /**
     * Duration vs Return Heatmap Chart
     * Matrix visualization showing relationship between duration and returns
     * Color intensity represents value magnitude
     */
    readonly durationvsReturnHeatmap: Locator;

    /**
     * SIP Timeline Gantt Chart
     * Project timeline view of investment milestones
     * Shows investment schedule and maturity dates
     */
    readonly sipTimeline: Locator;

    /**
     * Distribution Overview Box Plot Chart
     * Statistical distribution of investment outcomes
     * Shows quartiles, median, and outliers
     */
    readonly distributionOverview: Locator;

    /**
     * Initialize all SIP calculator page locators
     * 
     * @param {Page} page - Playwright page instance for DOM querying
     * 
     * @remarks
     * All locators are initialized with readonly modifiers to prevent accidental reassignment.
     * Form inputs use unique IDs (monthlyAmount, years, expectedReturn) within sipForm
     * for reliable and consistent element selection across different page states.
     * Result metrics use specific element IDs (totalInvested, futureValue, estimatedReturns)
     * for displaying calculated values.
     * Chart locators target <img> elements that follow chart heading <h5> tags with normalize-space()
     * for flexible text matching handling potential whitespace variations.
     * Some chart aliases (distribution values/range, duration values/range, funnel value/range)
     * reference the same <img> element selector for efficiency.
     * Supports comprehensive investment analysis with 18+ distinct chart visualizations
     * covering distribution, trends, comparisons, and advanced analytics.
     */
    constructor(page: Page) {
        this.page = page;

        // ========================================================
        // NAVIGATION INITIALIZATION
        // ========================================================
        this.NAvigateTOSipCaluculator = page.locator("//div[@class='container-fluid']//a[text()='SIP Calculator']");

        // ========================================================
        // SIP CALCULATION INPUT FORM INITIALIZATION
        // ========================================================
        this.title = page.locator("//h3[normalize-space(text())='SIP Calculator']");
        this.minimunAmount = page.locator("//form[@id='sipForm']//input[@id='monthlyAmount']");
        this.years = page.locator("//form[@id='sipForm']//input[@id='years']");
        this.expectedAnnualReturn = page.locator("//form[@id='sipForm']//input[@id='expectedReturn']");
        this.submitbutton = page.locator("//button[@type='submit']");

        // ========================================================
        // CALCULATION RESULTS INITIALIZATION
        // ========================================================
        this.totalinvested = page.locator("//div[@id='resultCard']//h3[@id='totalInvested']");
        this.estfutureValue = page.locator("//div[@id='resultCard']//h3[@id='futureValue']");
        this.estReturns = page.locator("//div[@id='resultCard']//h3[@id='estimatedReturns']");

        // ========================================================
        // PREVIOUS CALCULATIONS TABLE INITIALIZATION
        // ========================================================
        this.tabledata = page.locator("//table//tr//td[1]");
        this.deletebtn = page.locator("//table//tr//td//button[contains(@onclick,'deleteCalculation')]");

        // ========================================================
        // VISUALIZATION CHARTS INITIALIZATION
        // ========================================================
        // Distribution Analysis Charts
        this.monthlyInvestmentDistribution = page.locator("//h5[normalize-space(.)='Monthly Investment Distribution (Bar)']/following-sibling::img");
        this.monthlyInvestmentDistributionColumn = page.locator("//h5[normalize-space(.)='Monthly Investment Distribution (Column)']/following-sibling::img");
        this.futureValueHistogram = page.locator("//h5[normalize-space(.)='Future Value Histogram']/following-sibling::img");
        this.returnRateDistributionValues = page.locator("//h5[normalize-space(.)='Return Rate Distribution (Pie)']/following-sibling::img");
        this.returnRateDistributionRange = this.returnRateDistributionValues;
        this.investmentDurationValues = page.locator("//h5[normalize-space(.)='Investment Duration (Donut)']/following-sibling::img");
        this.investmentDurationRange = this.investmentDurationValues;
        
        // Trend & Growth Analysis Charts
        this.investmentJourneyFunnelValue = page.locator("//h5[normalize-space(.)='Investment Journey Funnel']/following-sibling::img");
        this.investmentJourneyFunnelRange = this.investmentJourneyFunnelValue;
        this.futureValueTrends = page.locator("//h5[normalize-space(.)='Future Value Trends (Line)']/following-sibling::img");
        this.returnsAnalysis = page.locator("//h5[normalize-space(.)='Returns Analysis (Area)']/following-sibling::img");
        this.returnsContribution = page.locator("//h5[normalize-space(.)='Returns Contribution (Waterfall)']/following-sibling::img");
        
        // Comparative & Advanced Analysis Charts
        this.amountvsReturn = page.locator("//h5[normalize-space(.)='Amount vs Return (Scatter)']/following-sibling::img");
        this.tenurevsGrowth = page.locator("//h5[normalize-space(.)='Tenure vs Growth (Bubble)']/following-sibling::img");
        this.durationRadarProfile = page.locator("//h5[normalize-space(.)='Duration Radar Profile']/following-sibling::img");
        this.futureValueTreemap = page.locator("//h5[normalize-space(.)='Future Value Treemap']/following-sibling::img");
        this.durationvsReturnHeatmap = page.locator("//h5[normalize-space(.)='Duration vs Return Heatmap']/following-sibling::img");
        this.sipTimeline = page.locator("//h5[normalize-space(.)='SIP Timeline (Gantt)']/following-sibling::img");
        this.distributionOverview = page.locator("//h5[normalize-space(.)='Distribution Overview (Box Plot)']/following-sibling::img");
    }
}
