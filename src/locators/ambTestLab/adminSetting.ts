/**
 * @class AdminSetting
 * @description Locator class for the Admin Settings page
 * 
 * Encapsulates all CSS/XPath selectors for the admin configuration and data management interface.
 * Organized into logical sections for maintainability:
 * - Page Header: Settings page title verification
 * - Admin Credentials: Email and name update fields
 * - Settings Actions: Update button to persist credential changes
 * - Data Management: Export and clear all data operations (dangerous actions)
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (AdminSettingActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - Uses XPath with normalize-space() for text-based locators
 * - Admin credentials form uses unique input IDs for reliable selection
 * - Data management buttons are card-level actions (not form-bound)
 * - ClearButton is a destructive action - should be used with caution
 * 
 * @see AdminSettingActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/AdminSetting.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { Page, Locator } from '@playwright/test';

/**
 * AdminSetting Locator Class
 * 
 * Contains all selectors for the admin settings configuration page including:
 * - Page header and title verification
 * - Admin credential update fields
 * - Settings update action
 * - Data export and clearing operations
 */
export class AdminSetting {

    private readonly page: Page;

    // ============================================
    // Page Header & Verification
    // ============================================
    readonly SettingHeader: Locator;

    // ============================================
    // Admin Credentials Section
    // ============================================
    readonly ChangeAdminEmail: Locator;
    readonly ChangeAdminName: Locator;
    readonly UpdateButton: Locator;

    // ============================================
    // Data Management Actions
    // ============================================
    readonly ExportButton: Locator;
    readonly ClearButton: Locator;

    /**
     * Initialize all admin settings locators
     * 
     * @param {Page} page - Playwright page instance for DOM querying
     * 
     * @remarks
     * All locators are initialized with readonly modifiers to prevent accidental reassignment.
     * Admin credentials form (adminSettingsForm) includes email and name update fields.
     * Data management buttons (export/clear) are at card-body level, not inside the form.
     * ClearButton is a destructive action and should include confirmation dialogs.
     * UpdateButton applies changes to admin email/name credentials.
     */
    constructor(page: Page) {
        this.page = page;

        // ============================================
        // Page Header & Verification
        // ============================================
        /** Settings page title - "Admin Settings" verification element */
        this.SettingHeader = page.locator("//div[@id='settings-page']//h2[normalize-space(text())='Admin Settings']");

        // ============================================
        // Admin Credentials Section
        // ============================================
        /** Admin email input field for updating admin account email */
        this.ChangeAdminEmail = page.locator("//form[@id='adminSettingsForm']//input[@id='adminEmail']");
        /** Admin name input field for updating admin account name */
        this.ChangeAdminName = page.locator("//form[@id='adminSettingsForm']//input[@id='adminNameInput']");
        /** Submit button to persist admin credential changes */
        this.UpdateButton = page.locator("//form[@id='adminSettingsForm']//button[normalize-space(text())='Update Settings']");

        // ============================================
        // Data Management Actions
        // ============================================
        /** Export all application data (export button) */
        this.ExportButton = page.locator("//div[@class='card-body']//button[@id='exportAllDataBtn']");
        /** Clear all application data (destructive action - use with caution) */
        this.ClearButton = page.locator("//div[@class='card-body']//button[@id='clearAllDataBtn']");
    }
}
