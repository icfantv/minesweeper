import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { RecoilRoot } from 'recoil';

import { Grid } from 'components/grid';
import { Game } from './components';
import { Header } from 'components/header';
import { Menu } from 'components/menu';

function Main(): JSX.Element {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <Menu />
        <Game>
          <Header />
          <Grid />
        </Game>
      </RecoilRoot>
    </React.StrictMode>
  );
}

export const App = hot(Main);
