import React, { useState } from "react";
import PaletteFormNav from "../paletteFormNav/PaletteFormNav";
import ColorPickerForm from "../colorPickerForm/ColorPickerForm";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import DraggableColorList from "../draggableColorList/DraggableColorList";
// import { arrayMoveImmutable } from "array-move";
// import { arrayMove } from "react-sortable-hoc";
import { DRAWER_WIDTH } from "../../assets/constants";
import { Main, DrawerHeader, useStyles } from "./styles.js";

function NewPaletteForm(props) {
  const classes = useStyles();
  const { palettes, savePalette, maxColors } = props;

  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState(palettes[0].colors);
  const [names, setNames] = useState({
    colorName: "",
    paletteName: "",
  });
  let isPaletteFull = colors.length >= maxColors;

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  // function onSortEnd({ oldIndex, newIndex }) {
  //   setColors(arrayMove(colors, oldIndex, newIndex));
  // }

  // changes the name state with the values from the color and palette name input
  function handleChange(e) {
    // handles color name or palette name changes
    setNames({ ...names, [e.target.name]: e.target.value });
  }

  // colors is an array of objects with the hex color and the made up color name
  function handleSubmit() {
    const newPalette = {
      paletteName: names.paletteName,
      id: names.paletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
    savePalette(newPalette);
    // redirect to home page after creating new palette
    props.history.push("/");
  }

  function deleteColor(colorName) {
    // iterate over the colors array of objects and check if color name property is not equal to the colorName argument - if not will be saved to new array thereby removing the color object that matches the argument
    const filteredColors = colors.filter((color) => color.name !== colorName);
    setColors(filteredColors);
  }

  // set the colors state back to an empty array
  function clearColors() {
    setColors([]);
  }

  function randomColor() {
    // pick random color from existing palettes - map will return a new array containing the arrays of colors for each palette (nested array) - flatten array to 1D array
    const allColors = palettes.map((palette) => palette.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors((prevColors) => [...prevColors, randomColor]);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        names={names}
        palettes={palettes}
        drawerWidth={DRAWER_WIDTH}
        handleDrawerOpen={handleDrawerOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className={classes.drawerContainer}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="secondary" onClick={clearColors}>
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={randomColor}
              disabled={isPaletteFull}
              sx={{ ml: 1 }}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            name={names}
            colors={colors}
            setName={setNames}
            setColors={setColors}
            handleChange={handleChange}
            isPaletteFull={isPaletteFull}
          />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
        />
      </Main>
    </Box>
  );
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
};

export default NewPaletteForm;
