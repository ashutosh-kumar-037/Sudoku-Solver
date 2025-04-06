const grid = document.querySelector(".grid");
const clearBtn = document.querySelector('button#clear');
const solveBtn = document.querySelector('button#solve');

const cells = [];
const matrix = [];

function isValid(value, x, y){
    for(let i = 0; i<9; ++i){
        if(matrix[x][i] == value) return false;
        if(matrix[i][y] == value) return false;
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

  cells.forEach((cell) => {
    cell.addEventListener("keydown", (e) => {
      e.preventDefault();

      if (e.code === "Backspace") {
        cell.value = "";
        console.log(cell.previousSibling);
        cell.previousSibling?.focus();
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
      cell.nextSibling?.focus();
    });
  });
}

renderGrid();

