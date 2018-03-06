// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';

// const styles = theme => ({
// });

// this.state.bottom = [null, 'finish', 'loading'];
class StudentTestAttemptSudoku extends React.Component {

  // Lifecycle
  constructor(props) {
    log.info('StudentTestAttemptSudoku.constructor =>', props);
    super(props);
    this.state = { answer: props.sudoku.answer };
  };

  // Handlers

  // Render
  render() {
    log.info('StudentTestAttemptSudoku.render =>', this.state);
    const { classes, sudoku } = this.props;
    const { answer } = this.state;

    return(
      <Grid container justify='center' spacing={0}>
        {
          _.map(
            _.chunk(answer, 9),
            (row, idx) =>
              <Grid item xs={12} key={idx}>
              
                {
                  _.map(row, (cell, i) =>
                    <Grid item key={`row${idx}-col${i}`}>
                      <Paper>
                        {cell}
                      </Paper>
                    </Grid>
                  )
                }
              
              </Grid>
          )
        }

      </Grid>
    );
  }
};

export default StudentTestAttemptSudoku;
