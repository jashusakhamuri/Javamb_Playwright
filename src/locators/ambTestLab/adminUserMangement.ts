import { Page, Locator } from '@playwright/test';
export class AdminUserMangement {
	private readonly page: Page;
	readonly TittleUSerMangement: Locator;
	readonly NoRegisterCheck: Locator;
	readonly NoUserFOundTable: Locator;	
	readonly CardViewButton: Locator;
	readonly ExportUsersButton: Locator;
	

	constructor(page: Page) {


		this.page = page;
		//default  Page  to verify 
		this.TittleUSerMangement = page.locator("//div[@id='users-page']//h2[normalize-space(.)='User Management']")//tittle check
		this.NoRegisterCheck = page.locator("//div[@id='usersCardsView']//div[contains(text() , 'No registered users found.')]")
		this.NoUserFOundTable = page.locator("//div[@id='usersTableView']//td[normalize-space(text()) = 'No users found']") //after click on table view
		//view buttons
		this.CardViewButton = page.locator("//div[@id='users-page']//button[@id='toggleUsersView']") //card view button
		this.ExportUsersButton = page.locator("//div[@id='users-page']//button[@id='exportUsersBtn']") //export users button


	}
}
