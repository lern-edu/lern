import React from 'react';
import { CircularProgress, Paper } from 'material-ui';
import _sudoku from 'sudoku';

class SudokuCell extends React.Component {

  // render
  render() {
    const { disabled, value, updateAnswer, row, col } = this.props;

    return (
      <td style={{ borderRight: col == 2 || col == 5 ? '3px black solid' : '1px black solid' }}>
        <input
          disabled={disabled}
          onInput={(e) => updateAnswer(e.target.value, row, col)}
          value={value || ''}
          style={{ width: 35, textAlign: 'center' }}
        />
      </td>
    );
  }
}

export default SudokuCell;
