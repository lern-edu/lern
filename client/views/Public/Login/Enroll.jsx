import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog, { DialogTitle, DialogActions, DialogContent } from '@material-ui/core/Dialog';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { Grid, Button, TextField, Paper, Typography, IconButton } from '@material-ui/core';
import { Toolbar, AppBar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons//Close';
import Slide from '@material-ui/core/Slide';
import i18n from 'meteor/universe:i18n';
import { Regex } from 'meteor/duckdodgerbrasl:lern-model';
import _ from 'lodash';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PublicLoginEnroll extends React.Component{
  /* Lifecycle
  */

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      cpassword: '',
      firstName: '',
      lastName: '',
    };
  }

  /* Handlers
  */

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { email, password, firstName, lastName } = this.state;
    Accounts.createUser({
      email,
      password,
      profile: {
        firstName,
        lastName,
      },
    }, err => {
      if (err) {
        snack({ message: i18n.__('PublicLogin.errorMessage') });
        throw(err);
      }

      Meteor.call('PublicVerificationLink');

      this.handleRedirect();
    });
  };

  handleRedirect = () => {
    Meteor.call(
      'UserGetInitialRoute',
      _.get(this, 'props.query.alias') ? 'setup' : 'home',
      (err, { route, locale }) => {
        snack({ message: i18n.__('PublicLogin.welcomeMessage') });
        FlowRouter.go(route, {}, { ...this.props.query });
        i18n.setLocale(locale);
        i18n.getLocale();
      }
    );
  };

  handlePressEnter = (event) => {
    if (event.keyCode == 13) his.handleSubmit();
  };

  /* Render
  */

  render() {
    const { classes, open, handleClose } = this.props;
    const { email, password, cpassword, firstName, lastName } = this.state;

    let disabled = email === ''
      || !Regex.email.test(email)
      || password.length < 6
      || cpassword !== password
      || lastName === ''
      || firstName === '';

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {i18n.__('PublicLogin.sign_on')}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container
          spacing={0}
          justify="center"
          style={{ textAlign: 'center', padding: 10 }}
        >
          <Grid item xs={12} sm={8} lg={6}>
            <form>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label={i18n.__('PublicLogin.email')}
                    name='email'
                    type='email'
                    margin='normal'
                    value={email}
                    onChange={this.handleInput}
                    error={email === '' || !Regex.email.test(email)}
                    helperText={email === '' ?
                      i18n.__('PublicLogin.required') :
                        !Regex.email.test(email) ?
                        i18n.__('PublicLogin.email') :
                        ''
                      }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label={i18n.__('PublicLogin.password')}
                    name='password'
                    type='password'
                    margin='normal'
                    value={password}
                    onChange={this.handleInput}
                    error={!password || password.length < 6}
                    helperText={!password || password.length < 6 ?
                      i18n.__('PublicLogin.password_size') : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label={i18n.__('PublicLogin.confirm_password')}
                    name='cpassword'
                    type='password'
                    margin='normal'
                    value={cpassword}
                    onChange={this.handleInput}
                    error={password !== cpassword}
                    helperText={password !== cpassword ? i18n.__('PublicLogin.password_match') : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label={i18n.__('PublicLogin.firstName')}
                    name='firstName'
                    type='text'
                    margin='normal'
                    value={firstName}
                    onChange={this.handleInput}
                    error={firstName === ''}
                    helperText={firstName === '' ? i18n.__('PublicLogin.required') : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label={i18n.__('PublicLogin.lastName')}
                    name='lastName'
                    type='text'
                    margin='normal'
                    value={lastName}
                    onChange={this.handleInput}
                    error={lastName === ''}
                    helperText={lastName === '' ? i18n.__('PublicLogin.required') : ''}
                  />
                </Grid>
              </Grid>
              <br/>
              <Button
                variant="raised"
                color='primary'
                disabled={disabled}
                onClick={this.handleSubmit}
                >
                {i18n.__('PublicLogin.sign_on')}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
};

export default withStyles(styles)(PublicLoginEnroll);
