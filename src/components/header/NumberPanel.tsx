import React, { FC } from 'react';
import styled from 'styled-components';

import { Dash, Digits } from 'components/digits';

const Row = styled.div`
  display: flex;
  background-color: black;
  padding-bottom: 2px;
  padding-top: 2px;
  height: 27.5px;
  width: 53.5px;

  :first-child {
    padding-left: 2px;
  }

  .digit {
    margin-right: 1px;
  }
`;

export const NumberPanel: FC<{ num: number }> = ({ num }) => {
  // split number up in to array of digits
  const chars = num.toString().split('');
  const digits: number[] = [];
  if (num < 0) {
    chars.unshift(); // remove the minus sign or we'll get a NaN
  }
  digits.push(...chars.map(Number));

  // make sure number is padded w/ zeros
  while (digits.length < 3) {
    digits.unshift(0);
  }

  return (
    <Row>
      {num < 0 ? Dash : null}
      {digits.map((digit, index: number) => {
        return <div key={index}>{Digits[digit]}</div>;
      })}
    </Row>
  );
};
