import "./App.css";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/palette/Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./assets/colorHelpers";

function App() {
  console.log(generatePalette(seedColors[0]));
  return (
    <Switch>
      <Route exact path="/" render={() => <div>Home</div>} />
      <Route
        exact
        path="/palette/:id"
        render={() => <h1>Individual Palette Page</h1>}
      />
    </Switch>
    // <div>
    //   <Palette palette={generatePalette(seedColors[0])} />
    // </div>
  );
}

export default App;

/* call helper function generatePalette to get a new Palette object (that has 10 colors for each color saturation) from the seedColors starterPalette passed in as argument*/
