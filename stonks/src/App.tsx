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
} from "./yahoo/query2YahooFinanceV8/api";
import { Query2YahooFinanceV8ChartResponse } from "./yahoo/query2YahooFinanceV8/interfaces";

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
