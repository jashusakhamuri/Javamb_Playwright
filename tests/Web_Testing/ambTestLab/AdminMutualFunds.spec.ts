import { test } from '../../../Fixtuers/Login';
import { AdminMutualFundsActions } from '../../../src/pages/ambTestLab/AdminMutualFundsActions';
import logger from '../../../src/utils/logger';
import { showMouse } from "../../../src/utils/Mouse_helper";
import { AdminAddFund, AdminEditFund } from "../../../TestData/AmbTestData/AddproductData.json";

/**
 * Admin Mutual Funds Test Suite
 *
 * @description
 * Runs an end-to-end Admin flow that verifies mutual fund management in the UI: Add → Edit → Delete.
 *
 * What this test does (step-by-step):
 * 1) Show optional mouse overlay to make debug videos easier to interpret.
 * 2) Authenticate as an Admin using the `loginAsAdmin` fixture (establishes session state).
 * 3) Navigate to the Mutual Funds section using page actions.
 * 4) Add a fund via the UI and assert the new fund row appears and a success notification is shown.
 * 5) Edit the created fund and assert the updated values appear in the list.
 * 6) Delete the fund and assert the fund row is removed from the list.
 *
 * Assertions & responsibilities:
 * - Detailed DOM assertions (visibility, text matches, notifications) are implemented inside page action
 *   methods (`addFund`, `editFund`, `deleteFund`). This spec orchestrates the sequence and will fail if
 *   any page action throws an error or its internal assertions fail.
 *
 * Troubleshooting:
 * - Re-run locally with: `npx playwright test tests/Web_Testing/ambTestLab/AdminMutualFunds.spec.ts --debug --headed`.
 * - Check artifacts in `playwright-report/` (videos, traces) and `results/results.xml` for test output.
 * - If assertions fail due to UI/selector changes, update the corresponding page methods under `src/pages/ambTestLab`.
 *
 * 
 */

test.describe('Admin Mutual Funds Test Suite @smoke', () => {
    test('Admin Mutual Funds flow', async ({ page, loginAsAdmin }) => {
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
