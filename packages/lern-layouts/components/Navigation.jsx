import React from 'react';
import { Drawer, CardMedia, ListItem, DropDownMenu } from 'material-ui';
import { RaisedButton, IconButton, Avatar, MenuItem } from 'material-ui';
import { Divider, LinearProgress, FontIcon, Styles } from 'material-ui';
import { grey300, grey400 } from 'material-ui/colors';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: {
        admin: {
          AdminHome: {
            label: 'Home',
            icon: null,
          },
          AdminPlans: {
            label: 'Planos',
            icon: null,
          },
          AdminTests: {
            label: 'Testes',
            icon: null,
          },
          AdminSubjects: {
            label: 'Matérias',
            icon: null,
          },
          AdminSchools: {
            label: 'Escolas',
            icon: null,
          },
          AdminUsers: {
            label: 'Usuários',
            icon: null,
          },
        },
        school: {
          SchoolHome: {
            label: 'Home',
            icon: 'home',
          },
          SchoolCourses: {
            label: 'Cursos',
            icon: 'dashboard',
          },
          SchoolUsers: {
            label: 'Alunos',
            icon: 'school',
          },
          SchoolTests: {
            label: 'Testes',
            icon: 'import_contacts',
          },
        },
        teacher: {
          TeacherHome: {
            label: 'Home',
            icon: 'home',
          },
          TeacherCourses: {
            label: 'Disciplinas',
            icon: 'dashboard',
          },
          TeacherTests: {
            label: 'Testes',
            icon: 'description',
          },
          TeacherPosts: {
            label: 'Posts',
            icon: 'forum',
          },
        },
        student: {
          StudentHome: {
            label: 'Home',
            icon: 'home',
          },
          StudentCourses: {
            label: 'Disciplinas',
            icon: 'dashboard',
          },

          // StudentTests: {
          //   label: 'Estudos',
          //   icon: 'import_contacts',
          // },
          // StudentReports: {
          //   label: 'Relatórios',
          //   icon: 'timeline',
          // },
          StudentPosts: {
            label: 'Posts',
            icon: 'forum',
          },
        },
      },
    };
  }

  /* Methods
  */

  updateState({ screen }) {
    const { routes } = this.state;

    // const { user } = this.props;
    const isComputer = screen === 'computer';

    // if (_.get(user, 'profile.school')) {
    //   routes.teacher.TeacherCourses = 'Disciplinas';
    //   routes.student.StudentCourses = 'Disciplinas';
    // };

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
    }    const { user } = this.context;

    const profilePic = _.get(user, 'profile.profilePic');

    const name = _.get(user, 'profile.name');

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

        {!user ? (
          <div className='ui center aligned basic segment'>
            {logging
              ? <div/>
              : <div>
                <RaisedButton
                  href={FlowRouter.path('PublicLogin')}
                  label='Entrar'
                  primary={true}
                />
                <h1 className='ui icon header'>
                  <FontIcon
                    className='material-icons'
                    style={{ fontSize: 50 }}
                    color={grey300}>school</FontIcon>
                  <div className='content'>
                    <div className='sub header' style={{ color: grey400 }}>
                    </div>
                  </div>
                </h1>
              </div>
            }
          </div>
        ) : (
          <div>

            <div style={
              {
                background:
                  '#ffffff url("/images/layout/material-background.png") no-repeat right top'
              }
            } >
              <ListItem
                children={
                  profilePic
                  ? <Avatar key='image' size={60} src={profilePic} />
                  : <Avatar key='image' size={60} size={52}>
                    {_.first(name)}
                  </Avatar>
                }
                disabled={true}
              />

              <ListItem
                children={
                  <h5
                    key='name'
                    style={{ textShadow: '0 0 10px rgba(0,0,0,.85)' }}
                    className="ui white inverted header"
                  >
                    {name}
                  </h5>
                }
                disabled={true}
              />

              {
                roles && roles.length <= 1
                ? undefined
                : <DropDownMenu
                  labelStyle={{
                    color: 'white',
                    textShadow: '0 0 4px rgba(0,0,0,.85)'
                  }}
                  value={_.get(user, 'profile.role')}
                  onChange={this.handleRoleChange}
                >
                  {
                    _.map(_.uniq(roles), r =>
                      <MenuItem key={r} value={r} primaryText={i18n.__(`UserRoles.${r}`)} />
                    )
                  }
                </DropDownMenu>
              }

            </div>

            <Divider />

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
            </div>
          </div>
        )}

      </Drawer>
    );
  }
};
