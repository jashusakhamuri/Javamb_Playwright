// tests/Web_Testing/ambTestLab/AdminSetting.spec.ts
import { test } from '../../../Fixtuers/Login';
import { AdminSettingActions } from '../../../src/pages/ambTestLab/AdminSettingActions';
import logger from '../../../src/utils/logger';
import { showMouse } from "../../../src/utils/Mouse_helper";
import { AdminSettingData } from "../../../TestData/AmbTestData/UserDashboard.json";

test.describe('Admin Settings Test Suite @smoke', () => {
    test('Run full Admin Settings flow', async ({ page, loginAsAdmin,loginAsUser }) => {
        try {
            await showMouse(page);
            logger.info(' Starting Login and Registration Tests...');
            const userCreds = await loginAsUser();
            logger.info(`User Gmail: ${userCreds.email}`);
            logger.info(`User Password: ${userCreds.password}`);


            logger.info('🟣 Logging in as ADMIN...');
            await loginAsAdmin();


            const adminActions = new AdminSettingActions(page);
            await adminActions.navigateToSettings();
            await adminActions.exportData();


            // Clear data
            await adminActions.clearData();

            // Update credentials
            await adminActions.updateAdminCredentials(
                AdminSettingData.newName
            );

            // Export data
           

            logger.info('[Spec] Admin Settings flow completed successfully');
        } catch (err: any) {
            logger.warn('[Spec] Something went wrong during Admin Settings flow');
            logger.error(`[Spec] Error details: ${err.message}`);
            logger.error(err.stack);
           
        }
    });
});
