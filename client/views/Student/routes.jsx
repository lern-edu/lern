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
import StudentReportDetails from './ReportDetails/View.jsx';

studentRoutes.route('/', {
  name: 'StudentHome',
  action(params, query) {
    setup.render({
      main: <StudentHome />,
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

studentRoutes.route('/reportdetails', {
  name: 'StudentReportDetails',
  action(params, query) {
    setup.render({
      main: <StudentReportDetails />,
    });
  },
});
