import "./App.css";
import Palette from "./components/Palette";
import seedColors from "./seedColors";

function App() {
  return (
    <div className="App">
      {/* pass in seedColors object properties as props on Palette */}
      <Palette {...seedColors[0]} />
    </div>
  );
}

export default App;
