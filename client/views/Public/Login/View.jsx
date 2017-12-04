// Libs
import React from 'react';
import _ from 'lodash';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { Icon } from 'semantic-ui-react';

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
  form: {
    className: 'eight wide computer ten wide tablet thirteen wide mobile column',
    style: {
      marginTop: '3%',
      padding: '0px',
    },
  },
  column: {
    className: 'sixteen wide column',
    style: { paddingBottom: '0px' },
  },
};

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
        } else this.handleRedirect().bind(this);
      });
    } else snack('Preencha todos os campos');
  }

  handleFacebookLogin() {
    Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] },
    (err) => {
      if (err) snack('Problemas ao cadastrar');
      else this.handleRedirect();
    });
  }

  handleGoogleLogin() {
    Meteor.loginWithGoogle({}, (err) => {
      if (err) snack('Problemas ao cadastrar');
      else this.handleRedirect();
    });
  }

  handleRedirect() {
    snack('Bem vindo!');

    // console.log(user);
    // if (_.get(this, 'props.query.alias'))
    //   FlowRouter.go(user.getSetupRoute(), {}, { ...this.props.query });
    // else FlowRouter.go(user.getHomeRoute(), {}, { ...this.props.query });
  }

  // Render

  render() {

    const { email, password } = this.state;

    const handleInput         = this.handleInput.bind(this);
    const handleLogin         = this.handleLogin.bind(this);
    const handleFacebookLogin = this.handleFacebookLogin.bind(this);
    const handleGoogleLogin   = this.handleGoogleLogin.bind(this);

    return (
      <div className='ui middle aligned center aligned grid' >

        <div {...styles.background} />

        <div {...styles.form} >

          <div className='row' style={{ marginTop: '15px' }}>
            <div className='ui center aligned grid'>

              <div {...styles.column}>
                <a>
                  <img
                    style={{ display: 'inline-block' }}
                    className='ui medium image'
                    src='/images/brain-clear.png'
                  />
                </a>

              </div>

              <Card elevation={4} {...styles.column} >
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
                    <Icon style={{ lineHeight: '1em' }} name='facebook f' />
                    Facebook
                  </Button>

                  <Button
                    style={{ color: '#DC4A38' }}
                    onTouchTap={handleGoogleLogin}
                  >
                    <Icon style={{ lineHeight: '1em', marginRight: 8 }} name='google plus' />
                    Google
                  </Button>
                </CardActions>
              </Card>

            </div>
          </div>

        </div>

      </div>
    );
  }

};

export default PublicLogin;
