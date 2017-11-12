import React from 'react';
import { Setup } from 'meteor/lsunsi:se-layouts';

const { render } = Setup({ protect: 'school', nav: true, bar: true });

const schoolRoutes = FlowRouter.group({
  prefix: '/escola',
  name: 'School',
});

schoolRoutes.route('/', {
  name: 'SchoolHome',
  action() {
    render({
      main: <SchoolHome />,
    });
  },
});

schoolRoutes.route('/alunos', {
  name: 'SchoolUsers',
  action() {
    render({
      main: <SchoolUsers />,
    });
  },
});

schoolRoutes.route('/cursos', {
  name: 'SchoolCourses',
  action() {
    render({
      main: <SchoolCourses />,
    });
  },
});

schoolRoutes.route('/cursos/novo', {
  name: 'SchoolCourseCreate',
  action() {
    render({
      main: <SchoolCourseCreate />,
    });
  },
});

schoolRoutes.route('/cursos/:courseId', {
  name: 'SchoolCourse',
  action(params) {
    render({
      main: <SchoolCourse {...params} />,
    });
  },
});

schoolRoutes.route('/provas', {
  name: 'SchoolTests',
  action() {
    render({
      main: <SchoolTests />,
    });
  },
});

schoolRoutes.route('/provas/novo/:testId', {
  name: 'SchoolTestCreateWithBase',
  action(params, query) {
    render({
      main: <SchoolTestCreate {...params} {...query} />,
    });
  },
});

schoolRoutes.route('/provas/novo', {
  name: 'SchoolTestCreate',
  action(params, query) {
    render({
      main: <SchoolTestCreate {...query} />,
    });
  },
});

schoolRoutes.route('/provas/:testId', {
  name: 'SchoolTest',
  action(params) {
    render({
      main: <SchoolTest {...params} />,
    });
  },
});
