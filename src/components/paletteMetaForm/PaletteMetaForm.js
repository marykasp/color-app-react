import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function PaletteMetaForm({
  names,
  palettes,
  handleChange,
  handleSubmit,
  hideForm,
}) {
  const [open] = useState(true);

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
      <Dialog open={open} onClose={hideForm}>
        <DialogTitle>Choose a PaletteName</DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure name
              is unique!
            </DialogContentText>

            <TextValidator
              value={names.paletteName}
              fullWidth
              variant="filled"
              margin="normal"
              label="Palette Name"
              name="paletteName"
              onChange={handleChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
              sx={{ mr: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
