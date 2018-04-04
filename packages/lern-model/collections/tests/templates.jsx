import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
import StaticCollections from '../static.js';
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
import { ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Content from '../../schemas/content/schema.js';
const content = new Content();

const Templates = {};

if (Meteor.isClient) {
  const ContentCreate = _.get(content, 'templates.ContentCreate');
  const ContentShow = _.get(content, 'templates.ContentShow');

  class DescriptionShow extends React.Component {
    render() {
      const { content, form, canRemove, index } = this.props;
      return <ContentShow
        doc={content}
        form={form}
        canRemove={canRemove}
        index={index}
      />;
    }
  };

  DescriptionShow.propTypes = {
    content: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    canRemove: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  };

  class HelpShow extends React.Component {
    render() {
      const { content, form, canRemove, index } = this.props;
      return <ContentShow
        doc={content}
        form={form}
        canRemove={canRemove}
        index={index}
      />;
    }
  };

  HelpShow.propTypes = {
    content: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    canRemove: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  };

  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  const TestStyles = theme => ({
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

  class TestDialog extends React.Component {

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

    render() {
      const { classes, doc, field='description', icon } = this.props;

      return (
        <React.Fragment>
          <MenuItem onClick={this.handleClickOpen}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText inset primary={_.capitalize(field)} />
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
                  {_.capitalize(field)}
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.content}>
              {
                _.map(doc[field], (show, index) =>
                  [
                    <ContentShow
                      doc={show}
                      key={`${field}Show${index}`}
                      canRemove={false}
                    />,
                    <Divider key={`${field}Divider${index}`}/>,
                  ]
                )
              }
            </div>
          </Dialog>
        </React.Fragment>
      );
    }
  }

  TestDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    doc: PropTypes.object.isRequired,
    type: PropTypes.string,
  };

  Templates.DescriptionShow = DescriptionShow;
  Templates.HelpShow = HelpShow;
  Templates.TestDialog = withStyles(TestStyles)(TestDialog);
};

export default Templates;
