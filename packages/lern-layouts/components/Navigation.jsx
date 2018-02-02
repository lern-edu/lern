// Libs
import React from 'react';
import _ from 'lodash';
import i18n from 'meteor/universe:i18n';

// Material components
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Select from 'material-ui/Select';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Icon from 'material-ui/Icon';

// Translations
const texts = {};

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
      routes: {
        admin: {
          AdminHome: {
            label: 'admin.AdminHome',
            icon: 'home',
          },
          AdminUsers: {
            label: 'admin.AdminUsers',
            icon: 'person',
          },
          AdminTags: {
            label: 'admin.AdminTags',
            icon: 'tag',
          },
        },
        student: {
          StudentHome: {
            label: 'student.StudentHome',
            icon: 'home',
          },
          StudentReport: {
            label: 'student.StudentReport',
            icon: 'timeline',
          },
        },
      },
    };
  }

  /* Methods
  */

  updateState({ screen }) {
    const { routes } = this.state;

    this.setState({ routes, open: false });
  }

  /* Lifecycle
  */

  componentWillMount() {
    const updateState = this.updateState.bind(this);
    updateState(this.props);

    if (window) {
      if (window.nav) throw new Meteor.Error('Nav already initialized');
      else window.nav = (open=true) => this.setState({ open });
    }
  }

  componentWillReceiveProps(props) {
    const updateState = this.updateState.bind(this);
    updateState(this.props);
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
          ? <div className='ui center aligned basic segment'>
              {
                logging
                ? <div/>
                : <div>
                  <Button raised color='primary' href={FlowRouter.path('PublicLogin')} >
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
                <ListItem dense >
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
                  <ListItem button component='a' key={_route} href={FlowRouter.path(_route)}>
                    <Icon>{icon}</Icon>
                    <ListItemText primary={i18n.__('Navigation', label)} />
                  </ListItem>
                )
              }

            </List>

            <Divider/>

            <List>

              {/* <ListItem button component='a' href={FlowRouter.path(user.getSettingsRoute())} >
                <ListItemText primary='Configurações' />
              </ListItem> */}

              <ListItem button onTouchTap={logout} >
                <ListItemText primary='Sair' />
              </ListItem>

            </List>

          </div>
        }

      </Drawer>
    );
  }
};

export default Navigation;
