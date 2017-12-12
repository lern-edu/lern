import React from 'react';
import { FontIcon, RaisedButton } from 'material-ui';

class NotFound extends React.Component {
  /* Render
  */

  render() {
    const { path, message='Não existe nada aqui!',
      icon='mood_bad', } = this.props;

    return (
      <div>
        <div className='ui center aligned basic segment'>
          <h1 className='ui icon header'>
            <FontIcon className='material-icons' style={{ fontSize: 50 }}>
              {icon}</FontIcon>
            <div className='content'>
              <div className='sub header'>{message}</div>
            </div>
          </h1>
          <div>
            <RaisedButton
              label='Voltar'
              primary={true}
              href={FlowRouter.path(path)}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default NotFound;
