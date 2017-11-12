import React from 'react';
import { Setup } from 'meteor/lsunsi:se-layouts';

const { render } = Setup({ protect: 'admin', nav: true, bar: true });

const adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'Admin',
});

adminRoutes.route('/', {
  name: 'AdminHome',
  action(params, query) {
    render({
      main: <AdminHome {...query} />,
    });
  },
});

adminRoutes.route('/planos', {
  name: 'AdminPlans',
  action() {
    render({
      main: <AdminPlansView />,
    });
  },
});

// Content

adminRoutes.route('/materias', {
  name: 'AdminSubjects',
  action() {
    render({
      main: <AdminSubjects />,
    });
  },
});

adminRoutes.route('/materias/novo', {
  name: 'AdminSubjectCreate',
  action() {
    render({
      main: <AdminSubjectCreate />,
    });
  },
});

adminRoutes.route('/materias/:subjectId', {
  name: 'AdminSubject',
  action(params) {
    render({
      main: <AdminSubject {...params} />,
    });
  },
});

adminRoutes.route('/materias/:subjectId/:tagId', {
  name: 'AdminTag',
  action(params) {
    render({
      main: <AdminTag {...params} />,
    });
  },
});

adminRoutes.route('/conteudo/materia/:subjectId/tag/:tagId', {
  name: 'AdminTagEdit',
  action(params) {
    render({
      main: <AdminTagEditView {...params} />,
    });
  },
});

adminRoutes.route('/escolas', {
  name: 'AdminSchools',
  action() {
    render({
      main: <AdminSchoolsView />,
    });
  },
});

adminRoutes.route('/escolas/:schoolId', {
  name: 'AdminSchool',
  action(params) {
    render({
      main: <AdminSchoolView {...params}/>,
    });
  },
});

// Questions CRUD

adminRoutes.route('/conteudo/questoes/novo', {
  name: 'AdminQuestionCreate',
  action(params, query) {
    render({
      main: <AdminQuestionCreateView query={query}/>,
    });
  },
});

adminRoutes.route('/questoes/editar', {
  name: 'AdminQuestionEdit',
  action(params, query) {
    render({
      main: <AdminQuestionEditView {...params} query={query} />,
    });
  },
});

adminRoutes.route('/planos/novo', {
  name: 'AdminPlanCreate',
  action() {
    render({
      main: <AdminPlanCreateView />,
    });
  },
});

adminRoutes.route('/plano/:planId', {
  name: 'AdminPlan',
  action(params) {
    render({
      main: <AdminPlanView {...params} />,
    });
  },
});

adminRoutes.route('/provas', {
  name: 'AdminTests',
  action() {
    render({
      main: <AdminTests />,
    });
  },
});

adminRoutes.route('/provas/novo/:testId', {
  name: 'AdminTestCreateWithBase',
  action(params, query) {
    render({
      main: <AdminTestCreate {...params} {...query} />,
    });
  },
});

adminRoutes.route('/provas/novo', {
  name: 'AdminTestCreate',
  action(params, query) {
    render({
      main: <AdminTestCreate {...query} />,
    });
  },
});

adminRoutes.route('/provas/:testId', {
  name: 'AdminTest',
  action(params) {
    render({
      main: <AdminTest {...params} />,
    });
  },
});

// Users

adminRoutes.route('/usuarios', {
  name: 'AdminUsers',
  action() {
    render({
      main: <AdminUsersView />,
    });
  },
});

adminRoutes.route('/usuario/novo', {
  name: 'AdminUserCreate',
  action(params, query) {
    render({
      main: <AdminUserCreateView {...query} />,
    });
  },
});

adminRoutes.route('/usuarios/:userId', {
  name: 'AdminUser',
  action(params) {
    render({
      main: <AdminUserView {...params} />,
    });
  },
});

adminRoutes.route('/disciplina/novo/:schoolId', {
  name: 'AdminCourseCreate',
  action(params) {
    render({
      main: <AdminCourseCreateView {...params} />,
    });
  },
});

adminRoutes.route('/escolas/:schoolId/disciplina/:courseId', {
  name: 'AdminCourse',
  action(params) {
    render({
      main: <AdminCourseView {...params}/>,
    });
  },
});
