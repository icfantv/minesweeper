import * as React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { BeveledDiv } from 'components/common';
import { GameLevel, GameLevelSpecs } from 'model';
import { GridCell } from 'components/grid';
import { gameLevelSelector } from 'components/header';

const GridWrapper = styled(BeveledDiv)`
  display: flex;
  flex-wrap: wrap;
`;

function generateCellElements(rows: number, columns: number): JSX.Element[] {
  const cellElements = [] as JSX.Element[];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      cellElements.push(<GridCell key={`${row},${column}`} row={row} column={column} />);
    }
  }

  return cellElements;
}

export const Grid: React.FC = () => {
  const gameLevel = useRecoilValue<GameLevel>(gameLevelSelector);
  const { rows, columns } = GameLevelSpecs[gameLevel];
  const cells = generateCellElements(rows, columns);

  return <GridWrapper>{cells}</GridWrapper>;
};
