let cellsWide = 16;

// Could be "black", "random", or "opacity"
let highlightStrategy = "random";

function randomHexDigit() {
  const characters = '0123456789abcdef';
  return characters[Math.floor(Math.random() * characters.length)];
}

function randomColorInt() {
  return Math.floor(Math.random() * 256);
}

function randomColor() {
  return `${randomColorInt()} ${randomColorInt()} ${randomColorInt()}`;
}

function highlightBlack(cell, color, opacity) {
  opacity = 1;
  cell.setAttribute("data-current-opacity", opacity);
  let updatedColor = rgbaColor(color, opacity);
  cell.style.backgroundColor = updatedColor;
}

function highlightWithOpacity(cell, color, opacity) {
  if (opacity < 1) {
    opacity = (Math.floor(opacity * 10) + 1) / 10;
    cell.setAttribute("data-current-opacity", opacity);
    let updatedColor = rgbaColor(color, opacity);
    cell.style.backgroundColor = updatedColor;
  }
}

function highlightWithRandomColor(cell, color, opacity) {
  if (opacity === 0) {
    color = randomColor();
    opacity = 1;
    cell.setAttribute("data-current-color", color);
    cell.setAttribute("data-current-opacity", opacity);
    let updatedColor = rgbaColor(color, opacity);
    console.log(updatedColor);
    cell.style.backgroundColor = updatedColor;
  }
}

function highlightCell(e) {
  let cell = e.target;
  let color = cell.getAttribute('data-current-color');
  let opacity = Number(cell.getAttribute('data-current-opacity'));

  switch (highlightStrategy) {
    case "black":
      highlightBlack(cell, color, opacity);
      break;
    case "opacity":
      highlightWithOpacity(cell, color, opacity);
      break;
    case "random":
      highlightWithRandomColor(cell, color, opacity);
      break;
  }
}

function reset() {
  let userInput = parseInt(prompt("How many cells wide should the grid be?", cellsWide));
  if (userInput < 1 || userInput > 100) {
    alert("You must enter a number between 1 and 100");
  }
  else {
    cellsWide = userInput;
    resetGrid();
  }
}

function rgbaColor(color, opacity) {
  return `rgba(${color} / ${opacity})`
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

      let color = "0 0 0";
      let opacity = 0;
      cellDiv.style.backgroundColor = rgbaColor(color, opacity);

      cellDiv.setAttribute('data-current-color', color);
      cellDiv.setAttribute('data-current-opacity', opacity);

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
