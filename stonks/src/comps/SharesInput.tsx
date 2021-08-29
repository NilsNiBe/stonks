import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import React from "react";
import { parse } from 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import { Fab, Grid, TextField } from "@material-ui/core";
import { Add } from '@material-ui/icons'
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
      <Grid container justifyContent="center" >
        <KeyboardDatePicker      
          format="dd.MM.yyyy"   
          id="date-picker-dialog"
          label="Kaufzeitpunkt"
          inputVariant="outlined"
          value={selectedDate}
          onChange={(date, value) =>{
            if (value) {
              const date = parse(value, "dd.MM.yyyy", new Date());
              const validDate = date < new Date() ? date : new Date();
              handleDateChange(validDate);
            }
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <ShareSearchInput symbol={selectedSymbol} setSymbol={setSelectedShare}/>
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
        />
        <Fab color="primary" aria-label="add">
          <Add onClick={() => props.returnShare(selectedDate, selectedSymbol, selectedAmount)}/>
        </Fab>
      </Grid>
    </MuiPickersUtilsProvider>    
  )
}