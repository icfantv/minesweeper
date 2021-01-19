import React, { FC, useEffect } from 'react';

import { gameState as gameStateAtom, NumberPanel, timerCountSelector } from 'components/header';
import { GameState } from 'model';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const TimerPanel: FC = () => {
  const gameState = useRecoilValue<GameState>(gameStateAtom);
  const timerCount = useRecoilValue(timerCountSelector);
  const setTimerCounter = useSetRecoilState(timerCountSelector);

  useEffect(() => {
    if (gameState === GameState.IN_PROGRESS && timerCount < 1000) {
      window.setTimeout(() => {
        setTimerCounter(timerCount + 1);
      }, 1000);
    }
  });

  return <NumberPanel num={timerCount} />;
};
