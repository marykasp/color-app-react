import React from "react";
import ColorBox from "../colorBox/ColorBox";

function SingleColorPalette(props) {
  const { colorId, palette } = props;
  let shades = gatherShades(palette, colorId);

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

  const colorBoxes = shades.map((color) => (
    <ColorBox
      key={color.id}
      name={color.name}
      background={color.hex}
      showLink={false}
    />
  ));

  return (
    <div className="Palette">
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
}

export default SingleColorPalette;
