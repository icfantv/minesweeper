import React, { FC } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Cell, CellLabel, MouseButton } from 'model';
import { activeCellSelector, cellAtoms } from 'components/grid/GridAtoms';
import { markedCountSelector } from 'components/header';

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
  const [cell, setCell] = useRecoilState<Cell>(cellAtoms(`${row}-${column}`));
  const setActiveCell = useSetRecoilState<Cell>(activeCellSelector);
  const [oldLabel, setOldLabel] = React.useState<CellLabel>(CellLabel.UNCLEARED);
  const adjustMarkedCount = useSetRecoilState<number>(markedCountSelector);

  const handleClick = (): void => {
    console.log('handle click');
    setActiveCell(cell);
  };

  const handleRightClick = (e: React.MouseEvent<HTMLImageElement>): void => {
    console.log('handle right click', e.button);
    e.preventDefault();

    // we need to separate the updating of the header bomb count from the
    // cell label update because state updater functions must be pure.
    if (cell.label === CellLabel.FLAG) {
      adjustMarkedCount(1);
    } else {
      adjustMarkedCount(-1);
    }

    setCell((prevCell: Cell) => {
      let label = CellLabel.FLAG;
      if (prevCell.label === CellLabel.FLAG) {
        label = CellLabel.UNCLEARED;
      }

      return {
        ...prevCell,
        label
      };
    });
    // just call set active cell, but change signature to include how it was called
    // IE, mouse button clicked
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>): void => {
    // ignore if right-click
    if (e.button === MouseButton.SECONDARY) {
      return;
    }

    if (cell.label === CellLabel.FLAG || cell.label === CellLabel.UNCLEARED) {
      setOldLabel(cell.label);
      setCell((prevCell) => ({ ...prevCell, label: CellLabel.CLEARED_EMPTY }));
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLImageElement>): void => {
    // ignore if right-click
    if (e.button === MouseButton.SECONDARY) {
      return;
    }

    if (oldLabel === CellLabel.FLAG || oldLabel === CellLabel.UNCLEARED) {
      setCell((prevCell) => ({ ...prevCell, label: oldLabel }));
    }
  };

  console.log(`rendering ${row}-${column}, label: ${cell.label}, content: ${cell.content}`);
  return (
    <ImageCell
      onClick={handleClick}
      onContextMenu={(e) => handleRightClick(e)}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => handleMouseUp(e)}
      src={CellLabelMap[cell.label]}
    />
  );
};
