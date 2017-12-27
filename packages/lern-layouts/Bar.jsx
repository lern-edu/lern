import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const getTitle = ({ title, crumbs }) =>
  <div>
    <span>
      {
        _.flatten(
          _.map(crumbs, (c, i) =>
            [
              <span key={`crumb${i}`}
                onClick={()=>FlowRouter.go(c.path)}
                style={{ cursor: 'pointer' }}>
                {c.label}
              </span>,
              <span
                key={`step${i}`}
                style={{ marginLeft: 5, marginRight: 5 }}>
                /
              </span>,
            ]
          )
        )
      }

    </span>
    <span>{title}</span>
  </div>;

/**
 * React Component for top bar
 * @class
 * @public
 * @memberof LernLayouts
 * @param {object=} this.props.crumbs - paths to compose links for crumbs
 * @param {string=} this.props.label - label of path
 * @param {string=} this.props.path - FlowRouter path
 * @param {string} this.props.title - current view title
 * @param {bool=} this.props.disableActions - prevent actions to exit from view
 * @example
 * import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
 * ...
 * <Layout.Bar title='Tags' crumbs={[{ path: 'AdminHome', label: 'Home' }]} />
 * // or
 * import { Bar } from 'meteor/duckdodgerbrasl:lern-layouts';
 * ...
 * <Bar title='Tags' crumbs={[{ path: 'AdminHome', label: 'Home' }]} />
 */
const Bar = (props) => {

  const { crumbs, title, disableActions, classes } = props;

  return (
    <AppBar position='fixed'>
      <Toolbar>

        <IconButton
          className={classes.menuButton}
          onTouchTap={disableActions ? () => false : window.nav}
          color='contrast'
          aria-label='Menu'
        >
           <Icon color='contrast'>menu</Icon>
        </IconButton>

        <Typography type='title' color='inherit' className={classes.flex}>
          {getTitle({ title, crumbs })}
        </Typography>

      </Toolbar>
    </AppBar>
  );
};

Bar.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bar);
