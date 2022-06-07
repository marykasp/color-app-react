import React from "react";
import "./colorbox.css";

function ColorBox(props) {
  const { background, name } = props;
  return (
    <div className="ColorBox" style={{ background: background }}>
      <span>{name}</span>
      <span>More</span>
    </div>
  );
}

export default ColorBox;
