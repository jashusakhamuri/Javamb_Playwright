// tests/Web_Testing/ambTestLab/SipCalculator.spec.ts
import { test } from '../../../Fixtuers/Login';
import { SipCalculatorActions } from '../../../src/pages/ambTestLab/AdminSipCalculatorActions';
import { UserSipCalculatorActions } from "../../../src/pages/ambTestLab/UserSipCalculatorActions";
import logger from '../../../src/utils/logger';
import { showMouse } from "../../../src/utils/Mouse_helper";
// Import JSON test data
import testData from "../../../TestData/AmbTestData/UserDashboard.json";


/**
 * SIP Calculator Test Suite (detailed)
 *
 * @description
 * Executes the SIP Calculator user and admin flows. Verifies user-facing SIP calculations, charts,
 * and admin-facing table exports and validations.
 *
 * @purpose
 * - Validate that the SIP Calculator UI correctly computes SIP results for users and presents
 *   calculation data to admin users in tabular form suitable for export.
 *
 * @test-flow
 * User flow:
 *  1. Open calculator in user view (`openCalculator`).
 *  2. Run repeat calculations via `repeatSipCalculation` with test data and validate results/graphs.
 *
 * Admin flow:
 *  1. Authenticate as Admin using `loginAsAdmin` fixture and navigate to SIP Calculator.
 *  2. Verify admin-specific table is loaded (`verifyCalculatorPageLoaded`).
 *  3. Validate table data (`validateTableData`) and export calculations (`exportCalculations`).
 *  4. Logout via `logout` action.
 *
 * @assertions
 * - Page action methods are responsible for DOM waits and assertions (graphs, table rows, notifications).
 * - This spec orchestrates calling those methods and will fail if any throws or their assertions fail.
 *
 * @run-example
 * npx playwright test tests/Web_Testing/ambTestLab/AdminSipCalculator.spec.ts --project=chromium --grep "@regression" --headed
 *
 * @troubleshooting
 * - Re-run failing test with: `npx playwright test <spec> --debug --headed` and inspect `playwright-report/` for traces.
 * - If table or chart selectors change, update `src/locators/` or the page action methods in `src/pages/ambTestLab`.
 *
 * 
 */

test.describe('SIP Calculator Test Suite @regression', () => {
    test('Run full SIP Calculator flow', async ({ page, loginAsAdmin, loginAsUser }) => {
        try {
            await showMouse(page);

            logger.info("🚀 Starting SIP Calculator Test...");
            const userCreds = await loginAsUser();
            logger.info(`✅ USER LOGGED IN: ${userCreds.email}`);

            const userSipActions = new UserSipCalculatorActions(page);

            // User flow
          
            await userSipActions.openCalculator();
            await userSipActions.repeatSipCalculation(testData.SipCalculatorData);
            
           

            logger.info("🎉 User SIP Calculator flow completed successfully!");

            // Admin flow
            logger.info('🟣 Logging in as ADMIN...');
            await loginAsAdmin();

            const adminSipActions = new SipCalculatorActions(page);
            await adminSipActions.navigateToSipCalculator();

            await adminSipActions.verifyCalculatorPageLoaded();
            await adminSipActions.validateTableData(); // ✅ validate table rows, not charts
            await adminSipActions.exportCalculations();
            await adminSipActions.logout();

            logger.info('[Spec] Admin SIP Calculator flow completed successfully');
        } catch (err: any) {
            logger.warn('[Spec] Something went wrong during SIP Calculator flow');
            logger.error(`[Spec] Error details: ${err.message}`);
            logger.error(err.stack);
            throw err;
        }
    });
});
