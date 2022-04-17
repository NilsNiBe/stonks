import "@fontsource/roboto";
import "./App.css";
import { Shares } from "./comps/Shares";
import Background from "./img/stonks.jpg";

const App = () => {
  const sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${Background})`,
  };

  return (
    <div className="App">
      <main className="App-main" style={sectionStyle}>
        <Shares />
      </main>
    </div>
  );
};

export default App;
