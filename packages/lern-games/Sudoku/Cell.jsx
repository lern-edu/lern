import React from 'react';
import { CircularProgress, Paper } from 'material-ui';

class SudokuCell extends React.Component {

  // render
  render() {
    const { disabled, value, updateAnswer, row, col } = this.props;

    return (
      <div style={{
          borderRight: col == 2 || col == 5 ? '3px black solid' : '1px black solid',
          borderBottom: row == 2 || row == 5 ? '3px black solid' : '1px black solid',
          boxSizing: 'border-box',
          flex: 1,
          position: 'relative',
        }}
        key='before'
      >
        <input
          disabled={disabled}
          onInput={(e) => updateAnswer(e.target.value, row, col)}
          value={value || ''}
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '100%',
            textAlign: 'center',
          }}
        />
        <div key='after' style={{ content: '', display: 'block', paddingBottom: '100%' }}></div>
      </div>
    );
  }
}

export default SudokuCell;
