import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getQuery1FinanceYahooV8, Query1YahooFinanceV8 } from './query1YahooFinanceV8';

interface Share {
  symbol: string;
  purchase: Purchase[];  
}

interface Purchase {
  time: Date;
  amount: number;  
}

interface ApiResponse{
  symbol: string;
  res: Query1YahooFinanceV8;
}

function getDateDiff(date1: Date, date2: Date) : number {
  var diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
}


const App = () => {

  const [shares, setShares] = React.useState<Share[]>(
    [
      {symbol: "MSFT", purchase: [
        {amount:1, time: new Date("2021-05-01T19:00:00")}, 
        {amount:2, time: new Date("2021-07-01T19:00:00")}, 
        {amount:3, time: new Date("2021-08-01T19:00:00")},
      ]}
    ]);

  React.useEffect(() => {
    if (shares === undefined) return;
    const responses : ApiResponse[] = [];

    shares.forEach(s => {
      var minDate = new Date(Math.min.apply(null,s.purchase.map(p=>p.time.getTime())));
      var dateDiff = getDateDiff(new Date(), minDate);
      
      const apiCallFuc = async () =>  {
        // Der Kauf wird als am Tagesanfang interpretiert
         const res = await getQuery1FinanceYahooV8(s.symbol, `${dateDiff + 1}d`, "1d");
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
