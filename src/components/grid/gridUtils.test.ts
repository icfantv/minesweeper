import { Bounds, Coordinate, getAdjacentCellCoordinates } from 'components/grid/gridUtils';

describe('test the gridUtils functions', () => {
  const BOUNDS: Bounds = {
    maxRow: 16,
    maxColumn: 16
  };

  function gc(row: number, column: number): Coordinate {
    return {
      row,
      column
    };
  }

  describe('test the adjacent cell calculations', () => {
    it('should return the adjacent cells when the active cell is at the origin (0,0)', () => {
      const activeCell: Coordinate = gc(0, 0);
      const expected: Coordinate[] = [gc(0, 1), gc(1, 0), gc(1, 1)];

      expect(getAdjacentCellCoordinates(activeCell, BOUNDS)).toEqual(expected);
    });

    it('should return the adjacent cells when the active cell is at (x, 0)', () => {
      const activeCell: Coordinate = gc(2, 0);
      const expected: Coordinate[] = [gc(1, 0), gc(1, 1), gc(2, 1), gc(3, 0), gc(3, 1)];

      expect(getAdjacentCellCoordinates(activeCell, BOUNDS)).toEqual(expected);
    });

    it('should return the adjacent cells when the active cell is at (0, y)', () => {
      const activeCell: Coordinate = gc(0, 2);
      const expected: Coordinate[] = [gc(0, 1), gc(0, 3), gc(1, 1), gc(1, 2), gc(1, 3)];

      expect(getAdjacentCellCoordinates(activeCell, BOUNDS)).toEqual(expected);
    });

    it('should return the adjacent cells when the active cell is at (x, y)', () => {
      const activeCell: Coordinate = gc(2, 2);
      const expected: Coordinate[] = [gc(1, 1), gc(1, 2), gc(1, 3), gc(2, 1), gc(2, 3), gc(3, 1), gc(3, 2), gc(3, 3)];

      expect(getAdjacentCellCoordinates(activeCell, BOUNDS)).toEqual(expected);
    });

    it('should return the adjacent cells when the active cell is at (maxRow, 0)', () => {
      const maxRow = BOUNDS.maxRow - 1;
      const activeCell: Coordinate = gc(maxRow, 0);
      const expected: Coordinate[] = [gc(maxRow - 1, 0), gc(maxRow - 1, 1), gc(maxRow, 1)];

      expect(getAdjacentCellCoordinates(activeCell, BOUNDS)).toEqual(expected);
    });

    it('should return the adjacent cells when the active cell is at (0, maxColumn)', () => {
      const maxColumn = BOUNDS.maxColumn - 1;
      const activeCell: Coordinate = gc(0, maxColumn);
      const expected: Coordinate[] = [gc(0, maxColumn - 1), gc(1, maxColumn - 1), gc(1, maxColumn)];

      expect(getAdjacentCellCoordinates(activeCell, BOUNDS)).toEqual(expected);
    });

    it('should return the adjacent cells when the active cell is at (maxRow, maxColumn)', () => {
      const maxRow = BOUNDS.maxRow - 1;
      const maxColumn = BOUNDS.maxColumn - 1;
      const activeCell: Coordinate = gc(maxRow, maxColumn);
      const expected: Coordinate[] = [
        gc(maxRow - 1, maxColumn - 1),
        gc(maxRow - 1, maxColumn),
        gc(maxRow, maxColumn - 1)
      ];

      expect(getAdjacentCellCoordinates(activeCell, BOUNDS)).toEqual(expected);
    });
  });

  xdescribe('test the random bomb location generations', () => {
    it('should generate random bomb locations', () => {
      // const activeCell: Coordinate = gc(0, 0);
      //
      // const specs = GameLevelSpecs[GameLevel.BEGINNER];
      // const { rows, columns } = specs;
      //
      // const grid: GridMap = generateCells(specs);
      // const bounds: Bounds = { maxRow: rows, maxColumn: columns };
      // const bombCount = specs.bombs;
      //
      // generateRandomBombLocations(activeCell, bounds, bombCount);
      // let count = 0;
      // for (let i = 0; i < bounds.maxRow; i++) {
      //   for (let j = 0; j < bounds.maxColumn; j++) {
      //     if (grid[i][j].content === CellLabel.BOMB) {
      //       count++;
      //     }
      //   }
      // }
      //
      // expect(count).toEqual(bombCount);
    });
  });
});
