// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Content } from 'meteor/duckdodgerbrasl:lern-model';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons//KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons//KeyboardArrowRight';

const content = new Content();
const ContentShow = _.get(content, 'templates.ContentShow');

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
  stepper: {
    flexGrow: 1,
    marginLeft: -14,
    marginRight: -14,
    marginBottom: 56,
  },
});

class StudentTestAttemptContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  // Lifecycle
  // componentDidMount() {
  //   log.info('StudentTestAttemptContent.componentDidMount =>', this.props);
  //   const { parent } = this.props;

  //   this.verifyScroll = (event) => {
  //     if ($(window).scrollTop() + $(window).height() === this.getDocHeight())
  //       parent.setState({ bottom: 'continue' });
  //     else parent.setState({ bottom: null });
  //   };

  //   this.verifyScroll();
  //   window.addEventListener('scroll', this.verifyScroll);
  // };

  // componentWillUnmount() {
  //   log.info('StudentTestAttemptContent.componentWillUnmount');
  //   window.removeEventListener('scroll', this.verifyScroll);
  // }

  // // Util
  // getDocHeight = () => {
  //   const D = document;
  //   return Math.max(
  //     D.body.scrollHeight, D.documentElement.scrollHeight,
  //     D.body.offsetHeight, D.documentElement.offsetHeight,
  //     D.body.clientHeight, D.documentElement.clientHeight
  //   );
  // };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  // Render
  render() {
    log.info('StudentTestAttemptContent.render =>', this.props);
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
  page: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(StudentTestAttemptContent);
