import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { Close, Search } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },

  fab: {
    position: 'fixed',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,
  },

  holder: {
    position: 'absolute',
    top: '50%',
    right: theme.spacing.unit * 4,
    transform: 'translate(-50%, -50%)',
    margin: '-4px 0 0 8px',
    width: 0,
    borderBottom: '2px solid white',
    height: theme.spacing.unit * 4,
    cursor: 'pointer',
    transition: 'width 0.5s cubic-bezier(0.55, 0, 0.1, 1) 0.5s',
  },
  'holder-active': { width: 200, transform: 'translate(-0%, -50%)' },

  icon: {
    width: theme.spacing.unit * 3,
    height: theme.spacing.unit * 3,
    lineHeight: theme.spacing.unit * 3,
    textAlign: 'center',
    position: 'absolute',
    top: 'auto',
    bottom: 3,
    left: -14,
    fontSize: 20,
    transition: 'right .3s linear .7s',
  },
  'icon-active': { right: -8 },

  svg: {
    position: 'absolute',
    top: 'auto',
    right: -17,
    bottom: -3,
    left: 'auto',
    transform: 'rotate(-270deg)',
  },

  circle: {
    strokeDasharray: 100,
    strokeDashoffset: 0,
    transition: 'all 1s cubic-bezier(0.55, 0, 0.1, 1)',
  },
  'circle-active': { strokeDashoffset: -100 },

  textFieldRoot: {
    padding: 0,
  },
  textFieldInput: {
    color: theme.palette.common.white,
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 16px)',
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
});

class PublicContentCreateQuestionDialogToolbar extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    this.state = { search: false };
  };

  // Handlers

  handleOpenSearch = () => {
    const { parent } = this.props;
    this.setState({ search: true });
    if (_.get(parent.state, 'query.$text.$search'))
      this.handleSearch({ keyCode: 13 });
  };

  handleChangeQuery = ({ target: { value } }) => {
    const { parent } = this.props;
    parent.setState({ query: { $text: { $search: value } } });
  };

  handleSearch = (event) => {
    const { parent } = this.props;
    if (event.which == 13 || event.keyCode == 13) {
      parent.handleSearch();
      this.setState({ search: false });
    }
  };

  // Render

  render() {
    const { classes, handleClose, parent } = this.props;
    const { search } = this.state;

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
          <Typography type='title' color="inherit" className={classes.flex}>
            Insert Questions
          </Typography>

          <div className={classNames(classes.holder, search ? classes['holder-active'] : '')}>
            <span onClick={this.handleOpenSearch}>
              <Search className={classNames(classes.icon, search ? classes['icon-active'] : '')}/>
              <svg height="38" width="38" className={classes.svg}>
                <circle
                  className={classNames(classes.circle, search ? classes['circle-active'] : '')}
                  cx="20"
                  cy="20"
                  fill="rgba(255,255,255,0)"
                  r="16"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeWidth="2"
                ></circle>
              </svg>
              {
                !search
                ? undefined
                : <TextField
                  onInput={this.handleChangeQuery}
                  onKeyUp={this.handleSearch}
                  value={parent.state.query.$text.$search}
                  autoFocus
                  id="bootstrap-input"
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    className: classes.textFieldFormLabel,
                  }}
                />
              }
            </span>
          </div>

        </Toolbar>
      </AppBar>
    );
  }
}

PublicContentCreateQuestionDialogToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(PublicContentCreateQuestionDialogToolbar);
