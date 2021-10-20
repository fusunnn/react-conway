import "./App.css";
import { useState } from "react";
import Cell from "./components/Cell";

//function which takes in the number of rows and columns you want, returns an array of the indicated dimensions
const initBoard = (rows, cols) => {
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
  const [mouseDown, setMouseDown] = useState(false);
  const [runInterval, setRunInterval] = useState();
  const [isRunning, setIsRunning] = useState(false);

  //Mouse handling functions, to be able to drag click the cells to add alive cells
  const onMouseDown = (i, j) => {
    setMouseDown(true);
    cellClickedHandler(i, j);
  };

  const onMouseEnter = (i, j) => {
    if (mouseDown) {
      cellClickedHandler(i, j);
    }
  };

  const onMouseUp = () => {
    setMouseDown(false);
  };
  const cellClickedHandler = (i, j) => {
    let temporaryGrid = [...cells];
    temporaryGrid[i][j] = !temporaryGrid[i][j];
    setCells(temporaryGrid);
  };
  //end of click handling fucntions

  //function to handle the clear button getting clicked, sets all the cells to dead
  const clearHandler = () => {
    const temporaryGrid = [...cells];
    for (var i = 0; i < temporaryGrid.length; i++) {
      for (var j = 0; j < temporaryGrid[i].length; j++) {
        temporaryGrid[i][j] = false;
      }
    }
    setCells(temporaryGrid);
  };

  //These are all the logic handling function, to check the baord and update it

  //this function takes in the number of neighbors who are alive that a cell has and tells you whether it should be alive or die
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

  //this funciton checks all the neighbors of a cell, sees if they're alive, returns the number of neighbors who are alive
  //the checking is a bit weird because the board is "infintie" - credit to erni for the modulo checking
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

  //this is the main function which loops through the grid and uses the two above functions to get the cells' new status,
  //to then finally update the grid to the new grid
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

  const run = () => {
    setIsRunning(!isRunning);

    isRunning
      ? clearInterval(runInterval)
      : setRunInterval(setInterval(checkCells, 500));
  };

  //end of logic functions

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
      <div
        style={{
          display: "flex",
        }}
      >
        <img
          src={
            isRunning
              ? "https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/pause-icon-18-256.png"
              : "https://www.friidesigns.com/wp-content/uploads/2018/11/white-play-icon-png-6.png"
          }
          alt="new"
          onClick={() => {
            run();
          }}
          style={{ height: "9vh", width: "auto", userSelect: "none" }}
        />
        <button
          style={{
            height: "5vh",
            width: "6vw",
            borderRadius: 10,
            backgroundColor: isRunning ? "grey" : "red",
            border: "none",
            outline: "none",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            transition: "all .4s ease",
            pointerEvents: isRunning ? "none" : "auto",
            position: "absolute",
            right: "27vw",
            top: "7vh",
          }}
          onClick={() => clearHandler()}
        >
          <h3>Clear</h3>
        </button>
      </div>
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
                  <div key={j}>
                    <Cell
                      aliveColor={"white"}
                      mainColor={boardColor}
                      height={75 / rows + "vh"}
                      width={75 / cols + "vh"}
                      status={status}
                      i={i}
                      j={j}
                      onMouseDown={(i, j) => onMouseDown(i, j)}
                      onMouseEnter={(i, j) => onMouseEnter(i, j)}
                      onMouseUp={() => onMouseUp()}
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
