import React from "react";
import chroma from "chroma-js";
import "./draggablecolorbox.css";
import DeleteIcon from "@mui/icons-material/Delete";

function DraggableColorBox(props) {
  const { color, name, handleClick } = props;
  const isDarkColor = chroma(color).luminance() <= 0.06;
  // const isLightColor = chroma(props.color).luminance() >= 0.6;

  return (
    <div className="draggablebox" style={{ backgroundColor: color }}>
      <div className={`drag-box-content ${isDarkColor && "light-text"}`}>
        <span>{name}</span>
        <DeleteIcon
          className={`deleteIcon ${isDarkColor && "light"}`}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default DraggableColorBox;
