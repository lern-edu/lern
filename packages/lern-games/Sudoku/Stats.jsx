import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, Select, Input, MenuItem, Toolbar } from 'material-ui';
import Sudoku from '../Sudoku';
import Timer from './Timer.jsx';
import _sudoku from 'sudoku';
import boards from './boards';
import _ from 'lodash';

const styles = theme => ({

});

class Stats extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes, time, attempts } = this.props;

    return (
      <div>
        <p>Concluído</p>
        <p>Tempo necessário: {time}</p>
        <p>Tentativas: {attempts}</p>
      </div>
    );
  }
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  attempts: PropTypes.number.isRequired,
};

export default withStyles(styles)(Stats);
