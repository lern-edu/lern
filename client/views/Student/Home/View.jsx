// Libs
import React from 'react';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';

class StudentHome extends React.Component {
  render() {
    return <div>
      <Layout.Bar title='Home' />

      <a href={FlowRouter.path('StudentReport')}>Report</a>
    </div>;
  }
};

export default StudentHome;
