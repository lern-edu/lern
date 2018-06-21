import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { TextField, Button, Card, CardHeader, CardActions, CardMedia } from 'material-ui';
import _ from 'lodash';
import moment from 'moment';

const styles = theme => ({
  media: {
    height: 360,
  },
});

class PublicContentShowVideo extends React.Component {

  constructor(props) {
    super(props);
  }

  // Render

  render() {
    const { video, classes } = this.props;

    return (
      <div>
        {
          !video
          ? undefined
          : <div className='sixteen wide column'>
            <Card>
              <CardHeader
                title={_.get(video, 'snippet.localized.title')}
                subtitle={moment(_.get(video, 'snippet.publishedAt')).fromNow()}
              />
              <CardMedia
                className={classes.media}
                component='iframe'
                src={`//www.youtube.com/embed/${_.get(video, 'id')}`}
              />
            </Card>
          </div>
        }

      </div>
    );
  }
};

PublicContentShowVideo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicContentShowVideo);
