import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText } from 'material-ui/Dialog';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import _ from 'lodash';

class PublicComplete extends React.Component{
  /* Lifecycle
  */

  constructor(props) {
    super(props);
    this.state = { email: undefined };
  }

  /* Handlers
  */

  handleInput({ currentTarget, target: { value: email } }) {
    this.setState({ email });
  }

  handleSubmit() {
    const { email } = this.state;
    Meteor.call('UserCompleteLogin', email, (err) => {
      if (!err) {
        FlowRouter.go(this.props.path);
      }
    });
  }

  handlePressEnter(event) {
    if (event.keyCode == 13) _.bind(this.handleSubmit, this)();
  }

  /* Render
  */

  render() {
    const { email } = this.state;
    return (
      <div className='ui container'>
        <Layout.Bar title='Completar o cadastro' />

        <Dialog open={true} >

          <DialogTitle id='title'>Completar o cadastro</DialogTitle>

          <DialogContent>
            <DialogContentText>
              É necessário inserir um email para seu cadastro.
            </DialogContentText>
            <TextField
              type='email'
              id='email'
              placeholder='Email'
              onChange={this.handleInput.bind(this)}
              onKeyDown={this.handlePressEnter.bind(this)}
            />
          </DialogContent>

          <DialogActions>
            <Button
              disabled={!email}
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

export default PublicComplete;
