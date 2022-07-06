import React, { useState } from "react";
import ColorBox from "../colorBox/ColorBox";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";

function SingleColorPalette(props) {
  const { colorId, palette } = props;
  let shades = gatherShades(palette, colorId);
  const [format, setFormat] = useState("hex");

  function gatherShades(palette, colorToFilterBy) {
    // return all shades of given color (based on saturation level)
    // find all the colors that match the color id passed in inside of the palette colors object
    let shades = [];
    let allColors = palette.colors;
    // loop over all the colors in the color object property on the palette prop and for each key find the color that matches the colorId of the current color clicked on - push the matching color object to the shades array
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    // returns an array of the color objects for each saturation level that matches the colorId - return an array with the first object removed
    return shades.slice(1);
  }

  // format state is passed up to this function that will change the background of the ColorBox
  function changeFormat(value) {
    setFormat(value);
  }

  const colorBoxes = shades.map((color) => (
    <ColorBox
      key={color.id}
      name={color.name}
      background={color[format]}
      showLink={false}
    />
  ));

  return (
    <div className="Palette">
      <NavBar
        format={format}
        changeFormat={changeFormat}
        paletteName={palette.paletteName}
        showingAllColors={false}
      />

      <div className="Palette-colors">{colorBoxes}</div>
      <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
}

export default SingleColorPalette;
