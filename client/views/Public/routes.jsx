// Libs
import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

// Views
import PublicLogin from './Login/View.jsx';
import PublicEnrollment from './Enrollment/View.jsx';

const setup = new Setup();

FlowRouter.route('/', {
  name: 'PublicLogin',
  action(params, query) {
    setup.render({
      main: <PublicLogin />,
    });
  },
});

FlowRouter.route('/enrollment/:token', {
  name: 'PublicEnrollment',
  action(params, query) {
    setup.render({
      main: <PublicEnrollment {...params}/>,
    });
  },
});
