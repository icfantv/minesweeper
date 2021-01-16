import { atom, selector } from 'recoil';

import { GameLevel, GameLevelSpecs, GameState } from 'model';
import { generateCells, cellGrid } from 'components/grid';

const gameLevel = atom<GameLevel>({
  key: 'Header.gameLevel',
  default: GameLevel.BEGINNER
});

export const gameLevelSelector = selector<GameLevel>({
  key: 'Header.gameLevelSelector',
  get: ({ get }) => {
    return get(gameLevel);
  },
  set: ({ set }, newGameLevel) => {
    set(gameLevel, newGameLevel);
    const specs = GameLevelSpecs[newGameLevel as GameLevel];
    set(markedCount, specs.bombs);
    set(cellGrid, generateCells(specs));
  }
});

export const gameState = atom<GameState>({
  key: 'Header.gameState',
  default: GameState.NEW
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
    if (get(gameState) === GameState.NEW) {
      set(timerCount, 0);
    } else if (get(gameState) === GameState.IN_PROGRESS) {
      set(timerCount, newCount);
    }
  }
});
