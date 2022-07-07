import React from "react";
import DraggableColorBox from "../draggableColorBox/DraggableColorBox";
<<<<<<< HEAD
=======
// import { SortableContainer } from "react-sortable-hoc";
>>>>>>> f2d7abcfeb102d9ca5072518f65255aee52a4546

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
