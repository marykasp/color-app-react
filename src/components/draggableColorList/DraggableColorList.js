import React from "react";
import DraggableColorBox from "../draggableColorBox/DraggableColorBox";
// import { SortableContainer } from "react-sortable-hoc";

function DraggableColorList({ colors, deleteColor }) {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          index={index}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => deleteColor(color.name)}
        />
      ))}
    </div>
  );
}

// export default DraggableColorList;

export default DraggableColorList;
