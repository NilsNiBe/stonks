import DateFnsUtils from "@date-io/date-fns";
import { Fab, Grid, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { parse } from "date-fns";
import React from "react";
import { ShareSearchInput } from "./ShareSearchInput";

export interface SharesInputProps {
  returnShare: (date: Date, symbol: string, amount: number) => void;
}

export const SharesInput = (props: SharesInputProps) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedSymbol, setSelectedShare] = React.useState("");
  const [selectedAmount, setSelectedAmount] = React.useState(1);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

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
        <Grid item>
          <KeyboardDatePicker
            format="dd.MM.yyyy"
            id="date-picker-dialog"
            label="Kaufzeitpunkt"
            inputVariant="outlined"
            value={selectedDate}
            onChange={(date, value) => {
              if (value) {
                const date = parse(value, "dd.MM.yyyy", new Date());
                const validDate = date < new Date() ? date : new Date();
                handleDateChange(validDate);
              }
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Grid item>
          <ShareSearchInput
            symbol={selectedSymbol}
            setSymbol={setSelectedShare}
          />
        </Grid>
        <Grid item>
          <TextField
            id="standard-number"
            label="Anzahl"
            type="number"
            variant="outlined"
            defaultValue={1}
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
            style={{ width: 80 }}
          />
        </Grid>
        <Grid item>
          <Fab color="primary" aria-label="add" size="medium">
            <Add
              onClick={() =>
                props.returnShare(selectedDate, selectedSymbol, selectedAmount)
              }
            />
          </Fab>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
