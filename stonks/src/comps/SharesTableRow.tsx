import React from 'react'
import { Box, Collapse, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

function numberWithPercentage(value: number, decimalPlaces: number = 2) : string {
  return `${value.toFixed(decimalPlaces)} %`
}

const formatterCurrency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: 'EUR'
})

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export interface theRow {
  name: string;
  shareCount: number;
  closeToday: number;
  percentChangeToday: number;
  shareValue: number;
  rowPurchases: theRowPurchase[];
}

export interface theRowPurchase {
  timeStamp: number;
  amount: number;
  buyPrice: number;
}

export const SharesTableRow = (rowData : {row: theRow}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const row = rowData.row;
  
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.shareCount}</TableCell>
        <TableCell align="right">{formatterCurrency.format(row.shareValue)}</TableCell>
        <TableCell align="right">{formatterCurrency.format(row.closeToday)}</TableCell>
        <TableCell align="right">{numberWithPercentage(row.percentChangeToday)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div">
                Käufe
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>                      
                    <TableCell>Datum</TableCell>
                    <TableCell>Menge</TableCell>                      
                    <TableCell align="right">Kaufpreis</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.rowPurchases.map(r => (
                    <TableRow key={r.timeStamp}>
                      <TableCell component="th" scope="row">
                        {new Date(r.timeStamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{r.amount}</TableCell>
                      <TableCell align="right">{formatterCurrency.format(r.buyPrice)}</TableCell>                        
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}