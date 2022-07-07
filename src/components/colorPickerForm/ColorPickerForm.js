import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function ColorPickerForm({
  name,
  setName,
  handleChange,
  colors,
  setColors,
  isPaletteFull,
}) {
  // sets currentColor state
  const [currentColor, setCurrentColor] = useState("");
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

  // updates teh current color state
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

  return (
    <div>
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
    </div>
  );
}

export default ColorPickerForm;
