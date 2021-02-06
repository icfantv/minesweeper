import * as React from 'react';
import styled from 'styled-components';

import Zero from './digit0.svg';
import One from './digit1.svg';
import Two from './digit2.svg';
import Three from './digit3.svg';
import Four from './digit4.svg';
import Five from './digit5.svg';
import Six from './digit6.svg';
import Seven from './digit7.svg';
import Eight from './digit8.svg';
import Nine from './digit9.svg';
import Minus from './dminus.svg';

const DIGIT_SVG_MAP: { [key: number]: string } = Object.freeze({
  0: Zero,
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
  7: Seven,
  8: Eight,
  9: Nine
});

const DigitImage = styled.img`
  height: 27.5px;
  width: 16.5px;
`;

const Digit: React.FC<{ digit: number }> = ({ digit }) => {
  return <DigitImage className="digit" src={DIGIT_SVG_MAP[digit]} alt={digit.toString()} />;
};

export const Dash: JSX.Element = <DigitImage className="digit" src={Minus} alt="minus" />;

export const Digits: JSX.Element[] = Object.keys(DIGIT_SVG_MAP).map((key: string, digit: number) => {
  return <Digit digit={digit} key={key} />;
});
