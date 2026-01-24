import { test } from "../../../Fixtuers/Login";
import { UserProfileActions } from "../../../src/pages/ambTestLab/UserProfileActions";
import logger from "../../../src/utils/logger";
import { showMouse } from '../../../src/utils/Mouse_helper';
import testdata from "../../../TestData/AmbTestData/UserDashboard.json";

/**
 * User Profile Edit Test (detailed)
 *
 * @description
 * Smoke-level verification that a user can open their profile, edit allowed fields, and see the
 * updated values reflected in the UI. This test focuses on profile edit and verification flows.
 *
 * @test-flow
 * 1) Authenticate a test user using `loginAsUser` fixture (establish authenticated session).
 * 2) Navigate to the profile page via `openProfile()`.
 * 3) Update editable profile fields using `editProfile(firstName, lastName, mobile)`.
 * 4) Verify updates with `verifyProfile(...)` to ensure values persist and are displayed correctly.
 *
 * @page-methods (method responsibilities & expected assertions)
 * - `openProfile()` — navigates to profile page and asserts page load and visible profile form.
 * - `editProfile(firstName, lastName, mobile)` — fills editable fields, submits, and asserts success notification.
 * - `verifyProfile(firstName, lastName, mobile)` — reads UI values and asserts they match expected values.
 *
 * @assertions
 * - All DOM waits and specific element assertions are implemented inside the page-action methods; this
 *   orchestration spec will fail if any page action throws or its internal assertions fail.
 *
 * @run-example
 * npx playwright test tests/Web_Testing/ambTestLab/UserProfile.spec.ts --project=chromium --grep "@smoke" --headed
 *
 * @troubleshooting
 * - Re-run with `--debug --headed` and inspect `playwright-report/` for video/trace artifacts on failure.
 * - If the profile form changes, update selectors in `src/locators/` and adjust `UserProfileActions` methods.
 *
 *
 */

test("User Profile Edit  @smoke", async ({ page, loginAsUser }) => {
    logger.info("🚀 Starting User Profile Edit Test...");
    await showMouse(page);

  const userCreds = await loginAsUser();
  logger.info(`✅ USER LOGGED IN: ${userCreds.email}`);

  const profileActions = new UserProfileActions(page);

  // Open profile page
    await profileActions.openProfile();
  

  // Edit profile (skip password, skip email since it's readonly)
  await profileActions.editProfile(
    testdata.userProfile.firstName,
    testdata.userProfile.lastName,
      testdata.userProfile.mobile,
     
  );

  // Verify updated profile details
  await profileActions.verifyProfile(
    testdata.userProfile.firstName,
    testdata.userProfile.lastName,
    testdata.userProfile.mobile,

  );

  logger.info("🎉 User Profile Edit Test COMPLETED SUCCESSFULLY!");
});
