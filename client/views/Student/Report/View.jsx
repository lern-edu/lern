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

    console.log(_.isEmpty(this.state.report)
    ? `<LinearProgress color='primary' />`
    : `_.isArray(this.state.report)`
    ? `_.map(this.state.report, report => <StudentReportCard report={report} key={report.name}/>)`
    : `<StudentReportCard report={this.state.report} />`);

    return <div>
      <Layout.Bar title={i18n.__('StudentReport.appBar')} />

      {
        _.isEmpty(this.state.report)
        ? <LinearProgress color='primary' />
        : _.isArray(this.state.report)
        ? _.map(this.state.report, report => <StudentReportCard report={report} key={report.name}/>)
        : <StudentReportCard report={this.state.report} />
      }

    </div>;
  }
};

StudentReport.contextTypes = {
  user: PropTypes.object.isRequired,
};

export default StudentReport;
