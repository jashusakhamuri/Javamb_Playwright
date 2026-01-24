import { test } from '../../../Fixtuers/Login';
import { EcommercePage } from '../../../src/pages/ambTestLab/EcommercePage';
import logger from '../../../src/utils/logger';
import { showMouse } from "../../../src/utils/Mouse_helper";
import { ADD ,Edit } from "../../../TestData/AmbTestData/AddproductData.json"

/**
 * Ecommerce Test Suite
 *
 * @description
 * End-to-end spec that covers Admin ecommerce flows: navigation, product CRUD (Add → Verify → Edit → Verify → Delete).
 * This is a smoke-level test to validate core product management functionality.
 *
 * @preconditions
 * - Admin user available via `loginAsAdmin` fixture.
 * - Test product payloads are present in `TestData/AmbTestData/AddproductData.json`.
 *
 * @page-methods (what each page action does / assertions expected)
 * - `NavigatetoEcommercePage()`
 *   - Navigates to the ecommerce section and asserts that the product list or landing elements are visible.
 * - `addProduct(name, description, price, stock, category, rating, imageUrl)`
 *   - Opens add-product UI, fills fields, submits, and asserts that a new product card/row appears (check name and price) and shows success notification.
 * - `verifyProductCard(productName)`
 *   - Verifies that a product card with `productName` is visible and contains expected summary details.
 * - `editProduct(newName, newPrice, newStock, newRating, newImageUrl)`
 *   - Opens edit dialog for the selected product, updates fields, saves, and asserts that product card reflects new values.
 * - `deleteProductByName(productName)`
 *   - Finds product by name, triggers delete action, confirms deletion if required, and asserts the product is no longer present.
 *
 * @test-flow (what this spec does)
 * 1. Show optional mouse overlay for better videos.
 * 2. Authenticate as ADMIN using `loginAsAdmin`.
 * 3. Navigate to Ecommerce page, add a product using `ADD` data, verify its presence, edit it using `Edit` data, verify updates, and then delete it.
 *
 * @notes
 * - Page methods handle element waits and detailed assertions; update those methods if the UI changes.
 * - Use unique product names or codes to keep the test idempotent across runs.
 *
 * @run-example
 * npx playwright test tests/Web_Testing/ambTestLab/Ecommerce.spec.ts --project=chromium --headed
 *
 * @troubleshooting
 * - Re-run with `--debug --headed` to step through the UI.
 * - Check `playwright-report/` for video/traces and `results/results.xml` for results.
 * - If selectors break, update `src/locators/` and the corresponding page methods in `src/pages/ambTestLab/EcommercePage.ts`.
 */

// Ecommerce Test Suite
test.describe('Ecommerce Test Suite @smoke', () => {
    test('Ecommerce flow', async ({ page, loginAsAdmin }) => {
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

