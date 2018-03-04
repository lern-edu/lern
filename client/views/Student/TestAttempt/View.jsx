// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import { LinearProgress, CircularProgress } from 'material-ui/Progress';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

import StudentTestAttemptContent from './Content.jsx';

const styles = theme => ({
  bottom: {
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
  grid: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 56,
  },
});

// this.state.bottom = [null, 'finish', 'loading'];
class StudentTestAttempt extends React.Component {

  // Lifecycle
  constructor(props) {
    log.info('StudentTestAttempt.constructor =>', props);
    super(props);

    this.state = {
      collections: {
        attempt: null,
      },
      handler: true,
      bottom: null,
    };
  }

  componentWillMount() {
    log.info('StudentTestAttempt.componentWillMount');
    this.getData();
  };

  // Get data
  getData = () => {
    log.info('StudentTestAttempt.getData => Start');
    const { testId } = this.props;

    Meteor.call('StudentTestAttemptStart', testId, (err, doc) => {

      if (err || _.isEmpty(doc)) {

        log.info('StudentTestAttempt.getData.TestAttemptStart => error =>', err);
        snack({ message: i18n.__('StudentTestAttempt.error.findTest') });
        FlowRouter.go('StudentHome');

      };

      log.info('StudentTestAttempt.getData.TestAttemptStart => finish =>', doc);
      this.setState({ collections: { attempt: doc }, handler: false });

    });
  };

  // Handlers

  handleBottom = (event, value) => {
    const { bottom, collections: { attempt } } = this.state;

    if (!bottom) {
      snack(i18n.__(`StudentTestAttempt.warning.${attempt.test.resolution}`));
      return;
    }
    else {

      if (value === 'finish') {
        this.setState({ bottom: 'loading' });

        Meteor.call('StudentTestAttemptFinish', attempt._id, (err, doc) => {

          if (err || !doc) {

            log.info('StudentTestAttempt.getData.TestAttemptFinish => error =>', err);
            snack({ message: i18n.__('StudentTestAttempt.error.finishAttempt') });

          };

          log.info('StudentTestAttempt.getData.TestAttemptFinish => finish =>', doc);
          snack({ message: i18n.__('StudentTestAttempt.success.attempt') });
          FlowRouter.go('StudentHome');

        });
      };

    }

  };

  // Render
  render() {
    log.info('StudentTestAttempt.render =>', this.state);
    const { classes } = this.props;
    const {
      collections,
      collections: {
        attempt,
      },
      handler,
      bottom,
    } = this.state;

    return handler
    ? <LinearProgress />
    : (
      <div>
        <Layout.Bar title={attempt.test.name} />

        <Grid container justify='center' className={classes.grid}>

          <Grid item xs={12} md={10} lg={8}>

            <Grid container spacing={24}>
              {
                _.get(
                  {
                    content: <StudentTestAttemptContent parent={this} pages={attempt.test.pages} />,
                  },
                  attempt.test.resolution
                )
              }
            </Grid>

          </Grid>

        </Grid>

        <BottomNavigation
          value={bottom}
          onChange={this.handleBottom}
          className={classes.bottom}
        >
          {
            bottom === 'loading'
            ? <CircularProgress color='secondary' />
            : (
              <BottomNavigationAction
                label={i18n.__('StudentTestAttempt.finish')}
                value='finish'
                icon={<Icon>check</Icon>}
              />
            )
          }
        </BottomNavigation>
          
      </div>
    );
  }
};

export default withStyles(styles)(StudentTestAttempt);
