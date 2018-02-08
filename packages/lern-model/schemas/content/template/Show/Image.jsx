import React from 'react';
import { CircularProgress, Paper } from 'material-ui';

const PublicContentShowImageView = React.createClass({
  // render

  render() {
    const { image, ready } = this.props;
    return (
      _.every(ready) && image ?
        <Paper className="ui image">
          <img src={FS.Images.link(image)}/>
        </Paper> :
        <CircularProgress />
    );
  },
});

export default PublicContentShowImageView;
