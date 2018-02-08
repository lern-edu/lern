import React from 'react';
import { TextField, FlatButton, Card, CardHeader, CardActions, CardMedia } from 'material-ui';

const PublicContentCreateVideo = React.createClass({

  // Initial state

  getInitialState() {
    const { image } = this.props;
    return {
      videoUrl: '',
      stuff: null,
    };
  },

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
            console.error(err);
            snack('Não foi possível encontrar o vídeo');
          } else {
            this.setState({ stuff: _.get(stuff, 'items[0]') });
            this.props.form.defaultHandler({ video: videoId }, { doc: true });
          }
        }
      );
    } else snack('Essa URL não é válida');
  },

  handleRemove() {
    this.setState({ stuff: null });
    this.props.form.defaultHandler({ video: null }, { doc: true });
  },

  handleTextChange(event, videoUrl) {
    this.setState({ videoUrl });
  },

  handleSubmit() {
    this.setState({ videoUrl: '', stuff: null });
    this.props.form.handleSubmit();
  },

  // Render

  render() {
    const { form } = this.props;
    const { videoUrl, stuff } = this.state;

    return (
      <div className='ui grid'>

        <div className='row'>
          <div className='column' >
            <TextField
              floatingLabelText='URL'
              value={videoUrl}
              onChange={this.handleTextChange}
            />
          </div>
        </div>

        <div className='row'>
          <FlatButton
            label='Pesquisar'
            secondary={true}
            onTouchTap={this.handleSearch}
          />
        </div>

        {
          !stuff
          ? undefined
          : <div className='sixteen wide column'>
            <Card>
              <CardHeader
                title={_.get(stuff, 'snippet.localized.title')}
                subtitle={moment(_.get(stuff, 'snippet.publishedAt')).fromNow()}
              />
              <CardMedia>
                <iframe
                  src={`//www.youtube.com/embed/${_.get(stuff, 'id')}`}
                  frameBorder='0'
                  height={360}
                  allowFullScreen
                />
              </CardMedia>
              <CardActions>
                <FlatButton
                  onTouchTap={this.handleSubmit}
                  primary={true}
                  label='Adicionar'
                />
                <FlatButton
                  label='Remover'
                  onTouchTap={this.handleRemove}
                />
              </CardActions>
            </Card>
          </div>
        }

      </div>
    );
  },

});

export default PublicContentCreateVideo;
