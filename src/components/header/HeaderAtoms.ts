import { atom, DefaultValue, selector } from 'recoil';

import { GameLevel, GameLevelSpecs, GameState } from 'model';

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

export const gameStateAtom = atom<GameState>({
  key: 'Header.gameStateAtom',
  default: GameState.NEW
});

export const markedCount = atom<number>({
  key: 'Header.markedCount',
  default: GameLevelSpecs[GameLevel.BEGINNER].bombs
});

export const markedCountSelector = selector<number>({
  key: 'Header.markedCountSelector',
  get: ({ get }) => get(markedCount),
  set: ({ get, set }, param: number | DefaultValue) => {
    if (param < 0) {
      set(markedCount, get(markedCount) - 1);
    } else {
      set(markedCount, get(markedCount) + 1);
    }
  }
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
