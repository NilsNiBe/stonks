import "@fontsource/roboto";
import React from "react";
import "./App.css";
import { Shares } from "./comps/Shares";
import Background from "./img/stonks.jpg";

// function getDateDiff(date1: Date, date2: Date) : number {
//   var diff = Math.abs(date1.getTime() - date2.getTime());
//   return Math.ceil(diff / (1000 * 3600 * 24));
// }

const App = () => {
  const sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${Background})`,
  };

  return (
    <div className="App">
      <header className="App-header" style={sectionStyle}>
        <Shares />
      </header>
    </div>
  );
};

export default App;
