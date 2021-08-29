import React from 'react';
import './App.css';
import { getQuery2FinanceYahooV8, Query2YahooFinanceV8, Quote, Result } from './query2YahooFinanceV8';
import '@fontsource/roboto';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

interface Share {
  symbol: string;
  purchases: Purchase[];  
}

interface Purchase {
  timeStamp: number;
  amount: number;  
}

interface ChartData{
  symbol: string;
  res: Query2YahooFinanceV8;
}

// function getDateDiff(date1: Date, date2: Date) : number {
//   var diff = Math.abs(date1.getTime() - date2.getTime());
//   return Math.ceil(diff / (1000 * 3600 * 24));
// }

function getTimeStampInSeconds(timeStamp: number) : number {
  return Math.floor(timeStamp/1000);
}


const App = () => {

  const [shares, setShares] = React.useState<Share[]>(
    [
      {symbol: "MSFT", purchases: [
        {amount:1, timeStamp: new Date("2021-05-01T19:00:00").getTime()}, 
        {amount:2, timeStamp: new Date("2021-07-01T19:00:00").getTime()}, 
        {amount:3, timeStamp: new Date("2021-08-01T19:00:00").getTime()},
      ]},
      {symbol: "GOOGL.MI", purchases: [
        {amount:1, timeStamp: new Date("2021-05-01T19:00:00").getTime()}, 
        {amount:2, timeStamp: new Date("2021-07-01T19:00:00").getTime()}, 
        {amount:3, timeStamp: new Date("2021-08-01T19:00:00").getTime()},
      ]}
    ]);

  const [chartDataList, setChartDataList] = React.useState<ChartData[]>();

  React.useEffect(() => {
    if (shares === undefined) return;
    const responses : ChartData[] = [];

    const apiCallFuc = async () =>  {      
      for(let i=0; i<shares.length;i++){
        const minTimestamp = Math.min.apply(null,shares[i].purchases.map(p=>p.timeStamp));     
        const nowTimestamp = new Date().getTime();
        const res = await getQuery2FinanceYahooV8(
          shares[i].symbol,
          "1d",
          getTimeStampInSeconds(minTimestamp), 
          getTimeStampInSeconds(nowTimestamp));
        if (res !== undefined){
          responses.push({symbol: shares[i].symbol, res});          
        }
      }
      setChartDataList(responses);
    }
    apiCallFuc();        
  }, [shares]);

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

  function numberWithPercentage(value: number, decimalPlaces: number = 2) : string {
    return `${value.toFixed(decimalPlaces)} %`
  }

  function getIndexOfFirstValueSmallerOrEqual(array: number[], value: number) : number {
    for (let i = 0; i < array.length; i++) {
      if (array[i] <= value) {
        return i;
      }      
    }
    return -1;
  }

  function getPriceForTimeStamp(timeStamp: number, result: Result) {
    const index = getIndexOfFirstValueSmallerOrEqual(result.timestamp, timeStamp);
    return result.indicators.quote[0].close[index];
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
  
  function Row(rowData : {row: theRow}) {
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
                <Typography variant="h6" gutterBottom component="div">
                  Käufe
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>                      
                      <TableCell>Datum</TableCell>
                      <TableCell>Menge</TableCell>                      
                      <TableCell align="right">Preis</TableCell>
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
  
  
  
  function CollapsibleTable() {
    const rows = chartDataList === undefined ? [] : shares.map(x => createRows(x, chartDataList));

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



  return (
    <div className="App">
      <header className="App-header">
        <>
          {chartDataList !== undefined && CollapsibleTable()}
        </>
      
      </header>
    </div>
  );
}

export default App;
