
export interface Pre {
    timezone: string;
    start: number;
    end: number;
    gmtoffset: number;
}
export interface Regular {
    timezone: string;
    start: number;
    end: number;
    gmtoffset: number;
}
export interface Post {
    timezone: string;
    start: number;
    end: number;
    gmtoffset: number;
}
export interface CurrentTradingPeriod {
    pre: Pre;
    regular: Regular;
    post: Post;
}
export interface Meta {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    priceHint: number;
    currentTradingPeriod: CurrentTradingPeriod;
    dataGranularity: string;
    range: string;
    validRanges: string[];
}
export interface Quote {
    close: number[];
    high: number[];
    open: number[];
    volume: number[];
    low: number[];
}
export interface Adjclose {
    adjclose: number[];
}
export interface Indicators {
    quote: Quote[];
    adjclose: Adjclose[];
}
export interface Result {
    meta: Meta;
    timestamp: number[];
    indicators: Indicators;
}
export interface Chart {
    result: Result[];
    error?: any;
}
export interface Query2YahooFinanceV8ChartResponse {
    chart: Chart;
}

export interface Quote {
    exchange: string;
    shortname: string;
    quoteType: string;
    symbol: string;
    index: string;
    score: number;
    typeDisp: string;
    longname: string;
    isYahooFinance: boolean;
}

export interface Query2YahooFinanceV8SearchResponse {
    explains: any[];
    count: number;
    quotes: Quote[];
    news: any[];
    nav: any[];
    lists: any[];
    researchReports: any[];
    screenerFieldResults: any[];
    totalTime: number;
    timeTakenForQuotes: number;
    timeTakenForNews: number;
    timeTakenForAlgowatchlist: number;
    timeTakenForPredefinedScreener: number;
    timeTakenForCrunchbase: number;
    timeTakenForNav: number;
    timeTakenForResearchReports: number;
    timeTakenForScreenerField: number;
}

export interface CurrentPrice {
    raw: number;
    fmt: string;
}

export interface TargetHighPrice {
    raw: number;
    fmt: string;
}

export interface TargetLowPrice {
    raw: number;
    fmt: string;
}

export interface TargetMeanPrice {
    raw: number;
    fmt: string;
}

export interface TargetMedianPrice {
    raw: number;
    fmt: string;
}

export interface RecommendationMean {
    raw: number;
    fmt: string;
}

export interface NumberOfAnalystOpinions {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface TotalCash {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface TotalCashPerShare {
    raw: number;
    fmt: string;
}

export interface Ebitda {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface TotalDebt {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface QuickRatio {
    raw: number;
    fmt: string;
}

export interface CurrentRatio {
    raw: number;
    fmt: string;
}

export interface TotalRevenue {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface DebtToEquity {
    raw: number;
    fmt: string;
}

export interface RevenuePerShare {
    raw: number;
    fmt: string;
}

export interface ReturnOnAssets {
    raw: number;
    fmt: string;
}

export interface ReturnOnEquity {
    raw: number;
    fmt: string;
}

export interface GrossProfits {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface FreeCashflow {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface OperatingCashflow {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface EarningsGrowth {
    raw: number;
    fmt: string;
}

export interface RevenueGrowth {
    raw: number;
    fmt: string;
}

export interface GrossMargins {
    raw: number;
    fmt: string;
}

export interface EbitdaMargins {
    raw: number;
    fmt: string;
}

export interface OperatingMargins {
    raw: number;
    fmt: string;
}

export interface ProfitMargins {
    raw: number;
    fmt: string;
}

export interface FinancialData {
    maxAge: number;
    currentPrice: CurrentPrice;
    targetHighPrice: TargetHighPrice;
    targetLowPrice: TargetLowPrice;
    targetMeanPrice: TargetMeanPrice;
    targetMedianPrice: TargetMedianPrice;
    recommendationMean: RecommendationMean;
    recommendationKey: string;
    numberOfAnalystOpinions: NumberOfAnalystOpinions;
    totalCash: TotalCash;
    totalCashPerShare: TotalCashPerShare;
    ebitda: Ebitda;
    totalDebt: TotalDebt;
    quickRatio: QuickRatio;
    currentRatio: CurrentRatio;
    totalRevenue: TotalRevenue;
    debtToEquity: DebtToEquity;
    revenuePerShare: RevenuePerShare;
    returnOnAssets: ReturnOnAssets;
    returnOnEquity: ReturnOnEquity;
    grossProfits: GrossProfits;
    freeCashflow: FreeCashflow;
    operatingCashflow: OperatingCashflow;
    earningsGrowth: EarningsGrowth;
    revenueGrowth: RevenueGrowth;
    grossMargins: GrossMargins;
    ebitdaMargins: EbitdaMargins;
    operatingMargins: OperatingMargins;
    profitMargins: ProfitMargins;
    financialCurrency: string;
}

export interface Result {
    financialData: FinancialData;
}

export interface QuoteSummary {
    result: Result[];
    error?: any;
}

export interface Query2YahooFinanceV8SearchQuoteSummary {
    quoteSummary: QuoteSummary;
}

export async function query2FinanceYahooV8Chart(
  symbol: string,
  interval: string,
  period1: number,
  period2: number) : Promise<Query2YahooFinanceV8ChartResponse | undefined> {
  const res = await fetch(`https://corsproxy.cloudno.de/https://query2.finance.yahoo.com/v8/finance/chart/${symbol}`+
    `?region=US&lang=en-US&interval=${interval}&period1=${period1}&period2=${period2}`, {headers: {"X-Requested-With":"XMLHttpRequest"}})
  if (res.ok) {
    const foo = await res.json()
    return (foo) as Query2YahooFinanceV8ChartResponse;
  }
  return undefined
}

export async function query2FinanceYahooV8Search(
  symbol: string) : Promise<Query2YahooFinanceV8SearchResponse | undefined> {
  const res = await fetch(
    `https://corsproxy.cloudno.de/https://query2.finance.yahoo.com/v1/finance/search`+
    `?q=${symbol}&quotesCount=10&newsCount=0`, {headers: {"X-Requested-With":"XMLHttpRequest"}});
  if (res.ok) {
    const foo = await res.json()
    return (foo) as Query2YahooFinanceV8SearchResponse;
  }
  return undefined
}

export async function query2FinanceYahooV8QuoteSummary(
    symbol: string) : Promise<Query2YahooFinanceV8SearchQuoteSummary | undefined> {
    const res = await fetch(
      `https://corsproxy.cloudno.de/https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`+
      `?modules=financialData`, {headers: {"X-Requested-With":"XMLHttpRequest"}});
    if (res.ok) {
      const foo = await res.json()
      return (foo) as Query2YahooFinanceV8SearchQuoteSummary;
    }
    return undefined
  }

