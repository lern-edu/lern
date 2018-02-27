import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

class AdminTestSelect extends React.Component {

  componentWillMount() {
    const { doc, field, parent } = this.props;
    doc.validate({ fields: [field] }, (err) => {
      if (err) parent.setState({ errors: { [field]: { message: err.reason, error: true } } });
      else parent.setState({ errors: { [field]: { message: undefined, error: false } } });
    });
  };

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
    const { error: { error, message }={}, doc, field, options } = this.props;

    return (
      <FormControl error={error}>
        <InputLabel htmlFor={field}>{field}</InputLabel>
        <Select
          value={doc.get(field) || ''}
          onChange={this.handleChange}
          input={<Input id={field} />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 200,
              },
            },
          }}
        >
          {
            _.map(options, op =>
              <MenuItem key={op} value={op} >{op}</MenuItem>
            )
          }
        </Select>

        {
          !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
        }
      </FormControl>
    );
  };

};

AdminTestSelect.propTypes = {
  doc: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default AdminTestSelect;