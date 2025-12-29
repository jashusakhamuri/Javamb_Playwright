import { test } from '../../../Fixtuers/Login';
import { AdminMutualFundsActions } from '../../../src/pages/ambTestLab/AdminMutualFundsActions';
import logger from '../../../src/utils/logger';
import { showMouse } from "../../../src/utils/Mouse_helper";
import { AdminAddFund, AdminEditFund } from "../../../TestData/AmbTestData/AddproductData.json";

test.describe('Admin Mutual Funds Test Suite @smoke', () => {
    test('Run full Admin Mutual Funds flow', async ({ page, loginAsAdmin }) => {
        try {
            await showMouse(page);

            logger.info('🟣 Logging in as ADMIN...');
            await loginAsAdmin();

            const mutualFundsActions = new AdminMutualFundsActions(page);
            await mutualFundsActions.navigateToMutualFundsSection();

            // Add Fund
            await mutualFundsActions.addFund(
                AdminAddFund.name,
                AdminAddFund.code,
                AdminAddFund.category,
                AdminAddFund.image,
                AdminAddFund.offerPrice,
                AdminAddFund.riskLevel,
                AdminAddFund.nav,
                AdminAddFund.originalPrice,
                AdminAddFund.yearReturn,
                AdminAddFund.threeYearReturn,
                AdminAddFund.fiveYearReturn,
                AdminAddFund.fundHouse,
                AdminAddFund.location
            );

            // Edit Fund
            await mutualFundsActions.editFund(
                AdminEditFund.newName,
                AdminEditFund.newCode,
                AdminEditFund.newCategory,
                AdminEditFund.newImage,
                AdminEditFund.newOfferPrice,
                AdminEditFund.newRiskLevel
            );

            // Delete Fund
            await mutualFundsActions.deleteFund();

            logger.info('[Spec] Admin Mutual Funds flow completed successfully');
        } catch (err: any) {
            logger.warn('[Spec] Something went wrong during Mutual Funds flow');
            logger.error(`[Spec] Error details: ${err.message}`);
            logger.error(err.stack);
            throw err;
        }
    });
});
