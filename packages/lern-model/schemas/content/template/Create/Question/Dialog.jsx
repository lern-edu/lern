import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Grid from 'material-ui/Grid';

import PublicContentCreateQuestionDialogToolbar from './Toolbar.jsx';
import PublicContentCreateQuestionDialogCards from './Cards.jsx';
import PublicContentCreateQuestionDialogPagination from './Pagination.jsx';

function Transition(props) {
  return <Slide direction="up" {...props} />;
};

const styles = theme => ({
  
});

const limit = 20;

class PublicContentCreateQuestionDialog extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    this.state = {
      query: { $text: { $search: '' } },
      options: { skip: 0, limit },
      count: null,
      collections: {
        questions: {
          handler: true,
          docs: [],
        },
      },
    };
  };

  componentWillMount() {
    this.handleSearch();
  };

  // Get data

  getQuestions = () => {
    const { query, options } = this.state;

    const queryOpt = _.clone(query);

    this.setState({ collections: { questions: { handler: true } } });
    if (!_.get(queryOpt, '$text.$search')) delete queryOpt.$text;

    Meteor.call('AdminQuestionsGet', queryOpt, options,  (err, docs) => {
      if (err) {
        log.info('PublicContentCreateQuestionDialog.getQuestions/error =>', err);
        snack({ message: 'Erro ao encontrar questões ' });
      }

      this.setState({
        collections: { questions: { handler: false, docs } },
      });
    });
  };

  countQuestions = () => {
    const { query, options } = this.state;

    const queryOpt = _.clone(query);

    this.setState({ count: null });
    if (!_.get(queryOpt, '$text.$search')) delete queryOpt.$text;

    Meteor.call('AdminQuestionsCount', queryOpt, {},  (err, count) => {
      if (err) {
        log.info('PublicContentCreateQuestionDialog.countQuestions/error =>', err);
        snack({ message: 'Erro ao contabilizar questões ' });
      }

      this.setState({ count });
    });
  };

  // Handlers

  handleSearch = () => {
    const { options } = this.state;
    options.skip = 0;
    this.setState({ options, query: { $text: { $search: '' } } });
    this.getQuestions();
    this.countQuestions();
  };

  handleLess = () => {
    const { options } = this.state;
    options.skip -= 1;
    this.setState({ options });
    this.getQuestions();
  };

  handleAdd = () => {
    const { options } = this.state;
    options.skip += 1;
    this.setState({ options });
    this.getQuestions();
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
    const { collections: { questions }, options: { skip }, count } = this.state;

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

          <div>
            <PublicContentCreateQuestionDialogPagination
              length={_.get(questions, 'docs.length')}
              size={limit}
              page={skip}
              total={count}
              less={this.handleLess}
              add={this.handleAdd}
            />
          </div>

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
