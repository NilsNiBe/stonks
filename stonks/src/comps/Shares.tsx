import { Container, Grid } from "@material-ui/core";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  query2FinanceYahooV8Chart,
  query2FinanceYahooV8QuoteSummary,
} from "../apis/yahooV8/api";
import { ChartResult } from "../apis/yahooV8/interfaces";
import { getTimeStampInSeconds } from "../services/calculationService";
import { dateAddDays } from "../services/dateService";
import { loadLocalStorage, saveLocalStorage } from "../services/sharesService";
import { SharesInput } from "./SharesInput";
import { SharesTable } from "./SharesTable";

export interface Share {
  symbol: string;
  purchases: Purchase[];
  chartResult?: ChartResult;
}

interface Purchase {
  id: string;
  timeStamp: number;
  amount: number;
}

function getMinTimeStamp(share: Share) {
  return Math.min(...share.purchases.map(x => x.timeStamp));
}

export const Shares = () => {
  const [shares, setShares] = React.useState<Share[]>(loadLocalStorage());

  React.useEffect(() => {
    const requests = async () => {
      setShares(
        await Promise.all(
          shares.map(async x => ({
            ...x,
            chartResult: await getChartResultFromApi(
              x.symbol,
              getMinTimeStamp(x)
            ),
          }))
        )
      );
    };
    requests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const id = setInterval(
      () =>
        Promise.all(
          shares.map(
            async x =>
              (x.chartResult = await getChartResultFromApi(
                x.symbol,
                getMinTimeStamp(x)
              ))
          )
        ),
      30000
    );
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function deleteSharePurchase(id: string) {
    const shareWithPurchase = shares.find(x =>
      x.purchases.find(p => p.id === id)
    );
    if (shareWithPurchase === undefined) return;
    const newShares = shares.filter(x => x !== shareWithPurchase);
    const newPurchases = shareWithPurchase.purchases.filter(x => x.id !== id);
    if (newPurchases.length > 0) {
      const newShareWithPurchase = {
        ...shareWithPurchase,
        purchases: newPurchases,
      };
      newShares.push(newShareWithPurchase);
    }
    setShares(newShares);
    saveLocalStorage(newShares);
  }

  /** Gets the chart data of a share starting from the first purchase time */
  async function getChartResultFromApi(symbol: string, fromTimeStamp: number) {
    const nowTimestamp = new Date().getTime();
    const res = await query2FinanceYahooV8Chart(
      symbol,
      "1d",
      getTimeStampInSeconds(dateAddDays(new Date(fromTimeStamp), -7).getTime()),
      getTimeStampInSeconds(nowTimestamp)
    );
    return res!.chart.result[0];
  }

  async function addPurchase(date: Date, symbol: string, amount: number) {
    const foundShare = shares.find(
      x => x.symbol.toUpperCase() === symbol.toUpperCase()
    );
    if (foundShare !== undefined) {
      const minTimeStamp = getMinTimeStamp(foundShare);
      if (minTimeStamp > date.getTime()) {
        foundShare.chartResult = await getChartResultFromApi(
          foundShare.symbol,
          date.getTime()
        );
      }
      foundShare.purchases.push({
        id: uuidv4(),
        timeStamp: date.getTime(),
        amount,
      });
    } else {
      shares.push({
        symbol,
        purchases: [{ id: uuidv4(), timeStamp: date.getTime(), amount }],
        chartResult: await getChartResultFromApi(symbol, date.getTime()),
      });
    }
    return shares;
  }

  return (
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
              const shares = await addPurchase(date, symbol, amount);
              setShares([...shares]);
              saveLocalStorage(shares);
            }}
          />
          {shares?.length > 0 &&
            shares.every(x => x.chartResult !== undefined) && (
              <SharesTable
                shares={shares}
                deleteRowPurchase={deleteSharePurchase}
              />
            )}
        </Grid>
      </Container>
    </section>
  );
};
