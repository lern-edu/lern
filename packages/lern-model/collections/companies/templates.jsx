import React from 'react';
import User from '../users/schema.js';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const Templates = {};

if (Meteor.isServer) {
  Meteor.methods({
    GetUsers(text) {
      return User.find({}).fetch();
    },
  });
}

if (Meteor.isClient) {

  function toolbar(label, onChange, { query, error, message }) {
    return (
      <AppBar position='static' color='default' key='toolbar'>
        <Toolbar>
          <FormControl fullWidth error={error}>
            <InputLabel htmlFor={label}>{label}</InputLabel>
            <Input
              value={query}
              onChange={onChange}
            />
            {
              !error
              ? undefined
              : <FormHelperText>{message}</FormHelperText>
            }

          </FormControl>
        </Toolbar>
      </AppBar>
    );
  };

  class Name extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
      };
    }

    handleChange({ target: { value } }) {
      const { form, doc } = this.props;
      doc.name = value;
      form.setState({ collections: { company: { doc } } });
      doc.validate({ fields: [`name`] }, (err) => {
        if (err)
          this.setState({ message: err.reason, error: true });
        else
          this.setState({ message: undefined, error: false });
      });

    }

    render() {
      const { form, doc } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl  error={error}>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <Input
            value={doc.name}
            onChange={this.handleChange.bind(this)}
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

  class Admins extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: '',
        error: false,
        message: undefined,
        users: null,
      };
    }

    handleChange({ target: { value } }) {
      const { form, doc } = this.props;
      doc.name = value;
      form.setState({ collections: { company: { doc } } });
      doc.validate({ fields: [`name`] }, (err) => {
        if (err)
          this.setState({ message: err.reason, error: true });
        else
          this.setState({ message: undefined, error: false });
      });

    }

    handleQuery({ target: { value: query } }) {
      this.setState({ query });
      if (query.length == 3)
        Meteor.call('GetUsers', 'text', (err, docs) => {
          if (err) snack({ message: 'Erro ao encontrar usuários' });
          else this.setState({ users: docs });
        });
    }

    render() {
      const { form, doc } = this.props;
      const { users } = this.state;
      return (
        <div>
          {
            [
              toolbar(
                'Search for adminstrators',
                this.handleQuery.bind(this),
                this.state,
              ),
            ]
          }

          <List>

            {
              _.map(users, ({ _id, profile: { name } }) =>
                <ListItem
                  button
                  key={_id}
                >
                  <ListItemText primary={name} />
                </ListItem>
              )
            }

          </List>

        </div>
      );
    }
  };

  Templates.Name = Name;
  Templates.Admins = Admins;
};

export default Templates;
