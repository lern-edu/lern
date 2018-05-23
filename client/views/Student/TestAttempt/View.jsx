import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { Test } from 'meteor/duckdodgerbrasl:lern-model';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { LinearProgress, CircularProgress } from '@material-ui/core';
import BottomNavigation, { BottomNavigationAction } from '@material-ui/core/BottomNavigation';
import { Description, Help, MoreVert, Settings } from 'material-ui-icons';
import { ListItemIcon, ListItemText } from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuItem } from '@material-ui/core/Menu';
import Checkbox from '@material-ui/core/Checkbox';

import StudentTestAttemptContent from './Content.jsx';
import StudentTestAttemptSudoku from './Sudoku.jsx';
import StudentTestAttemptToolbar from './Toolbar.jsx';

const test = new Test();
const styles = theme => ({
  loading: {
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    width: '100%',
    loading: 0,
  },
  grid: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 56,
    width: '99%',
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
      loading: null,
      page: 0,
      menu: [],
      anchorEl: null,
      testHelp: { open: false, field: null, dialogData: null },
      sudokuHighlight: true,
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
  handleBack = () => {
    log.info('handleBack=', this.state);
    const { collections: { attempt, attempt: { test: { time } } }, page } = this.state;
    if (page > 0 && (time.timeoutType === 'global' || time.timeoutType === 'none')) {
      this.setState({
        page: page - 1,
      });
    }
  };

  handleNext = () => {
    log.info('handleNext=', this.state);
    const { collections: { attempt, attempt: { test: { time } } }, page } = this.state;

    if (page < attempt.test.pages.length - 1) {
      if (time.timeoutType === 'global' || time.timeoutType == 'none') {
        this.setState({
          page: page + 1,
        });
      } else if (time.timeoutType === 'page') {
        this.setState({ loading: true, handler: true });
        Meteor.call('StudentTestAttemptChangePage', attempt._id, page, page + 1, (err, doc) => {
          if (err || !doc) {
            log.info('StudentTestAttempt.TestAttemptChangePage => error =>', err);
            snack({ message: 'Erro ao mudar de página' });
            this.setState({ loading: false, handler: false });
          } else {
            this.setState({
              page: page + 1,
              loading: false,
              collections: { attempt: doc },
              handler: false,
            });
          };
        });
      }
    }
  };

  handleDismiss = () => {
    log.info('handleDismiss=', this.state);
    const { collections: { attempt }, page } = this.state;
    let dismiss = confirm(i18n.__(`StudentTestAttempt.warning.dismiss`));;
    if (!dismiss) return;

    this.setState({ loading: true });
    Meteor.call('StudentTestAttemptFinish', attempt._id, true, (err, doc) => {

      if (err || !doc) {
        log.info('StudentTestAttempt.TestAttemptFinish => error =>', err);
        if (err && err.error === 501)
          snack({ message: i18n.__('StudentTestAttempt.error.sudokuInvalid') });
        else
          snack({ message: i18n.__('StudentTestAttempt.error.findTest') });
        this.setState({ loading: false });
      } else {
        log.info('StudentTestAttempt.TestAttemptFinish => finish =>', doc);
        snack({ message: i18n.__('StudentTestAttempt.success.thankYou') });
        FlowRouter.go('StudentHome');
      };

    });
  };

  handleFinish = (forced=false) => {
    log.info('handleFinish=', this.state);
    const { loading, collections: { attempt }, page } = this.state;

    if (page < attempt.test.pages.length - 1 && !forced) {
      snack(i18n.__(`StudentTestAttempt.warning.${attempt.test.resolution}`));
      return;
    } else {
      this.setState({ loading: true });
      if (forced) {
        snack({ message: 'Acabou o tempo!' });
      }

      Meteor.call('StudentTestAttemptFinish', attempt._id, false, (err, doc) => {

        if (err || !doc) {
          log.info('StudentTestAttempt.TestAttemptFinish => error =>', err);
          if (err && err.error === 501)
            snack({ message: i18n.__('StudentTestAttempt.error.sudokuInvalid') });
          else
            snack({ message: i18n.__('StudentTestAttempt.error.findTest') });
          this.setState({ loading: false });
        } else {
          log.info('StudentTestAttempt.TestAttemptFinish => finish =>', doc);
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
    this.setState({
      testHelp: { field, open: true, dialogData: attempt.test[field] },
      anchorEl: null,
    });
  };

  handleClickSudokuSettings = () => {
    this.setState({ sudokuSettings: true, anchorEl: null });
  };

  handleClickClose = () => {
    this.setState({ testHelp: { field: null, open: false, dialogData: null } });
  };

  handleClickSudokuHighlight = () => {
    this.setState({ sudokuHighlight: !this.state.sudokuHighlight });
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
      loading,
      page,
      menu,
      anchorEl,
      testHelp: {
        open,
        field,
        dialogData,
      },
      sudokuHighlight,
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
              {
                _.isEmpty(attempt.test.help)
                ? undefined
                : (
                  <MenuItem onClick={() => this.handleClickOpen('help')}>
                    <ListItemIcon>{<Help />}</ListItemIcon>
                    <ListItemText inset primary={i18n.__('StudentTestAttempt.appBarChildren.help')} />
                  </MenuItem>
                )
              }
              {
                attempt.test.resolution !== 'sudoku'
                  ? undefined
                  : [
                    <Divider key='dividerSudoku' />,
                    <ListSubheader key='titleSudoku'>
                      {i18n.__('StudentTestAttempt.appBarChildren.sudoku.title')}
                    </ListSubheader>,
                    <MenuItem key='menuSudoku' onClick={this.handleClickSudokuHighlight}>
                      <ListItemIcon>
                        <Checkbox
                          checked={sudokuHighlight}
                          onChange={this.handleClickSudokuHighlight}
                        />
                      </ListItemIcon>
                      <ListItemText
                        inset
                        primary={i18n.__('StudentTestAttempt.appBarChildren.sudoku.highlight')}
                      />
                    </MenuItem>,
                  ]
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
                      highlight={sudokuHighlight}
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
          loading={loading}
          attempt={attempt}
          page={page}
          handleBack={this.handleBack}
          handleNext={this.handleNext}
          handleDismiss={this.handleDismiss}
          handleFinish={this.handleFinish}
        />
      </div>
    );
  }
};

export default withStyles(styles)(StudentTestAttempt);
