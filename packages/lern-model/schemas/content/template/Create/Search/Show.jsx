import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { Button, Divider, Typography, Grid } from 'material-ui';

import PublicContentShowTask from '../../Show/Task.jsx';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  panel: {
    margin: theme.spacing.unit,
  },
});

class PublicContentSearchTaskShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes, tasks, handleAddTask } = this.props;

    return (
      <div className={classes.container}>
        <Grid container spacing={16}>
        {_.map(tasks, task =>
          <Grid key={task._id} item xs={12} sm={6} md={4} lg={3}>
            <PublicContentShowTask
              task={task._id}
              handleAddTask={handleAddTask}
            />
          </Grid>
        )}
        </Grid>
      </div>
    );
  }
}

PublicContentSearchTaskShow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicContentSearchTaskShow);
