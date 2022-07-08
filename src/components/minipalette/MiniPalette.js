import React from "react";
import "./minipalette.css";
import DeleteIcon from "@mui/icons-material/Delete";

function MiniPalette(props) {
  const { id, paletteName, colors, emoji, handleClick } = props;
  // create mini color boxes for each of the colors on the palette - colors is an array of objects -pass in object to callback function use color property to style the background color of the div
  const miniColorBoxes = colors.map((color) => (
    <div
      className="minicolor"
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));
  return (
    <div className="minipalette" onClick={() => handleClick(id)}>
      <div className="delete">
        <DeleteIcon
          className="trashIcon"
          fontSize="large"
          style={{ transition: "all 0.3s ease-in" }}
        />
      </div>
      <div className="colors">
        {/* add mini color boxes here */}
        {miniColorBoxes}
      </div>
      <h5 className="title">
        {paletteName} <span className="emoji">{emoji}</span>
      </h5>
    </div>
  );
}

export default MiniPalette;
