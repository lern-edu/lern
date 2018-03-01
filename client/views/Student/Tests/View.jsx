// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import i18n from 'meteor/universe:i18n';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

import StudentTestsCard from './Card.jsx';

const styles = theme => ({
  body: {
    background: 'linear-gradient(to left, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%)',
  },
  root: {
    flexGrow: 1,
  },
});

class StudentTests extends React.Component {

  componentDidMount() {
    const { classes } = this.props;
    const body = _.head(document.getElementsByTagName('body'));
    body.className = classes.body;
  };

  componentWillUnmount() {
    const { classes } = this.props;
    const body = document.getElementsByTagName('body');
    body.className = '';
  };

  // Render
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Layout.Bar color='secondary' title={i18n.__('StudentTests.appBar')} />

        <div className={classes.root} >
        
          <Grid container spacing={24}>
          
            <Grid item sm={12} md={6} lg={4}>
              hello
            </Grid>
          
          </Grid>
        
        </div>

      </div>
    );
  };

};

StudentTests.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTests);
