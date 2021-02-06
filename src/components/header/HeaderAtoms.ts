import { atom, selector } from 'recoil';

import { Cell, CellLabel, GameLevel, GameLevelSpecs, GameState } from 'model';
import { Coordinate, generateRandomBombLocations, getAdjacentCellCoordinates } from 'components/grid/gridUtils';
import { activeCellAtom } from 'components/grid';
import { cellAtoms } from 'components/grid/GridAtoms';
import { BombCountMap } from 'model/Cell';

const gameLevel = atom<GameLevel>({
  key: 'Header.gameLevel',
  default: GameLevel.BEGINNER
});

export const gameLevelSelector = selector<GameLevel>({
  key: 'Header.gameLevelSelector',
  get: ({ get }) => get(gameLevel),
  set: ({ set }, newGameLevel) => {
    set(gameLevel, newGameLevel);
    const specs = GameLevelSpecs[newGameLevel as GameLevel];
    set(markedCount, specs.bombs);
  }
});

const gameStateAtom = atom<GameState>({
  key: 'Header.gameStateAtom',
  default: GameState.NEW
});

export const gameStateSelector = selector<GameState>({
  key: 'Header.gameStateSelector',
  get: ({ get }) => get(gameStateAtom),
  set: ({ get, set }) => {
    // get the game specs so we know how to generate random bomb locations
    const gameLevel = get(gameLevelSelector);
    const { rows: maxRow, columns: maxColumn, bombs } = GameLevelSpecs[gameLevel];

    const { row, column } = get(activeCellAtom);
    if (get(gameStateAtom) === GameState.NEW) {
      set(gameStateAtom, GameState.IN_PROGRESS);

      // generate the random bomb locations and update the cells
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

export const markedCount = atom<number>({
  key: 'Header.markedCount',
  default: GameLevelSpecs[GameLevel.BEGINNER].bombs
});

const timerCount = atom<number>({
  key: 'Header.timerCount',
  default: 0
});

export const timerCountSelector = selector<number>({
  key: 'Header.timerCountSelector',
  get: ({ get }) => {
    return get(timerCount);
  },
  set: ({ get, set }, newCount) => {
    if (get(gameStateAtom) === GameState.NEW) {
      set(timerCount, 0);
    } else if (get(gameStateAtom) === GameState.IN_PROGRESS) {
      set(timerCount, newCount);
    }
  }
});
