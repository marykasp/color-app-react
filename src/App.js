import "./App.css";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/palette/Palette";
import PaletteList from "./components/paletteList/PaletteList";
import seedColors from "./assets/seedColors";
import { generatePalette } from "./assets/colorHelpers";

function App() {
  console.log(generatePalette(seedColors[0]));
  // returns a palette from the array of starter palettes using the id from the Route URL
  function findPalette(id) {
    // find method returns the element that evaluates as true in the condition
    return seedColors.find((palette) => {
      return palette.id === id;
    });
  }
  return (
    <Switch>
      <Route exact path="/">
        <PaletteList palettes={seedColors} />
      </Route>
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            // take id from URL, find starterPalette, use that palette to generate a new palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
    </Switch>
  );
}

export default App;

/* call helper function generatePalette to get a new Palette object (that has 10 colors for each color saturation) from the seedColors starterPalette passed in as argument*/
