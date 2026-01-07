import { Page, expect } from '@playwright/test';
import { AdimnMutualFunds } from '../../locators/ambTestLab/adminMutualFunds';
import { DashboardPage } from '../../locators/ambTestLab/adminDashBoard'
import logger from '../../utils/logger';

/**
 * AdminMutualFundsActions
 *
 * Encapsulates admin operations for Mutual Funds management in the AmbTestLab application.
 * Responsibilities:
 * - Navigate to the Mutual Funds admin area.
 * - Add a new fund via the Add Fund form.
 * - Edit an existing fund via the Edit dialog.
 * - Delete a selected fund.
 *
 * Notes:
 * - Methods perform UI interactions and log progress; they do not currently assert application state
 *   beyond Playwright actions. If you need stricter verification, add `expect` assertions inside the
 *   relevant method or in the calling spec.
 * - Keep parameter ordering consistent with `TestData/AmbTestData/AddproductData.json`.
 */
export class AdminMutualFundsActions {
    readonly locators: AdimnMutualFunds;
    readonly dashboardLocators: DashboardPage;  


    constructor(page: Page) {
        this.locators = new AdimnMutualFunds(page);
        this.dashboardLocators = new DashboardPage(page);
    }

    /**
     * Navigate to the Mutual Funds admin section.
     * - Clicks the Dashboard -> Mutual Funds option to open the admin list.
     */
    async navigateToMutualFundsSection() {
        logger.info("Navigating to Mutual Funds section...");
        await this.dashboardLocators.DashboardMutualFundsOption.click();
    }
    /**
     * Add a new mutual fund.
     * Parameters map directly to the Add Fund form fields. The method opens the form, fills values,
     * submits, and logs success. If the UI changes, update locators in `src/locators/ambTestLab/adminMutualFunds`.
     */
    async addFund(
        name: string,
        code: string,
        category: string,
        image: string,
        offerPrice: string,
        riskLevel: string,
        nav: string,
        originalPrice: string,
        yearReturn: string,
        threeYearReturn: string,
        fiveYearReturn: string,
        fundHouse: string,
        location: string
    ) {
        logger.info("Adding new fund...");

        await this.locators.AddFundButton.click();
        await this.locators.ClickToSeeAddFundForm.click();

        await this.locators.AddFundName.fill(name);
        await this.locators.AddFundCode.fill(code);
        await this.locators.AddCategoryDropDown.selectOption(category);
        await this.locators.Addimage.fill(image);
        await this.locators.AddOfferPrice.fill(offerPrice);
        await this.locators.AddRiskLevel.selectOption(riskLevel);
        await this.locators.AddFundNav.fill(nav);
        await this.locators.AddOriginalPrice.fill(originalPrice);
        await this.locators.AddYearReturn.fill(yearReturn);
        await this.locators.Add3YearReturn.fill(threeYearReturn);
        await this.locators.Addd5YearReturn.fill(fiveYearReturn);
        await this.locators.AddFundHouse.fill(fundHouse);
        await this.locators.location.fill(location);

        await this.locators.SaveButton.click();
        logger.info("✅ Fund added successfully");
    }

    /**
     * Edit the currently selected fund.
     * Fills the edit dialog with provided values and updates the fund; logs success on completion.
     */
    async editFund(
        newName: string,
        newCode: string,
        newCategory: string,
        newImage: string,
        newOfferPrice: string,
        newRiskLevel: string
    ) {
        logger.info("Editing fund...");

        await this.locators.EditButton.click();

        await this.locators.EditFundName.fill(newName);
        await this.locators.EditFundCode.fill(newCode);
        await this.locators.EditCategoryDropDown.selectOption(newCategory);
        await this.locators.Editimage.fill(newImage);
        await this.locators.EditOfferPrice.fill(newOfferPrice);
        await this.locators.EditRiskLevel.selectOption(newRiskLevel);

        await this.locators.UpdateFund.click();
        logger.info("✅ Fund edited successfully");
    }

    /**
     * Delete the currently selected fund.
     * Triggers the delete action (and confirmation if applicable) and logs completion.
     */
    async deleteFund() {
        logger.info("Deleting fund...");
        await this.locators.DeleteButton.click();
        logger.info("✅ Fund deleted successfully");
    }
}
