import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { query2FinanceYahooV8Search } from "../query2YahooFinanceV8";

interface ShareSearchInputProps {
  symbol: string;
  setSymbol: (symbol: string) => void;
}

export const ShareSearchInput = (props: ShareSearchInputProps) => {
  const [options, setOptions] = React.useState<string[]>([]);

  return (
    <Autocomplete
      id="combo-box-demo"
      filterOptions={x => x}
      value={props.symbol}
      style={{ width: "200px" }}
      options={options}
      getOptionLabel={option => option}
      onInputChange={async (_: object, value: string, reason: string) => {
        if (reason === "input") {
          const res = await query2FinanceYahooV8Search(value);
          if (res !== undefined) {
            setOptions(res.quotes.map(x => x.symbol));
          }
        } else if (reason === "clear") {
          setOptions([]);
          props.setSymbol("");
        }
      }}
      onClose={(event, reason) => {
        if (reason === "select-option") {
          props.setSymbol((event.target as any).textContent);
        }
      }}
      renderInput={params => (
        <TextField {...params} label="Wertpapier" variant="outlined" />
      )}
    />
  );
};
