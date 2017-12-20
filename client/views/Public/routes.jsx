// Libs
import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

// Views
import PublicLogin from './Login/View.jsx';
import PublicGames from './Games/View.jsx';
import PublicGamesSudoku from './Games/Sudoku/View.jsx';

const setup = new Setup();

FlowRouter.route('/', {
  name: 'PublicLogin',
  action(params, query) {
    setup.render({
      main: <PublicLogin />,
    });
  },
});

FlowRouter.route('/games', {
  name: 'PublicGames',
  action(params, query) {
    setup.render({
      bar: true,
      main: <PublicGames />,
    });
  },
});

FlowRouter.route('/games/sudoku', {
  name: 'PublicGamesSudoku',
  action(params, query) {
    setup.render({
      bar: true,
      main: <PublicGamesSudoku />,
    });
  },
});
