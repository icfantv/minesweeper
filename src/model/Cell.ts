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

export interface Cell {
  readonly label: CellLabel;
  readonly content: CellLabel;
  readonly row: number;
  readonly column: number;
}
