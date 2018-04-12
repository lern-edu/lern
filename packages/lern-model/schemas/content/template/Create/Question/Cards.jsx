// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import ContentShow from '../../Show/index.jsx';

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

  render() {
    const { docs, handler, classes } = this.props;

    return handler
    ? <LinearProgress color='secondary' />
    : (
      <div className={classes.root}>
        <Grid container spacing={16}>

          {
            _.map(docs, doc =>

              <Grid key={doc._id} item xs={12} sm={6} lg={4}>

                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                      Type: {`${doc.get('type')} ${doc.get('level') ? ('- ' + doc.get('level')) : ''}`}
                    </Typography>
                    {
                      doc.get('type') === 'sudoku'
                      ? (
                        _.map(doc.get('sudoku'), (number, index) => {
                          const numberElement = <span
                            key={'number' + index + number}
                          >
                            {number}
                          </span>;

                          return (index && index % 9 === 0)
                            ? [<br key={index}></br>, numberElement]
                            : numberElement;
                        })
                      )
                      : _.map(doc.description, (description, index) =>
                          <ContentShow
                            doc={description}
                            canRemove={false}
                            form={this}
                            index={index}
                            key={`descriptionShow${index}`}
                          />
                      )
                    }
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>

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
  parent: PropTypes.object.isRequired,
  docs: PropTypes.arrayOf(PropTypes.object),
  handler: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PublicContentCreateQuestionCards);
