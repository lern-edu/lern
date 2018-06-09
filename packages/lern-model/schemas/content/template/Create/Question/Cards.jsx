// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card, { CardActions, CardContent } from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ContentShow from '../../Show/index.jsx';
import PublicContentCreateQuestionCard from './Card.jsx';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class PublicContentCreateQuestionCards extends React.Component {

  // Render

  render() {
    const { docs, handler, classes, handleAddQuestion } = this.props;

    return handler
    ? <LinearProgress color='secondary' />
    : (
      <div className={classes.root}>
        <Grid container spacing={16}>

          {
            _.map(docs, doc =>

              <Grid key={doc._id} item xs={12} sm={12} lg={4}>

                <PublicContentCreateQuestionCard
                  key={doc._id}
                  doc={doc}
                  handleAddQuestion={handleAddQuestion}
                />

              </Grid>

            )
          }

        </Grid>
      </div>
    );
  };

};

PublicContentCreateQuestionCards.propTypes = {
  classes: PropTypes.object.isRequired,
  docs: PropTypes.arrayOf(PropTypes.object),
  handler: PropTypes.bool.isRequired,
  handleAddQuestion: PropTypes.func.isRequired,
};

export default withStyles(styles)(PublicContentCreateQuestionCards);
