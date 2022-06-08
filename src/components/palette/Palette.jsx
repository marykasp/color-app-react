import React, { useState } from "react";
import ColorBox from "../colorBox/ColorBox";
import "./palette.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
      <div className="slider">
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onAfterChange={changeLevel}
          trackStyle={{ backgroundColor: "#d5d5d5" }}
          handleStyle={{
            backgroundColor: "purple",
            borderColor: "purple",
            height: "13px",
            width: "13px",
            boxShadow: "none",
            border: "2px solid purple",
            outline: "none",
            marginLeft: "-7px",
            marginTop: "-4px",
          }}
          railStyle={{ height: 8 }}
        />
      </div>

      <div className="Palette-colors">
        {/* Color boxes -iterate over the saturation colors array and generate a colorBox component for each color */}
        {colorBoxes}
      </div>
      {/* Footer */}
    </div>
  );
}
export default Palette;
