// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { Content } from 'meteor/duckdodgerbrasl:lern-model';
import PropTypes from 'prop-types';
// Material Components
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

// Views
const content = new Content();
const ContentShow = _.get(content, 'templates.ContentShow');
import StudentTestAttemptSudoku from './Sudoku.jsx';
import StudentTestAttemptQuestion from './Question.jsx';

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
                ? <StudentTestAttemptQuestion
                  doc={description.question}
                  page={page}
                  attempt={attempt}
                />

                // Render sudoku
                : description.type === 'sudoku'
                ? <StudentTestAttemptSudoku />
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
