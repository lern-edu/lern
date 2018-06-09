// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import i18n from 'meteor/universe:i18n';
import { LinearProgress } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

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
        : _.isEmpty(user.report)
        ? <Grid direction='column' justify='center' alignItems='center' container>
          <Grid item>
            <IconButton aria-label="Extension" color="primary" href={FlowRouter.path('StudentHome')}>
              <Icon style={{ fontSize: 50 }}>extension</Icon>
            </IconButton>
          </Grid>

          <Grid item>
            <Typography style={{ fontSize: 20 }} variant='display3' component='p'>
              {i18n.__('StudentReport.goTasks')}
            </Typography>
          </Grid>

          <Grid item>
            <Button href={FlowRouter.path('StudentHome')} variant="raised" color='primary'>
              {i18n.__('StudentReport.goTasksButton')}
            </Button>
          </Grid>
        </Grid>
        : _.map(
          _.filter(user.report, r => _.isNil(r.parent)),
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
