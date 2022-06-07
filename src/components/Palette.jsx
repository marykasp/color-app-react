import React from "react";
import ColorBox from "./ColorBox";
import "./palette.css";

function Palette(props) {
  const colorBoxes = props.colors.map((color) => (
    <ColorBox background={color.color} name={color.name} />
  ));

  return (
    <div className="Palette">
      {/* Navbar goes here */}
      <div className="Palette-colors">
        {/* Color boxes - iterate over the colors property to create a colorbox for each */}
        {colorBoxes}
      </div>
      {/* Footer */}
    </div>
  );
}
export default Palette;
