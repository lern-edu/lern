import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Paper } from '@material-ui/core';
import SudokuCell from './Cell.jsx';
import lodash from 'lodash';
const _ = lodash;

class SudokuDraw extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sudoku != this.props.sudoku
      || nextProps.answer != this.props.sudoku) {
      return true;
    }

    return false;
  }

  // render

  render() {
    const { classes, input=true, updateAnswer, answer, sudoku } = this.props;

    return (
      <div
        style={{
          /*border: '1px solid black',*/
          marginLeft: 'auto',
          marginRight: 'auto',
          fontSize: '1.6em',
          textAlign: 'center',
          width: '70%',
          maxWidth: '81vh',
        }}>
        {_.map(_.chunk(answer, 9), (row, idx) =>
          <div
            key={idx}
            style={{ display: 'flex' }}
          >
            {_.map(row, (cell, i) =>
              <SudokuCell
                key={`row${idx}-col${i}`}
                updateAnswer={updateAnswer}
                row={idx}
                col={i}
                value={cell}
                disabled={!(input &&
                  (sudoku[idx * 9 + i] === null ||
                  sudoku[idx * 9 + i] === 0))
                }
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

SudokuDraw.propTypes = {
  input: PropTypes.bool.isRequired,
  sudoku: PropTypes.array.isRequired,
  answer: PropTypes.array,
  updateAnswer: PropTypes.func,
};

export default SudokuDraw;
