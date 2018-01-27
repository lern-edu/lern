// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import i18n from 'meteor/universe:i18n';

class StudentReport extends React.Component {

  // Get Context

  contextTypes: {
    user: PropTypes.object,
  }

  render() {
    console.log(this.context);
    return <div>
      <Layout.Bar title={i18n.__('StudentReport.appBar')} />
    </div>;
  }
};

StudentReport.contextTypes = {
  user: PropTypes.object.isRequired,
};

export default StudentReport;
