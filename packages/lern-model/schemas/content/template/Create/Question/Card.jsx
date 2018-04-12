// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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
});

class PublicContentCreateQuestionCard extends React.Component {

  // Render

  render() {
    const { doc, classes, handleAddQuestion } = this.props;

    return (
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
          
          {
            !_.isFunction(handleAddQuestion)
            ? undefined
            : (
              <CardActions>
                <Button
                  color="primary"
                  size="small"
                  onClick={() => handleAddQuestion(doc)}
                >
                  Add
                </Button>
              </CardActions>
            )
          }

        </Card>
    );
  };

};

PublicContentCreateQuestionCard.propTypes = {
  classes: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
  handleAddQuestion: PropTypes.func,
};

export default withStyles(styles)(PublicContentCreateQuestionCard);
