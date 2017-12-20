import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Paper } from 'material-ui';
import SudokuCell from './Cell.jsx';
import _sudoku from 'sudoku';
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
      <div>
        <table
          style={{
            border: '1px solid black',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '16pt',
            textAlign: 'center',
          }}>
          <tbody>
            {_.map(_.chunk(answer, 9), (row, idx) =>
              <tr
                style={{
                  border: '0.8px black solid',
                  borderBottom: idx == 2 || idx == 5 ? '3px black solid' : '1px black solid',
                }}
                key={idx}>
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
                    style={{
                      width: 35,
                      height: 35,
                    }}
                  />
                )}
              </tr>
            )}
          </tbody>
        </table>
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
