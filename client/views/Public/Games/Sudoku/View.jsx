import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Sudoku } from 'meteor/duckdodgerbrasl:lern-games';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';

const styles = theme => ({
  container: {
    margin: '20px auto',
    /*display: 'flex',
    flexWrap: 'wrap',*/
  },
});

class PublicGamesSudoku extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Layout.Bar title='Sudoku' />
        <div className={classes.container}>
          <Sudoku />
        </div>
      </div>
    );
  }
}

PublicGamesSudoku.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicGamesSudoku);
