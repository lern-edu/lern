// Libs
import React from 'react';
import _ from 'lodash';
import i18n from 'meteor/universe:i18n';

// Material components
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Input, InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

/**
 * Navigation or side Drawer
 * @private
 * @memberof LernLayouts.Components
 */
class Navigation extends React.Component {

  /**
   * Define all routes here on this.state
   * @constructs
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      routes: {
        admin: {
          AdminHome: {
            label: 'AdminHome',
            icon: 'home',
          },
          AdminUsers: {
            label: 'AdminUsers',
            icon: 'person',
          },
          AdminTags: {
            label: 'AdminTags',
            icon: 'more',
          },
          AdminTests: {
            label: 'AdminTests',
            icon: 'edit',
          },
        },
        student: {
          StudentTests: {
            label: 'StudentTests',
            icon: 'home',
          },
          StudentReport: {
            label: 'StudentReport',
            icon: 'timeline',
          },
          StudentSettings: {
            label: 'StudentSettings',
            icon: 'settings',
          },
        },
      },
    };
  }

  /* Methods
  */

  changePath = (path) => {
    this.setState({ open: false });
    FlowRouter.go(path);
  };

  /* Lifecycle
  */

  componentDidMount() {
    if (window) {
      if (window.nav) throw new Meteor.Error('Nav already initialized');
      else window.nav = (open=true) => this.setState({ open });
    }
  }

  componentWillUnmount() {
    if (window) {
      if (window.nav) window.nav = null;
      else throw new Meteor.Error('Nav already removed');
    };
  }

  handleRoleChange(event, index, role) {
    Meteor.call('UserChangeRole', role, (err, user) => {
      if (err) snack('Erro');
      else FlowRouter.go(user.getHomeRoute());
    });
  }

  /* Render
  */

  render() {
    const { user, logging, route } = this.props;
    const { routes, open } = this.state;
    const logout = () => Meteor.logout();

    const profilePic = _.get(user, 'profile.profilePic');
    const name = _.get(user, 'profile.name');
    const roles = _.get(user, 'roles');

    return (
      <Drawer
        {..._.omit(this.state, ['open'])}
        open={!open ? false : true}
        onClose={() => this.setState({ open: !open })}
      >

        {
          !user
          ? <div>
              {
                logging
                ? <div/>
                : <div>
                  <Button raised color='primary' onClick={() => this.changePath('PublicLogin')} >
                    Entrar
                  </Button>
                </div>
              }
          </div>

          : <div>

            <div style={
              {
                background:
                  '#ffffff url("/backgrounds/material-background.png") no-repeat right top',
              }
            } >
              <List>
                <ListItem>
                  {
                    profilePic
                    ? <Avatar key='image' size={60} src={profilePic} />
                    : <Avatar key='image' size={60} size={52}>
                      {_.head(name)}
                    </Avatar>
                  }
                  <ListItemText primary={name} />
                </ListItem>
              </List>
              {
                roles && roles.length <= 1
                ? undefined
                : <FormControl>
                  <InputLabel htmlFor='age-simple'>Role</InputLabel>
                  <Select
                    value={_.get(user, 'profile.role')}
                    onChange={this.handleRoleChange}
                  >
                    {
                      _.map(_.uniq(roles), r =>
                        <MenuItem key={r} value={r}>
                          {i18n.__(`UserRoles.${r}`)}
                        </MenuItem>
                      )
                    }
                  </Select>
                </FormControl>
              }

            </div>

            <Divider />

            <List>

              {
                _.map(routes[user.getRole()], ({ label, icon }, _route) =>
                  <ListItem button key={_route} onClick={() => this.changePath(_route)}>
                    <Icon>{icon}</Icon>
                    <ListItemText primary={i18n.__('Navigation', `${user.getRole()}.${label}`)} />
                  </ListItem>
                )
              }

            </List>


            <List  style={{ bottom: 0, position: 'fixed', width: '100%' }}>
              <Divider/>

              {/* <ListItem button component='a' href={FlowRouter.path(user.getSettingsRoute())} >
                <ListItemText primary='Configurações' />
              </ListItem> */}

              <ListItem button onClick={logout}>
                <Icon>exit_to_app</Icon>
                <ListItemText primary={i18n.__('Navigation.exit')} />
              </ListItem>

            </List>

          </div>
        }

      </Drawer>
    );
  }
};

export default Navigation;
