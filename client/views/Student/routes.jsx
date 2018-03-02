// Libs
import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

// Config
const setup = new Setup({ protect: 'student', nav: true, bar: true });
const studentRoutes = FlowRouter.group({
  prefix: '/student',
  name: 'Student',
});

// Tests
import StudentTests from './Tests/View.jsx';
studentRoutes.route('/', {
  name: 'StudentHome',
  action(params, query) {
    setup.render({
      main: <StudentTests {...query} />,
    });
  },
});

studentRoutes.route('/', {
  name: 'StudentTests',
  action(params, query) {
    setup.render({
      main: <StudentTests {...query} />,
    });
  },
});

// Report
import StudentReport from './Report/View.jsx';
studentRoutes.route('/report', {
  name: 'StudentReport',
  action(params, query) {
    setup.render({
      main: <StudentReport />,
    });
  },
});

// Settings
import StudentSettings from './Settings/View.jsx';
studentRoutes.route('/settings', {
  name: 'StudentSettings',
  action(params, query) {
    setup.render({
      main: <StudentSettings {...query}/>,
    });
  },
});

// TestAttempt
import StudentTestAttempt from './TestAttempt/View.jsx';
studentRoutes.route('/test/:testId', {
  name: 'StudentTestAttempt',
  action(params, query) {
    setup.render({
      main: <StudentTestAttempt {...params} />,
    });
  },
});
