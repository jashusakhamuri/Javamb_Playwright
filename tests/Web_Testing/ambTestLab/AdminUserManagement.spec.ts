import { test } from '../../../Fixtuers/Login';
import { AdminUserManagementActions } from '../../../src/pages/ambTestLab/AdminUserManagementActions';
import logger from '../../../src/utils/logger';
import { showMouse } from '../../../src/utils/Mouse_helper';

//test.describe('Admin User Management Test Suite', () => {
//    test('Verify User Management page and actions', async ({ page, loginAsAdmin,  }) => {
//        try {
//            await showMouse(page);

            
//            logger.info(' Logging in as ADMIN...');
//            await loginAsAdmin();

//            const userMgmtActions = new AdminUserManagementActions(page);
//            await userMgmtActions.navigateToUserManagementSection();

//            await userMgmtActions.verifyTitle();
//            await userMgmtActions.checkNoUsersCardView();
//            await userMgmtActions.checkNoUsersTableView();
//            await userMgmtActions.exportUsers();

//            logger.info('[Spec] Admin User Management flow completed successfully');
//        } catch (err: any) {
//            logger.warn('[Spec] Something went wrong during User Management flow');
//            logger.error(`[Spec] Error details: ${err.message}`);
//            logger.error(err.stack);
//            throw err;
//        }
//    });


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

