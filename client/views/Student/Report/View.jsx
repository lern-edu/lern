// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import i18n from 'meteor/universe:i18n';
import { LinearProgress } from 'material-ui/Progress'

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
        : _.map(
          _.filter(user.report, { parent: undefined }),
          report => <StudentReportCard
            key={report.name}
            report={report}
            childrens={_.filter(user.report, { parent: { _id: report._id } })}
          />
        )
      }

    </div>;
  }
};

StudentReport.contextTypes = {
  user: PropTypes.object.isRequired,
};

export default StudentReport;
