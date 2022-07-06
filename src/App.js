import "./App.css";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/palette/Palette";
import PaletteList from "./components/paletteList/PaletteList";
import SingleColorPalette from "./components/singleColorPalette/SingleColorPalette";
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
      <Route
        exact
        path="/"
        render={(routeProps) => (
          <PaletteList palettes={seedColors} {...routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            // take id from URL, find starterPalette, use that palette to generate a new palette (all colors have 10 colors of saturation)
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        path="/palette/:paletteId/:colorId"
        render={(routeProps) => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
    </Switch>
  );
}

export default App;

/* call helper function generatePalette to get a new Palette object (that has 10 colors for each color saturation) from the seedColors starterPalette passed in as argument*/
