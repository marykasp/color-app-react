import React from "react";
import MiniPalette from "../minipalette/MiniPalette";
import "./palettelist.css";

function PaletteList(props) {
  // passed the array of starter palettes down as a prop
  const { palettes } = props;

  function goToPalette(id) {
    // route props passed down from App.js in the Route component
    props.history.push(`/palette/${id}`);
  }

  return (
    <div className="Palette-list">
      <div className="container">
        <nav className="nav">
          <h1>React Color Palettes</h1>
        </nav>
        <div className="palettes">
          {/* iterate over the palettes array and create MiniPalette component with each palette object properties */}
          {palettes.map((palette) => (
            <MiniPalette {...palette} handleClick={goToPalette} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaletteList;
