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

import AdminQuestionsList from './List.jsx';

const styles = theme => ({
  fab: {
    position: 'fixed',
    right: 16,
    bottom: 16,
  },
});

class AdminQuestions extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { skip=0 } = props;
    this.state = {
      query: {},
      options: { skip },
      collections: {
        questions: {
          handler: true,
          docs: [],
        },
      },
    };
  }

  componentWillMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    const { query, options } = this.state;
    this.setState({ collections: { questions: { handler: true } } });
    Meteor.call('AdminQuestionsGet', query, options,  (err, docs) => {
      if (err) snack({ message: 'Erro ao encontrar questões ' });
      this.setState({ collections: { questions: { handler: false, docs } } });
    });
  };

  // Handlers

  handleUpdateQuery({ target: { value: query } }) {
    this.setState({ query });
  }

  handleDelete = (_id) => {
    let dismiss = null;
    dismiss = confirm('Deletar questão?');
    if (!dismiss) return;

    Meteor.call('AdminQuestionDelete', _id, err => {
      if (err) snack({ message: 'Erro ao deletar questão' });
      else this.getQuestions();
    });
  };

  render() {
    const { collections, query } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Layout.Bar title='Questions' />

        {
          !_.every(collections, c => !c.handler)
          ? <LinearProgress color='secondary' />
          : <AdminQuestionsList
            key='list'
            questions={collections.questions.docs}
            query={query}
            handleDelete={this.handleDelete}
          />
        }

        <Button
          fab
          color='primary'
          aria-label='add'
          href={FlowRouter.path('AdminQuestion')}
          className={classes.fab}
        >
          <Icon>add</Icon>
        </Button>
      </div>
    );
  }

};

AdminQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminQuestions);
