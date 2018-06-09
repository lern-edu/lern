import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import { Modal, IconButton, Button, TextField, Typography, CircularProgress } from 'material-ui';
import Collapse from 'material-ui/transitions/Collapse';
import green from 'material-ui/colors/green';
import { ExpandMore, FileUpload } from 'material-ui-icons';
import i18n from 'meteor/universe:i18n';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  right: {
    display: 'inherit',
    marginLeft: 'auto',
  },
  modal: {
    position: 'absolute',
    width: 8 * 50,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 8 * 4,
  },
  wrapper: {
    margin: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 0,
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
});

class AdminTestImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      upload: {
        loading: false,
        success: false,
      },
      remove: false,
      expanded: false,
      file: null,
      fileName: null,
      key: null,
      path: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { parent } = this.props;
    if (nextProps.clear) {
      parent.setState({ clear: false });
      this.setState({
        open: false,
        upload: {
          loading: false,
          success: false,
        },
        remove: false,
        expanded: false,
        file: null,
        key: null,
        path: null,
      });
    }
  }

  triggerSelectFolder(evt) {
    if (!this.state.file)
      ReactDOM.findDOMNode(this.refs.file).click();
  }

  handleFilePath(event) {
    const { value, files } = event.target;
    const file = _.first(files);
    if (!file) return;
    var _this = this;
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      guid = () => {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      };

      const key = guid() + '.' + file.name.split('.').pop();
      this.setState({
        file: file,
        key: key,
        upload: {
          loading: true,
        },
      });
      var reader = new FileReader();
      reader.onloadend = function () {
        Meteor.call('UserUploadFile', reader.result, key, file.type, (err, res) => {
          if (err) {
            _this.setState({
              upload: {
                loading: false,
                success: false,
              },
            });
            throw err;
          }

          _this.updateDoc(res.Key);
          _this.setState({
            path: res.Location,
            upload: false,
            remove: true,
            upload: {
              loading: false,
              success: true,
            },
          });
          snack('Uploaded!');
        });
      };

      reader.readAsDataURL(file);
    } else
      this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  updateDoc(Key) {
    const { parent } = this.props;
    const { doc } = parent.state;
    doc.image = Key;
    parent.setState({ doc });
  }

  handleRemove() {
    const { key } = this.state;
    var _this = this;
    this.setState({
      file: null,
      path: null,
      key: null,
    });
    Meteor.call('UserDeleteFile', key, (err, res) => {
      if (err) {
        throw err;
      } else {
        _this.setState({
          upload: {
            success: false,
            loading: false,
          },
          remove: false,
        });
        ReactDOM.findDOMNode(_this.refs.file).value = '';
        ReactDOM.findDOMNode(_this.refs.file).files = null;
      }
    });
  }

  render() {
    const { upload, remove, open, path, file, loading, success } = this.state;
    const { classes, parent: { state: { doc } } } = this.props;

    return (
      <Card style={{ padding: '5px' }}>
        <CardHeader
          title={i18n.__('AdminTestImage.image')}
          subheader={file ? file.name : i18n.__('AdminTestImage.no_image')}
          action={
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick.bind(this)}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMore />
            </IconButton>
          }
        />
        <CardContent>
          { path || doc.image ?
            <img className={classes.media} src={path || `https://s3-us-west-2.amazonaws.com/lern-repo/${doc.image}`}/>
            : undefined
          }
          <input
            style={{ display: 'none' }}
            type='file'
            ref='file'
            onChange={this.handleFilePath.bind(this)}
          />
        </CardContent>
        <CardActions>
          <div className={classes.right}>
            <div className={classes.wrapper}>
              <Button
                className={classnames(classes.button, {
                  [classes.buttonSuccess]: upload.success,
                })}
                color='primary'
                size="medium"
                disabled={upload.success}
                onClick={this.triggerSelectFolder.bind(this)}
              >
                {i18n.__('AdminTestImage.upload')}
                <FileUpload className={classes.rightIcon} />
              </Button>
              {upload.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Button
              className={classes.button}
              raised
              color='secondary'
              size="medium"
              disabled={!remove}
              onClick={this.handleRemove.bind(this)}
            >
              {i18n.__('AdminTestImage.remove')}
            </Button>
          </div>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <div></div>
        </Collapse>
        <Modal
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
        >
          <div className={classes.modal}>
            <Typography type="title">
              {i18n.__('AdminTestImage.sorry')}
            </Typography>
            <Typography type="subheading">
              {i18n.__('AdminTestImage.instructions.extension')}
            </Typography>
            <Button
              color='primary'
              onClick={this.handleClose.bind(this)}
            >
              Ok
            </Button>
          </div>
        </Modal>
      </Card>
    );
  }
}

AdminTestImage.propTypes = {
  classes: PropTypes.object.isRequired,
  parent: PropTypes.shape({
    state: PropTypes.shape({
      doc: PropTypes.object.isRequired,
    }),
  }).isRequired,
};

export default withStyles(styles)(AdminTestImage);
