// tests/Web_Testing/ambTestLab/SipCalculator.spec.ts
import { test } from '../../../Fixtuers/Login';
import { SipCalculatorActions } from '../../../src/pages/ambTestLab/AdminSipCalculatorActions';
import { UserSipCalculatorActions } from "../../../src/pages/ambTestLab/UserSipCalculatorActions";
import logger from '../../../src/utils/logger';
import { showMouse } from "../../../src/utils/Mouse_helper";
// Import JSON test data
import testData from "../../../TestData/AmbTestData/UserDashboard.json";


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
            //await userSipActions.calculateSip("5000", "10", "12"); // Example values
            //await userSipActions.calculateSip("50000", "100", "12"); // Example values
            //await userSipActions.validateGraphs(); // ✅ charts exist in user view
           

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
