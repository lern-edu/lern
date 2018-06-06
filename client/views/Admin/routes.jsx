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
// Users
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

// Tags
import AdminTags from './Tags/View.jsx';
import AdminTag from './Tag/View.jsx';

adminRoutes.route('/tags', {
  name: 'AdminTags',
  action(params, query) {
    setup.render({
      main: <AdminTags {...query} />,
    });
  },
});

adminRoutes.route('/tag', {
  name: 'AdminTag',
  action(params, query) {
    setup.render({
      main: <AdminTag {...query} />,
    });
  },
});

adminRoutes.route('/tag/:tagId', {
  name: 'AdminTag',
  action(params, query) {
    setup.render({
      main: <AdminTag {...params} {...query} />,
    });
  },
});

// Questions
import AdminQuestions from './Questions/View.jsx';
import AdminQuestion from './Question/View.jsx';

adminRoutes.route('/questions', {
  name: 'AdminQuestions',
  action(params, query) {
    setup.render({
      main: <AdminQuestions {...query} />,
    });
  },
});

adminRoutes.route('/question', {
  name: 'AdminQuestion',
  action(params, query) {
    setup.render({
      main: <AdminQuestion {...query} />,
    });
  },
});

adminRoutes.route('/question/:questionId', {
  name: 'AdminQuestion',
  action(params, query) {
    setup.render({
      main: <AdminQuestion {...params} {...query} />,
    });
  },
});


// Tests
import AdminTests from './Tests/View.jsx';
import AdminTest from './Test/View.jsx';

adminRoutes.route('/tests', {
  name: 'AdminTests',
  action(params, query) {
    setup.render({
      main: <AdminTests {...query} />,
    });
  },
});

adminRoutes.route('/test', {
  name: 'AdminTest',
  action(params, query) {
    setup.render({
      main: <AdminTest {...query} />,
    });
  },
});

adminRoutes.route('/test/:testId', {
  name: 'AdminTest',
  action(params, query) {
    setup.render({
      main: <AdminTest {...params} {...query} />,
    });
  },
});
