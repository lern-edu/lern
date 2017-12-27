import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import _ from 'lodash';

const Templates = {};

if (Meteor.isClient) {
  class Emails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
      };
    }

    handlerChange({ target: { value } }) {
      const { form, doc, index } = this.props;
      doc.emails[index].address = value;
      form.setState({ collections: { user: { doc } } });
      doc.validate({ fields: [`emails.${index}.address`] }, (err) => {
        if (err)
          this.setState({ message: err.reason, error: true });
        else
          this.setState({ message: undefined, error: false });
      });

    }

    render() {
      const { form, doc, index } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id='email'
            type='email'
            value={_.get(doc, `emails[${index}].address`)}
            onChange={this.handlerChange.bind(this)}
          />
          {
            !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
          }

          <FormHelperText>
            {
              _.get(doc, `emails[${index}].verified`)
              ? 'Email verified'
              : 'Email not verified'
            }
          </FormHelperText>

        </FormControl>
      );
    }
  };

  Templates.Emails = Emails;
};

export default Templates;
