import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogActions, DialogContent } from 'material-ui/Dialog';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { Grid, Button, TextField, Paper, Typography, IconButton } from 'material-ui';
import { Toolbar, AppBar } from 'material-ui';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
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

class PublicLoginForgot extends React.Component{
  /* Lifecycle
  */

  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    const { email } = this.state;
    Accounts.forgotPassword({
      email,
    }, err => {
      if (err) {
        snack({ message: err.reason === 'User not found' ?
          i18n.__('PublicLogin.userNotFoundMessage') :
          i18n.__('PublicLogin.email_error'),
        });
      } else {
        snack({ message: i18n.__('PublicLogin.email_sent') });
        this.props.handleClose();
      }
    });
  };

  handlePressEnter = (event) => {
    if (event.keyCode == 13) his.handleSubmit();
  };

  /* Render
  */

  render() {
    const { classes, open, handleClose } = this.props;
    const { email } = this.state;

    let disabled = email === ''
      || !Regex.email.test(email);

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
              {i18n.__('PublicLogin.forgot_password')}
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
                  <Typography>
                    {i18n.__('PublicLogin.recovery_instructions')}
                  </Typography>
                </Grid>
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
              </Grid>
              <br/>
              <Button
                variant="raised"
                color='primary'
                disabled={disabled}
                onClick={this.handleSubmit}
                >
                {i18n.__('PublicLogin.send_email')}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
};

export default withStyles(styles)(PublicLoginForgot);
