import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorBox from "../draggableColorBox/DraggableColorBox";

const drawerWidth = 400;

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function NewPaletteForm(props) {
  const { palettes, savePalette } = props;
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("");
  const [colors, setColors] = useState([{ color: "blue", name: "blue" }]);
  const [name, setName] = useState({
    colorName: "",
    paletteName: "",
  });

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

    // Form validator for palette name input
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
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
    // iterate over the colors array of objects and check if color name property is not equal to the colorName argument - if not will be saved to new array thereby removing the color object with that colorName only
    const filteredColors = colors.filter((color) => color.name !== colorName);
    setColors(filteredColors);
  }

  return (
    <Box sx={{ display: "flex" }}>
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
            Color Picker
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              value={name.paletteName}
              label="Palette Name"
              name="paletteName"
              onChange={handleChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
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
        <div>
          <Button variant="contained" color="secondary">
            Clear Palette
          </Button>
          <Button variant="contained" color="primary">
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
            style={{ backgroundColor: currentColor }}
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {colors.map((color) => (
          <DraggableColorBox
            key={color.name}
            color={color.color}
            name={color.name}
            handleClick={() => deleteColor(color.name)}
          />
        ))}
      </Main>
    </Box>
  );
}

export default NewPaletteForm;
