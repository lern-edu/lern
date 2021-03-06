import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

// Styles
const styles = theme => ({
  input: {
    width: '100%',
  },
});

class AdminTestText extends React.Component {

  handleChange = ({ target: { value } }) => {
    const { doc, field, parent } = this.props;
    doc.set(field, value);
    parent.setState({ doc });
    doc.validate({ fields: [field] }, (err) => {
      if (err) parent.setState({ errors: { [field]: { message: err.reason, error: true } } });
      else parent.setState({ errors: { [field]: { message: undefined, error: false } } });
    });

  };

  render() {
    const { error: { error, message }={}, doc, field, classes } = this.props;
    return (
      <FormControl error={error} className={classes.input}>
        <InputLabel htmlFor='name'>Name</InputLabel>
        <Input
          value={doc.get(field) || ''}
          onChange={this.handleChange}
          className={classes.input}
        />
        {
          !error
          ? undefined
          : <FormHelperText>{message}</FormHelperText>
        }

      </FormControl>
    );
  };

};

AdminTestText.propTypes = {
  classes: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};

export default withStyles(styles)(AdminTestText);