
import { test } from '../../../Fixtuers/Login';   // your merged fixture
import { E2EActions } from '../../../src/pages/ambTestLab/FullPage';
import logger from '../../../src/utils/logger';
import { showMouse } from '../../../src/utils/Mouse_helper';
import { AdminAddFund } from '../../../TestData/AmbTestData/AddproductData.json'

/**
 * Full User + Admin End-to-End Journey
 *
 * @description
 * Orchestrates a complete E2E verification that combines typical user journeys (funds, portfolio, SIP calculator, profile)
 * with admin operations (mutual funds management, user management, settings, purchases, SIP data). This is a regression-level
 * scenario meant to validate cross-cutting flows and integration points.
 *
 * @preconditions
 * - Both a regular user and an admin user are available via fixtures (`loginAsUser`, `loginAsAdmin`).
 * - Test data for fund creation exists in `TestData/AmbTestData/AddproductData.json`.
 *
 * @user-flow (methods and expected checks)
 * - `e2e.user.fundsFlow()`
 *   - User navigates to funds page, adds/follows funds, and verifies portfolio effects/visibility.
 * - `e2e.user.portfolioFlow()`
 *   - Validates the portfolio summary, balances, and holdings display correctly after actions.
 * - `e2e.user.sipCalculatorFlow()`
 *   - Runs SIP calculations and verifies graphs/results are rendered correctly.
 * - `e2e.user.profileFlow()`
 *   - Updates or verifies profile fields and confirmation messages.
 * - `e2e.user.logoutFlow()`
 *   - Logs out and asserts the session is terminated / login page visible.
 *
 * @admin-flow (methods and expected checks)
 * - `e2e.admin.openMutualFunds()`
 *   - Navigates to mutual funds admin area and verifies page readiness.
 * - `e2e.admin.addNewFund(...)`
 *   - Adds new fund using fields: name, code, category, image, offerPrice, riskLevel, nav, originalPrice, yearReturn, threeYearReturn, fiveYearReturn, fundHouse, location.
 *   - Assertion: new fund row is visible with the correct identifying fields and success message.
 * - `e2e.admin.openUserManagement()`
 *   - Opens user management and verifies list or card views are present.
 * - `e2e.admin.updateAdminSettings()`
 *   - Applies admin settings changes and verifies success notifications or persisted values.
 * - `e2e.admin.openPurchases()` / `e2e.admin.openSipCalculatorData()`
 *   - Verify data tables and export capabilities where applicable.
 *
 * @assertions & responsibilities
 * - This spec orchestrates flows; the detailed DOM checks, waits and verifications are implemented inside each
 *   page/action method. If a page method throws, the spec will fail and rethrow for CI visibility.
 *
 * @idempotency
 * - Where possible, use unique identifiers (e.g., fund `code` or timestamped names) to avoid collisions across runs.
 *
 * @run-example
 * npx playwright test tests/Web_Testing/ambTestLab/Full_E2e.spec.ts --project=chromium --grep "@regression" --headed
 *
 * @troubleshooting
 * - Re-run with `--debug --headed` and inspect `playwright-report/` for videos/traces.
 * - If failures are due to UI changes, update the corresponding methods in `src/pages/ambTestLab/FullPage.ts` or selectors in `src/locators/`.
 *
 * 
 */

test.describe('Complete User + Admin End-to-End Journey @regression', () => {

    test('Full E2E Journey', async ({ page, loginAsUser, loginAsAdmin }) => {

        logger.info('🚀 Starting Full E2E Journey...');

        // Optional: show red glowing cursor
        await showMouse(page);

        // Create master E2E class object
        const e2e = new E2EActions(page);

        // =======================================
        // 👤 USER FLOW
        // =======================================
        logger.info(' Logging in as USER...');
        const userCreds = await loginAsUser();
        logger.info(` USER LOGGED IN: ${userCreds.email}`);

        await e2e.user.fundsFlow();
        await e2e.user.portfolioFlow();
        await e2e.user.sipCalculatorFlow();
        await e2e.user.profileFlow();
        await e2e.user.logoutFlow();

        logger.info('🔵 USER FLOW COMPLETED');


        // =======================================
        // 🛠 ADMIN FLOW
        // =======================================
        logger.info('🟣 Logging in as ADMIN...');
        await loginAsAdmin();

      await e2e.admin.openMutualFunds();
        await e2e.admin.addNewFund(
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



        await e2e.admin.openUserManagement();
        await e2e.admin.updateAdminSettings();
        await e2e.admin.openPurchases();
        await e2e.admin.openSipCalculatorData();

        logger.info('🟣 ADMIN FLOW COMPLETED');

        // =======================================
        logger.info('🎉 FULL USER + ADMIN FLOW COMPLETED SUCCESSFULLY!');
    });

});

