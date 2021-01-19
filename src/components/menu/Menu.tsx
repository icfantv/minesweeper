import React, { FC } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { GameLevel } from 'model/Game';
import { gameLevelSelector } from 'components/header';

const BaseMenu = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuDiv = styled(BaseMenu)`
  margin-bottom: 10px;
  width: 250px;
`;

const MenuItem = styled(BaseMenu)`
  display: flex;
  text-decoration: underline;
  color: #1ab7ea;
  cursor: pointer;
`;

export const Menu: FC = () => {
  const setGameLevel = useSetRecoilState<GameLevel>(gameLevelSelector);

  return (
    <MenuDiv>
      <MenuItem onClick={() => setGameLevel(GameLevel.BEGINNER)}>Beginner</MenuItem>|
      <MenuItem onClick={() => setGameLevel(GameLevel.INTERMEDIATE)}>Intermediate</MenuItem>|
      <MenuItem onClick={() => setGameLevel(GameLevel.ADVANCED)}>Advanced</MenuItem>
    </MenuDiv>
  );
};
