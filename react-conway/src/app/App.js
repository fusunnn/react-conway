import "./App.css";
import { useState } from "react";
import Cell from "./components/Cell";

function App() {
  //Styling consts to not get confused
  const boardHeight = 600;
  const boardWidth = 600;
  const boardColor = "#282c34";
  const cellSize = 30;
  const cellColor = "white";

  const [cells, setCells] = useState([]);

  return (
    <div className="container">
      <div
        className="board"
        style={{
          height: boardHeight,
          width: boardWidth,
          backgroundColor: boardColor,
        }}
      >
        <Cell cellColor={cellColor} sideLength={cellSize} />
      </div>
    </div>
  );
}

export default App;
