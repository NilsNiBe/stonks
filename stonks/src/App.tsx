import React from 'react';
import './App.css';
import { query2FinanceYahooV8Chart, Query2YahooFinanceV8ChartResponse } from './query2YahooFinanceV8';
import '@fontsource/roboto';
import { SharesTable } from './comps/SharesTable';

export interface Share {
  symbol: string;
  purchases: Purchase[];  
}

interface Purchase {
  timeStamp: number;
  amount: number;  
}

export interface ChartData{
  symbol: string;
  res: Query2YahooFinanceV8ChartResponse;
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
        {amount:1, timeStamp: new Date("2021-05-01").getTime()}, 
        {amount:2, timeStamp: new Date("2021-07-01").getTime()}, 
        {amount:3, timeStamp: new Date("2021-08-01").getTime()},
      ]},
      {symbol: "GOOGL.MI", purchases: [
        {amount:1, timeStamp: new Date("2021-05-01").getTime()}, 
        {amount:2, timeStamp: new Date("2021-07-01").getTime()}, 
        {amount:3, timeStamp: new Date("2021-08-01").getTime()},
      ]}
    ]);

  const [chartDataList, setChartDataList] = React.useState<ChartData[]>();

  React.useEffect(() => {
    if (shares === undefined) return;
    const responses : ChartData[] = [];

    const apiCallFuc = async () =>  {      
      for(let i=0; i<shares.length;i++){
        const minTimestamp = Math.min.apply(
          null,shares[i].purchases.map(p=>p.timeStamp));     
        const nowTimestamp = new Date().getTime();
        const res = await query2FinanceYahooV8Chart(
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



  return (
    <div className="App">
      <header className="App-header">
        <>
          {chartDataList !== undefined 
          && <SharesTable shares={shares} chartDataList={chartDataList} />}
        </>
      
      </header>
    </div>
  );
}

export default App;
