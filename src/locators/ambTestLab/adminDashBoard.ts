import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  readonly dashboardOverviewTitle: Locator;
  readonly viewSelectorDropdown: Locator;
  readonly viewMutualFundsOption: Locator;
  readonly viewECommerceOption: Locator;
  readonly viewSoftwareTestingOption: Locator;
  readonly marketSnapshotTitle: Locator;
  readonly adminUserLabel: Locator;
  readonly registeredInvestorsCount: Locator;
  readonly activeSipPlansCount: Locator;
  readonly managedFundsCount: Locator;
  readonly orderVolumeCount: Locator;
  readonly indexNameList: Locator;
  readonly sensexChartCircles: Locator;
  readonly niftyChartCircles: Locator;
  readonly logoutButton: Locator; 
  readonly DashboardMutualFundsOption: Locator;   
  readonly DashboardSettings: Locator;
  readonly DashboardPurchases: Locator;
  readonly DashbaordUsers: Locator;
    readonly DashboardSipCalculator: Locator;

    //Mutation....
    readonly ShowCaseInputs: Locator;
    readonly HideAllInputs: Locator;
    readonly MutationUsername: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardOverviewTitle = page.locator("//h2[text()='Dashboard Overview']");
    this.viewSelectorDropdown = page.locator("//div[@class='container-fluid']//select[@id='viewSelector']");
      this.viewMutualFundsOption = page.locator("//div[@class='container-fluid']//select[@id='viewSelector']//option[text()='Mutual Funds']");

    this.viewECommerceOption = page.locator("//div[@class='container-fluid']//select[@id='viewSelector']");
    this.viewSoftwareTestingOption = page.locator("//div[@class='container-fluid']//select[@id='viewSelector']//option[text()='Software Testing']");
    this.marketSnapshotTitle = page.locator("//div[@class='card market-card']//h5[normalize-space(.)='Market Snapshot']");
    this.adminUserLabel = page.locator("//div[@class='container-fluid']//span[text()='Admin ']");
    this.registeredInvestorsCount = page.locator("//p[text()='Registered Investors']//parent::div//h3[@id='registeredInvestors']");
    this.activeSipPlansCount = page.locator("//p[text()='Active SIP Plans']//parent::div//h3[@id='activeSipPlans']");
    this.managedFundsCount = page.locator("//p[text()='Managed Mutual Funds']//parent::div//h3[@id='managedFunds']");
    this.orderVolumeCount = page.locator("//p[text()='Total Order Value']//parent::div//h3[@id='orderVolume']");
    this.indexNameList = page.locator("//div[@class='card market-card']//table//th[@scope='row']");
    this.sensexChartCircles = page.locator("//rec[@id='sensexChart']//*[name()='circle']");
      this.niftyChartCircles = page.locator("//rec[@id='niftyChart']//*[name()='circle']")
      this.logoutButton = page.locator("//div[@id='sidebar']//a[@id='logoutBtn']");
      this.DashboardMutualFundsOption = page.locator("//div[@class='sidebar']//a[normalize-space(.)='Mutual Funds']");
      this.DashboardSettings = page.locator("//div[@class='sidebar']//a[normalize-space(.)='Settings']");
      this.DashboardPurchases = page.locator("//div[@class='sidebar']//a[normalize-space(.)='Purchases']");
      this.DashbaordUsers = page.locator("//div[@class='sidebar']//a[normalize-space(.)='Users']");
      this.DashboardSipCalculator = page.locator("//div[@class='sidebar']//a[normalize-space(.)='SIP Calculator']");

      ///Mutation

      this.HideAllInputs = page.locator("//div[@id='sidebar']//span[normalize-space(text())='Hide All Inputs']");
      this.ShowCaseInputs = page.locator("//div[@id='sidebar']//span[normalize-space(text())='Show All Inputs']");

      /////////// HIDE INPUTS FORM ///////////////

      this.MutationUsername = page.locator("//div[@class='card-body']//input[@id='mutation-username']")


    }



    
}
