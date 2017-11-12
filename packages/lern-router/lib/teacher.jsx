import React from 'react';
import { Setup } from 'meteor/lsunsi:se-layouts';

const { render } = Setup({ protect: 'teacher', nav: true, bar: true });

const teacherRoutes = FlowRouter.group({
  prefix: '/professor',
  name: 'Teacher',
});

// Home

teacherRoutes.route('/', {
  name: 'TeacherHome',
  action() {
    render({
      main: <TeacherHome />,
    });
  },
});

// Settings

teacherRoutes.route('/ajustes', {
  name: 'TeacherSettings',
  action(params, query) {
    render({
      main: <TeacherSettings {...query}/>,
    });
  },
});

// Posts

teacherRoutes.route('/posts', {
  name: 'TeacherPosts',
  action(params, query) {
    render({
      main: <TeacherPosts {...params} {...query}/>,
    });
  },
});

teacherRoutes.route('/posts/novo', {
  name: 'TeacherPostCreate',
  action(params, query) {
    render({
      main: <TeacherPostCreate {...query}/>,
    });
  },
});

teacherRoutes.route('/posts/:postId', {
  name: 'TeacherPost',
  action(params, query) {
    render({
      main: <TeacherPost {...params} {...query} />,
    });
  },
});

teacherRoutes.route('/posts/show/:postId', {
  name: 'TeacherPostShow',
  action(params, query) {
    render({
      main: <TeacherPostShow {...params} />,
    });
  },
});

/* Questions
*/

teacherRoutes.route('/questoes', {
  name: 'TeacherQuestions',
  action() {
    render({
      main: <TeacherQuestionsView />,
    });
  },
});

teacherRoutes.route('/questoes/criar', {
  name: 'TeacherQuestionCreate',
  action(params, query) {
    render({
      main: <TeacherQuestionCreate query={query} />,
    });
  },
});

// Tests

teacherRoutes.route('/testes', {
  name: 'TeacherTests',
  action(params) {
    render({
      main: <TeacherTests {...params} />,
    });
  },
});

teacherRoutes.route('/testes/novo/:testId', {
  name: 'TeacherTestCreateWithBase',
  action(params, query) {
    render({
      main: <TeacherTestCreate {...params} {...query} />,
    });
  },
});

teacherRoutes.route('/testes/novo', {
  name: 'TeacherTestCreate',
  action(params, query) {
    render({
      main: <TeacherTestCreate {...params} />,
    });
  },
});

teacherRoutes.route('/testes/:testId', {
  name: 'TeacherTest',
  action(params, query) {
    render({
      main: <TeacherTest {...params} />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/atividade-padrao/:testId', {
  name: 'TeacherTestShowDefault',
  action(params, query) {
    render({
      main: <TeacherTestShowDefault {...params} {...query}/>,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/atividade-por-tag/:testId', {
  name: 'TeacherTestShowByTags',
  action(params, query) {
    render({
      main: <TeacherTestShowByTags {...params} {...query}/>,
    });
  },
});

/* Courses
*/

teacherRoutes.route('/disciplinas', {
  name: 'TeacherCourses',
  action() {
    render({
      main: <TeacherCourses />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId', {
  name: 'TeacherCourseShow',
  action(params, query) {
    render({
      main: <TeacherCourseShow {...params} {...query} />,
    });
  },
});

// Grades

teacherRoutes.route('/disciplinas/:courseId/notas/editar', {
  name: 'TeacherGradesEdit',
  action(params, query) {
    render({
      main: <TeacherGradesEditView {...params} query={query}/>,
    });
  },
});

// Attempts

teacherRoutes.route('/testes/:testId/avaliar/:attemptId', {
  name: 'TeacherAttemptGrade',
  action(params, query) {
    render({
      main: <TeacherAttemptGrade {...params} query={query} />,
    });
  },
});

// Lectures

teacherRoutes.route('/disciplinas/:courseId/aulas/criar', {
  name: 'TeacherLectureCreate',
  action(params) {
    render({
      main: <TeacherLectureCreate {...params} />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/aulas/series', {
  name: 'TeacherLectureSeries',
  action(params) {
    render({
      main: <TeacherLectureSeries {...params} />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/aulas/:lectureId', {
  name: 'TeacherLectureEdit',
  action(params) {
    render({
      main: <TeacherLectureEdit {...params} />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/aulas/:lectureId/chamada', {
  name: 'TeacherLectureAttendance',
  action(params) {
    render({
      main: <TeacherLectureAttendance {...params} />,
    });
  },
});
