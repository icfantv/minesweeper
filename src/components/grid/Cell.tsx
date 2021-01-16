import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { activeCell, cellGrid } from 'components/grid';
import { Cell, CellLabel, GameState, GridMap } from 'model';
import { gameState as gameStateAtom, markedCount } from 'components/header';

import Bomb from './mine.svg';
import BombCrossed from './wrongMine.svg';
import BombRed from './explodedMine.svg';
import ClearedEmpty from './clearedEmpty.svg';
import Eight from './bombCount8.svg';
import Five from './bombCount5.svg';
import Flag from './flag.svg';
import Four from './bombCount4.svg';
import One from './bombCount1.svg';
import Seven from './bombCount7.svg';
import Six from './bombCount6.svg';
import Three from './bombCount3.svg';
import Two from './bombCount2.svg';
import Uncleared from './uncleared.svg';

const CellLabelMap: { [key in CellLabel]: string } = {
  [CellLabel.BOMB]: Bomb,
  [CellLabel.BOMB_CROSSED]: BombCrossed,
  [CellLabel.BOMB_RED]: BombRed,
  [CellLabel.CLEARED_EMPTY]: ClearedEmpty,
  [CellLabel.EIGHT]: Eight,
  [CellLabel.FIVE]: Five,
  [CellLabel.FLAG]: Flag,
  [CellLabel.FOUR]: Four,
  [CellLabel.ONE]: One,
  [CellLabel.SEVEN]: Seven,
  [CellLabel.SIX]: Six,
  [CellLabel.THREE]: Three,
  [CellLabel.TWO]: Two,
  [CellLabel.UNCLEARED]: Uncleared
};

const ImageCell = styled.img`
  height: 24px;
  width: 24px;
`;

export const GridCell: FC<Omit<Cell, 'content'>> = ({ label, row, column }) => {
  const [icon, setIcon] = useState(CellLabelMap[label]);
  const [, setActiveCell] = useRecoilState<Cell>(activeCell);
  const [gameState, setGameState] = useRecoilState<GameState>(gameStateAtom);
  const [grid, setGrid] = useRecoilState<GridMap>(cellGrid);
  const [count, setCount] = useRecoilState<number>(markedCount);

  const cell: Cell = {
    column,
    content: label,
    label,
    row
  };

  const handleClick = (): void => {
    if (gameState === GameState.NEW) {
      setGameState(GameState.IN_PROGRESS);
    }

    setActiveCell(cell);
  };

  const handleRightClick = (e: React.MouseEvent<HTMLImageElement>): void => {
    e.preventDefault();
    let label = CellLabel.FLAG;
    if (grid[row][column].label === CellLabel.FLAG) {
      label = CellLabel.UNCLEARED;
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }

    const cell = { ...grid[row][column], label };
    const map: GridMap = {
      [row]: {
        ...grid[row],
        [column]: cell
      }
    };
    setGrid({ ...grid, ...map });
  };

  return (
    <ImageCell
      onClick={handleClick}
      onContextMenu={(e) => handleRightClick(e)}
      onMouseDown={() => setIcon(ClearedEmpty)}
      onMouseUp={() => setIcon(CellLabelMap[label])}
      src={icon}
    />
  );
};
