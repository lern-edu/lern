// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  root: {
    padding: 0,
  },
  cell: {
    minHeight: 36,
    minWidth: 36,
    maxWidth: 36,
    border: '1px solid black',
  },
  cellPaper: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    lineHeight: '36px',
  },
  keyboard: {
    textAlign: 'center',
    minHeight: 36,
    minWidth: 100,
    maxWidth: 120,
  },
  options: {
    textAlign: 'center',
    minHeight: 36,
    maxWidth: 86,
  },
  optionsChild: {
    minWidth: 70
  },
});

class StudentTestAttemptSudoku extends React.Component {

  // Lifecycle
  constructor(props) {
    log.info('StudentTestAttemptSudoku.constructor =>', props);
    super(props);
    this.state = { answer: props.sudoku.answer, value: null, backward: [], forward: [], edit: false };
  };

  // Handlers
  handleClick = (value) => {
    this.setState({ value });
  };

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  handleInsertValue = (row, col) => {
    const { sudoku, parent } = this.props;
    const { answer, value } = this.state;

    const index = row * 9 + col;
    if (sudoku.board[index] === 0) {
      this.pushBackward({ row, col, value, old: answer[index] });
      answer[index] = value;
      parent.setState({ bottom: _.every(answer) ? 'finish' : null });
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
    const { row, col, value } = pulled;
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
    const { answer, value, backward, forward, edit } = this.state;

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
                            backgroundColor: (value && value === cell)
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
                            cell
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
                              null
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
                    color={value == 0 ? 'secondary' : 'primary'}
                    onClick={() => this.handleClick(0)}
                    className={classes.optionsChild}
                  >
                    <Icon>clear</Icon>
                  </Button>
                </Grid>

                <Grid item xs={3} className={classes.options} key='edit'>
                  <Button
                    raised
                    color={edit === true ? 'secondary' : 'primary'}
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

