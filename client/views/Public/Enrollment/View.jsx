import React from 'react';
import log from 'loglevel';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogActions, DialogContent } from 'material-ui/Dialog';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';

class PublicEnrollment extends React.Component{
  /* Lifecycle
  */

  constructor(props) {
    super(props);
    this.state = { password: undefined };
  }

  /* Handlers
  */

  handleInput({ currentTarget, target: { value: password } }) {
    this.setState({ password });
  }

  handleSubmit() {
    const { token } = this.props;
    const { password } = this.state;
    Accounts.resetPassword(token, password, err => {
      if (err) log.error(err);
      else FlowRouter.go('PublicLogin');
    });
  }

  handlePressEnter(event) {
    if (event.keyCode == 13) _.bind(this.handleSubmit, this)();
  }

  /* Render
  */

  render() {
    const { password } = this.state;
    return (
      <div className='ui container'>
        <Layout.Bar title='Cadastro' />

        <Dialog open={true} >

          <DialogTitle id='title'>Escolha sua senha</DialogTitle>

          <DialogContent>
            <TextField
              type='password'
              id='password'
              placeholder='Mínimo 6 caracteres'
              value={password}
              onChange={this.handleInput.bind(this)}
              onKeyDown={this.handlePressEnter.bind(this)}
            />
          </DialogContent>

          <DialogActions>
            <Button
              disabled={!(password && password.length >= 6)}
              color='primary'
              onClick={this.handleSubmit.bind(this)}
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default PublicEnrollment;
