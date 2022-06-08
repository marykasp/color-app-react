import "./App.css";
import Palette from "./components/palette/Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./assets/colorHelpers";

function App() {
  console.log(generatePalette(seedColors[0]));
  return (
    <div className="App">
      {/* pass in seedColors object properties as props on Palette */}
      <Palette palette={generatePalette(seedColors[0])} />
    </div>
  );
}

export default App;
