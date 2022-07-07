import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PaletteMetaForm from "../paletteMetaForm/PaletteMetaForm";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { AppBar, useStyles } from "./styles";

function PaletteFormNav({
  open,
  name,
  palettes,
  handleDrawerOpen,
  handleChange,
  handleSubmit,
}) {
  const classes = useStyles();
  // component did mount
  useEffect(() => {
    // Form validator for palette name input
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

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
          <ValidatorForm onSubmit={handleSubmit} className={classes.flexBox}>
            <TextValidator
              value={name.paletteName}
              label="Palette Name"
              name="paletteName"
              onChange={handleChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              Save Palette
            </Button>
          </ValidatorForm>
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
