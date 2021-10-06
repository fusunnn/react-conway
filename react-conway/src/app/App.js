import "./App.css";
import { useState, useEffect } from "react";
import Cell from "./components/Cell";

const dirtyWork = (rows, cols, cells, setCells, callback) => {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  setCells(grid);
  return cells;
};
const initializeCells = async (rows, cols, cells, setCells, setLoading) => {
  const done = await dirtyWork(rows, cols, cells, setCells);
  setLoading(false);
  console.log(done);
};

function App() {
  //Styling consts to not get confused
  const boardHeight = 600;
  const boardWidth = 600;
  const boardColor = "#282c34";
  const cellSize = 30;
  const cellColor = "white";

  const rows = 50;
  const cols = 50;
  const [cells, setCells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeCells(rows, cols, cells, setCells, setLoading);
  }, []);

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
