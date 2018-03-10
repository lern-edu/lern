// Libs
import React from 'react';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import i18n from 'meteor/universe:i18n';

class StudentHome extends React.Component {
  render() {
    return <div>
      <Layout.Bar title='Home' />
      <Layout.Bar title={i18n.__('StudentHome.appBar')} />

      <a href={FlowRouter.path('StudentReport')}>Report</a>
    </div>;
  }
};

export default StudentHome;
