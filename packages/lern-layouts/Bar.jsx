import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';
import { MoreVert } from 'material-ui-icons';

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

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { crumbs, title, disableActions, classes, children, color='primary', menu } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

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

          <Typography type='title' color='inherit' className={classes.flex}>
            {getTitle({ title, crumbs })}
          </Typography>

          {menu && !_.isEmpty(menu) ?
            <div>
              <IconButton
                onClick={this.handleMenu}
                color="inherit"
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                {menu}
              </Menu>
            </div>
            : null
          }

        </Toolbar>
        {children}
      </AppBar>
    );
  }
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
