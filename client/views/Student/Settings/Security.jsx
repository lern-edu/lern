import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Grid, Button, Typography } from '@material-ui/core';
import _ from 'lodash';
import i18n from 'meteor/universe:i18n';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});

class StudentSettingsSecurity extends React.Component {

  constructor(props) {
    super(props);
    const { collections: { user: { doc } } } = props;
    this.state = {
      current: undefined,
      target: undefined,
      confirm: undefined,
      hasPassword: _.includes(doc.services, 'password'),
    };
  }

  /* Handlers
  */

  handleInputChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { collections: { user: { doc } } } = this.props;
    const { current, target, hasPassword } = this.state;
    if (hasPassword) {
      Accounts.changePassword(current, target, err => {
        if (err) {
          console.error(err);
          snack('Erro inesperado', 'orange warning');
        } else {
          this.setState({
            current: undefined,
            target: undefined,
            confirm: undefined,
            hasPassword: true,
          });
          snack('Senha trocada', 'green checkmark');
        }
      });
    } else {
      Meteor.call('UserSetPassword', doc._id, target, err => {
        if (err) {
          console.error(err);
          snack('Erro inesperado', 'orange warning');
        } else {
          this.setState({
            current: undefined,
            target: undefined,
            confirm: undefined,
            hasPassword: true,
          });
          snack('Senha trocada', 'green checkmark');
        }
      });
    }
  }

  render() {
    const { classes, collections: { user: { doc } } } = this.props;
    const { current, target, confirm, hasPassword } = this.state;

    return (
      <Grid container className={classes.root} justify='center'>
        <Grid item xs={12} md={10} lg={8} className={classes.grid}>

          <Paper className={classes.paper}>

              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="title" gutterBottom>
                    Emails
                  </Typography>
                </Grid>

                {_.map(doc.get('emails'), (e, index) =>
                  <Grid key={`email-${index}`} item xs={12}>
                    <doc.templates.Emails form={this} doc={doc} index={index} disabled={true}/>
                  </Grid>
                )}

              </Grid>

          </Paper>
          <Paper className={classes.paper}>
            <form autoComplete='off'>

              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="title" gutterBottom>
                    {hasPassword ?
                      i18n.__('StudentSettings.change_password') :
                      i18n.__('StudentSettings.add_password')}
                  </Typography>
                </Grid>

                {hasPassword ?
                  <Grid item xs={12}>
                    <TextField
                      label='Senha atual'
                      type='password'
                      onChange={this.handleInputChange.bind(this)}
                      name='current'
                    />
                  </Grid>
                  : undefined
                }

                <Grid item xs={12}>
                  <TextField
                    required
                    label='Nova senha'
                    type='password'
                    onChange={this.handleInputChange.bind(this)}
                    name='target'
                    error={!target || target.length < 6}
                    helperText={!target || target.length < 6 ?
                      'Tamanho mínimo de 6 caracteres' : ''}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    label='Confirmar nova senha'
                    type='password'
                    onChange={this.handleInputChange.bind(this)}
                    name='confirm'
                    error={target !== confirm}
                    helperText={target !== confirm ? 'Senhas não conferem' : ''}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems='flex-end'
                    direction='row'
                    justify='flex-end'
                    spacing={24}
                  >
                    <Grid item>
                      <Button
                        variant="raised"
                        href={FlowRouter.path('StudentSettings')}
                      >
                        {i18n.__('StudentSettings.cancel')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="raised"
                        onClick={this.handleSubmit.bind(this)}
                        color='primary'
                        disabled={
                          !target || target.length < 6 || target !== confirm
                        }
                      >
                        {i18n.__('StudentSettings.save')}
                      </Button>
                    </Grid>
                  </Grid>

                </Grid>

              </Grid>

            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

StudentSettingsSecurity.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentSettingsSecurity);
