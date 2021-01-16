import { atom, selector } from 'recoil';
import { Cell, CellLabel } from 'model/Cell';

const cellFlag = atom<Cell>({
  key: 'Cell.cellFlag',
  default: {
    label: CellLabel.UNCLEARED
  } as Cell
});

export const cellFlagSelector = selector<Cell>({
  key: 'Cell.cellFlagSelector',
  get: ({ get }) => {
    return get(cellFlag);
  },
  set: ({ set }, newValue) => {
    console.log('handling right click: ', newValue);
    set(cellFlag, newValue);
  }
});
