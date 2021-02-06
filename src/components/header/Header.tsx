import * as React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { BeveledDiv } from 'components/common';
import { GameButton, markedCount as markedCountAtom, NumberPanel, TimerPanel } from 'components/header';

const HeaderDiv = styled(BeveledDiv)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #b3b3b3;
  padding-left: 5px;
  padding-right: 5px;
  height: 48px;
`;

export const Header: React.FC = () => {
  const markedCount = useRecoilValue<number>(markedCountAtom);

  return (
    <HeaderDiv>
      <NumberPanel num={markedCount} />
      <GameButton />
      <TimerPanel />
    </HeaderDiv>
  );
};
