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
        test: null,
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

    Meteor.call('StudentTestAttemptStart', testId, (err, collections) => {
      const { attempt, test } = collections;

      if (err || _.isEmpty(attempt) || _.isEmpty(test)) {

        log.info('StudentTestAttempt.getData.TestAttemptStart => error =>', err);
        snack({ message: 'Erro ao encontrar testes' });
        FlowRouter.go('StudentHome');

      };

      log.info('StudentTestAttempt.getData.TestAttemptStart => finish =>', collections);
      this.setState({ collections, handler: false });

    });
  };

  // Handlers

  handleBottom = (event, value) => {
    const { bottom, collections: { test } } = this.state;

    if (!bottom) {
      snack(i18n.__(`StudentTestAttempt.warning.${test.resolution}`));
      return;
    }
    else {

      if (value === 'finish') {
        this.setState({ bottom: 'loading' });

        // Meteor.call('StudentTestAttemptFinish')
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
        test,
        attempt,
      },
      handler,
      bottom,
    } = this.state;

    return handler
    ? <LinearProgress />
    : (
      <div>
        <Layout.Bar title={test.name} />

          <Grid container justify='center' className={classes.grid}>

            <Grid item xs={12} md={10} lg={8}>

              <Grid container spacing={24}>
                {
                  _.get(
                    {
                      content: <StudentTestAttemptContent parent={this} pages={test.pages} />,
                    },
                    test.resolution
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
