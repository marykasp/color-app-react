import React from "react";
import MiniPalette from "../minipalette/MiniPalette";
import "./palettelist.css";

function PaletteList(props) {
  // passed the array of starter palettes down as a prop
  const { palettes } = props;
  return (
    <div className="Palette-list">
      <div className="container">
        <nav className="nav">
          <h1>React Color Palettes</h1>
        </nav>
        <div className="palettes">
          {/* iterate over the palettes array and create MiniPalette component with each palette object properties */}
          {palettes.map((palette) => (
            <MiniPalette {...palette} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaletteList;
