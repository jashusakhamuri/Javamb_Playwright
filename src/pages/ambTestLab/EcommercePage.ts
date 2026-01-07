import { Page ,expect  } from "@playwright/test"
import { Ecommerce } from "../../locators/ambTestLab/adminEcommerce"
import { DashboardPage } from "../../locators/ambTestLab/adminDashBoard" 
import logger from "../../utils/logger"

/**
 * EcommercePage (Admin)
 *
 * Encapsulates admin-side interactions with the E-Commerce area of AmbTestLab.
 * Responsibilities:
 * - Navigate to the E-Commerce admin page from the dashboard.
 * - Add, edit, delete, export, and verify product cards.
 *
 * Notes:
 * - Methods focus on UI interactions and logging; add `expect` checks in methods or in calling specs for stricter validation.
 * - Keep product test data unique to maintain idempotency; consider cleanup steps in tests that add/delete products.
 */
export class EcommercePage {
    private readonly ecommerce: Ecommerce;
    private readonly page: Page;
    private readonly dashboard : DashboardPage
    constructor(page: Page) {
        this.page = page;
        this.ecommerce = new Ecommerce(page);
        this.dashboard = new DashboardPage(page);
    }


        /**
         * Navigate to the Ecommerce admin page.
         * - Clicks the dashboard E-Commerce entry, selects the 'E-Commerce' option and waits for the page to be visible.
         */
        async NavigatetoEcommercePage()  {
            logger.info('[EcommercePage] Navigate to Ecommerce Page from Dashboard');
            await this.dashboard.viewECommerceOption.click();
            await this.ecommerce.EcommercePage.selectOption({ label: "E-Commerce" });
            await this.ecommerce.EcommercePage.waitFor({ state: 'visible' });
            logger.info('[EcommercePage] Successfully navigated to Ecommerce Page');
        }
    /**
     * Add a new product via the Add Product form.
     * - Fills product details (name, description, price, stock, category, rating, imageUrl), submits the form and logs success.
     * - Use unique product names in tests to avoid collisions and to keep tests idempotent.
     */
    async addProduct(
        name: string,
        description: string,
        price: string,
        stock: string,
        category: string,
        rating: string,
        imageUrl: string
    ) {
        logger.info("[EcommercePage] Adding new product...");
        await this.ecommerce.AddButton.click();
        await this.ecommerce.ADDTittleCheck.waitFor({ state: "visible" });

        await this.ecommerce.AddProductName.fill(name);
        await this.ecommerce.AddDescription.fill(description);
        await this.ecommerce.AddProductPrice.fill(price);
        await this.ecommerce.AddProductStock.fill(stock);
        await this.ecommerce.AddCategory.fill(category);
        await this.ecommerce.AddProductRating.fill(rating);
        await this.ecommerce.AddProductImageUrl.fill(imageUrl);

        await this.ecommerce.AddProductSaveButton.click();
        logger.info(`[EcommercePage] Product "${name}" added successfully`);
    }

    /**
     * Edit an existing product via the edit dialog or card.
     * - Updates fields (name, price, stock, rating, image) and saves changes.
     */
    async editProduct(
        newName: string,
        newPrice: string,
        newStock: string,
        newRating: string,
        newImageUrl: string
    ) {
        logger.info("[EcommercePage] Editing product...");
        await this.ecommerce.EditCardButton.click();
        await this.ecommerce.EditTittleCheck.waitFor({ state: "visible" });

        await this.ecommerce.EditProductName.fill(newName);
        await this.ecommerce.EditProductPrice.fill(newPrice);
        await this.ecommerce.EditProductStock.fill(newStock);
        await this.ecommerce.EditProductRating.fill(newRating);
        await this.ecommerce.EditProductImageUrl.fill(newImageUrl);

        await this.ecommerce.SaveChangesButton.click();
        logger.info(`[EcommercePage] Product updated to "${newName}"`);
    }

   
    /**
     * Delete a product by visible name.
     * - Locates the product card by its text, clicks the Delete button and logs the outcome.
     * - Tests should assert the absence of the card after deletion to confirm success.
     */
    async deleteProductByName(productName: string) {
        logger.info(`[EcommercePage] Trying to delete product: ${productName}`);

        // Find the card that contains the product name
        const productCard = this.ecommerce.CommonCard.filter({ hasText: productName });

        // Inside that card, find the Delete button
        const deleteButton = productCard.getByRole('button', { name: 'Delete' });

        await deleteButton.click();
        // ✅ Wait until the card disappears
       

        logger.info(`[EcommercePage] ✅ Product "${productName}" deleted successfully`);
    }


    /**
     * Export products list.
     * - Triggers the export action and logs completion.
     */
    async exportProducts() {
        logger.info("[EcommercePage] Exporting products...");
        await this.ecommerce.ExportButton.click();
        logger.info("[EcommercePage] Products exported successfully");
    }


    /**
     * Verify that a product card with the expected name exists.
     * - Reads card titles and throws an Error if the expected product is not found.
     */
    async verifyProductCard(expectedName: string) {
        // get all titles from the locator defined in Ecommerce class
        const cardTitles = await this.ecommerce.CardTitileVerify.allTextContents();

        logger.info(`[EcommercePage] Found product cards count: ${cardTitles.length}`);

        // check if any card matches expectedName
        const found = cardTitles.some(title => title.trim() === expectedName);

        if (found) {
            logger.info(`[EcommercePage] ✅ Product "${expectedName}" found successfully`);
        } else {
            logger.error(`[EcommercePage] ❌ Product card verification failed. Expected: ${expectedName}, Found: ${cardTitles.join(", ")}`);
            throw new Error(`[EcommercePage] Product card verification failed. Expected: ${expectedName}, Found: ${cardTitles.join(", ")}`);
        }
    }



    }
      
// npx playwright test "tests/Web_Testing/ambTestLab/Ecommerce.spec.ts" --project=local-chrome --headed

//Remove-Item -Recurse -Force allure-results


