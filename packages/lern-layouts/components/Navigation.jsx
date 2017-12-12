import React from 'react';
import _ from 'lodash';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Select from 'material-ui/Select';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

import { DropDownMenu } from 'material-ui';
import { FontIcon } from 'material-ui';
import { grey300, grey400 } from 'material-ui/colors';

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: {
        admin: {
          AdminHome: {
            label: 'Home',
            icon: null,
          },
        },
      },
    };
  }

  /* Methods
  */

  updateState({ screen }) {
    const { routes } = this.state;

    this.setState({ routes,
      docked: false,
      open: false,
      style: {
        backgroundColor: '#F9F9F9',
      },
    });
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
        onRequestChange={open => this.setState({ open })}
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
                  '#ffffff url("/images/layout/material-background.png") no-repeat right top',
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
                  <InputLabel htmlFor="age-simple">Age</InputLabel>
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

            {/* <Divider />

            {_.map(routes[user.getRole()], ({ label, icon }, _route) =>
              <ListItem
                leftIcon={_.isNull(icon) ? undefined :
                  <FontIcon className='material-icons'>{icon}</FontIcon>}
                style={_route === route ? { backgroundColor: grey300 }
                  : undefined}
                key={_route}
                primaryText={label}
                href={FlowRouter.path(_route)}
              />
            )}
            <Divider/>
            <div>
              <ListItem
                primaryText="Configurações"
                href={FlowRouter.path(user.getSettingsRoute())} />
              <ListItem
                primaryText="Fale conosco"
                href={FlowRouter.path('PublicContact')} />
              <ListItem
                primaryText="Sair"
                onClick={logout} />
            </div> */}
          </div>
        }

      </Drawer>
    );
  }
};

export default Navigation;
