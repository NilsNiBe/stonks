import "@fontsource/roboto";
import { Container, Grid } from "@material-ui/core";
import React from "react";
import "./App.css";
import { SharesInput } from "./comps/SharesInput";
import { SharesTable } from "./comps/SharesTable";
import Background from "./img/stonks.jpg";
import {
  query2FinanceYahooV8Chart,
  query2FinanceYahooV8QuoteSummary,
  Query2YahooFinanceV8ChartResponse,
} from "./query2YahooFinanceV8";

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

const App = () => {
  // [
  //   {symbol: "MSFT", purchases: [
  //     {amount:1, timeStamp: new Date("2021-05-01").getTime()},
  //     {amount:2, timeStamp: new Date("2021-07-01").getTime()},
  //     {amount:3, timeStamp: new Date("2021-08-01").getTime()},
  //   ]},
  //   {symbol: "GOOGL.MI", purchases: [
  //     {amount:1, timeStamp: new Date("2021-05-01").getTime()},
  //     {amount:2, timeStamp: new Date("2021-07-01").getTime()},
  //     {amount:3, timeStamp: new Date("2021-08-01").getTime()},
  //   ]}
  // ]

  // const [shares, dispatchShares] = React.useReducer((state :Share[]) => state, [] as Share[], () => {
  //   const localDataSharesString = localStorage.getItem("nibeshares");
  //   return localDataSharesString ? JSON.parse(localDataSharesString) : [];
  // });
  const [shares, setShares] = React.useState<Share[]>(
    (() => {
      const localDataSharesString = localStorage.getItem("nibeshares");
      return localDataSharesString ? JSON.parse(localDataSharesString) : [];
    })()
  );
  const [chartDataList, setChartDataList] = React.useState<ChartData[]>();

  React.useEffect(() => {
    localStorage.setItem("stonks", JSON.stringify(shares));
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
                returnShare={async (date, symbol, amount) => {
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
                chartDataList.length === shares.length && (
                  <SharesTable shares={shares} chartDataList={chartDataList} />
                )}
            </Grid>
          </Container>
        </section>
      </header>
    </div>
  );
};

export default App;
