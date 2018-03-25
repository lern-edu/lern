// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { Content } from 'meteor/duckdodgerbrasl:lern-model';

const content = new Content();
const ContentShow = _.get(content, 'templates.ContentShow');

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    width: '100%',
  },
});

class StudentTestAttemptContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // Lifecycle
  componentDidMount() {
    log.info('StudentTestAttemptContent.componentDidMount =>', this.props);
    const { parent } = this.props;

    /*this.verifyScroll = (event) => {
      if ($(window).scrollTop() + $(window).height() === this.getDocHeight())
        parent.setState({ bottom: 'finish' });
      else parent.setState({ bottom: null });
    };

    this.verifyScroll();
    window.addEventListener('scroll', this.verifyScroll);*/
  };

  /*componentWillUnmount() {
    log.info('StudentTestAttemptContent.componentWillUnmount');
    window.removeEventListener('scroll', this.verifyScroll);
  }*/

  // Util
  /*getDocHeight = () => {
    const D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  };*/

  // Render
  render() {
    log.info('StudentTestAttemptContent.render =>', this);
    const { pages, page, classes, theme } = this.props;

    return (
      <div style={{ width: '100%' }}>
        {
          _.map(_.get(pages, `${page}.description`), (description, index) =>
            <Grid item xs={12} key={`descriptionShow${index}`}>

              {
                description.type === 'image'
                ? (
                  <Grid container justify='center' >
                    <Grid item xs={12} >
                      <ContentShow
                        doc={description}
                        imgStyle={{ width: '100%' }}
                        canRemove={false}
                      />
                    </Grid>
                  </Grid>
                )
                : <ContentShow doc={ description } canRemove={false} />
            }

            </Grid>
          )
        }
      </div>
    );
  }

};

StudentTestAttemptContent.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default withStyles(styles)(StudentTestAttemptContent);
