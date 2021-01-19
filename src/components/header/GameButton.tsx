import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { GameLevel, GameLevelSpecs, GameState } from 'model';

import FaceLose from './faceLose.svg';
import FacePressed from './facePressed.svg';
import FaceUnpressed from './faceUnpressed.svg';
import FaceWin from './faceWin.svg';
import { gameLevelSelector, gameState, markedCount, timerCountSelector } from 'components/header/HeaderAtoms';

const StateLabelMap: { [key in GameState]: string } = {
  [GameState.IN_PROGRESS]: FaceUnpressed,
  [GameState.NEW]: FaceUnpressed,
  [GameState.OVER_LOSS]: FaceLose,
  [GameState.OVER_WIN]: FaceWin
};

const FaceButton = styled.button`
  border: 0;
  height: 39px;
  outline: none;
  padding: 0;
  width: 39px;

  img {
    height: inherit;
    width: inherit;
  }
`;

export const GameButton: FC = () => {
  const gameLevel = useRecoilValue<GameLevel>(gameLevelSelector);
  const [gs, setGameState] = useRecoilState<GameState>(gameState);
  const [icon, setIcon] = useState(StateLabelMap[gs]);
  const setMarkedCount = useSetRecoilState<number>(markedCount);
  const setTimerCount = useSetRecoilState<number>(timerCountSelector);

  function handleClick(): void {
    setGameState(GameState.NEW);
    setMarkedCount(GameLevelSpecs[gameLevel].bombs);
    setTimerCount(0);
  }

  return (
    <FaceButton
      onMouseDown={() => setIcon(FacePressed)}
      onMouseUp={() => setIcon(StateLabelMap[gs])}
      onClick={() => handleClick()}
    >
      <img src={icon} alt={gs} />
    </FaceButton>
  );
};
