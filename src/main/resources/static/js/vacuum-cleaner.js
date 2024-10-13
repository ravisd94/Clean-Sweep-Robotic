let vacuumPosition = { row: 2, col: 0 }; // Initial vacuum position
let directions = ['right', 'down', 'left', 'up']; // Movement direction priority
let currentDirectionIndex = 0; // Starting by moving right
let visitedCells = new Set(); // Keep track of visited cells
let cleanedCellsCount = 0; // Track number of cleaned cells
let vacuumMoving = false; // Track vacuum movement state
let vacuumTimeout; // To store the timeout for the vacuum movement

// Starts vacuum when button is clicked
document.getElementById('startVacuumButton').addEventListener('click', function() {
    if (!vacuumMoving) {
        vacuumMoving = true;
        moveVacuum();
    }
});

// Stops vacuum when button is clicked
document.getElementById('stopVacuumButton').addEventListener('click', function() {
    vacuumMoving = false;
    clearTimeout(vacuumTimeout); // Stop the vacuum movement
    document.getElementById('vacuum').classList.remove('vacuum'); // Optionally, remove vacuum from the grid
});

let sweepCounter = 0;   // Counter for the number of sweeps
let totalCells = 0;     // Total number of cells in the grid (rows * columns)
let cellCleanCounts = {}; // Object to track how many times each cell is cleaned

// Initialize the grid (get total number of cells)
function initializeGrid() {
    const rows = document.querySelectorAll('tbody tr');
    const columns = document.querySelectorAll('tbody tr')[0].children.length;
    totalCells = rows.length * columns;  // Total number of cells
}

// Function to get the next valid move for the vacuum
function getNextMove(rows, direction, checkUncleaned = false) {
    const { row, col } = vacuumPosition;
    let nextRow = row;
    let nextCol = col;

    // Try moving in the current direction
    switch (direction) {
        case 'right': nextCol++; break;
        case 'down': nextRow++; break;
        case 'left': nextCol--; break;
        case 'up': nextRow--; break;
    }

    // If the move is valid, return the new position
    if (isValidMove(nextRow, nextCol, rows, checkUncleaned)) {
        return { row: nextRow, col: nextCol };
    }

    return null; // Invalid move
}

function isValidMove(row, col, rows, checkUncleaned = false) {
    if (row < 0 || col < 0 || row >= rows.length || col >= rows[0].children.length) return false;

    const cell = rows[row].children[col];

    // If checkUncleaned is true, only allow moving to uncleaned cells
    if (checkUncleaned) {
        return !cell.classList.contains('furniture') && !cell.classList.contains('cleaned');
    }

    return !cell.classList.contains('furniture'); // Only move to non-furniture cells if not checking for uncleaned
}

function moveVacuum() {
    if (!vacuumMoving) return; // Stop if vacuum is not moving

    const rows = document.querySelectorAll('tbody tr');
    const currentCell = rows[vacuumPosition.row].children[vacuumPosition.col];

    // Clean the current cell
    const cellIdentifier = `${vacuumPosition.row}-${vacuumPosition.col}`;
    if (!visitedCells.has(cellIdentifier)) {
        currentCell.classList.add('cleaned'); // Mark as cleaned
        visitedCells.add(cellIdentifier); // Mark cell as visited
        cleanedCellsCount++;
        document.getElementById('cleanedCount').textContent = `Cleaned Cells: ${cleanedCellsCount}`;
    }

    currentCell.classList.remove('vacuum'); // Remove vacuum from the current cell

    // First, prioritize uncleaned cells
    let possibleMoves = [];
    for (let i = 0; i < directions.length; i++) {
        const direction = directions[(currentDirectionIndex + i) % directions.length];
        const nextMove = getNextMove(rows, direction, true); // Check for uncleaned cells first
        if (nextMove) {
            possibleMoves.push(nextMove);
            currentDirectionIndex = (currentDirectionIndex + i) % directions.length; // Update direction
        }
    }

    // If no uncleaned cell found, move freely
    if (possibleMoves.length === 0) {
        for (let i = 0; i < directions.length; i++) {
            const direction = directions[(currentDirectionIndex + i) % directions.length];
            const nextMove = getNextMove(rows, direction); // Move to any cell
            if (nextMove) {
                possibleMoves.push(nextMove);
                currentDirectionIndex = (currentDirectionIndex + i) % directions.length;
            }
        }
    }

    // Move to the next valid cell
    if (possibleMoves.length > 0) {
        vacuumPosition = possibleMoves[0]; // Move to first valid cell
        const nextCell = rows[vacuumPosition.row].children[vacuumPosition.col];
        nextCell.classList.add('vacuum'); // Add vacuum to the new cell
    }

    vacuumTimeout = setTimeout(moveVacuum, 500); // Move again after delay
}

initializeGrid();
