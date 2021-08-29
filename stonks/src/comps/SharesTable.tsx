import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react'
import { ChartData, Share } from '../App';

interface SharesTableProps {
  shares: Share[];
  chartDataList: ChartData[];
}

interface theRow {
  name: string;
  shareCount: number;
  closeToday: number;
  percentChangeToday: number;
  shareValue: number;
  rowPurchases: theRowPurchase[];
}

interface theRowPurchase {
  timeStamp: number;
  amount: number;
  buyPrice: number;
}

function createRows(share: Share, chartDataList: ChartData[]) : theRow {
  const name = share.symbol;
  const result = chartDataList.find(x => x.symbol === share.symbol)!.res.chart.result[0];
  const quote = result.indicators.quote[0];
  const closeToday = quote.close[quote.close.length-1];
  const openToday = quote.open[quote.open.length-1];
  const percentChangeToday = (closeToday - openToday) / openToday;
  const purchases = share.purchases;
  const shareCount = purchases.map(x => x.amount).reduce((x, y) => x + y);
  const shareValue = shareCount * closeToday;
  const rowPurchases = share.purchases.map(x => ({
    timeStamp: x.timeStamp, 
    amount: x.amount, 
    buyPrice: getPriceForTimeStamp(x.timeStamp, result)
  }));
  return {
    name,
    shareCount,      
    closeToday,
    percentChangeToday,
    shareValue,
    rowPurchases
  };
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const formatterCurrency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: 'EUR'
})

export const SharesTable = (props : SharesTableProps) => {
  const rows = props.chartDataList === undefined 
    ? [] 
    : props.shares.map(x => createRows(x, props.chartDataList));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Aktie</TableCell>
            <TableCell align="right">Menge</TableCell>
            <TableCell align="right">Wert</TableCell>
            <TableCell align="right">Preis</TableCell>
            <TableCell align="right">Tagesänderung</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}