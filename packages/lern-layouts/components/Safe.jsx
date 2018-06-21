import React from 'react';
import Bar from '../Bar.jsx';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import _ from 'lodash';

/**
 * Safe view render
 * @private
 * @memberof LernLayouts.Components
 */
class Safe extends React.Component {

  /* Methods
  */

  updateAccess({ protect, user, logging }) {
    this.setState({
      access: (
         !protect ? true
       : logging ? undefined
       : !user ? null
       : _.isEmpty(user.roles) ? undefined
       : user.hasRole(protect)
     ),
    });
  }

  /* Lifecycle
  */

  constructor(props) {
    super(props);
    this.state = { access: undefined };
  }

  componentWillMount() {
    const updateAccess = this.updateAccess.bind(this);
    updateAccess(this.props);
  }

  componentWillReceiveProps(props) {
    const updateAccess = this.updateAccess.bind(this);
    updateAccess(props);
  }

  componentWillUpdate({ user }, { access }) {
    if (access === null) {
      snack('Você deve entrar primeiro');
      FlowRouter.go('PublicLogin');
    }

    if (user) {
      if (_.size(_.get(user, 'emails')) === 0) {
        if (FlowRouter.getRouteName() &&
          !_.includes(FlowRouter.getRouteName(), 'Public')) {
          snack('É necessário cadastrar um email');
          FlowRouter.go('PublicComplete', {}, { path: FlowRouter.current().path });
          return;
        }
      } else if (!_.some(_.get(user, 'emails'), 'verified')) {
        if (FlowRouter.getRouteName() &&
          !_.includes(FlowRouter.getRouteName(), 'Public')) {
          snack('É necessário confirmar seu email');
          FlowRouter.go('PublicConfirm', {}, { path: FlowRouter.current().path });
          return;
        }
      }
    }

    if (!this.props.user && user && this.redir) {
      if (!_.get(user, 'profile.tutorial'))
        FlowRouter.go(user.getHomeRoute);
      snack('Bem-vindo!');
    }
  }

  /* Render
  */

  render() {
    const { access } = this.state;
    return (
      <div>
         {access === true ? (
           this.props.children
         ) : access === null ? (
           undefined
         ) : access === undefined ? (
           <div>
             <LinearProgress size={2}/>
           </div>
         ) : access === false ? (
          <div>
            <Bar title='Ops' />
             <div>
               <h3>
                <div>Você não deveria estar aqui</div>
              </h3>
              <div>
                <Button
                  raised
                  color='primary'
                  href={FlowRouter.path('PublicLogin')}
                >
                  Voltar
                </Button>
              </div>
            </div>
          </div>
        ) : undefined}
      </div>
    );
  }
};

export default Safe;
