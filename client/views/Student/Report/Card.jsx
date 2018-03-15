// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import i18n from 'meteor/universe:i18n';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Card, { CardActions, CardContent, CardHeader } from '@material-ui/core/Card';
import yellow from '@material-ui/core/colors/yellow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import StudentReportChart from './Chart.jsx';

const styles = theme => ({
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
  avatar: {
    backgroundColor: yellow[700],
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class StudentReportCard extends React.Component {

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
    const { classes, report, childrens } = this.props;

    return (
      <Card key={report.name}>
        <CardHeader
          avatar={
            <Avatar aria-label='report.name' className={classes.avatar}>
              {_.head(report.name)}
            </Avatar>
          }
          title={report.name}
          subheader={`Total score: ${report.score || _.sum(_.map(childrens, 'score'))}`}
        />

        {
          _.isEmpty(childrens)
          ? null
          : <CardActions className={classes.actions} disableActionSpacing>

            <Button
              className={classes.button}
              onClick={this.handleExpandClick}
            >
              See Details
            </Button>

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
        }

        {
          _.isEmpty(childrens)
          ? null
          : <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Divider />
              <StudentReportChart childrens={childrens} />
            </CardContent>
          </Collapse>
        }

      </Card>
    );
  };

};

StudentReportCard.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentReportCard);;
