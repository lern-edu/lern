import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/Dialog';
import { Grid, TextField, Button, Divider } from '@material-ui/core';
import _ from 'lodash';

import PublicContentSearchTaskFilter from './Filter.jsx';
import PublicContentSearchTaskShow from './Show.jsx';

const styles = theme => ({
  dialog: {
    width: '80%',
    height: 500,
  },
  divider: {
    width: '100%',
  },
});

class PublicContentSearchTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collections: {
        tasks: {
          docs: [],
          handler: true,
          query: {},
          options: {},
        },
      },
      selectedTags: [],
      search: '',
    };
  }

  updateFilter = (tag) => {
    const { selectedTags } = this.state;
    selectedTags.push(tag);
    this.setState({ selectedTags });
  };

  deleteFilter = (tag) => {
    const { selectedTags } = this.state;
    _.pull(selectedTags, tag);
    this.setState({ selectedTags });
  };

  updateSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  searchTasks = () => {
    const { tasks, tasks: { query, options } } = this.state.collections;
    const { selectedTags, search } = this.state;
    const q = {
      $and: [
        selectedTags.length > 0 ?
          { 'scores._id': { $all: _.map(selectedTags, s => s.value) } } :
          { },
        { name: { $regex: search } },
      ],
    };

    Meteor.call('AdminTestsGet', q, options, (err, docs) => {
      if (err) snack({ message: 'Erro ao buscar tarefas' });
      tasks.handler = false;
      tasks.docs = docs;
      this.setState({ collections: { tasks } });
    });
  };

  render() {
    const { classes } = this.props;
    const { collections: { tasks: { docs: tasks } } } = this.state;

    return (
      <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          fullWidth={true}
          maxWidth={false}
          classes={{
            paper: classes.dialog,
          }}
        >
          <DialogTitle>Buscar Tarefa</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <Grid container spacing={24}>
              <PublicContentSearchTaskFilter
                updateFilter={this.updateFilter}
                updateSearch={this.updateSearch}
                deleteFilter={this.deleteFilter}
                search={this.state.search}
                selectedTags={this.state.selectedTags}
              />
              <Grid item xs={12} sm={6}>
                <Button
                  color='secondary'
                  variant="raised"
                  fullWidth={true}
                >
                  Limpar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  color='primary'
                  variant="raised"
                  fullWidth={true}
                  onClick={this.searchTasks}
                >
                  Buscar
                </Button>
              </Grid>
              <Divider className={classes.divider}/>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <PublicContentSearchTaskShow
                  tasks={tasks}
                  handleAddTask={this.props.handleAddTask}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

PublicContentSearchTask.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicContentSearchTask);
