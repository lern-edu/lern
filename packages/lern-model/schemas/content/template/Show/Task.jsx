import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { Button, Divider, Typography, Grid, CircularProgress } from 'material-ui';

const styles = theme => ({
  panel: {
    margin: theme.spacing.unit,
  },
});

class PublicContentShowTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      task: null,
    };
  }

  componentWillMount() {
    this.getTask();
  };

  getTask = () => {
    const { task } = this.props;
    const q = { _id: task };

    Meteor.call('AdminTestsGet', q, { limit: 1 }, (err, docs) => {
      if (err) snack({ message: 'Erro ao buscar tarefa' });
      this.setState({ task: _.head(docs) });
    });
  };

  render() {
    const { classes, handleAddTask } = this.props;
    const { task } = this.state;

    console.log(this);

    return (
      task ?
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{task.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <Typography>Páginas: {task.pages.length}</Typography>
            <Typography>
              Criado: {task.createdAt.toLocaleDateString('pt-BR', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              })}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        {
          handleAddTask && _.isFunction(handleAddTask) ?
          <ExpansionPanelActions>
            <Button
              onClick={() => handleAddTask(task)}
              size="small"
              color="primary">
              Adicionar
            </Button>
          </ExpansionPanelActions>
          : null
        }
      </ExpansionPanel> : <CircularProgress />
    );
  }
}

PublicContentShowTask.propTypes = {
  classes: PropTypes.object.isRequired,
  task: PropTypes.string.isRequired,
  handleAddTask: PropTypes.func,
};

export default withStyles(styles)(PublicContentShowTask);
