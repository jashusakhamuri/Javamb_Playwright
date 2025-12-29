
import { test } from '../../../Fixtuers/Login';   // your merged fixture
import { E2EActions } from '../../../src/pages/ambTestLab/FullPage';
import logger from '../../../src/utils/logger';
import { showMouse } from '../../../src/utils/Mouse_helper';
import { AdminAddFund } from '../../../TestData/AmbTestData/AddproductData.json'

test.describe('Complete User + Admin End-to-End Journey @regression', () => {

    test('Run full User and Admin flows in one spec', async ({ page, loginAsUser, loginAsAdmin }) => {

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

