// Libs
import React from 'react';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { LinearProgress } from 'material-ui/Progress';
import { Layout, Snackbar } from 'meteor/duckdodgerbrasl:lern-layouts';

import AdminUsersList from './List.jsx';

class AdminUsers extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { skip=0 } = props;
    this.state = {
      query: {},
      options: { skip },
      collections: {
        users: {
          handler: true,
          docs: [],
        },
      },
    };
  }

  componentWillMount() {
    const { query, options } = this.state;

    Meteor.call('AdminGetUsers', query, options,  (err, docs) => {
      if (err) snack({ message: 'Erro ao encontrar usuários' });
      this.setState({ collections: { users: { handler: false, docs } } });
    });
  }

  // Handlers

  handleUpdateQuery({ target: { value: query } }) {
    this.setState({ query });
  }

  render() {
    const { collections, query } = this.state;

    return (
      <div>
        <Layout.Bar title='Usuários' />

        {
          !_.every(collections, c => !c.handler)
          ? <LinearProgress color='accent' />
          : (
            [
              <AppBar position='static' color='default' key='toolbar'>
                <Toolbar>
                  <TextField
                    label='Pesquisar'
                    placeholder='Pesquisar'
                    onChange={this.handleUpdateQuery.bind(this)}
                    fullWidth
                    margin='normal'
                  />
                </Toolbar>
              </AppBar>,
              <AdminUsersList key='list' users={collections.users.docs} query={query} />,
            ]
          )
        }
      </div>
    );
  }

};

export default AdminUsers;
