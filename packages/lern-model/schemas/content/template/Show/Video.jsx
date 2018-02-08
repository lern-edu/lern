import React from 'react';
import { Card, CardHeader, CardMedia } from 'material-ui';

const PublicContentShowVideo = React.createClass({

  // Initial state

  getInitialState() {
    const { image } = this.props;
    return {
      stuff: null,
    };
  },

  componentWillMount() {
    this.handleSearch();
  },

  /* Handlers
  */

  handleSearch() {
    const { videoId } = this.props;
    Youtube.video.list(
      videoId,
      (err, stuff) => {
        if (err) {
          console.error(err);
          snack('Não foi possível encontrar o vídeo');
        } else
          this.setState({ stuff: _.get(stuff, 'items[0]') });
      }
    );
  },

  // Render

  render() {
    const { stuff } = this.state;

    return (
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
      </Card>
    );
  },

});

export default PublicContentShowVideo;
