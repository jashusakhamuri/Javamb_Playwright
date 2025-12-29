//import { test } from "../../../Fixtuers/Login";
//import { UserSipCalculatorActions } from "../../../src/pages/ambTestLab/UserSipCalculatorActions";
//import logger from "../../../src/utils/logger";
//import { showMouse } from '../../../src/utils/Mouse_helper';

//test("User SIP Calculator Test", async ({ page, loginAsUser }) => {
//    logger.info("🚀 Starting SIP Calculator Test...");
//    await showMouse(page);
//    const userCreds = await loginAsUser();
//    logger.info(`✅ USER LOGGED IN: ${userCreds.email}`);

//    const sipActions = new UserSipCalculatorActions(page);

//    await sipActions.openCalculator();

//    await sipActions.repeatSipCalculation("5000", "10", "12", 3);

//    await sipActions.validateGraphs();

//    await sipActions.deleteCalculation();

//    logger.info("🎉 SIP Calculator Test COMPLETED SUCCESSFULLY!");
//});
import { test } from "../../../Fixtuers/Login";
import { UserSipCalculatorActions } from "../../../src/pages/ambTestLab/UserSipCalculatorActions";
import logger from "../../../src/utils/logger";
import { showMouse } from '../../../src/utils/Mouse_helper';

// Import JSON test data
import testData from "../../../TestData/AmbTestData/UserDashboard.json";

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
