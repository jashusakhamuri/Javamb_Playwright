import { test } from '../../../Fixtuers/Login';   // your merged fixture
import logger from '../../../src/utils/logger';
import { showMouse } from '../../../src/utils/Mouse_helper';

/**
 * Login & Registration Test
 *
 * @description
 * Smoke-level test that validates user registration/login and admin login flows.
 * It ensures basic authentication is functioning for both regular users and admin users.
 *
 * @flow
 * 1) Optionally show mouse overlay to assist with debug videos.
 * 2) Register or retrieve a test user with `loginAsUser` fixture and assert the user session is active.
 * 3) Perform admin login with `loginAsAdmin` fixture and assert admin session is active.
 *
 * @assertions
 * - The authentication fixtures (`loginAsUser`, `loginAsAdmin`) encapsulate checks; this spec will fail
 *   if those fixtures throw or do not establish authenticated state.
 *
 * @run-example
 * ```powershell
 * npx playwright test tests/Web_Testing/ambTestLab/LoginRegister.spec.ts --project=chromium --grep "@smoke" --headed
 * ```
 *
 * @troubleshooting
 * - Re-run with `--debug --headed` to step through UI interactions with Playwright Inspector.
 * - Inspect `playwright-report/` for video/trace artifacts and `results/results.xml` for test output.
 * - If the auth flow changes (e.g., OTP/SSO), update `Fixtuers/Login.ts` fixtures instead of this spec.
 *
 * 
 */

    test('user can register and login  @smoke' , async ({ page, loginAsUser, loginAsAdmin }) => {
        try {
            logger.info(' Starting Login and Registration Tests...');

            const userCreds = await loginAsUser();
            logger.info(`User Gmail: ${userCreds.email}`);
            logger.info(`User Password: ${userCreds.password}`);
            await page.waitForTimeout(2000);
            logger.info(' User login completed successfully');

            logger.info(' Starting Admin Login Test...');
            await loginAsAdmin();
            logger.info(' Admin login completed successfully');
            await page.waitForTimeout(2000);

        } catch (error) {
            logger.error(` Login and Registration test failed: ${error}`);
            throw error; // rethrow so Playwright marks test as failed
        }
    });
