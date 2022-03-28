import {
  Box,
  Collapse,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import React from "react";

function numberWithPercentage(
  value: number,
  decimalPlaces: number = 2
): string {
  return `${value.toFixed(decimalPlaces)} %`;
}

const formatterCurrency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export interface TheRow {
  name: string;
  shareCount: number;
  closeToday: number;
  percentChangeToday: number;
  shareValue: number;
  rowPurchases: TheRowPurchase[];
}

export interface TheRowPurchase {
  id: string;
  timeStamp: number;
  amount: number;
  buyPrice: number;
}

export const SharesTableRow = (rowData: { row: TheRow }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const { row } = rowData;

  return (
    <>
      <TableRow className={classes.root} style={{ backgroundColor: "#cfe8fc" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.shareCount}</TableCell>
        <TableCell align="right">
          {formatterCurrency.format(row.shareValue)}
        </TableCell>
        <TableCell align="right">
          {formatterCurrency.format(row.closeToday)}
        </TableCell>
        <TableCell
          align="right"
          style={{
            color: Math.sign(row.percentChangeToday) === -1 ? "red" : "green",
          }}
        >
          {numberWithPercentage(row.percentChangeToday)}
        </TableCell>
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
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.rowPurchases.map(r => (
                    <TableRow key={new Date().getTime()}>
                      <TableCell component="th" scope="row">
                        {new Date(r.timeStamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{r.amount}</TableCell>
                      <TableCell align="right">
                        {formatterCurrency.format(r.buyPrice)}
                      </TableCell>
                      <TableCell align="right">
                        <Delete
                          cursor="pointer"
                          onClick={() => {
                            // DeleteItem(r.timeStamp);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
