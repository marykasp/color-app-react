import React from "react";
import { Link } from "react-router-dom";
import "./palettelist.css";

function PaletteList(props) {
  // passed the array of starter palettes down as a prop
  const { palettes } = props;
  return (
    <div>
      <h1>React Color Palettes</h1>
      {/* iterate over the palettes array and create jsx element with each palette object properties */}
      {palettes.map((palette) => (
        <p>
          <Link to={`palette/${palette.id}`}>{palette.paletteName}</Link>
        </p>
      ))}
    </div>
  );
}

export default PaletteList;
