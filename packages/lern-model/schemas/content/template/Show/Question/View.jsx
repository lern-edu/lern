// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import { yellow, red, purple } from 'material-ui/colors';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';

import ContentShow from '../index.jsx';
import PublicContentShowQuestionSingleAnswer from './SingleAnswer.jsx';

const styles = theme => {
  return {
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    sudoku: {
      backgroundColor: purple[700],
    },
    open: {
      backgroundColor: yellow[700],
    },
    singleAnswer: {
      backgroundColor: red[700],
    },
    button: {
      margin: theme.spacing.unit,
    },
  };
};

class PublicContentShowQuestion extends React.Component {

  // Lifecycle
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  };

  // Handlers

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  // Render

  render() {
    const { classes, question, score } = this.props;

    return (
      <Card>
        
        <CardHeader
          avatar={
            <Avatar aria-label='question.name' className={classes[question.get('type')]}>
              {_.capitalize(_.head(question.get('type')))}
            </Avatar>
          }
          title={`${question.get('type')}${score ? (' - ' + score) : ''}`}
          subheader={question.get('level')}
        />
          
        <CardActions className={classes.actions} disableActionSpacing>

          <IconButton
            className={
              classnames(classes.expand, { [classes.expandOpen]: this.state.expanded })
            }
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label='Show more'
          >
            <Icon>expand_more</Icon>
          </IconButton>

        </CardActions>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Content
            </Typography>
            {
              question.get('type') === 'sudoku'
              ? (
                _.map(question.get('sudoku'), (number, index) => {
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
              : _.map(question.description, (description, index) =>
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
          
          <CardContent>
            {
              !question.get('answer')
              ? undefined
              : (
                <div>
                  <Typography className={classes.title} color="textSecondary">
                    Answer
                  </Typography>
                  {
                    _.isNull(question.get('answer.open'))
                    ? undefined
                    : (
                      <Typography component="p">
                        {question.get('answer.open')}
                      </Typography>
                    )
                  }

                  {
                    _.isNull(question.get('answer.singleAnswer'))
                    ? undefined
                    : <PublicContentShowQuestionSingleAnswer doc={question} />
                  }
                </div>
              )
            }
          </CardContent>
        </Collapse>

      </Card>
    );
  };

};

PublicContentShowQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  score: PropTypes.number,
};

export default withStyles(styles)(PublicContentShowQuestion);;
