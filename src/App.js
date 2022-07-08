import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/palette/Palette";
import PaletteList from "./components/paletteList/PaletteList";
import SingleColorPalette from "./components/singleColorPalette/SingleColorPalette";
import NewPaletteForm from "./components/newPaletteForm/NewPaletteForm";
import seedColors from "./assets/seedColors";
import { generatePalette } from "./assets/colorHelpers";

function App() {
  // check localstorage for colors
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  // returns a palette from the array of state palettes using the id from the Route URL
  function findPalette(id) {
    // find method returns the first element that evaluates as true in the condition
    return palettes.find((palette) => {
      return palette.id === id;
    });
  }

  function savePalette(newPalette) {
    // save the new created palette into the state (array of original seedColors (ojects))
    setPalettes((prevPalettes) => [...prevPalettes, newPalette]);
  }

  // save to local storage after the state has been saved need to use the useEffect hook (componentDidUpdate) will only update the local storage if the palettes state has been modified (add dependency as second argument)
  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={(routeProps) => (
          <NewPaletteForm
            savePalette={savePalette}
            palettes={palettes}
            {...routeProps}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={(routeProps) => (
          <PaletteList palettes={palettes} {...routeProps} />
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
