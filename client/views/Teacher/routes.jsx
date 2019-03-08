// Libs
import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

// Config
const setup = new Setup({ protect: 'teacher', nav: true, bar: true });
const teacherRoutes = FlowRouter.group({
    prefix: '/teacher',
    name: 'Teacher',
});

// Views
// Users
import TeacherHome from './Home/View.jsx';

teacherRoutes.route('/', {
    name: 'AdminHome',
    action(params, query) {
        setup.render({
            main: <TeacherHome />,
        });
    },
});