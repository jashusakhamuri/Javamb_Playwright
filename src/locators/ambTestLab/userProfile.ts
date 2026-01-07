/**
 * @class UserProfile
 * @description Locator class for user profile management and editing interface
 * 
 * Encapsulates all CSS/XPath selectors for the user account profile page:
 * - Profile Navigation: Access to profile tab from main navigation
 * - Edit Profile Modal: Form fields for updating user account information
 * - Form Fields: First name, last name, mobile, email, password inputs
 * - Form Controls: Visibility toggle for password, save/submit button
 * - Profile Verification: Display fields showing updated profile information
 * 
 * Organized into logical sections:
 * 1. Navigation: Profile tab access
 * 2. Edit Modal: Trigger button and form container
 * 3. Form Fields: All editable profile attributes
 * 4. Form Controls: Password visibility and submit actions
 * 5. Verification: Display elements to confirm changes were saved
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (UserProfileActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - Uses XPath with normalize-space() to handle whitespace in text matching
 * - Form fields use unique IDs (editFirstName, editEmail, etc.) for reliable selection
 * - Verification elements use IDs (userFullName, userMobile, userEmailDetail) for display
 * - Password field visibility toggle uses aria-label for semantic selection
 * - Edit profile form reuses single modal dialog for all edits
 * 
 * @see UserProfileActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/UserProfile.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */
import { Page, Locator, } from '@playwright/test';

/**
 * UserProfile Locator Class
 * 
 * Contains all selectors for user profile management including:
 * - Profile page navigation
 * - Profile edit modal and form
 * - Editable profile fields (name, email, mobile, password)
 * - Form controls and submission
 * - Profile information verification/display
 * 
 * Organized by functional workflow for logical grouping and maintainability
 */
export class UserProfile {

    private readonly page: Page;

    // ========================================================
    // PROFILE NAVIGATION
    // ========================================================
    /**
     * Profile tab/link in main navigation
     * Navigates to user profile page from main application
     * Entry point for profile viewing and editing
     */
    readonly ProfileTab: Locator;

    // ========================================================
    // EDIT PROFILE MODAL TRIGGER
    // ========================================================
    /**
     * "Edit Profile" button on profile card
     * Opens modal dialog for editing user profile information
     * Located in card header section
     */
    readonly EditProfilebutton: Locator;

    // ========================================================
    // PROFILE EDIT FORM FIELDS
    // ========================================================
    /**
     * First name input field in edit profile form
     * Used to update user's first name
     * Part of editProfileForm
     */
    readonly EditFirstName: Locator;

    /**
     * Mobile number input field in edit profile form
     * Used to update user's contact phone number
     * Accepts numeric input for mobile/phone
     */
    readonly EditMobileNo: Locator;

    /**
     * Last name input field in edit profile form
     * Used to update user's family/surname
     * Part of editProfileForm
     */
    readonly Editlastname: Locator;

    /**
     * Email input field in edit profile form
     * Used to update user's email address
     * Critical for account identification and communication
     */
    readonly EditEmail: Locator;

    /**
     * Password input field in edit profile form
     * Used to change/update user account password
     * Located as sibling to editProfileForm for security
     */
    readonly Editpassword: Locator;

    /**
     * Password visibility toggle button
     * Shows/hides password text in password field
     * Uses aria-label for semantic accessibility targeting
     */
    readonly VisiblityButton: Locator;

    /**
     * "Save Changes" button in modal footer
     * Submits edited profile information
     * Persists all form changes to user account
     */
    readonly SaveChangeButton: Locator;

    // ========================================================
    // PROFILE INFORMATION VERIFICATION/DISPLAY
    // ========================================================
    /**
     * Full name display element on profile card
     * Shows combined first and last name after save
     * Used to verify name changes were persisted
     */
    readonly FullName: Locator;

    /**
     * Mobile number display element on profile card
     * Shows user's phone number after update
     * Verification point for mobile update success
     */
    readonly mobieNumber: Locator;

    /**
     * Email address display element on profile card
     * Shows user's email after modification
     * Verification point for email change confirmation
     */
    readonly EmailID: Locator;

    /**
     * Initialize all user profile page locators
     * 
     * @param {Page} page - Playwright page instance for DOM querying
     * 
     * @remarks
     * All locators are initialized with readonly modifiers to prevent accidental reassignment.
     * Profile navigation uses normalize-space() for flexible text matching.
     * Form fields use unique IDs (editFirstName, editEmail, etc.) from editProfileForm
     * for reliable element selection across different states.
     * Password field is a sibling to the form for enhanced security separation.
     * Password visibility toggle uses aria-label for semantic/accessibility-based targeting.
     * Verification elements use strong tags with specific IDs (userFullName, userMobile, userEmailDetail)
     * to display saved profile information after form submission.
     * Modal footer contains the Save Changes button for form submission.
     */
    constructor(page: Page) {
        this.page = page;

        // ========================================================
        // PROFILE NAVIGATION INITIALIZATION
        // ========================================================
        this.ProfileTab = page.locator("//div[@id='navbarNav']//a[contains(normalize-space(.),'Profile')]")

        // ========================================================
        // EDIT PROFILE MODAL TRIGGER INITIALIZATION
        // ========================================================
        this.EditProfilebutton = page.locator("//div[@class='card-header']//button[normalize-space(.)='Edit Profile']")

        // ========================================================
        // PROFILE EDIT FORM FIELDS INITIALIZATION
        // ========================================================
        this.EditFirstName = page.locator("//form[@id='editProfileForm']//input[@id='editFirstName']")
        this.Editlastname = page.locator("//form[@id='editProfileForm']//input[@id='editLastName']")
        this.EditMobileNo = page.locator("//form[@id='editProfileForm']//input[@id='editMobile']")
        this.EditEmail = page.locator("//form[@id='editProfileForm']//input[@id='editEmail']")
        this.Editpassword = page.locator("//form[@id='editProfileForm']//following-sibling::input[@id='editPassword']")

        // ========================================================
        // FORM CONTROLS INITIALIZATION
        // ========================================================
        this.VisiblityButton = page.locator("//form[@id='editProfileForm']//button[contains(@aria-label,'password visibility')]")
        this.SaveChangeButton = page.locator("//div[contains(@class,'modal-footer')]//button[normalize-space(.)='Save Changes']")

        // ========================================================
        // PROFILE INFORMATION VERIFICATION/DISPLAY INITIALIZATION
        // ========================================================
        this.FullName = page.locator("//div[@class='card-body']//strong[@id='userFullName']")
        this.mobieNumber = page.locator("//div[@class='card-body']//strong[@id='userMobile']")
        this.EmailID = page.locator("//div[@class='card-body']//strong[@id='userEmailDetail']")
    }

}