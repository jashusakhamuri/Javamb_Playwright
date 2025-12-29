import { test } from '../../../Fixtuers/Login';   // your merged fixture
import logger from '../../../src/utils/logger';
import { showMouse } from '../../../src/utils/Mouse_helper';


    test('user can register and login successfully @smoke' , async ({ page, loginAsUser, loginAsAdmin }) => {
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
