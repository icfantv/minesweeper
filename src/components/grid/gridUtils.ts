export interface Coordinate {
  readonly row: number;
  readonly column: number;
}

export interface Bounds {
  readonly maxRow: number;
  readonly maxColumn: number;
}

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function generateRandomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomCell(activeCell: Coordinate, bounds: Bounds): Coordinate {
  const { row, column } = activeCell;
  const { maxRow, maxColumn } = bounds;
  let randomRow = generateRandomBetween(0, maxRow - 1);
  let randomColumn = generateRandomBetween(0, maxColumn - 1);

  // make sure we exclude the active cell from the result
  while (row === randomRow && column === randomColumn) {
    randomRow = generateRandomBetween(0, maxRow - 1);
    randomColumn = generateRandomBetween(0, maxColumn - 1);
  }

  return {
    row: randomRow,
    column: randomColumn
  };
}

export function generateRandomBombLocations(activeCell: Coordinate, bounds: Bounds, bombCount: number): Coordinate[] {
  const bombLocations: Coordinate[] = [];
  let currentBombCount = 0;

  // generate randomb bomb locations ensuring the generated locations are unique
  while (currentBombCount < bombCount) {
    let randomCell = generateRandomCell(activeCell, bounds);
    while (bombLocations.some((loc: Coordinate) => loc.row === randomCell.row && loc.column === randomCell.column)) {
      randomCell = generateRandomCell(activeCell, bounds);
    }

    bombLocations.push(randomCell);
    currentBombCount++;
  }

  return bombLocations;
}

export function getAdjacentCellCoordinates(activeCell: Coordinate, bounds: Bounds): Coordinate[] {
  const result: Coordinate[] = [];
  for (let row = activeCell.row - 1; row <= activeCell.row + 1; row++) {
    for (let column = activeCell.column - 1; column <= activeCell.column + 1; column++) {
      if (`${row},${column}` !== `${activeCell.row},${activeCell.column}`) {
        if (row >= 0 && column >= 0 && row < bounds.maxRow && column < bounds.maxColumn) {
          result.push({
            row,
            column
          });
        }
      }
    }
  }

  return result;
}
