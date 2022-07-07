import React from "react";
import { Link } from "react-router-dom";
import PaletteMetaForm from "../paletteMetaForm/PaletteMetaForm";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { AppBar, useStyles } from "./styles";

function PaletteFormNav({
  open,
  names,
  palettes,
  handleDrawerOpen,
  handleChange,
  handleSubmit,
}) {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <PaletteMetaForm
            names={names}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            palettes={palettes}
          />
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
}

export default PaletteFormNav;
