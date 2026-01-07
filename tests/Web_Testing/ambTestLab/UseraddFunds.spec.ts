import { test } from "../../../Fixtuers/Login";
import { UserFundsAndPortfolioActions }
    from "../../../src/pages/ambTestLab/UserFundsPageActions"; // <-- corrected path
import logger from "../../../src/utils/logger";
import { showMouse } from '../../../src/utils/Mouse_helper';

/**
 * User Add Funds to Portfolio Payment Test
 *
 * @description
 * Regression-level test that verifies the complete user path for selecting funds, adding to cart,
 * proceeding through payment, and viewing the purchase summary for the portfolio.
 *
 * @test-flow (what this test does)
 * 1) Authenticate a test user using `loginAsUser` fixture.
 * 2) Navigate to the funds listing (`navigateToFunds`).
 * 3) Validate pagination (next/prev) works via `navigatePagination`.
 * 4) Add a specific fund to the cart using `addFundForEmilyJohnson()`.
 * 5) Purchase the fund via `buyFundForEmilyJohnson()` and validate cart totals via `validateCartAndTotals()`.
 * 6) Proceed with payment using `proceedToPayment()` and verify purchase summary with `viewPurchaseSummary()`.
 *
 * @page-methods (what each method should assert)
 * - `navigateToFunds()` — verifies the funds list is visible and actionable.
 * - `navigatePagination(direction)` — verifies page navigation updates the listing correctly.
 * - `addFundForEmilyJohnson()` — adds the designated fund and asserts the item is present in cart.
 * - `buyFundForEmilyJohnson()` — performs the buy flow and confirms order initiation.
 * - `validateCartAndTotals()` — asserts cart item prices and calculated totals are correct.
 * - `proceedToPayment()` — submits payment info and waits for confirmation UI.
 * - `viewPurchaseSummary()` — verifies the purchase summary displays expected order details.
 *
 * @assertions
 * - Detailed DOM assertions are implemented inside the page-action methods; this spec orchestrates them.
 * - If a page method throws or an assertion fails internally, the spec will fail and rethrow the error.
 *
 * @run-example
 * npx playwright test tests/Web_Testing/ambTestLab/UseraddFunds.spec.ts --project=chromium --grep "@regression" --headed
 *
 * @troubleshooting
 * - Re-run with `--debug --headed` to use Playwright inspector; check `playwright-report/` for videos/traces.
 * - If selectors change, update `src/locators/*` and corresponding page methods in `src/pages/ambTestLab`.
 *
 * 
 */

test("User Add Funds to Portfolio Payment Test @regression", async ({ page, loginAsUser }) => {
    logger.info("🚀 Starting User Add Funds to Portfolio Payment Test...");
    await showMouse(page);

    const userCreds = await loginAsUser();
    logger.info(`✅ USER LOGGED IN: ${userCreds.email}`);

    const actions = new UserFundsAndPortfolioActions(page);

    await actions.navigateToFunds();
    await actions.navigatePagination("next");
    await actions.navigatePagination("prev");
    await actions.addFundForEmilyJohnson();
    await actions.buyFundForEmilyJohnson();
   // await actions.goToPortfolio();
    await actions.validateCartAndTotals();
    await actions.proceedToPayment();
    await actions.viewPurchaseSummary();
    //await actions.returnToPortfolioDashboard();

    logger.info("🎉 Test COMPLETED SUCCESSFULLY!");
});
