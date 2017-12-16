// Libs
import React from 'react';
import { Layout, Snackbar } from 'meteor/duckdodgerbrasl:lern-layouts';

class AdminUsers extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { skip=0 } = props;
    this.state = {
      query: {},
      options: { skip, limit: 20 },
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
      console.error(err);
      if (err) snack({ message: 'Erro ao encontrar usuários' });
      this.setState({ collections: { users: { handler: false, docs } } });
    });
  }

  render() {

    console.log(this.state.collections);

    return (
      <div>
        <Layout.Bar title='Usuários' />
      </div>
    );
  }

};

export default AdminUsers;
