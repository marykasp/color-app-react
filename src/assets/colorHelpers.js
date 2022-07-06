// {
//     paletteName: "Material UI Colors",
//     id: "material-ui-colors",
//     emoji: "🎨",
//     colors: [
//       { name: "red", color: "#F44336" },
//       { name: "pink", color: "#E91E63" },
//       { name: "purple", color: "#9C27B0" },
//       { name: "deeppurple", color: "#673AB7" },
//       { name: "indigo", color: "#3F51B5" },
//       { name: "blue", color: "#2196F3" },
//       { name: "lightblue", color: "#03A9F4" },
//       { name: "cyan", color: "#00BCD4" },
//       { name: "teal", color: "#009688" },
//       { name: "green", color: "#4CAF50" },
//       { name: "lightgreen", color: "#8BC34A" },
//       { name: "lime", color: "#CDDC39" },
//       { name: "yellow", color: "#FFEB3B" },
//       { name: "amber", color: "#FFC107" },
//       { name: "orange", color: "#FF9800" },
//       { name: "deeporange", color: "#FF5722" },
//       { name: "brown", color: "#795548" },
//       { name: "grey", color: "#9E9E9E" },
//       { name: "bluegrey", color: "#607D8B" },
//     ],
//   }

import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// use starter palette to generate shades for each hex color
function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    // colors contains key-value properties that are an array of objects - each key is a level from the levels array - it points to an array of objects
    colors: {},
  };

  // loop over all the levels and add key-value pair to colors property (object where keys are the saturation levels that point to arrays of colors)
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  // loop over every color object of the colors array
  for (let color of starterPalette.colors) {
    // pass the hex color of the color object to generateScale, returns an array of colors from less saturated to more
    let scale = generateScale(color.color, 10).reverse();
    // for each color in scale (10 colors) use the index to grab the level and push a new object onto the newPalette colors property
    for (let i in scale) {
      // use the index of scale to get the key for the colors object - 0 = 50
      newPalette.colors[levels[i]].push({
        name: `${color.name} - ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }
  return newPalette;
}

function getRange(hexColor) {
  const endColor = "#fff";
  // return an array - darken hexColor argument, hexcolor, white
  return [chroma(hexColor).darken(1.4).hex(), hexColor, endColor];
}

// returns 10 colors based on input color - array of colors of the same color with different saturation/shades
function generateScale(hexColor, numberOfColors) {
  // pass returned array of calling getRange to chroma.scale()
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette };
