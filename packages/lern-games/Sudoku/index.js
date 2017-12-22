import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, Select, Input, MenuItem, Toolbar } from 'material-ui';
import SudokuDraw from './SudokuDraw.jsx';
import Timer from './Timer.jsx';
import _sudoku from 'sudoku';
import boards from './boards';
import _ from 'lodash';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    margin: '0 20px',
  },
});

class Wrapper extends React.Component {

  constructor(props) {
    super(props);
    const game = localStorage.getItem('game');
    const sudoku = _.sample(_.get(boards, 'easy'));
    this.state = {
      rate: 'easy',
      attempts: 0,
      sudoku: sudoku,
      answer: sudoku.slice(),
    };
  }

  handleSudoku() {
    const { rate } = this.state;
    this.props.clearTimer();
    const { time, attemps } = this.props;
    const sudoku = _.sample(_.get(boards, rate));
    var game = {
      attempts: 0,
      sudoku: sudoku,
      answer: sudoku.slice(),
    };
    localStorage.setItem('game', JSON.stringify({ ...game, time, attemps }));
    this.setState(game);
  }

  reset() {
    const { sudoku, rate, attempts } = this.state;
    this.props.clearTimer();
    this.setState({
      attempts: attempts + 1,
      sudoku: sudoku,
      answer: sudoku.slice(),
    });
  }

  handleSudokuAnswer(answer) {
    this.setState({ answer });
  }

  render() {
    const { classes, time } = this.props;
    const { sudoku, answer, rate, reset, attempts } = this.state;

    return (
      <div>
        <SudokuDraw
          input={true}
          sudoku={sudoku}
          answer={answer}
          rate={rate}
          attempts={attempts}
          time={time}
          handleSudokuAnswer={this.handleSudokuAnswer.bind(this)}
        />
        <Toolbar className={classes.toolbar}>
          <div className={classes.content}>
            {this.props.time}
          </div>
          <Select
            className={classes.content}
            value={this.state.rate}
            onChange={(event) => this.setState({ rate: event.target.value })}
          >
            <MenuItem value={'easy'}>Fácil</MenuItem>
            <MenuItem value={'medium'}>Moderado</MenuItem>
            <MenuItem value={'hard'}>Difícil</MenuItem>
          </Select>
          <Button
            raised
            className={classes.content}
            onClick={this.handleSudoku.bind(this)}
          >
            Novo
          </Button>
          <Button
            raised
            className={classes.content}
            onClick={this.reset.bind(this)}
          >
            Resetar
          </Button>
          <div className={classes.content}>
            Tentativas: {attempts}
          </div>
        </Toolbar>
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
