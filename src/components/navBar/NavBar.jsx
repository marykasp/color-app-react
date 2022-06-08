import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./navbar.css";

function NavBar(props) {
  const { level, changeLevel } = props;
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
    </header>
  );
}

export default NavBar;
