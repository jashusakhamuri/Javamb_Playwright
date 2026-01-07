import { test } from '../../../Fixtuers/Login';
import { AdminUserManagementActions } from '../../../src/pages/ambTestLab/AdminUserManagementActions';
import logger from '../../../src/utils/logger';
import { showMouse } from '../../../src/utils/Mouse_helper';





    /**
     * Admin User Management Test (detailed)
     *
     * @description
     * Regression-level test that verifies access to the User Management area, view toggles, and export
     * functionality. It validates both user-like checks and admin capabilities in a single orchestration.
     *
     * @purpose
     * - Ensure an Admin can navigate to the User Management UI, toggle views (card/table), and export user data.
     *
     * @page-methods (what each called method should verify)
     * - `navigateToUserManagementSection()` — navigates to user management and asserts page readiness.
     * - `verifyTitle()` — asserts the page title/header is correct.
     * - `checkNoUsersCardView()` / `checkNoUsersTableView()` — verifies UI handles empty states correctly (card/table views).
     * - `TableViewButton()` — switches to table view and verifies table elements are visible.
     * - `exportUsers()` — triggers export action and asserts success notification or artifact.
     *
     * @test-flow (what this spec orchestrates)
     * 1) Show optional UI overlay for clearer debug videos.
     * 2) Authenticate as a regular user (initial validation) and then as an Admin for elevated actions.
     * 3) Navigate to User Management, perform view toggles, validate UI elements, and export users.
     *
     * @assertions
     * - Page actions contain the detailed DOM assertions and necessary waits; this spec orchestrates them and will fail
     *   if any page action throws or its internal asserts do not pass.
     *
     * @run-example
     * npx playwright test tests/Web_Testing/ambTestLab/AdminUserManagement.spec.ts --project=chromium --grep "@regression" --headed
     *
     * @troubleshooting
     * - Re-run locally with `--debug --headed` to use Playwright Inspector and capture traces/videos.
     * - Inspect `playwright-report/` and `results/results.xml` for artifacts and failure logs.
     * - If selectors or structure change, update `src/locators/*` and page methods in `src/pages/ambTestLab`.
     *
     * 
     */
    test('login , Admin User Management tests @regression', async ({ page, loginAsAdmin, loginAsUser }) => {

        try {
            await showMouse(page);
        logger.info(' Starting Login and Registration Tests...');
        const userCreds = await loginAsUser();
        logger.info(`User Gmail: ${userCreds.email}`);
            logger.info(`User Password: ${userCreds.password}`);
            logger.info(' Logging in as ADMIN...');

            const userCreds1 = await loginAsUser();
            logger.info(`User Gmail: ${userCreds1.email}`);
            logger.info(`User Password: ${userCreds1.password}`);
            logger.info(' Logging in as ADMIN...');


            await loginAsAdmin();

                const userMgmtActions = new AdminUserManagementActions(page);
                await userMgmtActions.navigateToUserManagementSection();

                await userMgmtActions.verifyTitle();
            await userMgmtActions.TableViewButton();
                await userMgmtActions.exportUsers();

                logger.info('[Spec] Admin User Management flow completed successfully');
            } catch (err: any) {
                logger.warn('[Spec] Something went wrong during User Management flow');
                logger.error(`[Spec] Error details: ${err.message}`);
                logger.error(err.stack);
                throw err;
            }


    })

