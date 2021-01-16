import { atom } from 'recoil';

import { Cell, CellLabel, GameLevel, GameLevelSpec, GameLevelSpecs, GridMap } from 'model';

export const generateCells = (specs: GameLevelSpec): GridMap => {
  const { rows, columns } = specs;

  return Array(rows)
    .fill(0) // value is irrelevant/ignored, but API requires something
    .map(() =>
      Array(columns).fill({
        label: CellLabel.UNCLEARED,
        content: CellLabel.UNCLEARED
      })
    );
};

export const activeCell = atom<Cell>({
  key: 'Grid.activeCell',
  default: (null as unknown) as Cell
});

export const cellGrid = atom<GridMap>({
  key: 'Grid.cellGrid',
  default: generateCells(GameLevelSpecs[GameLevel.BEGINNER])
});
