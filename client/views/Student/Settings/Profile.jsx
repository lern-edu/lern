import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Paper, TextField, Grid, Button, Avatar } from 'material-ui';
import i18n from 'meteor/universe:i18n';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
  avatar: {
    margin: theme.spacing.unit,
    width: 60,
    height: 60,
  },
});

class StudentSettingsProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSubmit() {
    const { collections: { user: { doc } } } = this.props;

    doc.validate(
      { fields: ['profile.firstName', 'profile.lastName'] },
      (err) => {
        if (err) snack({ message: err.reason });
        else
          Meteor.call('UserSaveProfile', doc.profile, (err, res) => {
            if (err) {
              snack({ message: 'Erro ao salvar usuário' });
              console.error(err);
            } else FlowRouter.go('StudentSettings', {}, { tab: 'profile' });
          });
      }
    );
  }

  render() {
    const { classes, collections: { user: { doc } } } = this.props;

    return (
      <Grid container className={classes.root} justify='center'>
        <Grid item xs={12} md={10} lg={8} className={classes.grid}>

          <Paper className={classes.paper}>
            <form autoComplete='off'>

              <Grid container spacing={24}>

                <Grid item xs={12}>
                  <Avatar
                    alt='Profile Picture'
                    src={doc.profile.profilePic}
                    className={classes.avatar}
                  />
                </Grid>

                <Grid item xs={12}>
                  <doc.templates.FirstName form={this} doc={doc} />
                </Grid>

                <Grid item xs={12}>
                  <doc.templates.LastName form={this} doc={doc} />
                </Grid>

                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems='flex-end'
                    direction='row'
                    justify='flex-end'
                  >
                    <Grid item>
                      <Button href={FlowRouter.path('StudentSettings')} raised>
                        {i18n.__('StudentSettings.cancel')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={this.handleSubmit.bind(this)} raised color='primary'>
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

StudentSettingsProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentSettingsProfile);
