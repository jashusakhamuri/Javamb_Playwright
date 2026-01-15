/**
 * @class Register
 * @description Locator class for the User Registration page
 * 
 * Encapsulates all CSS/XPath selectors for the new user account creation interface.
 * Organized into logical sections for maintainability:
 * - Page Navigation: Header button to access registration page
 * - Personal Information: First name, middle name, last name fields
 * - Account Credentials: Email, password, and confirmation fields
 * - Contact Information: Mobile number, location, and full address fields
 * - Form Actions: Register button to create account
 * - Navigation Links: Link back to login page for existing users
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (RegisterActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - All form inputs are organized within the registerForm element (id='registerForm')
 * - Supports comprehensive user profiling with personal, contact, and credential data
 * - Address field uses textarea for multi-line input
 * - Mobile number field for contact verification
 * - Password confirmation field for security validation
 * - Header button enables navigation to registration from authenticated pages
 * - Login link enables navigation back to authentication for returning users
 * 
 * @see RegisterActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/LoginRegister.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { Page, Locator } from '@playwright/test';

/**
 * Register Locator Class
 * 
 * Contains all selectors for the user registration form including:
 * - Header navigation button
 * - Personal information fields
 * - Account credentials fields
 * - Contact information fields
 * - Form submission and navigation controls
 */
export class Register {
    private readonly page: Page;

    // ============================================
    // Page Navigation
    // ============================================
    readonly GOTORegisterPage: Locator;

    // ============================================
    // Personal Information
    // ============================================
    readonly Firstname: Locator;
    readonly MiddlName: Locator;
    readonly lastName: Locator;

    // ============================================
    // Account Credentials
    // ============================================
    readonly Email: Locator;
    readonly Password: Locator;
    readonly ConfirmPassword: Locator;

    // ============================================
    // Contact Information
    // ============================================
    readonly MobileNumber: Locator;
    readonly Location: Locator;
    readonly Address: Locator;

    // ============================================
    // Form Actions & Navigation
    // ============================================
    readonly RegisterButton: Locator;
    readonly GoTOLoginPage: Locator;

    /**
     * Initialize all user registration form locators
     * 
     * @param {Page} page - Playwright page instance for DOM querying
     * 
     * @remarks
     * All locators are initialized with readonly modifiers to prevent accidental reassignment.
     * Registration form (registerForm) contains all input fields for user profile creation.
     * Personal information includes first, middle, and last name fields (separate inputs).
     * Credentials section includes email, password, and password confirmation fields.
     * Contact information captures mobile number, city/location, and full address (textarea).
     * Address uses textarea element for multi-line input support.
     * RegisterButton submits the completed registration form.
     * GoTOLoginPage link enables returning users to skip registration.
     * Header button (GOTORegisterPage) allows navigation to registration from other pages.
     */
    constructor(page: Page) {

        this.page = page;

        // ============================================
        // Page Navigation
        // ============================================
        /** Header register button to navigate to registration page */
        this.GOTORegisterPage = page.locator("(//a[contains(@href,'register')])[1]");

        // ============================================
        // Personal Information
        // ============================================
        /** User's first name input field */
        this.Firstname = page.locator("//form[@id='registerForm']//input[@id='firstName']");
        /** User's middle name input field */
        this.MiddlName = page.locator("//form[@id='registerForm']//input[@id='middleName']");
        /** User's last name input field */
        this.lastName = page.locator("//form[@id='registerForm']//input[@id='lastName']");

        // ============================================
        // Account Credentials
        // ============================================
        /** Email address for account login and verification */
        this.Email = page.locator("//form[@id='registerForm']//input[@id='email']");
        /** Password for account security */
        this.Password = page.locator("//form[@id='registerForm']//input[@id='password']");
        /** Password confirmation field for validation */
        this.ConfirmPassword = page.locator("//form[@id='registerForm']//input[@id='confirmPassword']");

        // ============================================
        // Contact Information
        // ============================================
        /** User's mobile phone number for contact purposes */
        this.MobileNumber = page.locator("//form[@id='registerForm']//input[@id='mobile']");
        /** User's city or location */
        this.Location = page.locator("//form[@id='registerForm']//input[@id='location']");
        /** User's full residential address (multi-line textarea) */
        this.Address = page.locator("//form[@id='registerForm']//textarea[@id='address']");

        // ============================================
        // Form Actions & Navigation
        // ============================================
        /** Submit button to complete user registration and create account */
        this.RegisterButton = page.locator("//form[@id='registerForm']//button[contains(text(),'Register')]");
        /** Navigation link back to login page for existing users */
        this.GoTOLoginPage = page.locator("//form[@id='registerForm']//a[contains(text(), 'Login')]");
    }
}
