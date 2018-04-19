// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import { Question } from 'meteor/duckdodgerbrasl:lern-model';
import { MenuItem } from 'material-ui/Menu';

import AdminQuestionNumber from './Number.jsx';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class AdminTestScores extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false, score: null, scores: props.scores || [] };
  };

  handleToggle = (tag) => () => {
    const { doc, doc: { scores }, parent } = this.props;
    const { selectedIndex } = this.state;
    const index = _.findIndex(scores, { _id: tag._id });

    if (index >= 0) {
      _.pullAt(scores, index);
      this.setState({ scores });
      this.save(scores);
    }
    else
      this.setState({ open: true, score: new Question.QuestionScoreSchema({ ...tag, score: 0.1 }) });
  };

  handleChange = ({ target: { value } }) => {
    const { score, scores } = this.state;
    score.score = _.toNumber(value);
    scores.push(_.clone(score));
    this.setState({ scores, score });
    this.save(scores);
    this.setState({ open: false });
  };

  // Util

  save = (scores) => {
    const { doc, parent } = this.props;
    doc.set('scores', scores);
    parent.setState({ doc });

    doc.validate({ fields: ['scores'] }, (err) => {
      if (err) parent.setState({ errors: { scores: { message: err.reason, error: true } } });
      else parent.setState({ errors: { scores: { message: undefined, error: false } } });
    });
  };

  // Render

  render() {
    const { tags=[], doc, classes } = this.props;
    const { open, score, scores } = this.state;

    return (
      <div>
        
        <List className={classes.root}>

          {
            _.map(tags, tag => {
              const score = _.find(scores, { _id: tag._id });
              return (
                <ListItem button key={tag._id} >
                  <ListItemText primary={tag.name} secondary={score && (score.score * 100) + '%'} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(tag)}
                      checked={!!score}
                    />
                  </ListItemSecondaryAction>

                </ListItem>
              );
            })
          }
        </List>

        <Dialog
          onClose={this.handleClose}
          transition={Transition}
          aria-labelledby='Score a tag'
          open={open}
        >
          
          <DialogTitle id='scores-title'>Set score proportion</DialogTitle>
          
          <DialogContent>

            <Select
              value={_.toString(score) || '0.1'}
              onChange={this.handleChange}
              input={<Input id='score' />}
              MenuProps={{
                PaperProps: {
                  style: {
                    width: 200,
                  },
                },
              }}
            >
              {
                _.map([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], op =>
                  <MenuItem key={_.toString(op)} value={_.toString(op)} >{op * 100}%</MenuItem>
                )
              }
            </Select>

          </DialogContent>

        </Dialog>
      
      </div>
    );
  }

};

AdminTestScores.propTypes = {
  classes: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  parent: PropTypes.object.isRequired,
  scores: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(AdminTestScores);
