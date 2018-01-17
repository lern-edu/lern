// Libs
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { Company } from 'meteor/duckdodgerbrasl:lern-model';
import { Regex } from 'meteor/duckdodgerbrasl:lern-check';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

// Styles
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});

class AdminCompany extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { companyId } = props;
    this.state = {
      title: !companyId ? 'Criar' : 'Editar',
      collections: {
        company: {
          handler: !_.isEmpty(companyId),
          doc: !companyId ? new Company() : null,
        },
      },
    };
  }

  componentWillMount() {
    const { companyId } = this.props;

    if (companyId)
      Meteor.call('AdminCompaniesGet', { _id: companyId }, { limit: 1 },  (err, docs) => {
        if (err) snack({ message: 'Erro ao encontrar empresa' });
        this.setState({ collections: { company: { handler: false, doc: _.head(docs) } } });
      });
  }

  // Handlers

  handleSubmit() {
    const { collections: { company: { doc } } } = this.state;

    doc.validate({}, (err) => {
      if (err) snack({ message: err.reason });
      else
        Meteor.call('AdminCompanySave', doc, (err, res) => {
          if (err) snack({ message: 'Erro ao salvar empresa' });
          else FlowRouter.go('AdminCompanies');
        });
    });
  }

  render() {
    const { title, collections, collections: { company: { doc } } } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Layout.Bar title={title} crumbs={[{ label: 'Empresas', path: 'AdminCompanies' }]}/>

        {
          !_.every(collections, c => !c.handler)
          ? <LinearProgress color='accent' />
          : (
            <Grid container className={classes.root} justify='center'>

              <Grid item xs={12} md={10} lg={8} className={classes.grid}>

                <Paper className={classes.paper}>

                  <form autoComplete='off'>

                    <Grid container spacing={24}>

                      <Grid item xs={12}>
                        <doc.templates.Name form={this} doc={doc} />
                      </Grid>

                      <Grid item xs={12}>
                        <doc.templates.Admins form={this} doc={doc} />
                      </Grid>

                      <Grid item xs={12}>

                        <Grid
                          container
                          alignItems='flex-end'
                          direction='row'
                          justify='flex-end'
                        >
                          <Grid item>
                            <Button href={FlowRouter.path('AdminCompanies')} raised>
                              Cancel
                            </Button>
                          </Grid>

                          <Grid item>
                            <Button onClick={this.handleSubmit.bind(this)} raised color='primary'>
                              Save
                            </Button>
                          </Grid>

                        </Grid>

                      </Grid>

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

AdminCompany.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminCompany);
