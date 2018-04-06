// Libs
import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

// Views
import PublicLogin from './Login/View.jsx';
import PublicEnrollment from './Enrollment/View.jsx';
import PublicComplete from './Complete/View.jsx';
import PublicConfirm from './Confirm/View.jsx';

const setup = new Setup();

FlowRouter.route('/', {
  name: 'PublicLogin',
  action(params, query) {
    setup.render({
      main: <PublicLogin />,
    });
  },
});

FlowRouter.route('/complete', {
  name: 'PublicComplete',
  action(params, query) {
    setup.render({
      main: <PublicComplete {...query}/>,
    });
  },
});

FlowRouter.route('/confirm', {
  name: 'PublicConfirm',
  action(params, query) {
    setup.render({
      main: <PublicConfirm {...query}/>,
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
