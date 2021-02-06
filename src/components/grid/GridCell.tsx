import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Cell, CellLabel, GameState } from 'model';
import { activeCellAtom } from 'components/grid';
import { cellAtoms } from 'components/grid/GridAtoms';
import { gameStateSelector, markedCount } from 'components/header';

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

interface GridCellProps {
  row: number;
  column: number;
}

export const GridCell: FC<GridCellProps> = ({ row, column }) => {
  const [count, setCount] = useRecoilState<number>(markedCount);
  const setGameState = useSetRecoilState<GameState>(gameStateSelector);
  const [cell, setCell] = useRecoilState<Cell>(cellAtoms(`${row}-${column}`));
  const [icon, setIcon] = useState(CellLabelMap[cell.label]);
  const setActiveCell = useSetRecoilState<Cell>(activeCellAtom);

  const handleClick = (): void => {
    setActiveCell(cell);
    setGameState(GameState.IN_PROGRESS);
  };

  const handleRightClick = (e: React.MouseEvent<HTMLImageElement>): void => {
    e.preventDefault();
    let label = CellLabel.FLAG;
    if (cell.label === CellLabel.FLAG) {
      label = CellLabel.UNCLEARED;
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }

    setCell((prevCell) => ({ ...prevCell, label }));
  };

  if (icon !== CellLabelMap[cell.label]) {
    setIcon(CellLabelMap[cell.label]);
  }

  console.log(`rendering ${row}-${column}, label: ${cell.label}, content: ${cell.content}, icon: ${icon}`);
  return (
    <ImageCell
      onClick={handleClick}
      onContextMenu={(e) => handleRightClick(e)}
      onMouseDown={() => setIcon(ClearedEmpty)}
      onMouseUp={() => setIcon(CellLabelMap[cell.label])}
      src={icon}
    />
  );
};
