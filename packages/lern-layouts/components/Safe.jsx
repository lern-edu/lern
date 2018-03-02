import React from 'react';
import Bar from '../Bar.jsx';
import { FontIcon, RaisedButton, LinearProgress } from 'material-ui';
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
         ) : access === false ? (<div>
           <Layout.Bar title='Ops' />
           <div>
             <h1>
               <div>
                 <div>Você não deveria estar aqui</div>
               </div>
             </h1>
             <div>
               <RaisedButton
                 label='Voltar'
                 primary={true}
                 href={FlowRouter.path('PublicHome')}
               />
             </div>
           </div>
         </div>) : undefined}
       </div>
     );
  }
};

export default Safe;
