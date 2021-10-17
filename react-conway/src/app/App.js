import "./App.css";
import { useState } from "react";
import Cell from "./components/Cell";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initBoard = (rows, cols) => {
  const bools = [true, false];
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    grid.push(row);
  }
  return grid;
};

function App() {
  const boardColor = "#282c34";
  const rows = 25;
  const cols = 25;
  const [cells, setCells] = useState(initBoard(rows, cols));

  const getNumberOfNeighbours = (i, j, gridCopy) => {
    let neighbourCount = 0;
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        if (x === 0 && y === 0) {
          continue;
        } else {
          if ((i + x) % rows < 0) {
            if ((j + y) % cols < 0) {
              if (gridCopy[rows - 1][cols - 1] === true) {
                neighbourCount++;
              }
            } else {
              if (gridCopy[rows - 1][(j + y) % cols] === true) {
                neighbourCount++;
              }
            }
          } else if ((j + y) % cols < 0) {
            if (gridCopy[(i + x) % rows][cols - 1] === true) {
              neighbourCount++;
            }
          } else {
            if (gridCopy[(i + x) % rows][(j + y) % cols] === true) {
              neighbourCount++;
            }
          }
        }
      }
    }
    return neighbourCount;
  };

  const getNewStatus = (i, j, numberOfNeighbours, gridCopy) => {
    if (numberOfNeighbours > 3) {
      return false;
    } else if (numberOfNeighbours < 2) {
      return false;
    } else if (2 <= numberOfNeighbours <= 3 && gridCopy[i][j] === true) {
      return true;
    } else if (numberOfNeighbours === 3 && gridCopy[i][j] === false) {
      return true;
    } else {
      return false;
    }
  };

  const checkCells = () => {
    const gridCopy = [];

    for (var x = 0; x < cells.length; x++) {
      let tempArray = [];
      for (var z = 0; z < cells.length; z++) {
        tempArray.push(cells[x][z]);
      }
      gridCopy.push(tempArray);
    }

    let newGrid = [...cells];
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells.length; j++) {
        const numberOfNeighbours = getNumberOfNeighbours(i, j, gridCopy);
        const newStatus = getNewStatus(i, j, numberOfNeighbours, gridCopy);

        newGrid[i][j] = newStatus;
      }
    }
    setCells(newGrid);
  };

  const cellClickedHandler = (i, j) => {
    let temporaryGrid = [...cells];
    temporaryGrid[i][j] = !temporaryGrid[i][j];
    setCells(temporaryGrid);
  };

  return (
    <div
      className="container"
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: boardColor,
        height: "100vh",
      }}
    >
      <button
        onClick={() => {
          checkCells();
        }}
      >
        Start
      </button>

      <div
        style={{
          backgroundColor: "black",
          border: "1px solid white",
        }}
      >
        {cells.map((cell, i) => {
          return (
            <div key={i} style={{ display: "flex" }}>
              {cell.map((status, j) => {
                return (
                  <div onClick={() => cellClickedHandler(i, j)} key={j}>
                    <Cell
                      aliveColor={"white"}
                      mainColor={boardColor}
                      sideLength={3}
                      status={status}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
