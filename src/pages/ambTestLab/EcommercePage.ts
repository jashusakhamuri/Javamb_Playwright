import { Page ,expect  } from "@playwright/test"
import { Ecommerce } from "../../locators/ambTestLab/adminEcommerce"
import { DashboardPage } from "../../locators/ambTestLab/adminDashBoard" 
import logger from "../../utils/logger"
export class EcommercePage {
    private readonly ecommerce: Ecommerce;
    private readonly page: Page;
    private readonly dashboard : DashboardPage
    constructor(page: Page) {
        this.page = page;
        this.ecommerce = new Ecommerce(page);
        this.dashboard = new DashboardPage(page);
    }


        async NavigatetoEcommercePage()  {
            logger.info('[EcommercePage] Navigate to Ecommerce Page from Dashboard');
            await this.dashboard.viewECommerceOption.click();
            await this.ecommerce.EcommercePage.selectOption({ label: "E-Commerce" });
            await this.ecommerce.EcommercePage.waitFor({ state: 'visible' });
            logger.info('[EcommercePage] Successfully navigated to Ecommerce Page');
        }
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

    //async deleteProduct() {
    //    logger.info("[EcommercePage] Deleting product...");
    //    await this.ecommerce.DeleteCardButton.click();
    //    // optionally confirm modal if exists
    //    logger.info("[EcommercePage] Product deleted successfully");
    //}
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


    async exportProducts() {
        logger.info("[EcommercePage] Exporting products...");
        await this.ecommerce.ExportButton.click();
        logger.info("[EcommercePage] Products exported successfully");
    }


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

    //async verifyProductNotPresent(expectedName: string) {
    //    const cardTitles = await this.ecommerce.CardTitileVerify.allTextContents();
    //    logger.info(`[EcommercePage] Found product cards count: ${cardTitles.length}`);

    //    const found = cardTitles.some(title => title.trim() === expectedName);

    //    if (found) {
    //        logger.error(`[EcommercePage] ❌ Product "${expectedName}" still present after deletion`);
    //        throw new Error(`[EcommercePage] Product "${expectedName}" was expected to be deleted but is still visible`);
    //    } else {
    //        logger.info(`[EcommercePage] ✅ Product "${expectedName}" is not present (deleted successfully)`);
    //    }
    //}


    }
      
// npx playwright test "tests/Web_Testing/ambTestLab/Ecommerce.spec.ts" --project=local-chrome --headed

//Remove-Item -Recurse -Force allure-results


