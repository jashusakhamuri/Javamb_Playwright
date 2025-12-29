import { Page, Locator } from '@playwright/test';
export class LoginPage {

  readonly page: Page;
    // TO CLick on Login Button
    readonly loginPageButton: Locator;
    //email and password login
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    //tabs
    readonly emailsTab: Locator;
    readonly passwordTab: Locator;
    //otp login
    readonly emailForOtpInput: Locator;
    readonly sendOtpButton: Locator
    readonly veryfyOtpButton: Locator;
    readonly resetOtpButton: Locator;
    readonly otpInput1: Locator;
    readonly otpInput2: Locator;
    readonly otpInput3: Locator;
    readonly otpInput4: Locator
    //register link
    readonly registerLink: Locator;
    constructor(page: Page) {
        this.page = page;
        // TO CLick on Login Button
        this.loginPageButton = page.locator("//div[@class='header__top__button']//span[contains(text(), 'Log In ')]")
        this.emailInput = page.locator("//form[@id='loginForm']//input[@id='email']");
        this.passwordInput = page.locator("//form[@id='loginForm']//input[@id='password']");
        this.loginButton = page.locator("//form[@id='loginForm']//button[@type='submit']");
        //tabs
        this.emailsTab = page.locator("//ul[@id='loginTabs']//button[@id='password-tab']");
        this.passwordTab = page.locator("//ul[@id='loginTabs']//button[@id='otp-tab']");
        //otp login
        this.emailForOtpInput = page.locator("//form[@id='otpLoginForm']//input[@id='otpEmail']");
        this.sendOtpButton = page.locator("//form[@id='otpLoginForm']//button[@id='sendOtpBtn']");
        this.veryfyOtpButton = page.locator("//form[@id='otpLoginForm']//button[@id='verifyOtpBtn']");
        this.resetOtpButton = page.locator("//form[@id='otpLoginForm']//button[@id='resendOtpBtn']");
        this.otpInput1 = page.locator("//form[@id='otpLoginForm']//input[@id='otp1']");
        this.otpInput2 = page.locator("//form[@id='otpLoginForm']//input[@id='otp2']");
        this.otpInput3 = page.locator("//form[@id='otpLoginForm']//input[@id='otp3']");
        this.otpInput4 = page.locator("//form[@id='otpLoginForm']//input[@id='otp4']");
        //register link
        this.registerLink = page.locator("//div[contains(@class,'login-container')]//a[@href='/register']");
    }
}




