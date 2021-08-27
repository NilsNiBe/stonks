
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
export interface Query2YahooFinanceV8 {
    chart: Chart;
}


export async function getQuery2FinanceYahooV8(
  symbol:string,
  interval:string,
  period1:number,
  period2:number) : Promise<Query2YahooFinanceV8 | undefined> {
  //&corsDomain=finance.yahoo.com&.tsrc=finance
  const res = await fetch(`https://corsproxy.cloudno.de/https://query2.finance.yahoo.com/v8/finance/chart/${symbol}`+
    `?region=US&lang=en-US&interval=${interval}&period1=${period1}&period2=${period2}`, {headers: {"X-Requested-With":"XMLHttpRequest"}})
  if (res.ok) {
    const foo = await res.json()
    console.log(foo);
    return (foo) as Query2YahooFinanceV8;
  }
  return undefined
}
