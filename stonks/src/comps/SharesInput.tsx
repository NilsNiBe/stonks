import DateFnsUtils from "@date-io/date-fns";
import { Fab, Grid, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { parse } from "date-fns";
import React from "react";
import { query2FinanceYahooV8Chart } from "../yahoo/query2YahooFinanceV8/api";
import { ShareSearchInput } from "./ShareSearchInput";

export interface SharesInputProps {
  returnShare: (
    date: Date,
    symbol: string,
    amount: number,
    price?: number
  ) => void;
}

export const SharesInput = (props: SharesInputProps) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedSymbol, setSelectedSymbol] = React.useState("");
  const [selectedAmount, setSelectedAmount] = React.useState(1);
  const [selectedPrice, setSelectedPrice] = React.useState<number>();

  async function setSelectedShare(symbol: string, date: Date) {
    setSelectedSymbol(symbol);
    setSelectedDate(date);
    if (symbol === "") {
      setSelectedPrice(undefined);
    } else {
      const startDate = new Date(date.getTime());
      startDate.setDate(startDate.getDate() - 5);
      const endDate = new Date(date.getTime());
      endDate.setDate(endDate.getDate() + 1);
      const res = await query2FinanceYahooV8Chart(
        symbol,
        "1d",
        Math.round(startDate.setUTCHours(0, 0, 0) / 1000),
        Math.round(endDate.setUTCHours(23, 59, 59) / 1000)
      );
      const result = res?.chart.result[0];
      if (result !== undefined) {
        const quotes = result.indicators.quote;
        if (
          quotes.length === 0 ||
          quotes[0] === undefined ||
          Object.keys(quotes[0]).length === 0
        ) {
          // Stock price not found, get last price
          setSelectedPrice(
            Math.round(result.meta.regularMarketPrice * 100) / 100
          );
        } else {
          const openPrices = quotes[0].open;
          setSelectedPrice(
            Math.round(openPrices[openPrices.length - 1] * 100) / 100
          );
        }
      }
    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        justifyContent="center"
        direction="row"
        spacing={1}
        style={{
          padding: 5,
          margin: 5,
          backgroundColor: "white",
          borderRadius: 5,
          boxShadow: "1px 1px 1px gray",
        }}
      >
        <Grid item lg={3} md={3} sm={4} xs={12}>
          <KeyboardDatePicker
            format="dd.MM.yyyy"
            id="date-picker-dialog"
            label="Kaufzeitpunkt"
            inputVariant="outlined"
            value={selectedDate}
            onChange={(_, value) => {
              if (value) {
                const date = parse(value, "dd.MM.yyyy", new Date());
                const validDate = date < new Date() ? date : new Date();
                setSelectedShare(selectedSymbol, validDate);
              }
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <ShareSearchInput
            symbol={selectedSymbol}
            setSymbol={x => setSelectedShare(x, selectedDate)}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={12}>
          <TextField
            id="standard-number"
            label="Preis"
            type="number"
            variant="outlined"
            value={selectedPrice}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={x => {
              const num = Number(x.target.value);
              if (!isNaN(num)) {
                setSelectedPrice(num);
              }
            }}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={12}>
          <TextField
            id="standard-number"
            label="Anzahl"
            type="number"
            variant="outlined"
            value={selectedAmount}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={x => {
              const num = Number(x.target.value);
              if (!isNaN(num)) {
                setSelectedAmount(num);
              }
            }}
          />
        </Grid>
        <Grid item lg={1} md={1} sm={8} xs={12}>
          <Fab color="primary" aria-label="add" size="medium">
            <Add
              onClick={() =>
                props.returnShare(
                  selectedDate,
                  selectedSymbol,
                  selectedAmount,
                  selectedPrice
                )
              }
            />
          </Fab>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
