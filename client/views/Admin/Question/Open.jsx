import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Input, { InputLabel } from '@material-ui/core/Input';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core';
import Radio, { RadioGroup } from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

// Styles
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
  input: {
    width: '100%',
  },
});

class AdminQuestionOpen extends React.Component {

  componentDidMount() {
    this.props.parent.updateValidation('answer');
  };

  handleChange = ({ target: { value: answer } }) => {
    const { parent } = this.props;
    parent.defaultHandler({ 'answer.open': answer }, { doc: true });
  };

  render() {
    const { errors, doc, field, options, classes } = this.props;

    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <FormControl error={!!errors.answer} className={classes.input}>
            <InputLabel htmlFor={field}>Answer</InputLabel>
            <Input
              className={classes.input}
              value={_.get(doc, 'answer.open') || ''}
              onChange={this.handleChange}
              multiline={true}
            />
            {
              !errors.answer
              ? undefined
              : <FormHelperText>{errors.answer}</FormHelperText>
            }
          </FormControl>
        </Paper>
      </Grid>
    );
  };

};

AdminQuestionOpen.propTypes = {
  doc: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminQuestionOpen);
