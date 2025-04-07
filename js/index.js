const grid = document.querySelector(".grid");
const clearBtn = document.querySelector("button#clear");
const solveBtn = document.querySelector("button#solve");

const cells = [];
const matrix = [];
const exampleSudoku = [
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '1', '8', '6', '', ''],
  ['1', '6', '8', '3', '5', '', '2', '9', ''],
  ['9', '2', '6', '', '', '', '3', '4', '7'],
  ['', '7', '1', '6', '4', '', '5', '2', ''],
  ['', '5', '', '', '7', '2', '8', '6', '1'],
  ['3', '8', '2', '', '', '9', '', '', '5'],
  ['7', '', '', '', '', '', '9', '3', '6'],
  ['', '4', '9', '7', '', '', '1', '8', ''],
];

function isValid(value, x, y) {
  for (let i = 0; i < 9; ++i) {
    if (matrix[x][i].value == value) return false;
    if (matrix[i][y].value == value) return false;
  }
  return true;
}

function renderGrid() {
  for (let i = 0; i < 9; ++i) {
    const row = [];
    for (let j = 0; j < 9; ++j) {
      const cell = document.createElement("input");
      if (i % 3 == 0) {
        cell.style.borderTop = "2px solid white";
      }
      if (j % 3 == 0) {
        cell.style.borderLeft = "2px solid white";
      }
      cell.id = `cell-${i}${j}`;
      cell.className = "cell";
      grid.appendChild(cell);
      cells.push(cell);
      row.push(cell);
    }
    matrix.push(row);
  }
  
  for(let i = 0; i<9; ++i){
    for(let j = 0; j<9; ++j){
      matrix[i][j].value = exampleSudoku[i][j];
    }
  }

  cells.forEach((cell) => {
    cell.addEventListener("keydown", (e) => {
      e.preventDefault();

      if (e.code === "Backspace") {
        cell.value = "";
        if (cell.id === "cell-00") return;
        cell.previousSibling.focus();
        return;
      }

      if (e.code.startsWith("Digit") && e.code !== "Digit0") {
        const value = e.code[5];
        const x = parseInt(cell.id[5]);
        const y = parseInt(cell.id[6]);
        if (!isValid(value, x, y)) {
          return;
        }

        cell.value = e.code[5];
      }
      if (cell.id === "cell-88") return;
      cell.nextSibling?.focus();
    });
  });
}

renderGrid();

function isSolvable() {
  const emptyCellsCount = cells.filter((cell) => cell.value === "").length;
  if (emptyCellsCount === 0){
    alert("Sudoku is already solved!");
    return false;
  }
  if(emptyCellsCount > 45){
    alert("Sudoku is too empty to be solved!");
    return false;
  }

  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      const cell = matrix[i][j];
      if (!cell.value) continue;

      if (!isValid(cell.value, i, j)) {
        console.log(`Invalid value ${cell.value} at (${i}, ${j})`);
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  if (!isSolvable()) {
    alert("Sudoku is not solvable!");
    return;
  }

  clearBtn.disabled = true;
  solveBtn.disabled = true;
  solve();

  function solve() {
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        const cell = matrix[i][j];
        if (!cell.value) continue;

        for (let k = 1; k <= 9; ++k) {
          if (isValid(k, i, j)) {
            cell.value = k;
            if (solve()) {
              return true;
            } else {
              cell.value = "";
            }
          }
        }

        return false;
      }
    }
    return true;
  }

  clearBtn.disabled = false;
  solveBtn.disabled = false;

}

function clearGrid() {
  cells.forEach((cell) => {
    cell.value = "";
  });
}


