import React from "react";
import "./minipalette.css";
import { Link } from "react-router-dom";

function MiniPalette(props) {
  const { id, paletteName, colors, emoji } = props;
  return (
    <div className="root">
      <div className="colors">{/* div for each color */}</div>
      <h5 className="title">
        {paletteName} <span className="emoji">{emoji}</span>
      </h5>
    </div>
  );
}

export default MiniPalette;
