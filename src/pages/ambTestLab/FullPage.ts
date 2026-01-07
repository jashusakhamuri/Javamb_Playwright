import { Page } from '@playwright/test';

// User imports
import { FundsPage } from '../../locators/ambTestLab/userFunds';
import { Portfolio } from '../../locators/ambTestLab/userPortfolio';
import { Spi_Calculator } from '../../locators/ambTestLab/userSipCalculator';
import { UserProfile } from '../../locators/ambTestLab/userProfile';
import { DashboardPage as UserDashboard } from '../../locators/ambTestLab/adminDashBoard';

// Admin imports
import { DashboardPage as AdminDashboard } from '../../locators/ambTestLab/adminDashBoard';
import { AdminSetting } from '../../locators/ambTestLab/adminSetting';
import { AdminUserMangement } from '../../locators/ambTestLab/adminUserMangement';
import { AdimnMutualFunds } from '../../locators/ambTestLab/adminMutualFunds';
import { Purchases } from '../../locators/ambTestLab/adminPurchase';
import { Ecommerce } from '../../locators/ambTestLab/adminEcommerce';
import { SipCalculatorPage } from '../../locators/ambTestLab/adminSipCalculator';

import logger from '../../utils/logger';

// ========================================================
//  USER ACTIONS CLASS
// ========================================================
/**
 * UserActions
 *
 * Groups common end-user flows used in E2E scenarios (Funds, Portfolio, SIP Calculator, Profile).
 * Responsibilities:
 * - Coordinate page objects (FundsPage, Portfolio, Sip_Calculator, UserProfile) to perform common user journeys.
 * - Keep interactions descriptive and idempotent so tests can create and clean up state reliably.
 */
class UserActions {
    private readonly funds: FundsPage;
    private readonly portfolio: Portfolio;
    private readonly sip: Spi_Calculator;
    private readonly profile: UserProfile;
    private readonly dashboard: UserDashboard;

    constructor(page: Page) {
        this.funds = new FundsPage(page);
        this.portfolio = new Portfolio(page);
        this.sip = new Spi_Calculator(page);
        this.profile = new UserProfile(page);
        this.dashboard = new UserDashboard(page);
    }

    /**
     * fundsFlow
     * - Navigates to the Funds tab, verifies the heading and performs a buy+add flow for a sample fund (Emily Johnson).
     * - Tests should provide unique data or cleanup steps to avoid collisions when re-running.
     */
    async fundsFlow() {
        logger.info('[FundsPage] Navigate to Funds tab');
        await this.funds.fundsTab.click();
        await this.funds.discoverFundsHeading.waitFor({ state: 'visible' });

        logger.info('[FundsPage] Buy + Add Emily Johnson');
        await this.funds.buyNowButtonForEmilyJohnson.click();
        await this.funds.addButtonForEmilyJohnson.click();
    }
   

    /**
     * portfolioFlow
     * - Switches to portfolio, validates cart and totals, proceeds to payment, and verifies success.
     */
    async portfolioFlow() {
        await this.funds.portfolioTab.click();

        logger.info('[Portfolio] Validate cart & totals');
        await this.portfolio.ToVerifyCartCount.waitFor({ state: 'visible' });
        await this.portfolio.SummaryTotal.waitFor({ state: 'visible' });

        //await this.portfolio.ProccerdTOBuyButton.scrollIntoViewIfNeeded();
        await this.portfolio.ProccerdTOBuyButton.click();
        await this.portfolio.SecurePayment.click();

        logger.info('[Portfolio] Validate payment');
        await this.portfolio.ToVerifyPaymentSuccessful.waitFor({ state: 'visible' });
        await this.portfolio.ViewPurchaseSummary.click();
    }

    /**
     * sipCalculatorFlow
     * - Opens SIP calculator, inputs example values, submits, and verifies results are displayed.
     */
    async sipCalculatorFlow() {
        await this.funds.sipCalculationsTab.click();
        await this.sip.minimunAmount.waitFor({ state: 'visible' });

        await this.sip.minimunAmount.fill('5000');
        await this.sip.years.fill('5');
        await this.sip.expectedAnnualReturn.fill('12');
        await this.sip.submitbutton.click();

        await this.sip.totalinvested.waitFor({ state: 'visible' });
        await this.sip.estfutureValue.waitFor({ state: 'visible' });
    }

    /**
     * profileFlow
     * - Navigates to profile, edits name and mobile number, saves, and verifies the updated details are visible.
     */
    async profileFlow() {
        await this.profile.ProfileTab.click();
        await this.profile.EditProfilebutton.click();

        await this.profile.EditFirstName.fill('ArjunUpdated');
        await this.profile.EditMobileNo.fill('9876500000');

        await this.profile.SaveChangeButton.click();

        await this.profile.FullName.waitFor({ state: 'visible' });
        await this.profile.mobieNumber.waitFor({ state: 'visible' });
        await this.profile.EmailID.waitFor({ state: 'visible' });
    }

    /**
     * logoutFlow
     * - Logs the user out via the funds logout tab; intended for test cleanup.
     */
    async logoutFlow() {
        logger.info('[User] Logging out');
        await this.funds.logoutTab.click();
    }
}

// ========================================================
//  ADMIN ACTIONS CLASS
// ========================================================
/**
 * AdminActions
 *
 * Groups common administrative flows (Mutual Funds, Settings, Users, Purchases, E-Commerce, SIP Calculator).
 * Responsibilities:
 * - Coordinate admin page objects to perform add/edit/delete and reporting operations.
 * - Perform lightweight verifications and log detailed progress for troubleshooting.
 */
class AdminActions {
    private readonly dashboard: AdminDashboard;
    private readonly settings: AdminSetting;
    private readonly users: AdminUserMangement;
    private readonly funds: AdimnMutualFunds;
    private readonly purchases: Purchases;
    private readonly ecommerce: Ecommerce;
    private readonly sip: SipCalculatorPage;

    constructor(page: Page) {
        this.dashboard = new AdminDashboard(page);
        this.settings = new AdminSetting(page);
        this.users = new AdminUserMangement(page);
        this.funds = new AdimnMutualFunds(page);
        this.purchases = new Purchases(page);
        this.ecommerce = new Ecommerce(page);
        this.sip = new SipCalculatorPage(page);
    }

    /**
     * openMutualFunds
     * - Navigates to the Mutual Funds admin section via the dashboard.
     */
    async openMutualFunds() {
        logger.info("Navigating to Mutual Funds...");
        await this.dashboard.DashboardMutualFundsOption.click();
    }

   
    /**
     * addNewFund
     * - Opens the Add Fund form, fills in fund details and submits the form.
     * - Use unique identifiers (e.g., fund code) to keep tests idempotent and easy to clean up.
     */
    async addNewFund(
        name: string,
        code: string,
        category: string,
        image: string,
        offerPrice: string,
        riskLevel: string,
        nav: string,
        originalPrice: string,
        yearReturn: string,
        threeYearReturn: string,
        fiveYearReturn: string,
        fundHouse: string,
        location: string
    ) {
        logger.info("[FundsPage] Adding new fund...");

        await this.funds.AddFundButton.click();
        await this.funds.ClickToSeeAddFundForm.click();

        await this.funds.AddFundName.fill(name);
        await this.funds.AddFundCode.fill(code);
        await this.funds.AddCategoryDropDown.selectOption({ label: category });
        await this.funds.Addimage.fill(image);
        await this.funds.AddOfferPrice.fill(offerPrice);
        await this.funds.AddRiskLevel.selectOption({ label: riskLevel });
        await this.funds.AddFundNav.fill(nav);
        await this.funds.AddOriginalPrice.fill(originalPrice);
        await this.funds.AddYearReturn.fill(yearReturn);
        await this.funds.Add3YearReturn.fill(threeYearReturn);
        await this.funds.Addd5YearReturn.fill(fiveYearReturn);
        await this.funds.AddFundHouse.fill(fundHouse);
        await this.funds.location.fill(location);

        await this.funds.SaveButton.click();

        logger.info(`[FundsPage] Fund "${name}" saved successfully.`);
    }


    /**
     * editFund
     * - Opens the Edit dialog for the selected fund, updates fields and saves.
     */
    async editFund(
        newName: string,
        newCode: string,
        newCategory: string,
        newImage: string,
        newOfferPrice: string,
        newRiskLevel: string
    ) {
        logger.info("[AdminMutualFunds] Editing fund...");

        await this.funds.EditButton.click();
        await this.funds.EditTittle.waitFor({ state: "visible" });

        await this.funds.EditFundName.fill(newName);
        await this.funds.EditFundCode.fill(newCode);
        await this.funds.EditCategoryDropDown.selectOption({ label: newCategory });
        await this.funds.Editimage.fill(newImage);
        await this.funds.EditOfferPrice.fill(newOfferPrice);
        await this.funds.EditRiskLevel.selectOption({ label: newRiskLevel });

        await this.funds.UpdateFund.click();

        logger.info(`[AdminMutualFunds] Fund updated successfully to "${newName}".`);
    }

    /**
     * updateAdminSettings
     * - Navigates to Settings and updates admin name; intended for basic admin settings validation.
     */
    async updateAdminSettings() {
        logger.info("Navigating to Settings...");
        await this.dashboard.DashboardSettings.click();

        await this.settings.ChangeAdminName.fill('AdminUpdated');
        await this.settings.UpdateButton.click();

        logger.info("Settings updated.");
    }

    /**
     * openUserManagement
     * - Navigates to Users, waits for User Management to load, optionally toggles to table view, and validates presence/absence of users.
     */
    async openUserManagement() {
        logger.info("Navigating to Users...");

        // Click USERS in sidebar
        await this.dashboard.DashbaordUsers.click();

        // Wait for the User Management title
        await this.users.TittleUSerMangement.waitFor({ state: "visible" });

        logger.info("User Management page loaded.");

        // Optionally switch view (Card → Table)
        if (await this.users.CardViewButton.isVisible()) {
            logger.info("Switching from Card view to Table view...");
            await this.users.CardViewButton.click();
        }

        // Confirm "No users found" or table content exists
        if (await this.users.NoUserFOundTable.isVisible()) {
            logger.info("Table view is visible: No users found.");
        }

        logger.info("Users section viewed successfully.");
    }

    /**
     * openPurchases
     * - Navigates to Purchases, waits for page and summary cards, and logs table status if rows are present.
     */
    async openPurchases() {
        logger.info("Navigating to Purchases...");

        // Click sidebar link
        await this.dashboard.DashboardPurchases.click();

        // Wait for Purchases page to load
        await this.purchases.title.waitFor({ state: "visible" });

        logger.info("Purchases page loaded successfully.");

        // Optional: Verify summary cards
        await this.purchases.totalOrders.waitFor({ state: "visible" });
        await this.purchases.grossVolume.waitFor({ state: "visible" });
        await this.purchases.itemsSold.waitFor({ state: "visible" });

        logger.info("Purchases summary loaded.");

        // Optional: If table has rows, confirm table loaded
        if (await this.purchases.tableRows.first().isVisible()) {
            logger.info("Purchases table displayed with at least one row.");
        } else {
            logger.info("Purchases table is empty.");
        }
    }


    /**
     * openSipCalculatorData
     * - Navigates to the SIP Calculator Data admin page, verifies page header and optionally validates table/chart presence.
     */
    async openSipCalculatorData() {
        logger.info("Navigating to SIP Calculator Data...");

        // Click sidebar menu item
        await this.dashboard.DashboardSipCalculator.click();

        // Wait for SIP Calculator Data page to load
        await this.sip.sipCalculatorDataTitleHead.waitFor({ state: "visible" });

        logger.info("SIP Calculator Data page loaded successfully.");

        // Optional: Verify table loaded (if any rows)
        if (await this.sip.allSipMonthlyAmounts.first().isVisible()) {
            logger.info("SIP monthly amounts table loaded.");
        } else {
            logger.info("No SIP records found.");
        }

        // Optional: ensure charts loaded
        if (await this.sip.monthlyInvestmentDistributionRects.first().isVisible()) {
            logger.info("Monthly Investment chart loaded.");
        }
    }


    /**
     * logout
     * - Logs the admin out via the dashboard logout button; used for test cleanup.
     */
    async logout() {
        logger.info("Admin logging out...");
        await this.dashboard.logoutButton.click();
    }
}

// ========================================================
//  MASTER WRAPPER CLASS
// ========================================================
/**
 * E2EActions
 *
 * Top-level wrapper that exposes grouped `user` and `admin` action objects for end-to-end tests.
 * Usage:
 *   const actions = new E2EActions(page);
 *   await actions.user.fundsFlow();
 *   await actions.admin.openPurchases();
 */
export class E2EActions {
    readonly user: UserActions;
    readonly admin: AdminActions;

    constructor(page: Page) {
        this.user = new UserActions(page);
        this.admin = new AdminActions(page);
    }
}
