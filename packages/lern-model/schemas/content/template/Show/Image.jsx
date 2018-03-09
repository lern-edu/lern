import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    width: '100%',
  },
  media: {
    display: 'block',
    maxWidth: 400,
    margin: '10px auto',
  },
});

class PublicContentShowImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      file: `https://s3-us-west-2.amazonaws.com/lern-repo/${props.image}`,
    };
  }

  /*componentWillMount() {
    this.handleGet();
  }*/

  handleGet() {
    const { image } = this.state;
    if (!image) {
      return;
    }

    var _this = this;
    Meteor.call('UserGetFile', image, (err, res) => {
      if (err) {
        throw err;
      } else {
        _this.setState({ file: res.file });
      }
    });
  }

  render() {
    const { image, file } = this.state;
    const { classes, imgStyle } = this.props;

    return (
      file ?
        <div className={classes.container}>
          <img className={classes.media} src={file} style={imgStyle} />
        </div>
        : null
    );
  }
}

PublicContentShowImage.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(PublicContentShowImage);
