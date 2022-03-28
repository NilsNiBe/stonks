import "@fontsource/roboto";
import { Container, Grid } from "@material-ui/core";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { SharesInput } from "./comps/SharesInput";
import { SharesTable } from "./comps/SharesTable";
import { TheRow } from "./comps/SharesTableRow";
import Background from "./img/stonks.jpg";
import {
  query2FinanceYahooV8Chart,
  query2FinanceYahooV8QuoteSummary,
} from "./yahoo/query2YahooFinanceV8/api";
import {
  Query2YahooFinanceV8ChartResponse,
  Result,
} from "./yahoo/query2YahooFinanceV8/interfaces";

export interface Share {
  symbol: string;
  purchases: Purchase[];
}

interface Purchase {
  timeStamp: number;
  amount: number;
}

export interface ChartData {
  symbol: string;
  res: Query2YahooFinanceV8ChartResponse;
}

// function getDateDiff(date1: Date, date2: Date) : number {
//   var diff = Math.abs(date1.getTime() - date2.getTime());
//   return Math.ceil(diff / (1000 * 3600 * 24));
// }

function getTimeStampInSeconds(timeStamp: number): number {
  return Math.floor(timeStamp / 1000);
}

function getIndexOfFirstValueSmallerOrEqual(
  array: number[],
  value: number
): number {
  for (let i = array.length; i >= 0; i--) {
    if (array[i] <= value) {
      return i;
    }
  }
  return 0;
}

function getPriceForTimeStamp(timeStamp: number, result: Result) {
  const index = getIndexOfFirstValueSmallerOrEqual(
    result.timestamp,
    timeStamp / 1000
  );
  return result.indicators.quote[0].close[index];
}

const localStonks = "stonks";

const App = () => {
  const [shares, setShares] = React.useState<Share[]>(
    (() => {
      const localDataSharesString = localStorage.getItem(localStonks);
      return localDataSharesString ? JSON.parse(localDataSharesString) : [];
    })()
  );
  const [chartDataList, setChartDataList] = React.useState<ChartData[]>();

  React.useEffect(() => {
    localStorage.setItem(localStonks, JSON.stringify(shares));
  }, [shares]);

  React.useEffect(() => {
    if (shares === undefined) return;
    const responses: ChartData[] = [];

    const apiCallFuc = async () => {
      for (let i = 0; i < shares.length; i++) {
        const minTimestamp = Math.min.apply(
          null,
          shares[i].purchases.map(p => p.timeStamp)
        );
        const nowTimestamp = new Date().getTime();
        const res = await query2FinanceYahooV8Chart(
          shares[i].symbol,
          "1d",
          getTimeStampInSeconds(minTimestamp),
          getTimeStampInSeconds(nowTimestamp)
        );
        if (res !== undefined) {
          responses.push({ symbol: shares[i].symbol, res });
        }
      }
      setChartDataList(responses);
    };
    apiCallFuc();
  }, [shares]);

  const sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${Background})`,
  };

  function createRows(share: Share, chartDataList: ChartData[]): TheRow {
    const name = share.symbol;
    const result = chartDataList.find(x => x.symbol === share.symbol)!.res.chart
      .result[0];
    const quote = result.indicators.quote[0];
    const closeToday = quote.close[quote.close.length - 1];
    const openToday = quote.open[quote.open.length - 1];
    const percentChangeToday = ((closeToday - openToday) / openToday) * 100;
    const purchases = share.purchases;
    const shareCount = purchases.map(x => x.amount).reduce((x, y) => x + y);
    const shareValue = shareCount * closeToday;
    const rowPurchases = share.purchases.map(x => ({
      id: uuidv4(),
      timeStamp: x.timeStamp,
      amount: x.amount,
      buyPrice: getPriceForTimeStamp(x.timeStamp, result),
    }));
    return {
      name,
      shareCount,
      closeToday,
      percentChangeToday,
      shareValue,
      rowPurchases,
    };
  }

  const rows =
    chartDataList === undefined
      ? []
      : shares.map(x => createRows(x, chartDataList));

  return (
    <div className="App">
      <header className="App-header" style={sectionStyle}>
        <section style={{ margin: 20 }}>
          <Container maxWidth="md">
            <Grid
              container
              style={{
                backgroundColor: "lightskyblue",
                padding: 10,
                borderRadius: 5,
                boxShadow: "1px 1px 1px gray",
              }}
            >
              <SharesInput
                returnShare={async (date, symbol, amount, price) => {
                  if (symbol === "") return;
                  const res = await query2FinanceYahooV8QuoteSummary(symbol);
                  if (
                    res === undefined ||
                    res.quoteSummary.result === [] ||
                    res.quoteSummary.result === null ||
                    amount <= 0
                  ) {
                    return;
                  }
                  const foundShare = shares.find(
                    x => x.symbol.toUpperCase() === symbol.toUpperCase()
                  );
                  if (foundShare !== undefined) {
                    foundShare.purchases.push({
                      timeStamp: date.getTime(),
                      amount,
                    });
                  } else {
                    shares.push({
                      symbol,
                      purchases: [{ timeStamp: date.getTime(), amount }],
                    });
                  }
                  setShares([...shares]);
                }}
              />
              {chartDataList !== undefined &&
                shares?.length > 0 &&
                chartDataList.length === shares.length && (
                  <SharesTable rows={rows} />
                )}
            </Grid>
          </Container>
        </section>
      </header>
    </div>
  );
};

export default App;
