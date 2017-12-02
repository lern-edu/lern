// Libs
import React from 'react';
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

  // Handlers

  handleInput({ currentTarget, target: { value } }) {
    console.log(currentTarget, value);
    const name = currentTarget.getAttribute('name');
    this.setState({ [name]: value });
  }

  // Render

  render() {

    const { email, password } = this.state;

    const handleInput = this.handleInput.bind(this);

    return (
      <div className='ui middle aligned center aligned grid' >

        <div {...styles.background} />

        <div {...styles.form} >

          <div className='row' style={{ marginTop: '15px' }}>
            <div className='ui center aligned grid'>

              <div {...styles.column}>
                <a href={FlowRouter.path('PublicHome')} >
                  <img
                    style={{ display: 'inline-block' }}
                    className='ui medium image'
                    src='/images/brain-clear.png'
                  />
                </a>

              </div>

              <Card elevation={4} {...styles.column} style={{ backgroundColor: 'transparent' }}>
                <CardContent>
                  <Typography style={{ color: 'white' }} type='headline' component='h2'>
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
                    InputLabelProps={{
                      inputLabelFocused: {
                        color: '#FFF',
                      },
                    }}
                    inputProps={{
                      inputInkbar: {
                        backgroundColor: '#FFF',
                        '&:after': {
                          backgroundColor: '#FFF',
                        },
                      },
                    }}
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

                </CardContent>
                <CardActions>
                  <Button style={{ color: '#3954A1' }} >
                    <Icon style={{ lineHeight: '1em' }} name='facebook f' />
                    Facebook
                  </Button>

                  <Button style={{ color: '#DC4A38' }}>
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
