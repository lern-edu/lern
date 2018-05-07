// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import PropTypes from 'prop-types';
import { Content } from 'meteor/duckdodgerbrasl:lern-model';
// Material Components
import Radio, { RadioGroup } from 'material-ui/Radio';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

// Styles
const styles = theme => ({
  input: {
    width: '100%',
  },
});

// Extra Components
const content = new Content();
const ContentShow = _.get(content, 'templates.ContentShow');

class StudentTestAttemptQuestion extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { doc, attempt, page } = props;
    const { answer } = _.find(_.get(attempt, `pages.${page}.answers`), { _id: doc._id });

    console.log(_.find(_.get(attempt, `pages.${page}.answers`), { _id: doc._id }));
    this.state = { attemptAnswer: answer };
  };

  componentDidMount() {
    const { doc } = this.props;
    if (!this.timeout && doc.type === 'open')
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

  handleSingleAnswerChange = ({ target: { value } }) => {
    this.setState({ attemptAnswer: _.toNumber(value) });
    this.updateAttempt();
  };

  // Util

  keepAttemptUpdated = () => {
    const { doc, attempt, page } = this.props;
    const { attemptAnswer } = this.state;

    log.info('StudentTestAttemptQuestion => trigger');
    const answer = _.find(_.get(attempt, `pages.${page}.answers`), { _id: doc._id }).answer;

    if (answer !== attemptAnswer)
      this.updateAttempt();
  };

  updateAttempt = () => {
    const { doc, attempt, page } = this.props;
    const { attemptAnswer } = this.state;

    _.find(_.get(attempt, `pages.${page}.answers`), { _id: doc._id }).answer = attemptAnswer;

    console.log(attempt);

    log.info('StudentTestAttemptQuestion => Answer will updated => Question._id ' + doc._id);
    Meteor.call('StudentTestAttemptUpdate', attempt, (err, res) => {
      log.info('StudentTestAttemptQuestion => Answer updated');
      if (err) log.error(err);
    });
  }

  // Render

  render() {
    const { doc, attempt, classes, page } = this.props;
    const { attemptAnswer } = this.state;

    return (
      <Grid item xs={12}>

        {
          _.map(doc.description, (description, index) =>
            <ContentShow
              doc={description}
              canRemove={false}
              form={this}
              index={index}
              key={`descriptionShow${index}`}
            />
          )
        }

        {
          doc.type === 'open'
          ? (
            <FormControl className={classes.input}>
              <InputLabel htmlFor='name'>Resposta</InputLabel>
              <Input
                value={attemptAnswer || ''}
                onChange={this.handleOpenChange}
                className={classes.input}
              />
            </FormControl>
          )
          : (
            <Grid container>

              {
                _.map(doc.options, (option, index) =>
                  [
                    <Grid item xs={1} key={`optionSelect${index}`}>
                      <Radio
                        checked={index === attemptAnswer}
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
          )
        }

      </Grid>
    );
  };

};

StudentTestAttemptQuestion.propTypes = {
  doc: PropTypes.object.isRequired,
  attempt: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestAttemptQuestion);
