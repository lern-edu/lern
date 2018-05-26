import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import StaticCollections from '../static.js';
import { Input, InputLabel, InputAdornment } from '@material-ui/core';
import { FormControl, FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons//Close';
import Slide from '@material-ui/core/Slide';
import Fullscreen from '@material-ui/icons//Fullscreen';
import { MenuItem } from '@material-ui/core';
import { ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
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

    render() {
      const { classes, doc, open, title, handleClickClose } = this.props;

      return (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClickClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={handleClickClose}>
                <CloseIcon />
              </IconButton>
              <Typography variant='title' color="inherit" className={classes.flex}>
                {_.capitalize(title)}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            {
              _.map(doc, (show, index) =>
                [
                  <ContentShow
                    doc={show}
                    key={`${title}Show${index}`}
                    canRemove={false}
                  />,
                  <Divider key={`${title}Divider${index}`}/>,
                ]
              )
            }
          </div>
        </Dialog>
      );
    }
  }

  TestDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    doc: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    handleClickClose: PropTypes.func.isRequired,
  };

  Templates.DescriptionShow = DescriptionShow;
  Templates.HelpShow = HelpShow;
  Templates.TestDialog = withStyles(TestStyles)(TestDialog);
};

export default Templates;
