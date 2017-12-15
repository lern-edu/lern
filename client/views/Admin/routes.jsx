// Libs
import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

// Config
const setup = new Setup({ protect: 'admin', nav: true, bar: true });
const adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'Admin',
});

// Views
import AdminHome from './Home/View.jsx';

adminRoutes.route('/', {
  name: 'AdminHome',
  action(params, query) {
    setup.render({
      main: <AdminHome />,
    });
  },
});
