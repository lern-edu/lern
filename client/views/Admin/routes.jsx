// Libs
import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

// Config
const { render } = Setup({ protect: 'admin', nav: true, bar: true });
const adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'Admin',
});

// Views
import AdminHome from './Home/View.jsx';

adminRoutes.route('/', {
  name: 'AdminHome',
  action(params, query) {
    render({
      main: <AdminHome />,
    });
  },
});
