/**
 * @class AdminUserMangement
 * @description Locator class for the User Management admin page
 * 
 * Encapsulates all CSS/XPath selectors for the user administration and viewing interface.
 * Organized into logical sections for maintainability:
 * - Page Header: Title verification for user management page
 * - View Mode Validation: Empty state messages for both card and table views
 * - View Toggle: Button to switch between card and table view modes
 * - Data Export: Button to export user list data
 * 
 * @pattern Page Object Model (POM)
 * This class follows the three-layer architecture:
 * - Locators (this class) → define selectors only
 * - Pages (AdminUserManagementActions.ts) → use these locators for interactions
 * - Tests (*.spec.ts) → orchestrate page methods and assertions
 * 
 * @note
 * - Uses XPath with normalize-space() for text-based and attribute matching
 * - Supports dual view modes: Card View (usersCardsView) and Table View (usersTableView)
 * - Empty state validation differs by view mode (text/div for cards, td cell for table)
 * - Toggle button switches between visualization modes
 * - Export button operates on whichever view mode is currently active
 * 
 * @see AdminUserManagementActions - Page object consuming these locators
 * @see tests/Web_Testing/ambTestLab/AdminUserManagement.spec.ts - Test specs using this locator
 * 
 * @author Automation Team
 * @version 1.0.0
 */

import { Page, Locator } from '@playwright/test';

/**
 * AdminUserMangement Locator Class
 * 
 * Contains all selectors for the user management admin interface including:
 * - Page header and title verification
 * - Empty state validation for different view modes
 * - View toggle controls (card vs. table)
 * - Data export functionality
 */
export class AdminUserMangement {
	private readonly page: Page;

	// ============================================
	// Page Header & Verification
	// ============================================
	readonly TittleUSerMangement: Locator;

	// ============================================
	// View Mode Validation (Empty States)
	// ============================================
	/** Empty state message for card view mode */
	readonly NoRegisterCheck: Locator;
	/** Empty state message for table view mode */
	readonly NoUserFOundTable: Locator;

	// ============================================
	// View Controls
	// ============================================
	readonly CardViewButton: Locator;

	// ============================================
	// Data Export
	// ============================================
	readonly ExportUsersButton: Locator;

	/**
	 * Initialize all user management page locators
	 * 
	 * @param {Page} page - Playwright page instance for DOM querying
	 * 
	 * @remarks
	 * All locators are initialized with readonly modifiers to prevent accidental reassignment.
	 * Page supports two distinct view modes: Card View (usersCardsView) and Table View (usersTableView).
	 * Empty state messages differ between modes - cards show div text, tables show td cells.
	 * CardViewButton toggles between view modes (card to table or table to card).
	 * ExportUsersButton exports data from the currently active view mode.
	 * Title verification locator uses normalize-space() for robust text matching.
	 */
	constructor(page: Page) {
		this.page = page;

		// ============================================
		// Page Header & Verification
		// ============================================
		/** Page title verification - "User Management" */
		this.TittleUSerMangement = page.locator("//div[@id='users-page']//h2[normalize-space(.)='User Management']");

		// ============================================
		// View Mode Validation (Empty States)
		// ============================================
		/** Empty state message shown in card view when no users are registered */
		this.NoRegisterCheck = page.locator("//div[@id='usersCardsView']//div[contains(text() , 'No registered users found.')]");
		/** Empty state message shown in table view when no users are found */
		this.NoUserFOundTable = page.locator("//div[@id='usersTableView']//td[normalize-space(text()) = 'No users found']");

		// ============================================
		// View Controls
		// ============================================
		/** Toggle button to switch between card view and table view modes */
		this.CardViewButton = page.locator("//div[@id='users-page']//button[@id='toggleUsersView']");

		// ============================================
		// Data Export
		// ============================================
		/** Export users list data (likely CSV or similar format) */
		this.ExportUsersButton = page.locator("//div[@id='users-page']//button[@id='exportUsersBtn']");
	}
}
