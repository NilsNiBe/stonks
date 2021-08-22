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
  high: number[];
  open: number[];
  volume: number[];
  low: number[];
  close: number[];
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

export interface Query1YahooFinanceV8 {
  chart: Chart;
}

export async function getQuery1FinanceYahooV8(
  symbol:string,
  intervall:string,
  range:string) : Promise<Query1YahooFinanceV8 | undefined> {
  //&corsDomain=finance.yahoo.com&.tsrc=finance
  const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`+
  `?region=US&lang=en-US&includePrePost=false&interval=${intervall}&range=${range}`)
  if (res.ok) {
    return (await res.json()) as Query1YahooFinanceV8;
  }
  return undefined
}
