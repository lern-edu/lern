// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import PropTypes from 'prop-types';
import { Content } from 'meteor/duckdodgerbrasl:lern-model';
// Material Components
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

// Styles
const styles = theme => ({
  input: {
    width: '100%',
  },
});

class StudentTestAttemptOpen extends React.Component {

  // Lifecycle

  constructor(props) {
    log.info('StudentTestAttemptOpen.constructor', props);
    super(props);
    const { doc, attempt, page } = props;
    const { answer } = _.find(_.get(attempt, `pages.${page}.answers`), { _id: doc._id });

    this.state = { attemptAnswer: answer };
  };

  componentDidMount() {
    this.setTimeout();
  };

  setTimeout() {
    const { doc } = this.props;
    if (doc.type === 'open')
      this.timeout = setInterval(this.keepAttemptUpdated, 3000);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
    this.keepAttemptUpdated();
  };

  // Handlers

  handleOpenChange = ({ target: { value } }) => {
    this.setState({ attemptAnswer: value });
  };

  // Util

  keepAttemptUpdated = () => {
    const { doc, attempt, page } = this.props;
    const { attemptAnswer } = this.state;

    log.info('StudentTestAttemptOpen => trigger');
    const answer = _.find(_.get(attempt, `pages.${page}.answers`), { _id: doc._id }).answer;

    if (answer !== attemptAnswer)
      this.updateAttempt();
  };

  updateAttempt = () => {
    const { doc, attempt, page } = this.props;
    const { attemptAnswer } = this.state;

    _.find(_.get(attempt, `pages.${page}.answers`), { _id: doc._id }).answer = attemptAnswer;

    log.info('StudentTestAttemptOpen => Answer will updated => Question._id ' + doc._id);
    Meteor.call('StudentTestAttemptUpdate', attempt, (err, res) => {
      log.info('StudentTestAttemptOpen => Answer updated => page ' + page);
      if (err) log.error(err);
    });
  }

  // Render

  render() {
    const { doc, attempt, classes, page } = this.props;
    const { attemptAnswer } = this.state;

    return (
      <FormControl className={classes.input}>
        <InputLabel htmlFor='name'>Resposta</InputLabel>
        <Input
          value={attemptAnswer || ''}
          onChange={this.handleOpenChange}
          className={classes.input}
        />
      </FormControl>
    );
  };

};

StudentTestAttemptOpen.propTypes = {
  doc: PropTypes.object.isRequired,
  attempt: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestAttemptOpen);
