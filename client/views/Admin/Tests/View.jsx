// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import { Layout, Snackbar } from 'meteor/duckdodgerbrasl:lern-layouts';

import AdminTestsList from './List.jsx';

const styles = theme => ({
  fab: {
    position: 'fixed',
    right: 16,
    bottom: 16,
  },
});

class AdminTests extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { skip=0 } = props;
    this.state = {
      query: {},
      options: { skip },
      collections: {
        tests: {
          handler: true,
          docs: [],
        },
      },
    };
  }

  componentWillMount() {
    const { query, options } = this.state;

    Meteor.call('AdminTestsGet', query, options,  (err, docs) => {
      if (err) snack({ message: 'Erro ao encontrar testes' });
      this.setState({ collections: { tests: { handler: false, docs } } });
    });
  }

  // Handlers

  handleUpdateQuery({ target: { value: query } }) {
    this.setState({ query });
  }

  render() {
    const { collections, query } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Layout.Bar title='Tests' />

        {
          !_.every(collections, c => !c.handler)
          ? <LinearProgress color='secondary' />
          : <AdminTestsList key='list' tests={collections.tests.docs} query={query} />
        }

        <Button
          fab
          color='primary'
          aria-label='add'
          href={FlowRouter.path('AdminTest')}
          className={classes.fab}
        >
          <Icon>add</Icon>
        </Button>
      </div>
    );
  }

};

AdminTests.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTests);
