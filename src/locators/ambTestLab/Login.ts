/**
 * @class LoginPage
 * @description Locator class for the Authentication/Login page
 * 
 * Encapsulates all CSS/XPath selectors for the multi-method authentication interface.
 * Organized into logical sections for maintainability:
 * - Page Navigation: Login button in header to access login page
 * - Email/Password Login: Form fields and submit button for standard credentials
 * - Tab Navigation: Toggle between email/password and OTP login methods
 * - OTP (One-Time Password) Login: Email input, OTP verification fields, action buttons
 * - OTP Input Fields: Individual digit input boxes (4-digit OTP)
 * - Navigation: Register link to redirect to user registration
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (LoginActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - Supports two authentication methods: Standard (email/password) and OTP-based
 * - Uses tab-based interface to switch between authentication modes
 * - OTP implementation uses 4 separate digit input fields (otp1-otp4)
 * - Both login forms share the same container element (login-container)
 * - Header includes "Log In" button for initial page navigation
 * - Register link provides path to user registration flow
 * 
 * @see LoginActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/LoginRegister.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { Page, Locator } from '@playwright/test';

/**
 * LoginPage Locator Class
 * 
 * Contains all selectors for the authentication/login interface including:
 * - Header login button
 * - Email/password authentication form
 * - OTP authentication form
 * - Tab controls for method switching
 * - Navigation elements
 */
export class LoginPage {

  readonly page: Page;

  // ============================================
  // Page Navigation
  // ============================================
  readonly loginPageButton: Locator;

  // ============================================
  // Email/Password Authentication
  // ============================================
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // ============================================
  // Tab Navigation (Authentication Methods)
  // ============================================
  readonly emailsTab: Locator;
  readonly passwordTab: Locator;

  // ============================================
  // OTP (One-Time Password) Authentication
  // ============================================
  readonly emailForOtpInput: Locator;
  readonly sendOtpButton: Locator;
  readonly veryfyOtpButton: Locator;
  readonly resetOtpButton: Locator;

  // ============================================
  // OTP Input Fields (4-Digit Code)
  // ============================================
  readonly otpInput1: Locator;
  readonly otpInput2: Locator;
  readonly otpInput3: Locator;
  readonly otpInput4: Locator;

  // ============================================
  // Registration Navigation
  // ============================================
  readonly registerLink: Locator;

  /**
   * Initialize all login page locators
   * 
   * @param {Page} page - Playwright page instance for DOM querying
   * 
   * @remarks
   * All locators are initialized with readonly modifiers to prevent accidental reassignment.
   * Login interface supports dual authentication methods:
   *   - Standard: email/password form with submit button
   *   - OTP: email input, individual digit fields (otp1-otp4), verify/resend buttons
   * Tab navigation (emailsTab, passwordTab) switches between authentication modes.
   * OTP fields are individual inputs (otp1, otp2, otp3, otp4) for digit-by-digit entry.
   * Header contains "Log In" button for initial page access.
   * Register link redirects to registration flow (/register path).
   * Both forms reside within login-container for context.
   */
  constructor(page: Page) {
    this.page = page;

    // ============================================
    // Page Navigation
    // ============================================
    /** Header login button to access the login page */
    this.loginPageButton = page.locator("//div[@class='header__top__button']//span[contains(text(), 'Log In ')]");

    // ============================================
    // Email/Password Authentication
    // ============================================
    /** Email input field for standard login */
    this.emailInput = page.locator("//form[@id='loginForm']//input[@id='email']");
    /** Password input field for standard login */
    this.passwordInput = page.locator("//form[@id='loginForm']//input[@id='password']");
    /** Submit button for email/password authentication */
    this.loginButton = page.locator("//form[@id='loginForm']//button[@type='submit']");

    // ============================================
    // Tab Navigation (Authentication Methods)
    // ============================================
    /** Tab button to switch to/from password authentication method */
    this.emailsTab = page.locator("//ul[@id='loginTabs']//button[@id='password-tab']");
    /** Tab button to switch to/from OTP authentication method */
    this.passwordTab = page.locator("//ul[@id='loginTabs']//button[@id='otp-tab']");

    // ============================================
    // OTP (One-Time Password) Authentication
    // ============================================
    /** Email input field for OTP-based login (receives OTP code) */
    this.emailForOtpInput = page.locator("//form[@id='otpLoginForm']//input[@id='otpEmail']");
    /** Button to trigger OTP delivery to email */
    this.sendOtpButton = page.locator("//form[@id='otpLoginForm']//button[@id='sendOtpBtn']");
    /** Button to verify entered OTP and complete login */
    this.veryfyOtpButton = page.locator("//form[@id='otpLoginForm']//button[@id='verifyOtpBtn']");
    /** Button to resend OTP to email (if first attempt failed or timed out) */
    this.resetOtpButton = page.locator("//form[@id='otpLoginForm']//button[@id='resendOtpBtn']");

    // ============================================
    // OTP Input Fields (4-Digit Code)
    // ============================================
    /** OTP digit 1 input field (first digit of 4-digit code) */
    this.otpInput1 = page.locator("//form[@id='otpLoginForm']//input[@id='otp1']");
    /** OTP digit 2 input field (second digit of 4-digit code) */
    this.otpInput2 = page.locator("//form[@id='otpLoginForm']//input[@id='otp2']");
    /** OTP digit 3 input field (third digit of 4-digit code) */
    this.otpInput3 = page.locator("//form[@id='otpLoginForm']//input[@id='otp3']");
    /** OTP digit 4 input field (fourth digit of 4-digit code) */
    this.otpInput4 = page.locator("//form[@id='otpLoginForm']//input[@id='otp4']");

    // ============================================
    // Registration Navigation
    // ============================================
    /** Link to register new user account (redirects to /register) */
    this.registerLink = page.locator("//div[contains(@class,'login-container')]//a[@href='/register']");
  }
}




