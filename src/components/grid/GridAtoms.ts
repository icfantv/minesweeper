import { atom, atomFamily } from 'recoil';

import { Cell, CellLabel } from 'model';

export const activeCellAtom = atom<Cell>({
  key: 'Grid.activeCell',
  default: (null as unknown) as Cell
});

export const cellAtoms = atomFamily<Cell, string>({
  key: 'Grid.cell',
  default: (param: string) => ({
    row: parseInt(param.split('-')[0]),
    column: parseInt(param.split('-')[1]),
    label: CellLabel.UNCLEARED,
    content: CellLabel.UNCLEARED
  })
});
