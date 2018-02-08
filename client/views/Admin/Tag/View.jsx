// Libs
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { Tag } from 'meteor/duckdodgerbrasl:lern-model';
import { Regex } from 'meteor/duckdodgerbrasl:lern-check';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

// Styles
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});

class AdminTag extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { tagId } = props;
    this.state = {
      title: !tagId ? 'Criar' : 'Editar',
      collections: {
        tag: {
          handler: !_.isEmpty(tagId),
          doc: !tagId ? new Tag({ emails: [{ address: '' }], services: { password: '' } }) : null,
        },
      },
    };
  }

  componentWillMount() {
    const { tagId } = this.props;

    if (tagId)
      Meteor.call('AdminTagsGet', { _id: tagId }, { limit: 1 },  (err, docs) => {
        if (err) snack({ message: 'Erro ao encontrar tag' });
        this.setState({ collections: { tag: { handler: false, doc: _.head(docs) } } });
      });
  }

  // Handlers

  handleSubmit() {
    const { collections: { tag: { doc } } } = this.state;

    doc.validate({ fields: ['name'] }, (err) => {
      if (err) snack({ message: err.reason });
      else
        Meteor.call('AdminTagSave', doc, (err, res) => {
          if (err) snack({ message: 'Erro ao salvar tag' });
          else FlowRouter.go('AdminTags');
        });
    });
  }

  render() {
    const { title, collections, collections: { tag: { doc } } } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Layout.Bar title={title} crumbs={[{ label: 'tags', path: 'AdminTags' }]}/>

        {
          !_.every(collections, c => !c.handler)
          ? <LinearProgress color='secondary' />
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

                        <Grid item xs={12}>
                          <doc.templates.FirstName form={this} doc={doc} />
                        </Grid>

                        <Grid item xs={12}>
                          <doc.templates.LastName form={this} doc={doc} />
                        </Grid>

                        <Grid item xs={12}>
                          <doc.templates.Roles form={this} doc={doc} />
                        </Grid>

                        <Grid item xs={12}>

                          <Grid
                            container
                            alignItems='flex-end'
                            direction='row'
                            justify='flex-end'
                          >
                            <Grid item>
                              <Button href={FlowRouter.path('AdminTags')} raised>
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

AdminTag.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTag);
