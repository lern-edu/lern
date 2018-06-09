import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

import PublicContentCreateQuestionDialog from './Dialog.jsx';
import PublicContentCreateQuestionCard from './Card.jsx';

class PublicContentCreateQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false, question: null };
  };

  componentWillReceiveProps(nextProps) {
    const { parent } = this.props;
    if (nextProps.clear) {
      parent.setState({ clear: false });
      this.setState({ question: null });
    }
  };

  handleAddQuestion = (question) => {
    this.updateDoc(question);
    this.setState({ question, open: false });
  };

  handleUpdateScore = ({ target: { value } }) => {
    const { parent } = this.props;
    const { doc } = parent.state;

    doc.set('score', _.parseInt(value));
    parent.setState({ doc });
  };

  updateDoc = (question) => {
    const { parent } = this.props;
    const { doc } = parent.state;
    doc.question = question;
    parent.setState({ doc });
  };

  handleToggleModal = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;
    const { question, open } = this.state;

    return (
      <div>
        <Button raised color="primary" onClick={this.handleToggleModal}>
          Pesquisar
        </Button>

        {/*
        <Button
          onClick={this.handleToggleModal}
        >
          Criar
        </Button>
        */}

        <PublicContentCreateQuestionDialog
          open={open}
          handleClose={this.handleToggleModal}
          handleAddQuestion={this.handleAddQuestion}
        />

        {
          question
          ? <PublicContentCreateQuestionCard
            doc={question}
            handleUpdateScore={this.handleUpdateScore}
          />
          : null
        }

      </div>
    );
  }
}

PublicContentCreateQuestion.propTypes = {
  clear: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  parent: PropTypes.object.isRequired,
};

export default PublicContentCreateQuestion;
