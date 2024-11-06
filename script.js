const sudokuContainer = document.getElementById("sudokuContainer");
const messageDiv = document.getElementById("message");

// Predefined 3x3 Sudoku solution for reference
const solution = [
  [1, 2, 3],
  [3, 1, 2],
  [2, 3, 1],
];

// Initial empty board with 0 for each cell
const initialBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

// Create 3x3 grid with input cells
function createGrid() {
  sudokuContainer.innerHTML = "";
  initialBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement("input");
      cellElement.type = "text";
      cellElement.maxLength = "1";
      cellElement.classList.add("cell");
      cellElement.dataset.row = rowIndex;
      cellElement.dataset.col = colIndex;
      cellElement.value = cell !== 0 ? cell : "";

      cellElement.oninput = () => handleInput(cellElement);
      sudokuContainer.appendChild(cellElement);
    });
  });
}

function handleInput(cell) {
  const value = parseInt(cell.value);
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  // Validate if input is within 1-3 range
  if (isNaN(value) || value < 1 || value > 3) {
    cell.value = "";
    return;
  }

  initialBoard[row][col] = value;
}

// Check if Sudoku is solved correctly
function checkSudoku() {
  let isCorrect = true;

  initialBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.querySelector(
        `.cell[data-row="${rowIndex}"][data-col="${colIndex}"]`
      );

      // Highlight invalid cells
      if (cell !== solution[rowIndex][colIndex]) {
        cellElement.classList.add("invalid");
        isCorrect = false;
      } else {
        cellElement.classList.remove("invalid");
      }
    });
  });

  messageDiv.textContent = isCorrect
    ? "Congratulations! Puzzle solved correctly!"
    : "There are errors in the puzzle. Try again!";
}

// Initialize the grid
createGrid();
