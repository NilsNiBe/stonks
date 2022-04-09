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
export interface IndicatorsQuote {
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
  quote: IndicatorsQuote[];
  adjclose: Adjclose[];
}
export interface ChartResult {
  meta: Meta;
  timestamp: number[];
  indicators: Indicators;
}
export interface Chart {
  result: ChartResult[];
  error?: any;
}
export interface Query2YahooFinanceV8ChartResponse {
  chart: Chart;
}

export interface SearchQuote {
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
  quotes: SearchQuote[];
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

export interface QuoteSummaryResult {
  financialData: FinancialData;
}

export interface QuoteSummary {
  result: QuoteSummaryResult[];
  error?: any;
}

export interface Query2YahooFinanceV8SearchQuoteSummary {
  quoteSummary: QuoteSummary;
}
