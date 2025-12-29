import { Page, expect } from '@playwright/test';
import { FundsPage } from '../../locators/ambTestLab/userFunds';
import { Portfolio } from '../../locators/ambTestLab/userPortfolio';
import logger from '../../utils/logger'; // adjust path if needed

export class UserFundsAndPortfolioActions {
    private readonly funds: FundsPage;
    private readonly portfolio: Portfolio;

    constructor(page: Page) {
        this.funds = new FundsPage(page);
        this.portfolio = new Portfolio(page);
    }

    // ---------------- Funds Flows ----------------
    async navigateToFunds() {
        logger.info("Navigating to Funds tab...");
        await this.funds.fundsTab.click();
        await expect(this.funds.discoverFundsHeading).toBeVisible();
    }

    async refreshFundsList() {
        logger.info("Refreshing funds list...");
        await this.funds.refreshButton.click();
        await expect(this.funds.cardHolderNames.first()).toBeVisible();
    }

    async addFundForEmilyJohnson() {
        logger.info("Adding fund for Emily Johnson...");
        await this.funds.addButtonForEmilyJohnson.click();
    }

    async buyFundForEmilyJohnson() {
        logger.info("Buying fund for Emily Johnson...");
        await this.funds.buyNowButtonForEmilyJohnson.click();
        // safer: wait for portfolio page
        await this.funds.page.waitForURL('**/portfolio.html', { timeout: 30000 });
        await expect(this.funds.portfolioTab).toBeVisible();
    }

    async navigatePagination(direction: 'next' | 'prev') {
        logger.info(`Navigating pagination: ${direction}`);
        if (direction === 'next') {
            await this.funds.nextButton.click();
        } else {
            await this.funds.prevButton.click();
        }
    }

    // ---------------- Portfolio Flows ----------------
    async validateCartAndTotals() {
        logger.info("Validating cart and totals...");
        await expect(this.portfolio.ToVerifyCartCount).toBeVisible();

        const totalText = await this.portfolio.SummaryTotal.textContent();
        const savingsText = await this.portfolio.SummarySavings.textContent();

        logger.info(`Cart validated. Total: ${totalText}, Savings: ${savingsText}`);
    }

    async proceedToPayment() {
        logger.info("Proceeding to payment...");
        await this.portfolio.ProccerdTOBuyButton.click();
        await expect(this.portfolio.ReviewConfirm).toBeVisible();
        await this.portfolio.SecurePayment.click();
        await expect(this.portfolio.ToVerifyPaymentSuccessful).toBeVisible();
        logger.info("Payment completed successfully.");
    }

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

    async returnToPortfolioDashboard() {
        logger.info("Returning to portfolio dashboard...");
        await this.portfolio.ToReturnPortfilo.click();
        await this.portfolio.page.waitForURL('**/portfolio', { timeout: 30000 });
    }
}
