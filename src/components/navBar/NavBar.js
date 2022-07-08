import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "rc-slider/assets/index.css";
import "./navbar.css";

function NavBar(props) {
  const [open, setOpen] = useState(false);
  const {
    format,
    level,
    changeLevel,
    changeFormat,
    paletteName,
    showingAllColors,
  } = props;

  // event handler for select dropdown -will update the format state by calling a function on the parent Palette component that sets the parents format state
  function handleFormatChange(e) {
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
        <Link to="/">{paletteName}</Link>
      </div>
      {showingAllColors && (
        <div className="slider-container">
          <span>
            Level: <span className="slider-level">{level}</span>
          </span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
              trackStyle={{ backgroundColor: "#d5d5d5" }}
              handleStyle={{
                backgroundColor: "#9423a8",
                borderColor: "#9423a8",
                height: "14px",
                width: "14px",
                boxShadow: "none",
                border: "2px solid #9423a8",
                outline: "none",
                marginLeft: "-7px",
                marginTop: "-4px",
              }}
              railStyle={{ height: 8 }}
            />
          </div>
        </div>
      )}
      <div className="select-container">
        <Select
          // function that calls the Palette event handler that updates the format based on the option value clicked on - child updates the parent's state
          onChange={handleFormatChange}
          value={format}
          id="demo-simple-select-filled-label"
          labelId="demo-simple-select-filled-label"
        >
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
