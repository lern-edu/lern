// Libs
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { User } from 'meteor/duckdodgerbrasl:lern-model';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

// Styles
const styles = theme => ({
  paper: {
    padding: 16,
    margin: 16,
  },
});

class AdminUser extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { userId } = props;
    this.state = {
      title: !userId ? 'Criar' : 'Editar',
      collections: {
        user: {
          handler: !_.isEmpty(userId),
          doc: !userId ? new User({ emails: [{ address: '' }] }) : null,
        },
      },
    };
  }

  componentWillMount() {
    const { userId } = this.props;

    if (userId)
      Meteor.call('AdminGetUsers', { _id: userId }, { limit: 1 },  (err, docs) => {
        if (err) snack({ message: 'Erro ao encontrar usuário' });
        this.setState({ collections: { user: { handler: false, doc: _.head(docs) } } });
      });
  }

  render() {
    const { title, collections, collections: { user: { doc } } } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Layout.Bar title={title} crumbs={[{ label: 'Usuários', path: 'AdminUsers' }]}/>

        {
          !_.every(collections, c => !c.handler)
          ? <LinearProgress color='accent' />
          : (
            <Grid container className={classes.root} justify='center'>

              <Grid item xs={12} md={10} lg={8} className={classes.grid}>

                <Paper className={classes.paper}>

                  <form autoComplete='off'>

                    <Grid container spacing={24}>

                        {
                          _.map(doc.get('emails'), (e, index) =>
                            <Grid key={`email-${index}`} item xs={12}>
                              <doc.templates.Emails form={this} doc={doc} index={index} />
                            </Grid>
                          )
                        }

                    </Grid>

                  </form>

                </Paper>

              </Grid>

            </Grid>
          )
        }
      </div>
    );
  }

};

AdminUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminUser);
