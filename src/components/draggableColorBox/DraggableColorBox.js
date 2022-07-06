import React from "react";
import "./draggablecolorbox.css";

function DraggableColorBox(props) {
  return (
    <div className="draggablebox" style={{ backgroundColor: props.color }}>
      {props.color}
    </div>
  );
}

export default DraggableColorBox;
