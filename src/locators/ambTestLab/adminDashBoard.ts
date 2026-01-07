/**
 * @class DashboardPage
 * @description Locator class for the Admin Dashboard page
 * 
 * Encapsulates all CSS/XPath selectors used in the admin dashboard interface.
 * Organized into logical sections for easy maintenance and discovery:
 * - Dashboard Overview: Title and view selector
 * - View Options: Dropdown selections for different app modules (Mutual Funds, E-Commerce, Software Testing)
 * - Market Snapshot: Financial metrics and index data
 * - Admin Metadata: User label and dashboard statistics counters
 * - Sidebar Navigation: Links to all admin modules (Mutual Funds, Settings, Purchases, Users, SIP Calculator)
 * - Charts: Market index visualizations (Sensex, Nifty)
 * - Mutation Testing: Special inputs for testing framework
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (AdminMutualFundsActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note All locators use XPath for precise DOM traversal with normalize-space() 
 * to handle whitespace variations in element text matching.
 * 
 * @see AdminMutualFundsActions - Page object that consumes these locators
 * @see tests/Web_Testing/ambTestLab/ - Test specs using pages built on these locators
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { Page, Locator } from '@playwright/test';

/**
 * DashboardPage Locator Class
 * 
 * Contains all selectors for the admin dashboard interface including:
 * - Dashboard header and view controls
 * - Market metrics and statistics
 * - Navigation sidebar
 * - Market snapshot charts
 * - Admin mutation testing inputs
 */
export class DashboardPage {
  readonly page: Page;

  // ============================================
  // Dashboard Overview Section
  // ============================================
  readonly dashboardOverviewTitle: Locator;
  readonly viewSelectorDropdown: Locator;
  readonly viewMutualFundsOption: Locator;
  readonly viewECommerceOption: Locator;
  readonly viewSoftwareTestingOption: Locator;

  // ============================================
  // Market Snapshot Section
  // ============================================
  readonly marketSnapshotTitle: Locator;
  readonly adminUserLabel: Locator;
  readonly registeredInvestorsCount: Locator;
  readonly activeSipPlansCount: Locator;
  readonly managedFundsCount: Locator;
  readonly orderVolumeCount: Locator;
  readonly indexNameList: Locator;

  // ============================================
  // Market Charts (Sensex & Nifty)
  // ============================================
  readonly sensexChartCircles: Locator;
  readonly niftyChartCircles: Locator;

  // ============================================
  // Sidebar Navigation
  // ============================================
  readonly logoutButton: Locator;
  readonly DashboardMutualFundsOption: Locator;
  readonly DashboardSettings: Locator;
  readonly DashboardPurchases: Locator;
  readonly DashbaordUsers: Locator;
  readonly DashboardSipCalculator: Locator;

  // ============================================
  // Mutation Testing / Special Inputs
  // ============================================
  readonly ShowCaseInputs: Locator;
  readonly HideAllInputs: Locator;
  readonly MutationUsername: Locator;

  /**
   * Initialize all dashboard locators
   * 
   * @param {Page} page - Playwright page instance for DOM querying
   * 
   * @remarks
   * All locators are initialized with readonly modifiers to prevent accidental reassignment.
   * XPath expressions use normalize-space() to handle whitespace in text matching.
   * Selectors are organized by functional section for maintainability.
   */
  constructor(page: Page) {
    this.page = page;

    // Dashboard Overview Title
    this.dashboardOverviewTitle = page.locator("//h2[text()='Dashboard Overview']");
    
    // View Selector Dropdown
    this.viewSelectorDropdown = page.locator("//div[@class='container-fluid']//select[@id='viewSelector']");
    this.viewMutualFundsOption = page.locator("//div[@class='container-fluid']//select[@id='viewSelector']//option[text()='Mutual Funds']");
    this.viewECommerceOption = page.locator("//div[@class='container-fluid']//select[@id='viewSelector']");
    this.viewSoftwareTestingOption = page.locator("//div[@class='container-fluid']//select[@id='viewSelector']//option[text()='Software Testing']");

    // Market Snapshot Section
    this.marketSnapshotTitle = page.locator("//div[@class='card market-card']//h5[normalize-space(.)='Market Snapshot']");
    this.adminUserLabel = page.locator("//div[@class='container-fluid']//span[text()='Admin ']");
    
    // Dashboard Statistics Counters
    this.registeredInvestorsCount = page.locator("//p[text()='Registered Investors']//parent::div//h3[@id='registeredInvestors']");
    this.activeSipPlansCount = page.locator("//p[text()='Active SIP Plans']//parent::div//h3[@id='activeSipPlans']");
    this.managedFundsCount = page.locator("//p[text()='Managed Mutual Funds']//parent::div//h3[@id='managedFunds']");
    this.orderVolumeCount = page.locator("//p[text()='Total Order Value']//parent::div//h3[@id='orderVolume']");
    
    // Market Index Data
    this.indexNameList = page.locator("//div[@class='card market-card']//table//th[@scope='row']");
    
    // Chart Elements (SVG circles for market indices)
    this.sensexChartCircles = page.locator("//rec[@id='sensexChart']//*[name()='circle']");
    this.niftyChartCircles = page.locator("//rec[@id='niftyChart']//*[name()='circle']");

    // Sidebar Navigation Links
    this.logoutButton = page.locator("//div[@id='sidebar']//a[@id='logoutBtn']");
    this.DashboardMutualFundsOption = page.locator("//div[@class='sidebar']//a[normalize-space(.)='Mutual Funds']");
    this.DashboardSettings = page.locator("//div[@class='sidebar']//a[normalize-space(.)='Settings']");
    this.DashboardPurchases = page.locator("//div[@class='sidebar']//a[normalize-space(.)='Purchases']");
    this.DashbaordUsers = page.locator("//div[@class='sidebar']//a[normalize-space(.)='Users']");
    this.DashboardSipCalculator = page.locator("//div[@class='sidebar']//a[normalize-space(.)='SIP Calculator']");

    // Mutation Testing Controls
    this.HideAllInputs = page.locator("//div[@id='sidebar']//span[normalize-space(text())='Hide All Inputs']");
    this.ShowCaseInputs = page.locator("//div[@id='sidebar']//span[normalize-space(text())='Show All Inputs']");
    
    // Mutation Testing Form Inputs
    this.MutationUsername = page.locator("//div[@class='card-body']//input[@id='mutation-username']");
  }
}
