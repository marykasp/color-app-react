import React from "react";

import MiniPalette from "../minipalette/MiniPalette";
import "./palettelist.css";

function PaletteList(props) {
  // passed the array of starter palettes down as a prop
  const { palettes } = props;
  return (
    <div>
      <h1>React Color Palettes</h1>
      {/* iterate over the palettes array and create jsx element with each palette object properties */}
      {palettes.map((palette) => (
        <MiniPalette {...palette} />
      ))}
    </div>
  );
}

export default PaletteList;
