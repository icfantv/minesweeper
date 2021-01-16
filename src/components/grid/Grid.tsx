import React, { FC } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { BeveledDiv } from 'components/common';
import { cellGrid, GridCell } from 'components/grid';
import { GridMap } from 'model';

const GridWrapper = styled(BeveledDiv)`
  display: flex;
  flex-wrap: wrap;
`;

function generateCellElements(gridMap: GridMap): JSX.Element[] {
  const cellElements = [] as JSX.Element[];
  const rows = Object.keys(gridMap).map((key) => parseInt(key));
  rows.forEach((row: number) => {
    const columns = Object.keys(gridMap[row]).map((key) => parseInt(key));
    columns.forEach((column: number) => {
      cellElements.push(
        <GridCell key={`${row},${column}`} label={gridMap[row][column].label} row={row} column={column} />
      );
    });
  });

  return cellElements;
}

export const Grid: FC = () => {
  const grid = useRecoilValue<GridMap>(cellGrid);
  const cells = generateCellElements(grid);

  return <GridWrapper>{cells}</GridWrapper>;
};
