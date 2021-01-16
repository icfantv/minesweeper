import { Cell } from './Cell';

export interface GridRow {
  readonly [key: number]: Cell;
}

export interface GridMap {
  readonly [key: number]: GridRow;
}
