import { test } from "../../../Fixtuers/Login";
import { UserProfileActions } from "../../../src/pages/ambTestLab/UserProfileActions";
import logger from "../../../src/utils/logger";
import { showMouse } from '../../../src/utils/Mouse_helper';
import testdata from "../../../TestData/AmbTestData/UserDashboard.json";

test("User Profile Edit Test @smoke", async ({ page, loginAsUser }) => {
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
