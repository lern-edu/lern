// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { withStyles } from 'material-ui/styles';
import { Test } from 'meteor/duckdodgerbrasl:lern-model';
import { Grid, Icon, Paper, Divider, IconButton, Button, MenuItem } from 'material-ui';
import { ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { Description, Share, Help, Settings, ContentCopy, FileDownload } from 'material-ui-icons';

import StudentTestAttemptSettingsSudoku from './Settings/Sudoku.jsx';
const test = new Test();

const styles = theme => ({
  root: {
    padding: 0,
  },
  cell: {
    minHeight: 32,
    minWidth: 32,
    maxWidth: 32,
    border: '1px solid black',
  },
  cellPaper: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    lineHeight: '32px',
  },
  cellEdit: {
    paddingLeft: 2,
  },
  keyboard: {
    textAlign: 'center',
    minHeight: 32,
    minWidth: 96,
    maxWidth: 120,
  },
  options: {
    textAlign: 'center',
    minHeight: 32,
    maxWidth: 86,
  },
  optionsChild: {
    minWidth: 70,
  },
  editContainer: {
    lineHeight: 1,
    fontSize: 12,
  },
  buttonEdit: {
    zIndex: 999,
    height: 32,
    width: 32,
    position: 'absolute',
  },
});

class StudentTestAttemptSudoku extends React.Component {

  // Lifecycle
  constructor(props) {
    log.info('StudentTestAttemptSudoku.constructor =>', props);
    super(props);
    this.state = {
      answer: props.sudoku.answer,
      value: null,
      backward: [],
      forward: [],
      edit: false,
      clear: false,
      settings: {
        highlight: false,
      },
    };
  };

  componentDidMount() {
    this.renderMenu();
  }

  renderMenu = () => {
    const { collections: { attempt } } = this.props.parent.state;

    console.log('render menu', this);

    let menu = [
      <test.templates.TestDialog key='description'
        doc={attempt.test}
        field='description'
        icon={<Description />}
      />,
      <test.templates.TestDialog key='help'
        doc={attempt.test}
        field='help'
        icon={<Help />}
      />,
      attempt.test.resolution === 'sudoku' ?
        <StudentTestAttemptSettingsSudoku
          key='settings'
          parent={this}
          settings={this.state.settings}
        />
        : null,
      <Divider key='divider-1'/>,
      <MenuItem key='copy'>
        <ListItemIcon><ContentCopy /></ListItemIcon>
        <ListItemText primary="Copy" />
      </MenuItem>,
      <MenuItem key='download'>
        <ListItemIcon><FileDownload /></ListItemIcon>
        <ListItemText primary="Download" />
      </MenuItem>,
      <Divider key='divider-2'/>,
      <MenuItem key='share'>
        <ListItemIcon><Share /></ListItemIcon>
        <ListItemText inset primary="Share" />
      </MenuItem>,
    ];

    this.props.parent.setState({ menu: menu });
  };

  // Handlers
  handleClick = (value) => {
    this.setState({ value });
  };

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit, clear: false });
  };

  toggleClear = () => {
    const { clear, edit, value } = this.state;
    this.setState({ clear: !clear, value: edit ? value : 0 });
  };

  handleInsertValue = (row, col) => {
    const { sudoku, parent } = this.props;
    const { answer, value, edit, clear } = this.state;

    const index = row * 9 + col;

    if (sudoku.board[index] === 0) {

      const backward = { row, col, value, old: _.clone(answer[index]) };

      if (edit) {

        if (!clear && (_.isArray(answer[index]) || !answer[index])) {

          if (_.isArray(answer[index]))
            answer[index].push(value);

          else
            answer[index] = [value];

        } else if (_.isArray(answer[index])) {

          _.pull(answer[index], value);

        }

      } else {
        if (clear) answer[index] = 0;
        else answer[index] = value;
      }

      backward.value = _.clone(answer[index]);

      this.pushBackward(backward);
      parent.setState({ bottom: (_.every(answer, Number) && _.every(answer)) ? 'finish' : null });
      this.setState({ answer });
      this.keepAttemptUpdated('sudoku.answer');
    }
  };

  handleBackward = () => {
    const { backward, forward, answer } = this.state;
    const pulled = _.head(_.pullAt(backward, [backward.length - 1]));
    const { row, col, value, old } = pulled;
    forward.push(pulled);
    answer[row * 9 + col] = old;
    this.keepAttemptUpdated('sudoku.answer');
    this.setState({ backward, forward, answer });
  };

  handleForward = () => {
    const { backward, forward, answer } = this.state;
    const pulled = _.head(_.pullAt(forward, [forward.length - 1]));
    const { row, col, value, old } = pulled;
    backward.push(pulled);
    answer[row * 9 + col] = value;
    this.keepAttemptUpdated('sudoku.answer');
    this.setState({ backward, forward, answer });
  };

  // Util
  pushBackward = (state) => {
    const { backward } = this.state;
    if (backward.length == 10)
      _.pullAt(backward, [0]);
    backward.push(state);
    this.setState({ backward, forward: [] });
  };

  keepAttemptUpdated = (field='answer') => {
    const { attempt } = this.props;
    const { answer } = this.state;
    attempt.set('sudoku.answer', answer);
    Meteor.call('StudentTestAttemptUpdate', attempt, (err, res) => {
      if (err) log.error(err);
    });
  };

  // Render
  render() {
    log.info('StudentTestAttemptSudoku.render =>', this.state);
    const { classes, sudoku } = this.props;
    const { answer, value, backward, forward, edit, clear } = this.state;
    const { settings: { highlight } } = this.state;

    return (
      <Grid container spacing={0} justify='center'>

        <Grid item xs={12}>
          <Grid container spacing={0} justify='center'>
            {
              _.map(
                _.chunk(answer, 9),
                (cells, row) =>
                  <Grid className={classes.root} item xs={12} key={row}>
                    <Grid container spacing={0} justify='center'>

                      {
                        _.map(cells, (cell, col) =>
                          <Grid
                            item
                            xs={1}
                            key={`row${row}-cell${col}`}
                            className={classes.cell}
                            style={{
                              backgroundColor: (highlight && value && value === cell)
                                ? 'yellow'
                                : (col < 3 || col > 5)
                                ? (
                                  (row < 3 || row > 5)
                                  ? 'white'
                                  : 'rgba(0, 0, 0, 0.12)'
                                )
                                : (
                                  (row < 3 || row > 5)
                                    ? 'rgba(0, 0, 0, 0.12)'
                                    : 'white'
                                ),
                            }}
                          >
                            {
                              cell && _.isNumber(cell)
                              ? (
                                <IconButton
                                  className={classes.cellPaper}
                                  onClick={() => this.handleInsertValue(row, col)}
                                  style={{
                                    fontWeight: cell && sudoku.board[row * 9 + col] === cell
                                      ? 'bold'
                                      : 'regular',
                                    color: cell && sudoku.board[row * 9 + col] === cell
                                      ? 'black'
                                      : undefined,
                                  }}
                                >
                                  {cell}
                                </IconButton>
                              )
                              : (
                                <Grid container className={classes.editContainer} spacing={0} justify='center'>
                                  <Grid item xs={12} className={classes.buttonEdit}>
                                    <IconButton
                                      className={classes.cellPaper}
                                      onClick={() => this.handleInsertValue(row, col)}
                                    />
                                  </Grid>
                                  {
                                    _.isArray(cell)
                                    ? _.map(new Array(9), (v, index) =>
                                      <Grid item xs={4} className={classes.cellEdit} key={index + 1}>
                                        {_.includes(cell, index + 1) ? index + 1 : ''}
                                      </Grid>
                                    )
                                    : ''
                                  }
                                </Grid>
                              )
                            }
                          </Grid>
                        )
                      }

                    </Grid>
                  </Grid>
              )
            }
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginTop: 15 }}>

          <Grid container spacing={8} justify='center' direction='row'>

            {
              _.map(new Array(3), (a1, row) =>
                <Grid item xs={12} key={row + 1}>
                  <Grid container spacing={0} justify='center'>
                    {
                      _.map(new Array(3), (a2, col) =>
                        <Grid item xs={4} className={classes.keyboard} key={(row * 3 + col + 1)}>
                          <Button
                            raised
                            color={value == (row * 3 + col + 1) ? 'secondary' : 'primary'}
                            onClick={() => this.handleClick((row * 3 + col + 1))}
                          >
                            {(row * 3 + col + 1)}
                          </Button>
                        </Grid>
                      )
                    }
                  </Grid>
                </Grid>
              )
            }

            <Grid item xs={12} key={4}>
              <Grid container spacing={0} justify='center'>

                <Grid item xs={3} className={classes.options} key='backward'>
                  <Button
                    raised
                    color={value == 'backward' ? 'secondary' : 'primary'}
                    onClick={() => this.handleBackward('backward')}
                    className={classes.optionsChild}
                    disabled={_.isEmpty(backward) ? true : false}
                  >
                    <Icon>arrow_back</Icon>
                  </Button>
                </Grid>

                <Grid item xs={3} className={classes.options} key='forward'>
                  <Button
                    raised
                    color={value == 'forward' ? 'secondary' : 'primary'}
                    onClick={() => this.handleForward('forward')}
                    className={classes.optionsChild}
                    disabled={_.isEmpty(forward) ? true : false}
                  >
                    <Icon>arrow_forward</Icon>
                  </Button>
                </Grid>

                <Grid item xs={3} className={classes.options} key='clear'>
                  <Button
                    raised
                    color={clear ? 'secondary' : 'primary'}
                    onClick={() => this.toggleClear()}
                    className={classes.optionsChild}
                  >
                    <Icon>clear</Icon>
                  </Button>
                </Grid>

                <Grid item xs={3} className={classes.options} key='edit'>
                  <Button
                    raised
                    color={edit ? 'secondary' : 'primary'}
                    onClick={() => this.toggleEdit()}
                    className={classes.optionsChild}
                  >
                    <Icon>edit</Icon>
                  </Button>
                </Grid>

              </Grid>
            </Grid>

          </Grid>

        </Grid>

      </Grid>
    );
  }
};

export default withStyles(styles)(StudentTestAttemptSudoku);
