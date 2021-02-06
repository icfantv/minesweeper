import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { Menu } from 'components/menu';
import { GameLevel } from 'model/Game';
import { gameLevelSelector } from 'components/header';

const Dummy: React.FC = () => {
  const gameLevel = useRecoilValue<GameLevel>(gameLevelSelector);
  return <div data-testid="dummy-component">{gameLevel}</div>;
};

describe('the <Menu/> component', () => {
  it('should render the menu component', () => {
    render(<Menu />);
    expect(screen.getByTestId('game-level-beginner')).toBeDefined();
    expect(screen.getByTestId('game-level-intermediate')).toBeDefined();
    expect(screen.getByTestId('game-level-advanced')).toBeDefined();
  });

  it('should render the menu texts', () => {
    render(<Menu />);
    expect(screen.getByTestId('game-level-beginner').innerHTML).toEqual('Beginner');
    expect(screen.getByTestId('game-level-intermediate').innerHTML).toEqual('Intermediate');
    expect(screen.getByTestId('game-level-advanced').innerHTML).toEqual('Advanced');
  });

  it('should update state when clicking the menu items', () => {
    render(
      <RecoilRoot>
        <Menu />
        <Dummy />
      </RecoilRoot>
    );

    // ADVANCED
    fireEvent.click(screen.getByTestId('game-level-advanced'));
    expect(screen.getByTestId('dummy-component').innerHTML).toEqual('ADVANCED');

    // INTERMEDIATE
    fireEvent.click(screen.getByTestId('game-level-intermediate'));
    expect(screen.getByTestId('dummy-component').innerHTML).toEqual('INTERMEDIATE');

    // BEGINNER
    fireEvent.click(screen.getByTestId('game-level-beginner'));
    expect(screen.getByTestId('dummy-component').innerHTML).toEqual('BEGINNER');
  });
});
