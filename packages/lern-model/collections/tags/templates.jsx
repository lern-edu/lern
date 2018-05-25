import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import StaticCollections from '../static.js';
import Input, { InputLabel, InputAdornment } from '@material-ui/core/Input';
import { FormControl, FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from '@material-ui/core/Slide';
import Fullscreen from 'material-ui-icons/Fullscreen';
import Content from '../../schemas/content/schema.js';
const content = new Content();

const Templates = {};

if (Meteor.isClient) {
  const ContentCreate = _.get(content, 'templates.ContentCreate');
  const ContentShow = _.get(content, 'templates.ContentShow');

  class Name extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        message: undefined,
      };
    }

    handleChange = ({ target: { value } }) => {
      const { form, doc } = this.props;
      doc.name = value;
      form.setState({ collections: { tag: { doc } } });
      doc.validate({ fields: [`name`] }, (err) => {
        if (err) this.setState({ message: err.reason, error: true });
        else this.setState({ message: undefined, error: false });
      });

    };

    render() {
      const { form, doc, Input } = this.props;
      const { error, message } = this.state;
      return (
        <FormControl error={error}>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <Input
            value={doc.name}
            onChange={this.handleChange}
            {...this.props}
          />
          {
            !error
            ? undefined
            : <FormHelperText>{message}</FormHelperText>
          }

        </FormControl>
      );
    }
  };

  class DescriptionCreate extends React.Component {
    constructor(props) {
      super(props);
    };

    render() {
      const { form, doc } = this.props;
      return (
        <content.templates.ContentCreate
          Schema={Content}
          doc={doc}
          form={form}
          contentTypes={StaticCollections.ContentTypes}
        />
      );
    }
  };

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

  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  const TagStyles = theme => ({
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

  class TagDialog extends React.Component {

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
      const { classes, doc, type = 'chip' } = this.props;

      return (
        <div>
          {
            _.get({
              icon:
                <IconButton onClick={this.handleClickOpen}>
                  <Fullscreen />
                </IconButton>,
              button:
                <Button variant="raised"
                  onClick={this.handleClickOpen}
                  >
                  Preview
                </Button>,
              chip:
                <Chip
                  label={doc.name}
                  className={classes.chip}
                />,
            }, type)
          }
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
                <Typography variant='title' color="inherit" className={classes.flex}>
                  {doc.name}
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.content}>
              {
                _.map(doc.description, (description, index) =>
                  [
                    <doc.templates.DescriptionShow
                      index={index}
                      form={this}
                      canRemove={false}
                      content={description}
                      key={`descriptionShow${index}`}
                    />,
                    <Divider key={`descriptionDivider${index}`}/>,
                  ]
                )
              }
            </div>
          </Dialog>
        </div>
      );
    }
  }

  TagDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    doc: PropTypes.object.isRequired,
    type: PropTypes.string,
  };

  Templates.Name = Name;
  Templates.DescriptionCreate = DescriptionCreate;
  Templates.DescriptionShow = DescriptionShow;
  Templates.Dialog = withStyles(TagStyles)(TagDialog);

};

export default Templates;
