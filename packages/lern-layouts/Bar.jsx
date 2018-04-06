import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
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
  primaryIconButton: {
    color: '#FFF',
  },
  secondaryIconButton: {
    color: '#000',
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
 * @param {object=} this.props.children - children react component to be rendered in AppBar
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
 * @example
 * import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
 * ...
 * <Layout.Bar title='Tabs'>
 *  <Tabs>
 *    <Tab label='Item One'>
 *    <Tab label='Item Two'>
 *    <Tab label='Item Three'>
 *  </Tabs>
 * </Layout.Bar>
 */
class Bar extends React.Component {

  render() {
    const { crumbs, title, disableActions, classes, children, color='primary' } = this.props;

    return (
      <AppBar position='fixed' color={color}>
        <Toolbar>

          <IconButton
            className={classes.menuButton}
            onClick={disableActions ? () => false : window.nav}
            aria-label='Menu'
          >
            <Icon className={classes[`${color}IconButton`]}>menu</Icon>
          </IconButton>

          <Typography variant='title' color='inherit' className={classes.flex}>
            {getTitle({ title, crumbs })}
          </Typography>

          {
            children
            ? children
            : undefined
          }

        </Toolbar>
      </AppBar>
    );
  }
};

Bar.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  classes: PropTypes.object.isRequired,
  children: PropTypes.element,
  disableActions: PropTypes.bool,
};

export default withStyles(styles)(Bar);
