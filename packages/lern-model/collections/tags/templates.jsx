import React from 'react';
import _ from 'lodash';
import StaticCollections from '../static.js';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Content from '../../schemas/content/schema.js';
const content = new Content();

const Templates = {};

if (Meteor.isClient) {
  const ContentCreate = _.get(content, 'templates.ContentCreate');
  const ContentShow = _.get(content, 'templates.ContentShow');

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
      form.setState({ collections: { tag: { doc } } });
      doc.validate({ fields: [`name`] }, (err) => {
        if (err) this.setState({ message: err.reason, error: true });
        else this.setState({ message: undefined, error: false });
      });

    };

    render() {
      const { form, doc, Input } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <Input
            value={doc.name}
            onChange={this.handleChange}
            {...this.props}
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

  class DescriptionCreate extends React.Component {
    constructor(props) {
      super(props);
    };

    render() {
      const { form, doc } = this.props;
      return (
        <content.templates.ContentCreate
          Schema={Content}
          doc={doc}
          form={form}
          contentTypes={StaticCollections.ContentTypes}
        />
      );
    }
  };

  class DescriptionShow extends React.Component {
    render() {
      const { content } = this.props;
      return <ContentShow doc={content} />;
    }
  };

  Templates.Name = Name;
  Templates.DescriptionCreate = DescriptionCreate;
  Templates.DescriptionShow = DescriptionShow;

};

export default Templates;
