// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { Content } from 'meteor/duckdodgerbrasl:lern-model';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Content } from 'meteor/duckdodgerbrasl:lern-model';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons//KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons//KeyboardArrowRight';

// Views
import StudentTestAttemptSudoku from './Sudoku.jsx';
import StudentTestAttemptSingleAnswer from './SingleAnswer.jsx';
import StudentTestAttemptOpen from './Open.jsx';
const content = new Content();
const ContentShow = _.get(content, 'templates.ContentShow');


// Styles
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
  stepper: {
    flexGrow: 1,
    marginLeft: -14,
    marginRight: -14,
    marginBottom: 56,
  },
});

class StudentTestAttemptContent extends React.Component {

  // Util

  openQuestion({ question }) {

    const { pages, page, attempt } = this.props;

    return [
      _.map(question.description, (description, index) =>
        <ContentShow
          doc={description}
          canRemove={false}
          form={this}
          index={index}
          key={`descriptionShow${index}`}
        />
      ),
      <div key={question._id}>
        {
          question.type === 'open'
          ? <StudentTestAttemptOpen attempt={attempt} doc={question} page={page} />
          : question.type === 'singleAnswer'
          ? <StudentTestAttemptSingleAnswer attempt={attempt} doc={question} page={page} />
          : question.type === 'sudoku'
          ? <StudentTestAttemptSudoku attempt={attempt} sudoku={question} parent={this} page={page}/>
          : undefined
        }
      </div>,
    ];
  }

  // Render
  render() {
    log.info('StudentTestAttemptContent.render =>', this.props);
    const { pages, page, classes, attempt } = this.props;

    return (
      <div style={{ width: '100%' }}>
        {
          _.map(_.get(pages, `${page}.description`), (description, index) =>
            <Grid item xs={12} key={`descriptionShow${index}`}>

              {
                // Render image
                description.type === 'image'
                ? (
                  <Grid container justify='center' >
                    <Grid item xs={12} >
                      <ContentShow
                        doc={description}
                        imgStyle={{ width: '100%' }}
                        canRemove={false}
                      />
                    </Grid>
                  </Grid>
                )

                // Render text
                : description.type === 'text'
                ? <ContentShow doc={description} canRemove={false} />

                // Render question
                : description.type === 'question'
                ? this.openQuestion(description)
                : undefined
              }

            </Grid>
          )
        }
      </div>
    );
  }

};

StudentTestAttemptContent.propTypes = {
  pages: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  attempt: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestAttemptContent);
