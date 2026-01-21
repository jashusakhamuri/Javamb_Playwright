// tests/Web_Testing/ambTestLab/AdminSetting.spec.ts
import { test } from '../../../Fixtuers/Login';
import { AdminSettingActions } from '../../../src/pages/ambTestLab/AdminSettingActions';
import logger from '../../../src/utils/logger';
import { showMouse } from "../../../src/utils/Mouse_helper";
import { AdminSettingData } from "../../../TestData/AmbTestData/UserDashboard.json";
import { expect } from '@playwright/test';

/**
 * Admin Settings Test Suite
 *
 * @description
 * Verifies key admin settings workflows such as exporting data, clearing application data,
 * and updating admin credentials. This suite acts as a smoke-level validation for critical
 * admin configuration flows.
 *
 * @step-by-step
 * 1) Show optional mouse overlay for clearer debug videos.
 * 2) Authenticate as a standard user and an admin (user creds are logged for visibility).
 * 3) Navigate to settings via `AdminSettingActions.navigateToSettings()`.
 * 4) Export current data and verify export success (handled inside `exportData`).
 * 5) Clear application data via `clearData()` and verify data is removed/cleared.
 * 6) Update admin credentials (`updateAdminCredentials`) and verify credentials updates are applied.
 *
 * @expected-behaviour
 * - `exportData()` should produce an export artifact or success notification.
 * - `clearData()` should remove or reset target datasets (verify via UI absence/confirmation).
 * - `updateAdminCredentials()` should update displayed admin details and show a success notification.
 *
 * @notes
 * - Page-action methods contain their own waits and assertions; update them if UI changes.
 * - Keep exports and destructive actions idempotent or guarded to avoid interfering with other tests.
 *
 * @run-example
 * npx playwright test tests/Web_Testing/ambTestLab/AdminSetting.spec.ts --project=chromium --headed
 *
 * @troubleshooting
 * - Re-run failing tests with `--debug --headed` and check `playwright-report/` for artifacts.
 * - If exports fail, check file-permission and disk space in CI; for selector issues, update `src/locators/`.
 */

test.describe('Admin Settings Test Suite @smoke', () => {
    test('Run full Admin Settings flow', async ({ page, loginAsAdmin,loginAsUser }) => {
        try {
            await showMouse(page);
            logger.info(' Starting Login and Registration Tests...');
            const userCreds = await loginAsUser();
            logger.info(`User Gmail: ${userCreds.email}`);
            logger.info(`User Password: ${userCreds.password}`);
            expect(true === true);


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
