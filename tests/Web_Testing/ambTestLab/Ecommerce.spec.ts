import { test } from '../../../Fixtuers/Login';
import { EcommercePage } from '../../../src/pages/ambTestLab/EcommercePage';
import logger from '../../../src/utils/logger';
import { showMouse } from "../../../src/utils/Mouse_helper";
import { ADD ,Edit } from "../../../TestData/AmbTestData/AddproductData.json"

// Ecommerce Test Suite
test.describe('Ecommerce Test Suite @smoke', () => {
    test('Run full User and Admin flows in one spec', async ({ page, loginAsAdmin }) => {
        try {
            // Optional: show red glowing cursor
            await showMouse(page);

            logger.info('🟣 Logging in as ADMIN...');
            await loginAsAdmin();

            const ecommercePage = new EcommercePage(page);
            logger.info('[Spec] Navigating to Ecommerce Page...');
            await ecommercePage.NavigatetoEcommercePage();
            logger.info('[Spec] Adding and Editing Product...');
       

            await ecommercePage.addProduct(
                ADD.name,
                ADD.description,
                ADD.price,
                ADD.stock,
                ADD.category,
                ADD.rating,
                ADD.imageUrl);


             logger.info('[Spec] Product added successfully, now editing the product...');
            await ecommercePage.verifyProductCard("BAG")

            await ecommercePage.editProduct(Edit.newName,
                Edit.newPrice,
                Edit.newStock,
                Edit.newRating,
                Edit.newImageUrl);




            logger.info('[Spec] Product edited successfully');
            await ecommercePage.verifyProductCard("BAG-Updated")
            await ecommercePage.deleteProductByName("BAG-Updated");
            logger.info('[Spec] Product deleted successfully');
          

            logger.info('[Spec]  Ecommerce navigation completed successfully');
        } catch (err: any) {
            // log warning first
            logger.warn('[Spec]  Something went wrong during Ecommerce flow');

            // log error with stack trace
            logger.error(`[Spec]  Error details: ${err.message}`);
            logger.error(err.stack);

            // rethrow so Playwright marks the test as failed
            throw err;
        }
    });
});

