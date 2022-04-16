import {
  Box,
  Collapse,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  totalCount: number;
  totalValue: number;
  totalValueDiff: number;
  totalPercentChange: number;
  latestValue: number;
  latestValueDiff: number;
  latestPercentChange: number;
  rowPurchases: TheRowPurchase[];
}

export interface TheRowPurchase {
  id: string;
  timeStamp: number;
  amount: number;
  buyPrice: number;
  priceDiff: number;
  percentChange: number;
}

export interface SharesTableRowProps {
  row: TheRow;
  deleteRowPurchase: (id: string) => void;
}

export const SharesTableRow = (props: SharesTableRowProps) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const { row } = props;

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
        <TableCell align="right">{row.totalCount}</TableCell>
        <TableCell align="right">
          {formatterCurrency.format(row.totalValue)}
        </TableCell>
        <TableCell
          align="right"
          style={{
            color: Math.sign(row.totalPercentChange) === -1 ? "red" : "green",
          }}
        >
          {`${row.totalValueDiff.toFixed(2)} (${numberWithPercentage(
            row.totalPercentChange
          )})`}
        </TableCell>
        <TableCell align="right">
          {formatterCurrency.format(row.latestValue)}
        </TableCell>
        <TableCell
          align="right"
          style={{
            color: Math.sign(row.latestPercentChange) === -1 ? "red" : "green",
          }}
        >
          {`${row.latestValueDiff.toFixed(2)} (${numberWithPercentage(
            row.latestPercentChange
          )})`}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
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
                    <TableCell align="right">G/V</TableCell>
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.rowPurchases.map(r => (
                    <TableRow key={r.id}>
                      <TableCell component="th" scope="row">
                        {new Date(r.timeStamp).toLocaleString([], {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>{r.amount}</TableCell>
                      <TableCell align="right">
                        {formatterCurrency.format(r.buyPrice)}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color:
                            Math.sign(r.priceDiff) === -1 ? "red" : "green",
                        }}
                      >
                        {`${r.priceDiff.toFixed(2)} (${numberWithPercentage(
                          r.percentChange
                        )})`}
                      </TableCell>
                      <TableCell align="right">
                        <Delete
                          cursor="pointer"
                          onClick={() => {
                            props.deleteRowPurchase(r.id);
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
