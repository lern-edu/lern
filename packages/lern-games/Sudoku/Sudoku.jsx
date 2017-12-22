import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import _sudoku from 'sudoku';
import _ from 'lodash';

import SudokuDraw from './SudokuDraw.jsx';
import Timer from './Timer.jsx';

class Sudoku extends React.Component {

  // Lifecycle
  constructor(props) {
    super(props);
    const { sudoku, answer, rate } = props;
    this.state = {
      complete: false,
      valid: false,
      rate: rate,
      answer: answer || sudoku.slice(),
      sudoku: sudoku,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sudoku !== nextProps.sudoku ||
        this.props.answer !== nextProps.answer) {
      this.setState({
        complete: false,
        valid: false,
        rate: nextProps.rate,
        answer: nextProps.answer || nextProps.sudoku.slice(),
        sudoku: nextProps.sudoku,
      });
    }
  }

  validate() {
    const { answer } = this.state;
    var conflict = false;
    var conflictRow = false;
    for (var row = 0; row < 9; row++) {
      var cRow = _.fill(new Array(9), false);
      for (var col = 0; col < 9; col++) {
        conflictRow = conflictRow || cRow[answer[row * 9 + col] - 1];
        cRow[answer[row * 9 + col] - 1] = true;
      }

      console.log('row: ' + row, cRow, conflictRow, _.every(cRow));
    }

    var conflictCol = false;
    for (var col = 0; col < 9; col++) {
      var cCol = _.fill(new Array(9), false);
      for (var row = 0; row < 9; row++) {
        conflictCol = conflictCol || cCol[answer[row * 9 + col] - 1];
        cCol[answer[row * 9 + col] - 1] = true;
      }

      console.log('col: ' + col, cCol, conflictCol, _.every(cCol));
    }

    var conflictGrid = false;
    for (var i = 0; i < 9; i += 3) {
      for (var j = 0; j < 9; j += 3) {
        var cGrid = _.fill(new Array(9), false);
        for (var row = i; row < i + 3; row++) {
          for (var col = j; col < j + 3; col++) {
            conflictGrid = conflictGrid || cGrid[answer[row * 9 + col] - 1];
            cGrid[answer[row * 9 + col] - 1] = true;
          }
        }

        console.log('grid: ' + i + ',' + j, cGrid, conflictGrid, _.every(cGrid));
      }
    }

    console.log(conflictRow, conflictCol, conflictGrid);

    conflict |= conflictRow || conflictCol || conflictGrid;

    return !conflict;
  }

  updateAnswer(value, row, col) {
    const { answer } = this.state;
    if (value !== '' && !/^[1-9]$/.test(value)) {
      return;
    }

    //console.log(value, row, col);
    answer[row * 9 + col] = value;
    const isCompleted = this.isComplete();

    this.setState({
      complete: isCompleted,
      valid: isCompleted && this.validate(),
      answer: answer,
    });

    this.props.handleSudokuAnswer && this.props.handleSudokuAnswer(answer);
  }

  isComplete() {
    const { answer } = this.state;
    return _.every(answer, a => a && a >= 1 && a <= 9);
  }

  // render
  render() {
    const { input } = this.props;
    const { sudoku, valid } = this.state;

    return (
      <div>
        <SudokuDraw
          {...this.state}
          input={input}
          updateAnswer={this.updateAnswer.bind(this)}
        />
      </div>
    );
  }
}

Sudoku.propTypes = {
  input: PropTypes.bool.isRequired,
  sudoku: PropTypes.array.isRequired,
  rate: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  attempts: PropTypes.number.isRequired,
  reset: PropTypes.bool,
  answer: PropTypes.array,
  handleSudokuAnswer: PropTypes.func,
};

export default Sudoku;
