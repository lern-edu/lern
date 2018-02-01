// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import i18n from 'meteor/universe:i18n';
import LinearProgress from 'material-ui/Progress'

import StudentReportCard from './Card.jsx';

class StudentReport extends React.Component {

  // Lifecycle
  constructor(props) {
    super(props);
    this.state = { report: null };
  };

  componentDidMount() {
    const { user } = this.context;
    this.setState({ report: _.get(user, 'report') });
  };

  // Get Context

  contextTypes: {
    user: PropTypes.object,
  };

  // Handlers

  handleDetailsClick = (report) => {
    this.setState({ report });
  };

  // Render

  render() {
    const { classes } = this.props;
    const { user } = this.context;

    return <div>
      <Layout.Bar title={i18n.__('StudentReport.appBar')} />

      {
        _.isEmpty(user.report)
        ? <LinearProgress color='primary' />
        : _.map(user.report, report => <StudentReportCard report={report} key={report.name}/>)
      }

    </div>;
  }
};

StudentReport.contextTypes = {
  user: PropTypes.object.isRequired,
};

export default StudentReport;
