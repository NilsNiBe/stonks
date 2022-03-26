import {
  Query2YahooFinanceV8ChartResponse,
  Query2YahooFinanceV8SearchQuoteSummary,
  Query2YahooFinanceV8SearchResponse,
} from "./interfaces";

const corsProxy = "https://corsproxy.cloudno.de";
const yahooApi = {
  chart: `${corsProxy}/https://query2.finance.yahoo.com/v8/finance/chart`,
  search: `${corsProxy}/https://query2.finance.yahoo.com/v1/finance/search`,
  quoteSummary: `${corsProxy}/https://query2.finance.yahoo.com/v10/finance/quoteSummary`,
};

/**
 * Stock quote data
 * @param symbol stock symbol
 * @param interval granularity (1m (for 7 days period max), 2m, 5m, 15m, 30m, 60m, 90m, 1h (for 730 day period max), 1d, 5d, 1wk, 1mo, 3mo)
 * @param period1 start of period
 * @param period2 end of period
 * @returns
 */
export async function query2FinanceYahooV8Chart(
  symbol: string,
  interval: string,
  period1: number,
  period2: number
): Promise<Query2YahooFinanceV8ChartResponse | undefined> {
  const res = await fetch(
    `${yahooApi.chart}/${symbol}?region=US&lang=en-US` +
      `&interval=${interval}&period1=${period1}&period2=${period2}`,
    { headers: { "x-requested-with": "XMLHttpRequest" } }
  );
  if (res.ok) {
    return (await res.json()) as Query2YahooFinanceV8ChartResponse;
  }
  return undefined;
}

/**
 * Stock search
 * @param symbol Search input
 * @returns Search results
 */
export async function query2FinanceYahooV8Search(
  symbol: string
): Promise<Query2YahooFinanceV8SearchResponse | undefined> {
  const res = await fetch(
    `${yahooApi.search}?q=${symbol}&quotesCount=6&newsCount=0`,
    { headers: { "x-requested-with": "XMLHttpRequest" } }
  );
  if (res.ok) {
    return (await res.json()) as Query2YahooFinanceV8SearchResponse;
  }
  return undefined;
}

/**
 * Stock quote summary (current price, ...)
 * @param symbol stock symbol
 * @returns quote summary
 */
export async function query2FinanceYahooV8QuoteSummary(
  symbol: string
): Promise<Query2YahooFinanceV8SearchQuoteSummary | undefined> {
  const res = await fetch(
    `${yahooApi.quoteSummary}/${symbol}?modules=financialData`,
    { headers: { "x-requested-with": "XMLHttpRequest" } }
  );
  if (res.ok) {
    return (await res.json()) as Query2YahooFinanceV8SearchQuoteSummary;
  }
  return undefined;
}
