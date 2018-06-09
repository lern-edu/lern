// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import PropTypes from 'prop-types';
import { Content } from 'meteor/duckdodgerbrasl:lern-model';

// Material Components
import Radio, { RadioGroup } from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Styles
const styles = theme => ({});

// Extra Components
const content = new Content();
const ContentShow = _.get(content, 'templates.ContentShow');

class StudentTestAttemptSingleAnswer extends React.Component {

  // Lifecycle

  constructor(props) {
    log.info('StudentTestAttemptSingleAnswer.constructor', props);
    super(props);

    this.state = { attemptAnswer: null }
  };

  // Handlers

  handleSingleAnswerChange = ({ target: { value } }) => {
    this.setState({ attemptAnswer: _.toNumber(value) });
    this.updateAttempt(_.toNumber(value));
  };

  // Util

  updateAttempt = (value) => {
    const { doc, attempt, page } = this.props;

    _.find(_.get(attempt, `pages.${page}.answers`), { _id: doc._id }).answer = value;

    log.info('StudentTestAttemptSingleAnswer => Answer will updated => Question._id ' + doc._id + ' to ' + value);
    Meteor.call('StudentTestAttemptUpdate', attempt, (err, res) => {
      log.info('StudentTestAttemptSingleAnswer => Answer updated => page ' + page);
      if (err) log.error(err);
    });
  }

  // Render

  render() {
    const { doc, attempt, page } = this.props;
    const { attemptAnswer } = this.state;

    const { answer } = _.find(_.get(attempt, `pages.${page}.answers`), { _id: doc._id });

    return (
      <Grid container>

          {
            _.map(doc.options, (option, index) =>
              [
                <Grid item xs={1} key={`optionSelect${index}`}>
                  <Radio
                    checked={index === (attemptAnswer || answer)}
                    value={_.toString(index)}
                    onChange={this.handleSingleAnswerChange}
                  />
                </Grid>,
                <Grid item xs={11} key={`optionShow${index}`}>
                  <ContentShow
                    doc={option}
                    index={index}
                    canRemove={false}
                  />
                </Grid>,
              ]
            )
          }

        </Grid>
    );
  };

};

StudentTestAttemptSingleAnswer.propTypes = {
  doc: PropTypes.object.isRequired,
  attempt: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestAttemptSingleAnswer);
