import "./App.css";
import { useState, useEffect } from "react";
import Cell from "./components/Cell";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const boardColor = "#282c34";
  const rows = 25;
  const cols = 25;
  const [cells, setCells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter < 1) {
      initializeCells(rows, cols);
    }
  });
  const dirtyWork = async (rows, cols) => {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(getRandomInt(0, 1));
      }
      grid.push(row);
    }
    return grid;
  };
  const initializeCells = (rows, cols) => {
    setCounter(counter + 1);
    dirtyWork(rows, cols)
      .then((res) => {
        setCells(res);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const getNeighbours = (i, j) => {
    const neighbours = [];
    // neighbours.push(cells[i][j - 1]);
    // neighbours.push(cells[i][j + 1]);
    // neighbours.push(cells[i - 1][j]);
    // neighbours.push(cells[i + 1][j]);
    // neighbours.push(cells[i + 1][j - 1]);
    // neighbours.push(cells[i - 1][j - 1]);
    // neighbours.push(cells[i + 1][j + 1]);
    // neighbours.push(cells[i - 1][j + 1]);
    neighbours.push([i, j - 1]);
    neighbours.push([i, j + 1]);
    neighbours.push([i - 1, j]);
    neighbours.push([i + 1, j]);
    neighbours.push([i + 1, j - 1]);
    neighbours.push([i - 1, j - 1]);
    neighbours.push([i + 1, j + 1]);
    neighbours.push([i - 1, j + 1]);
    return neighbours;
  };

  const getStatus = (neighbours, i, j) => {
    let aliveCount = 0;
    for (let i = 0; i > neighbours.length; i++) {
      var iteration = neighbours[i];
      if (cells[iteration[0]][iteration[1]] === 1) {
        aliveCount += 1;
      }
      if (cells[i][j] === 1 && aliveCount === 2) {
        return 1;
      } else if (cells[i][j] === 1 && aliveCount === 3) {
        return 1;
      } else if (cells[i][j] === 0 && aliveCount === 3) {
        return 1;
      } else if (cells[i][j] === 1 && aliveCount > 3) {
        return 0;
      } else if (cells[i][j] === 1 && aliveCount < 2) {
        return 0;
      } else {
        return 0;
      }
    }
  };

  const checkCells = async () => {
    let tempStore = [...cells];
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells.length; j++) {
        const neighbours = getNeighbours(i, j);
        tempStore[i][j] = await getStatus(neighbours, i, j);
      }
    }
    console.log(tempStore);
    setCells(tempStore);
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
        Hello
      </button>
      {loading ? (
        <p>Hi</p>
      ) : (
        <div
          style={{
            backgroundColor: "black",
            border: "1px solid white",
          }}
        >
          {cells.map((cell, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                {cell.map((numba, index) => {
                  return (
                    <Cell
                      key={index}
                      deadColor={"white"}
                      borderColor={boardColor}
                      sideLength={30}
                      numba={numba}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
