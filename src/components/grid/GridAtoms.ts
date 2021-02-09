import { atom, atomFamily, DefaultValue, selector } from 'recoil';

import { Cell, CellLabel, GameLevelSpecs, GameState } from 'model';
import { gameLevelSelector, gameStateAtom } from 'components/header';
import { Coordinate, generateRandomBombLocations, getAdjacentCellCoordinates } from 'components/grid/gridUtils';
import { BombCountMap } from 'model/Cell';

export const activeCellAtom = atom<Cell>({
  key: 'Grid.activeCell',
  default: (null as unknown) as Cell
});

export const activeCellSelector = selector<Cell>({
  key: 'Grid.activeCellSelector',
  get: ({ get }) => get(activeCellAtom),
  set: ({ get, set }, newValue: Cell | DefaultValue) => {
    const gameLevel = get(gameLevelSelector);
    const { rows: maxRow, columns: maxColumn, bombs } = GameLevelSpecs[gameLevel];
    const { row, column } = newValue as Cell;

    if (get(gameStateAtom) === GameState.NEW) {
      set(gameStateAtom, GameState.IN_PROGRESS);

      // generate the random bomb locations and update the cells
      // only need to do this once per game, and only at the beginning
      const bombCoords = generateRandomBombLocations({ row, column }, { maxRow, maxColumn }, bombs);
      bombCoords.forEach((coord: Coordinate) => {
        const { row: r, column: c } = coord;
        set(cellAtoms(`${r}-${c}`), (prev: Cell) => ({ ...prev, content: CellLabel.BOMB }));
      });
    }

    // now with the bombs defined, we can go ahead and either label
    // the active cell if it has an adjacent bomb, or clear it.
    const adjacentCells = getAdjacentCellCoordinates({ row, column }, { maxRow, maxColumn });
    const adjacentBombCount = adjacentCells.reduce(
      (acc: number, curr: Coordinate) =>
        get(cellAtoms(`${curr.row}-${curr.column}`)).content === CellLabel.BOMB ? ++acc : acc,
      0
    );
    if (adjacentBombCount > 0) {
      set(cellAtoms(`${row}-${column}`), (prev: Cell) => ({ ...prev, label: BombCountMap[adjacentBombCount] }));
    } else {
      set(cellAtoms(`${row}-${column}`), (prev: Cell) => ({ ...prev, label: CellLabel.CLEARED_EMPTY }));
      adjacentCells.forEach((coord: Coordinate) => {
        const { row: r, column: c } = coord;
        set(cellAtoms(`${r}-${c}`), (prev: Cell) => ({ ...prev, label: CellLabel.CLEARED_EMPTY }));
      });

      // TODO: still need to iterate over adjacent cells of adjacent cells
    }

    // get all adjacent cells
    //     r - 1, r, r + 1; c - 1, c, c + 1
    //   count mines --> mineCount
    //   if mineCount > 0 set cell label to numer of mines, stop
    //   else clear cell
    //     iterate over adjacent cells and repeat
  }
});

export const cellAtoms = atomFamily<Cell, string>({
  key: 'Grid.cellAtom',
  default: (param: string) => ({
    row: parseInt(param.split('-')[0]),
    column: parseInt(param.split('-')[1]),
    label: CellLabel.UNCLEARED,
    content: CellLabel.UNCLEARED
  })
});
