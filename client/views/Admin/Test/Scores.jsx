// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Dialog,  DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { Test } from 'meteor/duckdodgerbrasl:lern-model';
import { MenuItem } from '@material-ui/core';

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
    } else
      this.setState({ open: true, score: new Test.TestScoreSchema({ ...tag, score: 0.1 }) });
  };

  handleChange = ({ target: { value } }) => {
    const { score } = this.state;
    score.score = _.toNumber(value);
    this.setState({ score });
  };

  handleClose = (value) => () => {
    const { doc, doc: { scores }, parent } = this.props;
    const { score } = this.state;

    if (value === 'cancel')
      this.setState({ score: null });
    else {
      scores.push(_.clone(score));
      this.setState({ scores });
      this.save(scores);
    };

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

            <Input
              value={_.get(score, 'score') || 0.1}
              onChange={this.handleChange}
              type='number'
              inputProps={{
                step: 0.1,
                min: 0.1,
                max: 1,
              }}
            />

          </DialogContent>

          <DialogActions>

            <Button onClick={this.handleClose('cancel')} color="secondary">
              Cancel
            </Button>

            <Button onClick={this.handleClose('save')} color="primary">
              Save
            </Button>

          </DialogActions>

        </Dialog>

      </div>
    );
  }

};

AdminTestScores.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTestScores);
