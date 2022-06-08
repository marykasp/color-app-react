import React, { useState } from "react";
import ColorBox from "../colorBox/ColorBox";
import NavBar from "../navBar/NavBar";
import "./palette.css";

function Palette(props) {
  const [level, setLevel] = useState(500);
  // palette prop is the newPalette returned from generatePalette function - colors is an object whose property is an array of objects - grab a specific property to iterate over that array to create the colorBoxes
  const { colors } = props.palette;
  const colorBoxes = colors[level].map((color) => (
    <ColorBox background={color.hex} name={color.name} />
  ));

  // event handler that updates the level state when slider changes
  function changeLevel(newLevel) {
    // update the state
    console.log(newLevel);
    setLevel(newLevel);
  }

  return (
    <div className="Palette">
      {/* Navbar goes here */}
      <NavBar level={level} changeLevel={changeLevel} />
      <div className="Palette-colors">
        {/* Color boxes -iterate over the saturation colors array and generate a colorBox component for each color */}
        {colorBoxes}
      </div>
      {/* Footer */}
    </div>
  );
}
export default Palette;
