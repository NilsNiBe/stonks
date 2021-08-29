
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

