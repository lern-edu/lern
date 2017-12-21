// Libs
import React from 'react';
import _ from 'lodash';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import SvgIcon from 'material-ui/SvgIcon';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

// Styles
const styles = {
  background: {
    style: {
      width: `100%`,
      height: `100%`,
      top: 0,
      left: 0,
      backgroundSize: 'cover',
      backgroundImage: 'url(/backgrounds/triangles-login.svg)',
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
      zIndex: '-1',
    },
  },
  image: {
    style: {
      width: '80%',
      paddingBottom: '48px',
      margin: 'auto',
    },
  },
};

//icons
const FacebookIcon = props => (
  <SvgIcon {...props}>
    <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
  </SvgIcon>
);

const GoogleIcon = props => (
  <SvgIcon {...props}>
    <path d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z" />
  </SvgIcon>
);

const texts = {};

class PublicLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = { password: '', email: '' };
  }

  clear() {
    this.setState({ password: '', email: '' });
  }

  // Handlers

  handleInput({ currentTarget, target: { value } }) {
    const name = currentTarget.getAttribute('name');
    this.setState({ [name]: value });
  }

  handleLogin(event) {
    const { email, password } = this.state;
    if (email && password) {
      Meteor.loginWithPassword(email, password, (err, res) => {
        if (err) {
          snack(err.reason.includes('password')
          ? 'Senha incorreta'
          : 'Usuário não encontrado');
          this.clear();
        } else this.handleRedirect.bind(this)();
      });
    } else snack('Preencha todos os campos');
  }

  handleFacebookLogin() {
    Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] },
    (err) => {
      if (err) snack('Problemas ao cadastrar');
      else this.handleRedirect.bind(this);
    });
  }

  handleGoogleLogin() {
    Meteor.loginWithGoogle({}, (err) => {
      if (err) snack('Problemas ao cadastrar');
      else this.handleRedirect.bind(this);
    });
  }

  handleRedirect() {
    snack('Bem vindo!');
    Meteor.call(
      'UserGetInitialRoute',
      _.get(this, 'props.query.alias') ? 'setup' : 'home',
      (err, route) => {
        FlowRouter.go(route, {}, { ...this.props.query });
      }
    );
  }

  // Render

  render() {

    const { email, password } = this.state;

    const handleInput         = this.handleInput.bind(this);
    const handleLogin         = this.handleLogin.bind(this);
    const handleFacebookLogin = this.handleFacebookLogin.bind(this);
    const handleGoogleLogin   = this.handleGoogleLogin.bind(this);

    return (
      <Grid container spacing={24} justify="center" style={{ textAlign: 'center' }}>

        <div {...styles.background} />

          <Grid item xs={12} sm={8} lg={6}>
            <img
              {...styles.image}
              src='/images/brain-clear.png'
            />
            <Card elevation={4}>
              <CardContent>
                <Typography type='headline' component='h2'>
                  Login
                </Typography>

                <TextField
                  label='E-mail'
                  placeholder='E-mail'
                  name='email'
                  type='email'
                  margin='normal'
                  value={email}
                  onChange={handleInput}
                />

                <br/>

                <TextField
                  label='Senha'
                  placeholder='Senha'
                  name='password'
                  type='password'
                  margin='normal'
                  value={password}
                  onChange={handleInput}
                />

                <br/>

                <Button color='primary' onTouchTap={handleLogin}>
                  Entrar
                </Button>

              </CardContent>
              <CardActions>
                <Button
                  style={{ color: '#3954A1' }}
                  onTouchTap={handleFacebookLogin}
                >
                  <FacebookIcon/>
                  Facebook
                </Button>

                <Button
                  style={{ color: '#DC4A38' }}
                  onTouchTap={handleGoogleLogin}
                >
                  <GoogleIcon/>
                  Google
                </Button>
              </CardActions>
            </Card>

        </Grid>
      </Grid>
    );
  }

};

export default withStyles(styles)(PublicLogin);
