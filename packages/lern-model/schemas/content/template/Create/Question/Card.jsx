// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card, { CardActions, CardContent, CardHeader } from '@material-ui/core/Card';
import { yellow, red, purple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import ContentShow from '../../Show/index.jsx';
import PublicContentCreateQuestionSingleAnswer from './SingleAnswer.jsx';

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

class PublicContentCreateQuestionCard extends React.Component {

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
    const { classes, doc, handleAddQuestion, handleUpdateScore } = this.props;

    return (
      <Card>

        <CardHeader
          avatar={
            <Avatar aria-label='doc.name' className={classes[doc.get('type')]}>
              {_.capitalize(_.head(doc.get('type')))}
            </Avatar>
          }
          title={`${doc.get('type')}`}
          subheader={doc.get('level')}
        />

        <CardActions className={classes.actions} disableActionSpacing>

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

          {
            _.isFunction(handleUpdateScore)
            && _.get(doc, 'constructor.className') === 'Question'
            ? (
              <CardActions>
              <TextField
                  id="score"
                  label="Score"
                  value={doc.get('score')}
                  onChange={handleUpdateScore}
                />
              </CardActions>
            )
            : undefined
          }

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

          <CardContent>
            {
              !doc.get('answer')
              ? undefined
              : (
                <div>
                  <Typography className={classes.title} color="textSecondary">
                    Answer
                  </Typography>
                  {
                    _.isNull(doc.get('answer.open'))
                    ? undefined
                    : (
                      <Typography component="p">
                        {doc.get('answer.open')}
                      </Typography>
                    )
                  }

                  {
                    _.isNull(doc.get('answer.singleAnswer'))
                    ? undefined
                    : <PublicContentCreateQuestionSingleAnswer doc={doc} />
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

PublicContentCreateQuestionCard.propTypes = {
  classes: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
  handleAddQuestion: PropTypes.func,
  handleUpdateScore: PropTypes.func,
};

export default withStyles(styles)(PublicContentCreateQuestionCard);;
