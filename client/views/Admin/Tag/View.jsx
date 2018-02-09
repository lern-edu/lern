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
  input: {
    width: '100%',
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
        },
      },
      doc: !tagId ? new Tag() : null,
      errors: {},
    };
  }

  componentWillMount() {
    const { tagId } = this.props;

    if (tagId)
      Meteor.call('AdminTagsGet', { _id: tagId }, { limit: 1 },  (err, docs) => {
        if (err) snack({ message: 'Erro ao encontrar tag' });
        this.setState({ doc: _.head(docs), collections: { tag: { handler: false } } });
      });
  };

  handleChange = ({ target: { value } }) => {
    const { doc } = this.state;
    doc.name = value;
    this.setState({ doc });
    doc.validate({ fields: [`name`] }, (err) => {
      if (err) this.setState({ errors: { name: { message: err.reason, error: true } } });
      else this.setState({ errors: { name: { message: undefined, error: false } } });
    });

  };

  // Handlers

  handleSubmit() {
    const { doc } = this.state;

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
    const { title, collections, errors, doc } = this.state;
    const { classes } = this.props;

    console.log(doc);

    return (
      <div>
        <Layout.Bar title={title} crumbs={[{ label: 'Tags', path: 'AdminTags' }]}/>

        {
          !_.every(collections, c => !c.handler)
          ? <LinearProgress color='secondary' />
          : (
            <Grid container className={classes.root} justify='center'>

              <Grid item xs={12} md={10} lg={8} className={classes.grid}>

                <form autoComplete='off'>

                  <Grid container spacing={24}>

                      <Grid item xs={12}>
                        
                        <Paper className={classes.paper}>

                          <FormControl error={_.get(errors, 'name.error')} className={classes.input}>
                            <InputLabel htmlFor='name'>Name</InputLabel>
                            <Input
                              value={doc.name || ''}
                              onChange={this.handleChange}
                              className={classes.input}
                            />
                            {
                              !_.get(errors, 'name.error')
                              ? undefined
                              : <FormHelperText>{_.get(errors, 'name.message')}</FormHelperText>
                            }

                          </FormControl>

                        </Paper>

                      </Grid>

                      <Grid item xs={12}>
                        <Paper className={classes.paper}>
                          <doc.templates.Description form={this} doc={doc} />
                        </Paper>
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
