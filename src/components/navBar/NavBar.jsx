import React, { useState } from "react";
import Slider from "rc-slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "rc-slider/assets/index.css";
import "./navbar.css";

function NavBar(props) {
  const [format, setFormat] = useState("hex");
  const { level, changeLevel, changeFormat } = props;

  // event handler for select dropdown -will update the format state
  function handleChange(e) {
    setFormat(e.target.value);
    changeFormat(e.target.value);
  }

  return (
    <header className="Navbar">
      <div className="logo">
        <a href="/">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>Level: {level}</span>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
            trackStyle={{ backgroundColor: "#d5d5d5" }}
            handleStyle={{
              backgroundColor: "purple",
              borderColor: "purple",
              height: "13px",
              width: "13px",
              boxShadow: "none",
              border: "2px solid purple",
              outline: "none",
              marginLeft: "-7px",
              marginTop: "-4px",
            }}
            railStyle={{ height: 8 }}
          />
        </div>
      </div>
      <div className="select-container">
        <Select onChange={handleChange} value={format}>
          <MenuItem value="hex">HEX - #ffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgb(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
    </header>
  );
}

export default NavBar;
