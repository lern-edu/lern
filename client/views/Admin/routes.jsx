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
import AdminUsers from './Users/View.jsx';
import AdminUser from './User/View.jsx';

adminRoutes.route('/', {
  name: 'AdminHome',
  action(params, query) {
    setup.render({
      main: <AdminHome />,
    });
  },
});

adminRoutes.route('/users', {
  name: 'AdminUsers',
  action(params, query) {
    setup.render({
      main: <AdminUsers {...query}/>,
    });
  },
});

adminRoutes.route('/user', {
  name: 'AdminUser',
  action(params, query) {
    setup.render({
      main: <AdminUser {...query} />,
    });
  },
});

adminRoutes.route('/user/:userId', {
  name: 'AdminUser',
  action(params, query) {
    setup.render({
      main: <AdminUser {...params} {...query} />,
    });
  },
});

// 

adminRoutes.route('/tags', {
  name: 'AdminTags',
  action(params, query) {
    setup.render({
      main: <AdminTags {...query} />,
    });
  },
});

