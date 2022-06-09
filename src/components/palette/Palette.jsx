import React, { useState } from "react";
import ColorBox from "../colorBox/ColorBox";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import "./palette.css";

function Palette(props) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  // palette prop is the newPalette returned from generatePalette function - colors is an object whose property is an array of objects - grab a specific saturation property to iterate over that array of colors to create the colorBoxes
  const { colors, paletteName, emoji } = props.palette;
  const colorBoxes = colors[level].map((color) => (
    // the background color can be in hex, rgba, rgb color format based on what the user selects from the dropdown menu
    <ColorBox background={color[format]} name={color.name} key={color.id} />
  ));

  // event handler that updates the level state when slider changes
  function changeLevel(newLevel) {
    // update the state
    console.log(newLevel);
    setLevel(newLevel);
  }

  // format state is passed up to this function that will change the background of the ColorBox
  function changeFormat(value) {
    setFormat(value);
  }

  console.log(format);
  return (
    <div className="Palette">
      {/* Navbar goes here */}
      <NavBar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        paletteName={paletteName}
      />
      <div className="Palette-colors">
        {/* Color boxes -iterate over the saturation colors array and generate a colorBox component for each color */}
        {colorBoxes}
      </div>
      {/* Footer */}
      <Footer paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
export default Palette;
