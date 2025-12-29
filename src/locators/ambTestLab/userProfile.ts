import { Page, Locator, } from '@playwright/test';
export class UserProfile {

    private readonly page: Page;  // just *declares* a place to store a Page (empty for now)
    readonly ProfileTab: Locator;
    readonly EditProfilebutton: Locator;
    readonly EditFirstName: Locator;
    readonly EditMobileNo: Locator;
    readonly Editlastname: Locator;
    readonly EditEmail: Locator;
    readonly Editpassword: Locator;
    readonly VisiblityButton: Locator;
    readonly SaveChangeButton: Locator;
    readonly FullName: Locator;
    readonly mobieNumber: Locator;
    readonly EmailID: Locator;
    constructor(page: Page) {
        this.page = page;
        this.ProfileTab = page.locator("//div[@id='navbarNav']//a[contains(normalize-space(.),'Profile')]")
        this.EditProfilebutton = page.locator("//div[@class='card-header']//button[normalize-space(.)='Edit Profile']")
        this.EditFirstName = page.locator("//form[@id='editProfileForm']//input[@id='editFirstName']")
        this.Editlastname = page.locator("//form[@id='editProfileForm']//input[@id='editLastName']")
        this.EditMobileNo = page.locator("//form[@id='editProfileForm']//input[@id='editMobile']")
        this.EditEmail = page.locator("//form[@id='editProfileForm']//input[@id='editEmail']")
        this.Editpassword = page.locator("//form[@id='editProfileForm']//following-sibling::input[@id='editPassword']")
        this.VisiblityButton = page.locator("//form[@id='editProfileForm']//button[contains(@aria-label,'password visibility')]")

        this.SaveChangeButton = page.locator("//div[contains(@class,'modal-footer')]//button[normalize-space(.)='Save Changes']")



        ////////////------TO VErify Changess------


        this.FullName = page.locator("//div[@class='card-body']//strong[@id='userFullName']")

        this.mobieNumber = page.locator("//div[@class='card-body']//strong[@id='userMobile']")
        this.EmailID = page.locator("//div[@class='card-body']//strong[@id='userEmailDetail']")

    }


}