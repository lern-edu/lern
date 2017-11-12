import React from 'react';
import { Setup } from 'meteor/lsunsi:se-layouts';

const { render } = Setup({ protect: 'student', nav: true, bar: true });

const studentRoutes = FlowRouter.group({
  prefix: '/aluno',
  name: 'Student',
});

studentRoutes.route('/', {
  name: 'StudentHome',
  action() {
    render({
      main: <StudentHomeView />,
    });
  },
});

studentRoutes.route('/relatorio', {
  name: 'StudentReports',
  action() {
    render({
      main: <StudentReportsView />,
    });
  },
});

// Settings

studentRoutes.route('/ajustes', {
  name: 'StudentSettings',
  action(params, query) {
    render({
      main: <StudentSettingsView {...query}/>,
    });
  },
});

studentRoutes.route('/setup/:alias?', {
  name: 'StudentSetup',
  action(params, query) {
    render({
      main: <StudentSetup {...query}/>,
    });
  },
});

studentRoutes.route('/curso/ingressar/:alias?', {
  name: 'StudentCourseIngress',
  action(params, query) {
    render({
      main: <StudentCourseIngress {...query}/>,
    });
  },
});

/* Tests
*/

studentRoutes.route('/provas', {
  name: 'StudentTests',
  action(params, query) {
    render({
      main: <StudentTestsView {...query} />,
    });
  },
});

studentRoutes.route('/provas/criar', {
  name: 'StudentTestCreate',
  action() {
    render({
      main: <StudentTestRequestView />,
    });
  },
});

studentRoutes.route('/provas/:testId', {
  name: 'StudentTest',
  action(params, query) {
    render({
      main: <StudentTest {...params} {...query}/>,
    });
  },
});

studentRoutes.route('/provas/:testId/tentativas-padrao/:attemptId', {
  name: 'StudentAttemptDefault',
  action(params) {
    render({
      main: <StudentAttemptDefault {...params}/>,
    });
  },
});

studentRoutes.route('/provas/:testId/tentativas-por-tags/:attemptId', {
  name: 'StudentAttemptByTags',
  action(params) {
    render({
      main: <StudentAttemptByTags {...params} />,
    });
  },
});

studentRoutes.route('/provas/:testId/cognitiva/tentativas/:attemptId', {
  name: 'StudentAttemptCognitive',
  action(params) {
    render({
      main: <StudentAttemptCognitiveView {...params}/>,
    });
  },
});

/* Tags
*/

studentRoutes.route('/temas/:tagId', {
  name: 'StudentTag',
  action(params, query) {
    render({
      main: <StudentTagView {...params} {...query}/>,
    });
  },
});

/* Courses
*/

studentRoutes.route('/disciplinas', {
  name: 'StudentCourses',
  action() {
    render({
      main: <StudentCoursesView />,
    });
  },
});

studentRoutes.route('/disciplinas/:courseId', {
  name: 'StudentCourseShow',
  action(params, query) {
    render({
      main: <StudentCourseShow {...params} {...query} />,
    });
  },
});

// Posts

studentRoutes.route('/posts', {
  name: 'StudentPosts',
  action(params, query) {
    render({
      main: <StudentPosts {...params} {...query}/>,
    });
  },
});

studentRoutes.route('/posts/novo/:course?', {
  name: 'StudentPostCreate',
  action(params, query) {
    render({
      main: <StudentPostCreate {...query}/>,
    });
  },
});

studentRoutes.route('/posts/:postId', {
  name: 'StudentPost',
  action(params, query) {
    render({
      main: <StudentPost {...params} {...query} />,
    });
  },
});

studentRoutes.route('/posts/show/:postId', {
  name: 'StudentPostShow',
  action(params, query) {
    render({
      main: <StudentPostShow {...params} />,
    });
  },
});

// Lectures

studentRoutes.route('/disciplinas/:courseId/aulas/:lectureId', {
  name: 'StudentLectureShow',
  action(params, query) {
    render({
      main: <StudentLectureShow {...params} />,
    });
  },
});

/* Test Taking
*/

studentRoutes.route('/provas/fazer/:testId', {
  name: 'StudentTestAttempt',
  triggersExit: [(context, redirect, stop) => {
      // console.log(context);
      // confirm('Deseja realmente abandonar esse teste?') ? stop() : redirect(context.path);
      // Need do something to prevent user to get away from this window
    },
  ],
  action(params) {
    render({
      main: <StudentTestAttempt {...params} />,
    });
  },
});

studentRoutes.route('/cognitivo/fazer/:testId/questao/:index?', {
  name: 'StudentTestAttemptCognitive',
  action(params) {
    render({
      main: <StudentTestAttemptCognitiveView {...params} />,
    });
  },
});
