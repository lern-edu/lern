import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
import StaticCollections from '../static.js';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
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
      const { content } = this.props;
      return <ContentShow doc={content} />;
    }
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
      const { classes, doc } = this.props;

      return (
        <div>
          <IconButton onClick={this.handleClickOpen}>
            <Fullscreen />
          </IconButton>
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
                  {doc.name}
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.content}>
              {
                _.map(doc.description, (description, index) =>
                  [
                    <doc.templates.DescriptionShow
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
  };

  Templates.Name = Name;
  Templates.DescriptionCreate = DescriptionCreate;
  Templates.DescriptionShow = DescriptionShow;
  Templates.Dialog = withStyles(TagStyles)(TagDialog);

};

export default Templates;
