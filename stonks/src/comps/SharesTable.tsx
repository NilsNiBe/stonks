import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ChartData, Share } from "../App";
import { Result } from "../yahoo/query2YahooFinanceV8/interfaces";
import { SharesTableRow, TheRow } from "./SharesTableRow";

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

interface SharesTableProps {
  shares: Share[];
  chartDataList: ChartData[];
}

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

export const SharesTable = (props: SharesTableProps) => {
  const rows =
    props.chartDataList === undefined
      ? []
      : props.shares.map(x => createRows(x, props.chartDataList));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" padding="checkbox">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Aktie</TableCell>
            <TableCell align="right">Menge</TableCell>
            <TableCell align="right">Wert</TableCell>
            <TableCell align="right">Preis</TableCell>
            <TableCell align="right">G/V</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <SharesTableRow key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
