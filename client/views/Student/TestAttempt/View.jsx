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
import StudentTestAttemptSudoku from './Sudoku.jsx';
import StudentTestAttemptToolbar from './Toolbar.jsx';

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
      page: 0,
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
    log.info('StudentTestAttempt.handleBottom => ', this, value);
    const { bottom, collections: { attempt }, page } = this.state;

    let dismiss = null;

    if (value === 'dismiss') {
      dismiss = confirm(i18n.__(`StudentTestAttempt.warning.dismiss`));
      if (!dismiss) return;
    }

    if (value === 'next') {
      if (page < attempt.test.pages.length - 1) {
        this.setState({
          page: page + 1,
          bottom: page + 1 === attempt.test.pages.length - 1 ? 'finish' : null,
        });
      }

      return;
    }

    if (value === 'back') {
      if (page > 0) {
        this.setState({
          page: page - 1,
          bottom: page - 1 === attempt.test.pages.length - 1 ? 'finish' : null,
        });
      }

      return;
    }

    if (!bottom && value === 'finish') {
      snack(i18n.__(`StudentTestAttempt.warning.${attempt.test.resolution}`));
      return;
    } else {
      this.setState({ bottom: 'loading' });

      Meteor.call('StudentTestAttemptFinish', attempt._id, dismiss, (err, doc) => {

        if (err || !doc) {
          log.info('StudentTestAttempt.TestAttemptFinish => error =>', err);
          if (err && err.error === 501)
            snack({ message: i18n.__('StudentTestAttempt.error.sudokuInvalid') });
          else
            snack({ message: i18n.__('StudentTestAttempt.error.findTest') });
          this.setState({ bottom: null });
        } else {
          log.info('StudentTestAttempt.TestAttemptFinish => finish =>', doc);
          if (dismiss)
            snack({ message: i18n.__('StudentTestAttempt.success.thankYou') });
          else
            snack({ message: i18n.__('StudentTestAttempt.success.attempt') });
          FlowRouter.go('StudentHome');
        };

      });

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
      page,
    } = this.state;

    return handler
    ? <LinearProgress />
    : (
      <div>
        <Layout.Bar title={attempt.test.name} />

        <Grid container justify='center' className={classes.grid} spacing={0}>

          <Grid item xs={12} md={10} lg={8}>

            <Grid container spacing={0}>
              {
                _.get(
                  {
                    content: <StudentTestAttemptContent
                      parent={this}
                      pages={attempt.test.pages}
                      page={page}
                    />,
                    sudoku: <StudentTestAttemptSudoku
                      parent={this}
                      attempt={attempt}
                      sudoku={attempt.sudoku}
                    />,
                  },
                  attempt.test.resolution
                )
              }
            </Grid>

          </Grid>

        </Grid>

        <StudentTestAttemptToolbar
          bottom={bottom}
          onChange={this.handleBottom}
          numPages={attempt.test.pages.length}
          page={page}
        />
      </div>
    );
  }
};

export default withStyles(styles)(StudentTestAttempt);
