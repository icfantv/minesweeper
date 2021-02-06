export const enum CellState {
  CLEARED = 'CLEARED',
  UNCLEARED = 'UNCLEARED'
}

export const enum CellLabel {
  BOMB = 'BOMB',
  BOMB_CROSSED = 'BOMB_CROSSED',
  BOMB_RED = 'BOMB_RED',
  CLEARED_EMPTY = 'CLEARED_EMPTY',
  EIGHT = 'EIGHT',
  FIVE = 'FIVE',
  FLAG = 'FLAG',
  FOUR = 'FOUR',
  ONE = 'ONE',
  SEVEN = 'SEVEN',
  SIX = 'SIX',
  THREE = 'THREE',
  TWO = 'TWO',
  UNCLEARED = 'UNCLEARED'
}

export const BombCountMap: { [key: number]: CellLabel } = {
  1: CellLabel.ONE,
  2: CellLabel.TWO,
  3: CellLabel.THREE,
  4: CellLabel.FOUR,
  5: CellLabel.FIVE,
  6: CellLabel.SIX,
  7: CellLabel.SEVEN,
  8: CellLabel.EIGHT
};

export interface Cell {
  row: number;
  column: number;
  label: CellLabel;
  content: CellLabel;
}
