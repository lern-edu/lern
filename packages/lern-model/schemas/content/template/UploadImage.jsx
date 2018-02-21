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

class PublicContentUploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      upload: false,
      remove: false,
      expanded: false,
      file: null,
      fileName: null,
      key: null,
      path: null,
      loading: false,
      success: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { parent } = this.props;
    if (nextProps.clear) {
      parent.setState({ clear: false });
      this.setState({
        open: false,
        upload: false,
        remove: false,
        expanded: false,
        file: null,
        fileName: null,
        key: null,
        path: null,
        loading: false,
        success: false,
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

      const key = guid();
      const extension = '.' + file.name.split('.').pop();
      this.setState({ upload: true, file: file, fileName: file.name, key: key + extension });
      var reader = new FileReader();
      reader.onloadend = function () {
        _this.setState({ path: reader.result });
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

  handleUpload() {
    const { file, key } = this.state;
    var _this = this;
    if (!file) {
      return;
    }

    this.setState({ loading: true });
    var reader = new FileReader();
    reader.onloadend = function () {
      Meteor.call('UserUploadFile', reader.result, key, file.type, (err, res) => {
        if (err) {
          _this.setState({
            loading: false,
            success: false,
          });
          throw err;
        }

        _this.updateDoc(res.Key);
        _this.setState({
          upload: false,
          remove: true,
          loading: false,
          success: true,
        });
        snack('Uploaded!');
      });
    };

    reader.readAsDataURL(file);
  }

  handleRemove() {
    const { key } = this.state;
    var _this = this;
    Meteor.call('UserDeleteFile', key, (err, res) => {
      if (err) {
        throw err;
      } else {
        _this.setState({
          upload: false,
          remove: false,
          file: null,
          path: null,
          fileName: null,
          success: false,
          loading: false,
          key: null,
        });
      }
    });
  }

  render() {
    const { upload, remove, open, fileName, path, file, loading, success } = this.state;
    const { classes } = this.props;

    const instructions = {
      image: 'Selecione uma imagem no formato jpg',
      extension: 'A imagem não é suportada',
    };

    return (
      <Card style={{ padding: '5px' }}>
        <CardHeader
          title='Imagem'
          subheader={fileName || 'Nenhuma imagem selecionada'}
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
          { file && path ?
            <img className={classes.media} src={path}/>
            : undefined
          }
          {/*<TextField
            helperText='Selecione um imagem'
            disabled={remove}
            value={fileName || ''}
            name={instructions.file}
            fullWidth={true}
            onClick={this.triggerSelectFolder.bind(this)}
            rows={1} />*/}
          <input
            style={{ display: 'none' }}
            type='file'
            ref='file'
            onChange={this.handleFilePath.bind(this)}
          />
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            raised
            color='primary'
            size="medium"
            onClick={this.triggerSelectFolder.bind(this)}
          >
            Selecionar
            <FileUpload className={classes.rightIcon} />
          </Button>
          <div className={classes.right}>
            <div className={classes.wrapper}>
              <Button
                className={classnames(classes.button, {
                  [classes.buttonSuccess]: success,
                })}
                color='primary'
                size="medium"
                disabled={!upload}
                onClick={this.handleUpload.bind(this)}
              >
                Upload
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Button
              className={classes.button}
              raised
              color='secondary'
              size="medium"
              disabled={!remove}
              onClick={this.handleRemove.bind(this)}
            >
              Remover
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
              Desculpe!
            </Typography>
            <Typography type="subheading">
              {instructions.extension}
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

PublicContentUploadImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicContentUploadImage);
