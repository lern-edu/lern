import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, Typography } from 'material-ui';

const styles = theme => ({

});

import PublicContentSearchTask from './Search/View.jsx';
import PublicContentShowTask from '../Show/Task.jsx';

class PublicContentCreateTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      task: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { parent } = this.props;
    if (nextProps.clear) {
      parent.setState({ clear: false });
      this.setState({ task: null });
    }
  }

  handleAddTask = (task) => {
    this.updateDoc(task._id);
    this.setState({ task, open: false });
  };

  updateDoc = (_id) => {
    const { parent } = this.props;
    const { doc } = parent.state;
    doc.task = _id;
    parent.setState({ doc });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { task } = this.state;

    return (
      <div>
        <Button
          onClick={this.handleOpen}
        >
          Pesquisar
        </Button>
        <PublicContentSearchTask
          open={this.state.open}
          handleClose={this.handleClose}
          handleAddTask={this.handleAddTask}
        />
        { task ?
          <PublicContentShowTask task={task._id}/> : null
        }
      </div>
    );
  }
}

PublicContentCreateTask.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicContentCreateTask);
