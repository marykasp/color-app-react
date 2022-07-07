import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import PaletteFormNav from "../paletteFormNav/PaletteFormNav";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "../draggableColorList/DraggableColorList";
import { arrayMoveImmutable } from "array-move";
import { DRAWER_WIDTH } from "../../assets/constants";

const drawerWidth = DRAWER_WIDTH;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 60px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function NewPaletteForm(props) {
  const { palettes, savePalette, maxColors } = props;

  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("");
  const [colors, setColors] = useState(palettes[0].colors);
  const [name, setName] = useState({
    colorName: "",
    paletteName: "",
  });
  let isPaletteFull = colors.length >= maxColors;

  // component did mount
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(({ color }) => color !== currentColor);
    });
  });

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function updateCurrentColor(newColor) {
    setCurrentColor(newColor.hex);
  }

  function onSortEnd({ oldIndex, newIndex }) {
    // array move returns a new array with the colors in their new index position
    setColors(arrayMoveImmutable(colors, oldIndex, newIndex));
  }

  // add color clicked on to colors array - when click add color button, will add the current color to the colors array - color added is an object with two properties color and name
  function addNewColor() {
    const newColor = { color: currentColor, name: name.colorName };
    setColors((prevColors) => [...prevColors, newColor]);
    // reset the input field
    setName({ ...name, colorName: "" });
  }

  // changes the name state with the values from the color and palette name input
  function handleChange(e) {
    // handles color name or palette name changes
    setName({ ...name, [e.target.name]: e.target.value });
  }

  // colors is an array of objects with the hex color and the made up color name
  function handleSubmit() {
    const newPalette = {
      paletteName: name.paletteName,
      id: name.paletteName.toLowerCase().replace(/ /g, "-"),
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
        name={name}
        palettes={palettes}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
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
        <Typography variant="h4">Design Your Palette</Typography>
        <div className="buttons">
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={randomColor}
            disabled={isPaletteFull}
          >
            Random Color
          </Button>
        </div>

        <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => updateCurrentColor(newColor)}
        />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={name.colorName}
            name="colorName"
            onChange={handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "enter a color name",
              "color name must be unique",
              "color already used",
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isPaletteFull}
            style={{
              backgroundColor: isPaletteFull ? "gray" : currentColor,
            }}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
};

export default NewPaletteForm;
