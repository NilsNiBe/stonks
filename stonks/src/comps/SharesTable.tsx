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
  const quote = share.chartResult!.indicators.quote[0];
  const closeDayBefore = quote.close[quote.close.length - 2];
  const closeLatest = quote.close[quote.open.length - 1];
  const closeLatestDiff = closeLatest - closeDayBefore;
  const percentChangeToday = (closeLatestDiff / closeDayBefore) * 100;
  const purchases = share.purchases;
  const shareCount = purchases.map(x => x.amount).reduce((x, y) => x + y);
  const shareValue = shareCount * closeDayBefore;
  const rowPurchases = share.purchases
    .map(x => ({
      id: x.id,
      timeStamp: x.timeStamp,
      amount: x.amount,
      buyPrice: getPriceForTimeStamp(x.timeStamp, share.chartResult!),
    }))
    .sort((a, b) => a.timeStamp - b.timeStamp);
  return {
    name,
    shareCount,
    closeToday: closeDayBefore,
    closeLatestDiff,
    percentChangeToday,
    shareValue,
    rowPurchases,
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
            <TableCell align="right">Gesamt</TableCell>
            <TableCell align="right">Wert</TableCell>
            <TableCell align="right">G/V</TableCell>
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
