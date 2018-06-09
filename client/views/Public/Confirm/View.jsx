import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText } from '@material-ui/core/Dialog';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import _ from 'lodash';

class PublicConfirm extends React.Component{
  /* Lifecycle
  */

  constructor(props) {
    super(props);
    this.state = { token: undefined };
  }

  /* Handlers
  */

  handleInput({ currentTarget, target: { value: token } }) {
    this.setState({ token });
  }

  handleSubmit() {
    const { token } = this.state;
    console.log(token);
    Accounts.verifyEmail(token, err => {
      if (err) console.log(err);
      else FlowRouter.go(this.props.path);
    });
  }

  handlePressEnter(event) {
    if (event.keyCode == 13) _.bind(this.handleSubmit, this)();
  }

  handleSendAgain = () => {
    Meteor.call('PublicVerificationLink');
  };

  /* Render
  */

  render() {
    const { token } = this.state;
    return (
      <div>
        <Layout.Bar title='Verificar Email' />

        <Dialog open={true}>

          <DialogTitle id='title'>Verificar email</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Insira o token recebido no seu email.
              <br />
              Não recebeu? <Button onClick={this.handleSendAgain}>Enviar novamente</Button>
            </DialogContentText>
            <br />
            <TextField
              type='text'
              id='token'
              placeholder='Token'
              fullWidth
              onChange={this.handleInput.bind(this)}
              onKeyDown={this.handlePressEnter.bind(this)}
            />
          </DialogContent>

          <DialogActions>
            <Button
              disabled={!token}
              color='primary'
              onClick={this.handleSubmit.bind(this)}
            >
              Validar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default PublicConfirm;
