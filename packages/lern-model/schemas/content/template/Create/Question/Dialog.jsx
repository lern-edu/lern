import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import PublicContentCreateQuestionDialogToolbar from './Toolbar.jsx';
import PublicContentCreateQuestionDialogCards from './Cards.jsx';

function Transition(props) {
  return <Slide direction="up" {...props} />;
};

const styles = theme => ({
  
});

class PublicContentCreateQuestionDialog extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    this.state = {
      query: { $text: { $search: '' } },
      options: { skip: 0, limit: 20 },
      collections: {
        questions: {
          handler: true,
          docs: [],
        },
      },
    };
  };

  componentWillMount() {
    this.getQuestions();
  };

  // Get data

  getQuestions = () => {
    const { query, options } = this.state;

    this.setState({ collections: { questions: { handler: true } } });
    if (!query.$text.$search) delete query.$text;

    Meteor.call('AdminQuestionsGet', query, options,  (err, docs) => {
      if (err) {
        log.info('AdminQuestions.getQuestions/error =>', err);
        snack({ message: 'Erro ao encontrar questões ' });
      }

      this.setState({
        collections: { questions: { handler: false, docs } },
      });
    });
  };

  // Render

  render() {
    const {
      classes,
      doc,
      open,
      handleClose,
      handleAddQuestion,
      search,
    } = this.props;
    const { collections: { questions } } = this.state;

    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          transition={Transition}
        >
          <PublicContentCreateQuestionDialogToolbar
            parent={this}
            handleClose={handleClose}
            search={search}
          />

          <PublicContentCreateQuestionDialogCards
            parent={this}
            {...questions}
          />

        </Dialog>
      </div>
    );
  }
}

PublicContentCreateQuestionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddQuestion: PropTypes.func.isRequired,
};

export default withStyles(styles)(PublicContentCreateQuestionDialog);
