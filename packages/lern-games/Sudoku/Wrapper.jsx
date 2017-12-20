import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, Select, Input, MenuItem } from 'material-ui';
import Sudoku from '../Sudoku';
import Timer from './Timer.jsx';
import _sudoku from 'sudoku';
import boards from './boards';
import _ from 'lodash';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Wrapper extends React.Component {

  constructor(props) {
    super(props);
    const sudoku = _.sample(_.get(boards, 'easy'));
    this.state = {
      rate: 'easy',
      times: 0,
      sudoku: sudoku,
      answer: sudoku.slice(),
    };
  }

  handleSudoku() {
    const { rate } = this.state;
    this.props.clearTimer();
    const sudoku = _.sample(_.get(boards, rate));
    this.setState({
      times: 0,
      sudoku: sudoku,
      answer: sudoku.slice(),
    });
  }

  reset() {
    const { sudoku, rate, times } = this.state;
    this.props.clearTimer();
    this.setState({
      times: times + 1,
      sudoku: sudoku,
      answer: sudoku.slice(),
    });
  }

  handleSudokuAnswer(answer) {
    this.setState({ answer });
  }

  render() {
    const { classes } = this.props;
    const { sudoku, answer, rate, reset } = this.state;

    return (
      <div>
        <Sudoku
          input={true}
          sudoku={sudoku}
          answer={answer}
          rate={rate}
          handleSudokuAnswer={this.handleSudokuAnswer.bind(this)}
        />
        <div className={classes.toolbar}>
          {this.props.time}
          <Select
            value={this.state.rate}
            onChange={(event) => this.setState({ rate: event.target.value })}
          >
            <MenuItem value={'easy'}>Fácil</MenuItem>
            <MenuItem value={'medium'}>Moderado</MenuItem>
            <MenuItem value={'hard'}>Difícil</MenuItem>
          </Select>
          <Button
            raised
            onClick={this.handleSudoku.bind(this)}
          >
            Novo
          </Button>
          <Button
            raised
            onClick={this.reset.bind(this)}
          >
            Resetar
          </Button>

        </div>
      </div>
    );
  }
}

Wrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  clearTimer: PropTypes.func.isRequired,
};

export default withStyles(styles)(Timer(Wrapper));
