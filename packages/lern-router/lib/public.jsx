import React from 'react';
import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';

const { render } = Setup();

// FlowRouter.route('/', {
//   name: 'PublicHome',
//   action() {
//     render({
//       main: <PublicHomeView />,
//     });
//   },
// });
//
// FlowRouter.route('/login/:alias?', {
//   name: 'PublicLogin',
//   action(params, query) {
//     render({
//       bar: false,
//       main: <PublicLoginView query={query} />,
//     });
//   },
// });
//
// FlowRouter.route('/contato', {
//   name: 'PublicContact',
//   action(params, query) {
//     render({
//       bar: true, nav: true,
//       main: <PublicContact {...query}/>,
//     });
//   },
// });
//
// FlowRouter.route('/cadastro/:token', {
//   name: 'PublicEnrollment',
//   action(params, query) {
//     render({
//       bar: true,
//       main: <PublicEnrollmentView {...params}/>,
//     });
//   },
// });
