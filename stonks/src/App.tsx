import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getQuery2FinanceYahooV8, Query2YahooFinanceV8 } from './query2YahooFinanceV8';

interface Share {
  symbol: string;
  purchase: Purchase[];  
}

interface Purchase {
  timeStamp: number;
  amount: number;  
}

interface ApiResponse{
  symbol: string;
  res: Query2YahooFinanceV8;
}

// function getDateDiff(date1: Date, date2: Date) : number {
//   var diff = Math.abs(date1.getTime() - date2.getTime());
//   return Math.ceil(diff / (1000 * 3600 * 24));
// }

function getTimeStamp(date: Date) : number {
  return Math.floor( date.getTime()/1000)
}


const App = () => {

  const [shares, setShares] = React.useState<Share[]>(
    [
      {symbol: "MSFT", purchase: [
        {amount:1, timeStamp: getTimeStamp(new Date("2021-05-01T19:00:00"))}, 
        {amount:2, timeStamp: getTimeStamp(new Date("2021-07-01T19:00:00"))}, 
        {amount:3, timeStamp: getTimeStamp(new Date("2021-08-01T19:00:00"))},
      ]}
    ]);

  React.useEffect(() => {
    if (shares === undefined) return;
    const responses : ApiResponse[] = [];

    shares.forEach(s => {
      const minTimestamp = Math.min.apply(null,s.purchase.map(p=>p.timeStamp));     
      const nowTimestamp = getTimeStamp(new Date());
      const apiCallFuc = async () =>  {        
         const res = await getQuery2FinanceYahooV8(s.symbol, "1d", minTimestamp, nowTimestamp);
         if (res !== undefined){
           responses.push({symbol: s.symbol, res});
         }
      };
      apiCallFuc();

    });   
    
  }, [shares]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
