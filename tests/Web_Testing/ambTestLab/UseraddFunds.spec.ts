import { test } from "../../../Fixtuers/Login";
import { UserFundsAndPortfolioActions }
    from "../../../src/pages/ambTestLab/UserFundsPageActions"; // <-- corrected path
import logger from "../../../src/utils/logger";
import { showMouse } from '../../../src/utils/Mouse_helper';

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
