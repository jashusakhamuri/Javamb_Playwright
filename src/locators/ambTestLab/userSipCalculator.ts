import { Page, Locator } from '@playwright/test';

export class Spi_Calculator {
    readonly page: Page;

    readonly minimunAmount: Locator;
    readonly title: Locator;
    readonly years: Locator;
    readonly expectedAnnualReturn: Locator;
    readonly submitbutton: Locator;

    // TableData
    readonly tabledata: Locator;
    readonly deletebtn: Locator;

    // SIP calculation Results
    readonly totalinvested: Locator;
    readonly estfutureValue: Locator;
    readonly estReturns: Locator;

    // Graphs (corrected to target <img> instead of hidden SVG)
    readonly monthlyInvestmentDistribution: Locator;
    readonly monthlyInvestmentDistributionColumn: Locator;
    readonly futureValueHistogram: Locator;
    readonly returnRateDistributionValues: Locator;
    readonly returnRateDistributionRange: Locator;
    readonly investmentDurationValues: Locator;
    readonly investmentDurationRange: Locator;
    readonly investmentJourneyFunnelValue: Locator;
    readonly investmentJourneyFunnelRange: Locator;
    readonly futureValueTrends: Locator;
    readonly returnsAnalysis: Locator;
    readonly returnsContribution: Locator;
    readonly amountvsReturn: Locator;
    readonly tenurevsGrowth: Locator;
    readonly durationRadarProfile: Locator;
    readonly futureValueTreemap: Locator;
    readonly durationvsReturnHeatmap: Locator;
    readonly sipTimeline: Locator;
    readonly distributionOverview: Locator;
    readonly NAvigateTOSipCaluculator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.NAvigateTOSipCaluculator = page.locator("//div[@class='container-fluid']//a[text()='SIP Calculator']");
        this.minimunAmount = page.locator("//form[@id='sipForm']//input[@id='monthlyAmount']");
        this.title = page.locator("//h3[normalize-space(text())='SIP Calculator']");
        this.years = page.locator("//form[@id='sipForm']//input[@id='years']");
        this.expectedAnnualReturn = page.locator("//form[@id='sipForm']//input[@id='expectedReturn']");
        this.submitbutton = page.locator("//button[@type='submit']");

        // TableData
        this.tabledata = page.locator("//table//tr//td[1]");
        this.deletebtn = page.locator("//table//tr//td//button[contains(@onclick,'deleteCalculation')]");

        // SIP calculation Results
        this.totalinvested = page.locator("//div[@id='resultCard']//h3[@id='totalInvested']");
        this.estfutureValue = page.locator("//div[@id='resultCard']//h3[@id='futureValue']");
        this.estReturns = page.locator("//div[@id='resultCard']//h3[@id='estimatedReturns']");

        // Graphs (use <img> under each heading)
        this.monthlyInvestmentDistribution = page.locator("//h5[normalize-space(.)='Monthly Investment Distribution (Bar)']/following-sibling::img");
        this.monthlyInvestmentDistributionColumn = page.locator("//h5[normalize-space(.)='Monthly Investment Distribution (Column)']/following-sibling::img");
        this.futureValueHistogram = page.locator("//h5[normalize-space(.)='Future Value Histogram']/following-sibling::img");
        this.returnRateDistributionValues = page.locator("//h5[normalize-space(.)='Return Rate Distribution (Pie)']/following-sibling::img");
        this.returnRateDistributionRange = this.returnRateDistributionValues; // same <img>
        this.investmentDurationValues = page.locator("//h5[normalize-space(.)='Investment Duration (Donut)']/following-sibling::img");
        this.investmentDurationRange = this.investmentDurationValues;
        this.investmentJourneyFunnelValue = page.locator("//h5[normalize-space(.)='Investment Journey Funnel']/following-sibling::img");
        this.investmentJourneyFunnelRange = this.investmentJourneyFunnelValue;
        this.futureValueTrends = page.locator("//h5[normalize-space(.)='Future Value Trends (Line)']/following-sibling::img");
        this.returnsAnalysis = page.locator("//h5[normalize-space(.)='Returns Analysis (Area)']/following-sibling::img");
        this.returnsContribution = page.locator("//h5[normalize-space(.)='Returns Contribution (Waterfall)']/following-sibling::img");
        this.amountvsReturn = page.locator("//h5[normalize-space(.)='Amount vs Return (Scatter)']/following-sibling::img");
        this.tenurevsGrowth = page.locator("//h5[normalize-space(.)='Tenure vs Growth (Bubble)']/following-sibling::img");
        this.durationRadarProfile = page.locator("//h5[normalize-space(.)='Duration Radar Profile']/following-sibling::img");
        this.futureValueTreemap = page.locator("//h5[normalize-space(.)='Future Value Treemap']/following-sibling::img");
        this.durationvsReturnHeatmap = page.locator("//h5[normalize-space(.)='Duration vs Return Heatmap']/following-sibling::img");
        this.sipTimeline = page.locator("//h5[normalize-space(.)='SIP Timeline (Gantt)']/following-sibling::img");
        this.distributionOverview = page.locator("//h5[normalize-space(.)='Distribution Overview (Box Plot)']/following-sibling::img");
    }
}
