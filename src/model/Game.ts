export const enum GameLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export interface GameLevelSpec {
  readonly rows: number;
  readonly columns: number;
  readonly bombs: number;
  readonly width: number;
}

export const GameLevelSpecs: { [key in GameLevel]: GameLevelSpec } = Object.freeze({
  [GameLevel.BEGINNER]: {
    rows: 10,
    columns: 10,
    bombs: 10,
    width: 248
  },
  [GameLevel.INTERMEDIATE]: {
    rows: 16,
    columns: 16,
    bombs: 40,
    width: 392
  },
  [GameLevel.ADVANCED]: {
    rows: 16,
    columns: 30,
    bombs: 99,
    width: 776
  }
});

export const enum GameState {
  IN_PROGRESS = 'IN_PROGRESS',
  NEW = 'NEW',
  OVER_LOSS = 'OVER_LOSS',
  OVER_WIN = 'OVER_WIN'
}
