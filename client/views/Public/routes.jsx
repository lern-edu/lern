// Libs
import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

// Views
import PublicLogin from './Login/View.jsx';

const { render } = Setup();

FlowRouter.route('/', {
  name: 'PublicLogin',
  action(params, query) {
    render({
      bar: false,
      main: <PublicLogin />,
    });
  },
});
