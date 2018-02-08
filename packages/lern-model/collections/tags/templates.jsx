import React from 'react';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import _ from 'lodash';
import Content from '../../schemas/content/schema.js';

import StaticCollections from '../static.js';

const Templates = {};

if (Meteor.isClient) {

  class Name extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
      };
    }

    handleChange = ({ target: { value } }) => {
      const { form, doc } = this.props;
      doc.name = value;
      form.setState({ collections: { user: { doc } } });
      doc.validate({ fields: [`name`] }, (err) => {
        if (err) this.setState({ message: err.reason, error: true });
        else this.setState({ message: undefined, error: false });
      });

    };

    render() {
      const { form, doc } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <Input
            value={doc.name}
            onChange={this.handleChange}
          />
          {
            !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
          }

        </FormControl>
      );
    }
  };

  class Description extends React.Component {
    constructor(props) {
      super(props);
    };

    handleChange = ({ target: { value } }) => {
      const { form, doc } = this.props;
      doc.name = value;
      form.setState({ collections: { user: { doc } } });
      doc.validate({ fields: [`name`] }, (err) => {
        if (err) this.setState({ message: err.reason, error: true });
        else this.setState({ message: undefined, error: false });
      });

    };

    render() {
      const { form, doc } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <Input
            value={doc.name}
            onChange={this.handleChange}
          />
          {
            !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
          }

        </FormControl>
      );
    }
  };

  Templates.Name = Name;
  Templates.Description = Description;

};

export default Templates;
