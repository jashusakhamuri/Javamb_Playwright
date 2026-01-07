
import { test } from "../../../Fixtuers/Login";
import { UserSipCalculatorActions } from "../../../src/pages/ambTestLab/UserSipCalculatorActions";
import logger from "../../../src/utils/logger";
import { showMouse } from '../../../src/utils/Mouse_helper';

// Import JSON test data
import testData from "../../../TestData/AmbTestData/UserDashboard.json";

/**
 * User SIP Calculator Test
 *
 * @description
 * Regression-level test verifying user-facing SIP calculator functionality: calculation runs, graph rendering,
 * and cleanup (deletion) of calculations. This ensures the calculator produces expected outputs and that
 * graphs and result artifacts are available to users.
 *
 * @test-flow
 * 1) Authenticate as a user via `loginAsUser` fixture.
 * 2) Open the SIP calculator (`openCalculator`).
 * 3) Run repeated calculations via `repeatSipCalculation(testData)` to validate results and charts.
 * 4) Validate graphs are rendered via `validateGraphs()`.
 * 5) Clean up test calculations via `deleteCalculation()`.
 *
 * @page-methods (responsibilities)
 * - `openCalculator()` — navigates to the calculator page and confirms UI readiness.
 * - `repeatSipCalculation(data)` — inputs multiple calculation payloads and asserts the numeric results and summary values.
 * - `validateGraphs()` — confirms expected charts render and have data points.
 * - `deleteCalculation()` — removes created calculations and asserts removal.
 *
 * @assertions
 * - Page action methods implement the DOM waits and specific assertions. This spec orchestrates calls and will fail
 *   if any page action throws or internal assertions fail.
 *
 * @run-example
 * npx playwright test tests/Web_Testing/ambTestLab/UserSipCalculator.spec.ts --project=chromium --grep "@regression" --headed
 *
 * @troubleshooting
 * - Re-run with `--debug --headed` and inspect traces/videos in `playwright-report/` if failures occur.
 * - If chart selectors or data points change, update `src/locators/` and `UserSipCalculatorActions` methods.
 *
 * 
 */

test("User SIP Calculator Test @regression", async ({ page, loginAsUser }) => {
    logger.info("🚀 Starting SIP Calculator Test...");
    await showMouse(page);
    const userCreds = await loginAsUser();
    logger.info(`✅ USER LOGGED IN: ${userCreds.email}`);

    const sipActions = new UserSipCalculatorActions(page);

    await sipActions.openCalculator();

    // Pass JSON data into repeatSipCalculation
    await sipActions.repeatSipCalculation(testData.SipCalculatorData);

    await sipActions.validateGraphs();
    await sipActions.deleteCalculation();

    logger.info("🎉 SIP Calculator Test COMPLETED SUCCESSFULLY!");
});
