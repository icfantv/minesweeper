import React, { FC } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { BeveledDiv } from 'components/common';
import {
  GameButton,
  gameLevelSelector,
  markedCount as markedCountAtom,
  NumberPanel,
  TimerPanel
} from 'components/header';
import { GameLevel } from 'model';

interface HeaderDivProps {
  readonly gameLevel: GameLevel;
}

const HeaderDiv = styled(BeveledDiv)<HeaderDivProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #b3b3b3;
  padding-left: 5px;
  padding-right: 5px;
  height: 48px;
`;

export const Header: FC = () => {
  const gameLevel = useRecoilValue<GameLevel>(gameLevelSelector);
  const markedCount = useRecoilValue<number>(markedCountAtom);

  return (
    <HeaderDiv gameLevel={gameLevel}>
      <NumberPanel num={markedCount} />
      <GameButton />
      <TimerPanel />
    </HeaderDiv>
  );
};
