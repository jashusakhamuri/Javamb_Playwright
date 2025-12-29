import { Page, Locator } from '@playwright/test';

export class Register {
    private readonly page: Page;
    readonly Firstname: Locator;
    readonly MiddlName: Locator;
    readonly lastName: Locator;
    readonly Email: Locator;
    readonly Password: Locator;
    readonly ConfirmPassword: Locator;
    readonly MobileNumber: Locator;
    readonly Location: Locator;
    readonly Address: Locator;
    readonly RegisterButton: Locator;
    readonly GoTOLoginPage: Locator;
    readonly GOTORegisterPage: Locator;
   

    constructor(page: Page) {

        this.page = page;
        //register form locators
        this.GOTORegisterPage = page.locator("//div[@class='header__top__button']//span[contains(text(), 'Register ')]")
        this.Firstname = page.locator("//form[@id='registerForm']//input[@id='firstName']")
        this.MiddlName = page.locator("//form[@id='registerForm']//input[@id='middleName']")
        this.lastName = page.locator("//form[@id='registerForm']//input[@id='lastName']")
        this.Email = page.locator("//form[@id='registerForm']//input[@id='email']")
        this.Password = page.locator("//form[@id='registerForm']//input[@id='password']")
        this.ConfirmPassword = page.locator("//form[@id='registerForm']//input[@id='confirmPassword']")
        this.MobileNumber = page.locator("//form[@id='registerForm']//input[@id='mobile']")
        this.Location = page.locator("//form[@id='registerForm']//input[@id='location']")
        this.Address = page.locator("//form[@id='registerForm']//textarea[@id='address']")
        this.RegisterButton = page.locator("//form[@id='registerForm']//button[contains(text(),'Register')]")
        this.GoTOLoginPage = page.locator("//form[@id='registerForm']//a[contains(text(), 'Login')]")//click here to login

    }
}
