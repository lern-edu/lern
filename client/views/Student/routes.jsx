// Libs
import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

// Config
const setup = new Setup({ protect: 'student', nav: true, bar: true });
const studentRoutes = FlowRouter.group({
  prefix: '/student',
  name: 'Student',
});

// Views
import StudentHome from './Home/View.jsx';
import StudentReport from './Report/View.jsx';
import StudentSettings from './Settings/View.jsx';
import StudentTests from './Tests/View.jsx';

studentRoutes.route('/', {
  name: 'StudentTests',
  action(params, query) {
    setup.render({
      main: <StudentTests {...query} />,
    });
  },
});

studentRoutes.route('/report', {
  name: 'StudentReport',
  action(params, query) {
    setup.render({
      main: <StudentReport />,
    });
  },
});

studentRoutes.route('/settings', {
  name: 'StudentSettings',
  action(params, query) {
    setup.render({
      main: <StudentSettings {...query}/>,
    });
  },
});

studentRoutes.route('/Tasks', {
  name: 'StudentTasks',
  action(params, query) {
    setup.render({
      main: <StudentTasks {...query}/>,
    });
  },
});
