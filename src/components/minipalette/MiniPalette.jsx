import React from "react";
import "./minipalette.css";
import { Link } from "react-router-dom";

function MiniPalette(props) {
  const { id, paletteName, colors, emoji } = props;
  // create mini color boxes for each of the colors on the palette - colors is an array of objects -pass in object to callback function use color property to style the background color of the div
  const miniColorBoxes = colors.map((color) => (
    <div
      className="minicolor"
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));
  return (
    <div className="root">
      <div className="colors">
        {/* add mini color boxes here */}
        {miniColorBoxes}
      </div>
      <Link to={`palette/${id}`}>
        <h5 className="title">
          {paletteName} <span className="emoji">{emoji}</span>
        </h5>
      </Link>
    </div>
  );
}

export default MiniPalette;
