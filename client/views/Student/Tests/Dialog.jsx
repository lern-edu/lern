import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
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
import { Content } from 'meteor/duckdodgerbrasl:lern-model';
const content = new Content();
const ContentShow = _.get(content, 'templates.ContentShow');

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

class StudentTestsDialog extends React.Component {

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
      <span>
        <Chip
          label={doc.name}
          className={classes.chip}
          onClick={this.handleClickOpen}
        />
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
                  <ContentShow
                    doc={description}
                    form={this}
                    canRemove={false}
                    index={index}
                    key={`descriptionShow${index}`}
                  />,
                  <Divider key={`descriptionDivider${index}`}/>,
                ]
              )
            }
          </div>
        </Dialog>
      </span>
    );
  }
}

StudentTestsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
};

export default withStyles(TagStyles)(StudentTestsDialog);
