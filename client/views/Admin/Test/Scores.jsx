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
import { Test } from 'meteor/duckdodgerbrasl:lern-model';
import { MenuItem } from 'material-ui/Menu';

import AdminTestNumber from './Number.jsx';

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
    this.state = { open: false, score: null, scores: [] };
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
      this.setState({ open: true, score: new Test.TestScoreSchema({ ...tag, score: 0.1 }) });
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
            _.map(tags, tag =>
              <ListItem button key={tag._id} >
                <ListItemText primary={tag.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    onChange={this.handleToggle(tag)}
                    checked={_.findIndex(scores, { _id: tag._id }) >= 0}
                  />
                </ListItemSecondaryAction>

              </ListItem>
            )
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
};

export default withStyles(styles)(AdminTestScores);
