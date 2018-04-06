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

import AdminTagsList from './List.jsx';

const styles = theme => ({
  fab: {
    position: 'fixed',
    right: 16,
    bottom: 16,
  },
});

class AdminTags extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { skip=0 } = props;
    this.state = {
      query: {},
      options: { skip },
      collections: {
        tags: {
          handler: true,
          docs: [],
        },
      },
    };
  }

  componentWillMount() {
    this.getTags();
  }

  getTags = () => {
    const { query, options } = this.state;
    this.setState({ collections: { tags: { handler: true } } });
    Meteor.call('AdminTagsGet', query, options,  (err, docs) => {
      if (err) snack({ message: 'Erro ao encontrar tags' });
      this.setState({ collections: { tags: { handler: false, docs } } });
    });
  };

  // Handlers

  handleUpdateQuery({ target: { value: query } }) {
    this.setState({ query });
  }

  handleDelete = (_id) => {
    let dismiss = null;
    dismiss = confirm('Deletar tag?');
    if (!dismiss) return;

    Meteor.call('AdminTagDelete', _id, err => {
      if (err) snack({ message: 'Erro ao deletar tag' });
      else this.getTags();
    });
  };

  render() {
    const { collections, query } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Layout.Bar title='Tags' />

        {
          !_.every(collections, c => !c.handler)
          ? <LinearProgress color='secondary' />
          : <AdminTagsList
            key='list'
            tags={collections.tags.docs}
            query={query}
            handleDelete={this.handleDelete}
          />
        }

        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          href={FlowRouter.path('AdminTag')}
          className={classes.fab}
        >
          <Icon>add</Icon>
        </Button>
      </div>
    );
  }

};

AdminTags.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTags);
