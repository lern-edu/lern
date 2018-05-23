import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Card, CardHeader, CardActions, CardMedia } from '@material-ui/core';
import _ from 'lodash';
import i18n from 'meteor/universe:i18n';
import moment from 'moment';

const styles = theme => ({
  media: {
    height: 360,
  },
  right: {
    display: 'inherit',
    marginLeft: 'auto',
  },
});

class PublicContentCreateVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
      stuff: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { parent } = this.props;
    if (nextProps.clear) {
      parent.setState({ clear: false });
      this.setState({ stuff: null, videoUrl: '' });
    }
  }

  /* Handlers
  */

  handleSearch() {
    const { videoUrl } = this.state;
    if (Youtube.url.isYoutubeUrl(videoUrl)) {
      const videoId = Youtube.url.getId(videoUrl);
      Youtube.video.list(
        videoId,
        (err, stuff) => {
          if (err) {
            snack('Não foi possível encontrar o vídeo');
          } else {
            this.setState({ stuff: _.get(stuff, 'items[0]') });
            this.updateDoc(_.get(stuff, 'items[0]'));
          }
        }
      );
    } else snack('Essa URL não é válida');
  }

  updateDoc(stuff) {
    const { parent } = this.props;
    const { doc } = parent.state;
    doc.video = stuff;
    parent.setState({ doc });
  }

  handleRemove() {
    this.setState({ stuff: null, videoUrl: '' });
    this.updateDoc(null);
  }

  handleTextChange(event) {
    this.setState({ videoUrl: event.target.value });
  }

  // Render

  render() {
    const { parent, classes } = this.props;
    const { videoUrl, stuff } = this.state;

    return (
      <div>
        <TextField
          placeholder='URL'
          value={videoUrl}
          onChange={this.handleTextChange.bind(this)}
        />
        <Button
          color='secondary'
          onClick={this.handleSearch.bind(this)}
        >
          {i18n.__('Templates.search')}
        </Button>

        {
          !stuff
          ? undefined
          : <div className='sixteen wide column'>
            <Card>
              <CardHeader
                title={_.get(stuff, 'snippet.localized.title')}
                subtitle={moment(_.get(stuff, 'snippet.publishedAt')).fromNow()}
              />
              <CardMedia
                className={classes.media}
                component='iframe'
                src={`//www.youtube.com/embed/${_.get(stuff, 'id')}`}
              />
              <CardActions>
                <div className={classes.right}>
                  <Button
                    variant="raised"
                    color='secondary'
                    size='medium'
                    onClick={this.handleRemove.bind(this)}
                  >
                    {i18n.__('Templates.remove')}
                  </Button>
                </div>
              </CardActions>
            </Card>
          </div>
        }

      </div>
    );
  }
};

PublicContentCreateVideo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicContentCreateVideo);
