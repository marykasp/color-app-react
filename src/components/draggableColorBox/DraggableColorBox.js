import React from "react";
// import chroma from "chroma-js";
import "./draggablecolorbox.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";

function DraggableColorBox(props) {
  const { color, name, handleClick } = props;
  // const isDarkColor = chroma(color).luminance() <= 0.06;
  // const isLightColor = chroma(props.color).luminance() >= 0.6;

  return (
    <div className="draggablebox" style={{ backgroundColor: color }}>
      <div className="drag-box-content">
        <span>{name}</span>
        <DeleteIcon className="deleteIcon" onClick={handleClick} />
      </div>
    </div>
  );
}

export default SortableElement(DraggableColorBox);
