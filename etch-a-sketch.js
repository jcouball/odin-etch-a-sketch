let cellsWide = 100;

function highlightCell(e) {
  e.target.style.backgroundColor = "black";
}

function reset() {
  let userInput = parseInt(prompt("How many cells wide should the grid be?", "16"));
  if (userInput < 1 || userInput > 100) {
    alert("You must enter a number between 1 and 100");
  }
  else {
    cellsWide = userInput;
    resetGrid();
  }
}

function resetGrid() {
  newGrid = document.createElement("div");
  newGrid.id = "grid";

  for (let row = 0; row < cellsWide ; row++) {
    let rowDiv = document.createElement("div");
    rowDiv.className = "row";
    for (let col = 0; col < cellsWide; col++) {
      let cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.addEventListener('mouseover', highlightCell);
      rowDiv.appendChild(cellDiv);
    }
    newGrid.appendChild(rowDiv);
  }

  const root = document.documentElement;
  root.style.setProperty('--cells-wide', cellsWide);

  existingGrid = document.querySelector("#grid");
  existingGrid.replaceWith(newGrid);
}

resetGrid();

resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', reset);
