import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { query2FinanceYahooV8Search } from "../yahoo/query2YahooFinanceV8/api";

interface ShareSearchInputProps {
  symbol: string;
  setSymbol: (symbol: string) => void;
}

export const ShareSearchInput = (props: ShareSearchInputProps) => {
  const [options, setOptions] = React.useState<
    { symbol: string; longName: string }[]
  >([]);

  return (
    <Autocomplete
      id="combo-box-demo"
      filterOptions={x => x}
      options={options}
      getOptionSelected={(options, value) => options.symbol === value.symbol}
      getOptionLabel={option => `${option.symbol} - ${option.longName}`}
      onInputChange={async (_: object, value: string, reason: string) => {
        if (reason === "input") {
          if (value === "") return;
          const res = await query2FinanceYahooV8Search(value);
          if (res !== undefined) {
            setOptions(
              res.quotes.map(x => ({ symbol: x.symbol, longName: x.longname }))
            );
          }
        } else if (reason === "clear") {
          setOptions([]);
          props.setSymbol("");
        }
      }}
      onClose={(event, reason) => {
        if (reason === "select-option") {
          const selectedOption = (event.target as any).textContent as string;
          const option = options.find(
            x => `${x.symbol} - ${x.longName}` === selectedOption
          );
          if (option !== undefined) {
            props.setSymbol(option.symbol);
          }
        }
      }}
      renderInput={params => (
        <TextField {...params} label="Wertpapier" variant="outlined" />
      )}
    />
  );
};
