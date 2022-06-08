import React, { useState } from "react";
import Slider from "rc-slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "rc-slider/assets/index.css";
import "./navbar.css";

function NavBar(props) {
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);
  const { level, changeLevel, changeFormat } = props;

  // event handler for select dropdown -will update the format state
  function handleFormatChange(e) {
    setFormat(e.target.value);
    setOpen(true);
    // change format passed down from Palette component
    changeFormat(e.target.value);
  }

  function closeSnackbar() {
    setOpen(false);
  }

  const action = [
    <IconButton
      onClick={closeSnackbar}
      color="inherit"
      key="close"
      arial-label="close"
    >
      <CloseIcon />
    </IconButton>,
  ];

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
        <Select onChange={handleFormatChange} value={format}>
          <MenuItem value="hex">HEX - #ffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgb(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format Changed To {format.toUpperCase()}!</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={action}
        onClose={closeSnackbar}
      />
    </header>
  );
}

export default NavBar;
