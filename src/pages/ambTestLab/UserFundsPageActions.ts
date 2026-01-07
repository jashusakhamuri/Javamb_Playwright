import { Page, expect } from '@playwright/test';
import { FundsPage } from '../../locators/ambTestLab/userFunds';
import { Portfolio } from '../../locators/ambTestLab/userPortfolio';
import logger from '../../utils/logger'; // adjust path if needed

/**
 * UserFundsAndPortfolioActions
 *
 * Encapsulates common user flows related to Funds and Portfolio in AmbTestLab.
 * Responsibilities:
 * - Navigate and interact with the Funds tab (browse, add, buy, pagination).
 * - Validate portfolio cart totals, proceed to payment, and view purchase summaries.
 *
 * Notes:
 * - Methods use Playwright `expect` for basic verifications where appropriate.
 * - Tests should use unique test data and include cleanup steps when creating persistent state.
 */
export class UserFundsAndPortfolioActions {
    private readonly funds: FundsPage;
    private readonly portfolio: Portfolio;

    constructor(page: Page) {
        this.funds = new FundsPage(page);
        this.portfolio = new Portfolio(page);
    }

    // ---------------- Funds Flows ----------------
    /**
     * navigateToFunds
     * - Opens the Funds tab and verifies the main heading is visible.
     */
    async navigateToFunds() {
        logger.info("Navigating to Funds tab...");
        await this.funds.fundsTab.click();
        await expect(this.funds.discoverFundsHeading).toBeVisible();
    }

    /**
     * refreshFundsList
     * - Clicks the refresh control and verifies that fund cards are present.
     */
    async refreshFundsList() {
        logger.info("Refreshing funds list...");
        await this.funds.refreshButton.click();
        await expect(this.funds.cardHolderNames.first()).toBeVisible();
    }

    /**
     * addFundForEmilyJohnson
     * - Clicks the Add button for the sample fund (Emily Johnson). Use unique data in tests to avoid collisions.
     */
    async addFundForEmilyJohnson() {
        logger.info("Adding fund for Emily Johnson...");
        await this.funds.addButtonForEmilyJohnson.click();
    }

    /**
     * buyFundForEmilyJohnson
     * - Initiates the buy flow for the sample fund, waits for navigation to portfolio and verifies visibility.
     */
    async buyFundForEmilyJohnson() {
        logger.info("Buying fund for Emily Johnson...");
        await this.funds.buyNowButtonForEmilyJohnson.click();
        // safer: wait for portfolio page
        await this.funds.page.waitForURL('**/portfolio.html', { timeout: 30000 });
        await expect(this.funds.portfolioTab).toBeVisible();
    }

    /**
     * navigatePagination
     * - Navigate funds pagination forward or backward based on `direction` parameter ('next' | 'prev').
     */
    async navigatePagination(direction: 'next' | 'prev') {
        logger.info(`Navigating pagination: ${direction}`);
        if (direction === 'next') {
            await this.funds.nextButton.click();
        } else {
            await this.funds.prevButton.click();
        }
    }

    // ---------------- Portfolio Flows ----------------
    /**
     * validateCartAndTotals
     * - Verifies cart presence and logs total and savings summary values.
     */
    async validateCartAndTotals() {
        logger.info("Validating cart and totals...");
        await expect(this.portfolio.ToVerifyCartCount).toBeVisible();

        const totalText = await this.portfolio.SummaryTotal.textContent();
        const savingsText = await this.portfolio.SummarySavings.textContent();

        logger.info(`Cart validated. Total: ${totalText}, Savings: ${savingsText}`);
    }

    /**
     * proceedToPayment
     * - Proceeds through review and secure payment steps and verifies a successful payment indicator.
     */
    async proceedToPayment() {
        logger.info("Proceeding to payment...");
        await this.portfolio.ProccerdTOBuyButton.click();
        await expect(this.portfolio.ReviewConfirm).toBeVisible();
        await this.portfolio.SecurePayment.click();
        await expect(this.portfolio.ToVerifyPaymentSuccessful).toBeVisible();
        logger.info("Payment completed successfully.");
    }

    /**
     * viewPurchaseSummary
     * - Opens the purchase summary, collects key summary values and verifies their visibility.
     */
    async viewPurchaseSummary() {
        logger.info("Viewing purchase summary...");
        await this.portfolio.ViewPurchaseSummary.click();

        const fundsText = await this.portfolio.VerifyFunds.textContent();
        const investedText = await this.portfolio.VerifySummaryInvested.textContent();
        const savingsText = await this.portfolio.VerifySummarySavings.textContent();
        const returnsText = await this.portfolio.verifysummaryReturns.textContent();

        logger.info(`Summary -> Funds: ${fundsText}, Invested: ${investedText}, Savings: ${savingsText}, Returns: ${returnsText}`);

        await expect(this.portfolio.VerifyFunds).toBeVisible();
        await expect(this.portfolio.VerifySummaryInvested).toBeVisible();
        await expect(this.portfolio.VerifySummarySavings).toBeVisible();
        await expect(this.portfolio.verifysummaryReturns).toBeVisible();

        logger.info("Purchase summary verification completed successfully.");
    }

    /**
     * returnToPortfolioDashboard
     * - Clicks return to portfolio and waits for the portfolio URL to be present.
     */
    async returnToPortfolioDashboard() {
        logger.info("Returning to portfolio dashboard...");
        await this.portfolio.ToReturnPortfilo.click();
        await this.portfolio.page.waitForURL('**/portfolio', { timeout: 30000 });
    }
}
