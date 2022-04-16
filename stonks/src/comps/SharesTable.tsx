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
import { getPriceForTimeStamp } from "../services/calculationService";
import { Share } from "./Shares";
import { SharesTableRow, TheRow } from "./SharesTableRow";

interface SharesTableProps {
  shares: Share[];
  deleteRowPurchase: (id: string) => void;
}

function createRows(share: Share): TheRow {
  const name = share.symbol;
  const chartResult = share.chartResult!;
  const quote = share.chartResult!.indicators.quote[0];
  const closeDayBefore = quote.close[quote.close.length - 2];
  const latestValue = quote.close[quote.open.length - 1];
  const latestValueDiff = latestValue - closeDayBefore;
  const latestPercentChange = (latestValueDiff / closeDayBefore) * 100;
  const purchases = share.purchases;
  const totalCount = purchases.map(x => x.amount).reduce((x, y) => x + y);
  const totalValue = totalCount * latestValue;
  const rowPurchases = share.purchases
    .map(x => {
      const price = getPriceForTimeStamp(x.timeStamp, share.chartResult!);
      const priceDiff = latestValue - price;
      return {
        id: x.id,
        timeStamp: x.timeStamp,
        amount: x.amount,
        buyPrice: price,
        priceDiff: latestValue - price,
        percentChange: (priceDiff / price) * 100,
      };
    })
    .sort((a, b) => a.timeStamp - b.timeStamp);
  const totalValueAtTimeOfPurchase = rowPurchases
    .map(x => x.buyPrice * x.amount)
    .reduce((x, y) => x + y);
  const totalValueDiff = totalValue - totalValueAtTimeOfPurchase;
  const totalPercentChange =
    (totalValueDiff / totalValueAtTimeOfPurchase) * 100;
  return {
    name,
    totalCount,
    totalValue,
    totalValueDiff,
    totalPercentChange,
    latestValue,
    latestValueDiff,
    latestPercentChange,
    rowPurchases,
    chartResult,
  };
}

export const SharesTable = (props: SharesTableProps) => {
  const shares = props.shares;
  React.useEffect(() => {}, [shares]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" padding="checkbox">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Aktie</TableCell>
            <TableCell align="right">Menge</TableCell>
            <TableCell align="right">Gesamtwert</TableCell>
            <TableCell align="right">G/V (gesamt)</TableCell>
            <TableCell align="right">Aktienwert</TableCell>
            <TableCell align="right">G/V (aktuell)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.shares
            .sort((a, b) => a.symbol.localeCompare(b.symbol))
            .map(row => (
              <SharesTableRow
                key={row.symbol}
                row={createRows(row)}
                deleteRowPurchase={props.deleteRowPurchase}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
