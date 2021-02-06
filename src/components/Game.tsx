import * as React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { GameLevelSpecs } from 'model';
import { gameLevelSelector } from 'components/header';

interface GameProps {
  readonly width: number;
}

const GameWrapper = styled.div<GameProps>`
  border: 4px solid #aaa;
  width: ${(props) => props.width}px;
`;

export const Game: React.FC = ({ children }) => {
  const gameLevel = useRecoilValue(gameLevelSelector);
  const { width } = GameLevelSpecs[gameLevel];

  return <GameWrapper width={width}>{children}</GameWrapper>;
};
