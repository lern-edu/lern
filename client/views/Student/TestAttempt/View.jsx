// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { Test } from 'meteor/duckdodgerbrasl:lern-model';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { LinearProgress, CircularProgress } from 'material-ui/Progress';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import { Description, Help, MoreVert } from 'material-ui-icons';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';

import StudentTestAttemptContent from './Content.jsx';
import StudentTestAttemptSudoku from './Sudoku.jsx';
import StudentTestAttemptToolbar from './Toolbar.jsx';

const test = new Test();
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
  primaryIconButton: {
    color: '#FFF',
  },
});

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
      menu: [],
      anchorEl: null,
      open: false,
      field: null,
      dialogData: null,
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

  handleToggleMenu = event => {
    const { anchorEl } = this.state;
    this.setState({ anchorEl: !anchorEl ? (event && event.currentTarget) : null });
  };

  handleClickOpen = field => {
    const { collections: { attempt } } = this.state;
    console.log(field)
    this.setState({ field, open: true, dialogData: attempt.test[field], anchorEl: null });
  };

  handleClickClose = () => {
    this.setState({ field: null, open: false, dialogData: null });
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
      menu,
      anchorEl,
      open,
      field,
      dialogData,
    } = this.state;

    return handler
    ? <LinearProgress />
    : (
      <div>
        <Layout.Bar title={attempt.test.name} disableActions={true}>
          <div>
            <IconButton
              aria-label='More'
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup='true'
              onClick={this.handleToggleMenu}
            >
              <MoreVert className={classes.primaryIconButton} />
            </IconButton>
            <Menu
              id='long-menu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleToggleMenu}
            >
            <MenuItem onClick={() => this.handleClickOpen('description')}>
              <ListItemIcon>{<Description />}</ListItemIcon>
              <ListItemText inset primary={i18n.__('StudentTestAttempt.appBarChildren.description')} />
            </MenuItem>
            <MenuItem onClick={() => this.handleClickOpen('help')}>
              <ListItemIcon>{<Help />}</ListItemIcon>
              <ListItemText inset primary={i18n.__('StudentTestAttempt.appBarChildren.help')} />
            </MenuItem>
              
              {
                attempt.test.resolution !== 'sudoku'
                  ? undefined
                  : (
                    <StudentTestAttemptSettingsSudoku
                      key='settings'
                      parent={this}
                      settings={this.state.settings}
                    />
                  )
              }
            </Menu>
          </div>
        </Layout.Bar>

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
        
        {
          !open
          ? undefined
          : (
            <test.templates.TestDialog key='dialog'
              open={open}
              doc={dialogData}
              handleClickClose={this.handleClickClose}
              title={i18n.__('StudentTestAttempt.appBarChildren.' + field)}
            />
          )
        }

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
