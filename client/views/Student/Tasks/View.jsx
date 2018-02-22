// Libs
import React from 'react';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';

class StudentTasks extends React.Component {
  render() {
    return <div>
      <Layout.Bar title='Tasks' />

      <a href={FlowRouter.path('StudentReport')}>Report</a>
    </div>;
  }
};

export default StudentTasks;
