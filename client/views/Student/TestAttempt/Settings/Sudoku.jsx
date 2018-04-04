import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Fullscreen from 'material-ui-icons/Fullscreen';
import { MenuItem } from 'material-ui/Menu';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import { Settings } from 'material-ui-icons';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class StudentTestAttemptSettingsSudoku extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updateSettings = (key, value) => {
    const { parent, settings } = this.props;
    parent.setState({
      settings: {
        ...settings,
        [key]: value,
      },
    });
  };

  render() {
    const { classes, settings, parent } = this.props;

    console.log(settings);

    return (
      <React.Fragment>
        <MenuItem onClick={this.handleClickOpen}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText inset primary={'Settings'} />
        </MenuItem>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
              <Typography type='title' color="inherit" className={classes.flex}>
                Settings
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <List>
              {
                _.map(settings, (value, key) =>
                  <ListItem
                    key={`settingsShow${key}`}
                  >
                    <ListItemText primary={_.capitalize(key)} />
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={(evt) => this.updateSettings(key, evt.target.checked)}
                        checked={value}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              }
            </List>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

StudentTestAttemptSettingsSudoku.propTypes = {
  classes: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestAttemptSettingsSudoku);
