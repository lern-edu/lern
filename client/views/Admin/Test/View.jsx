// Libs
import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import _ from 'lodash';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { Test, Content, StaticCollections } from 'meteor/duckdodgerbrasl:lern-model';
import { Regex } from 'meteor/duckdodgerbrasl:lern-check';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider/Divider';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';

const content = new Content();
const ContentCreate = _.get(content, 'templates.ContentCreate');
const ContentShow = _.get(content, 'templates.ContentShow');

import AdminTestText from './Text.jsx';
import AdminTestNumber from './Number.jsx';
import AdminTestSelect from './Select.jsx';
import AdminTestTime from './Time.jsx';
import AdminTestTimeout from './Timeout.jsx';
import AdminTestPages from './Pages.jsx';
import AdminTestScores from './Scores.jsx';
import AdminTestImage from './Image.jsx';

// Styles
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
  stepper: {
    width: '100%',
  },
});

class AdminTest extends React.Component {

  // Lifecycle

  constructor(props) {
    log.info('AdminTest', props);
    super(props);
    const { testId, skip } = props;
    this.state = {
      title: !testId ? 'Criar' : 'Editar',
      collections: {
        test: {
          handler: !_.isEmpty(testId),
        },
        tags: {
          docs: [],
          handler: true,
          query: {},
          options: { skip },
        },
      },
      doc: !testId ? new Test() : null,
      errors: {},
      activeStep: 0,
    };
  };

  componentWillMount() {
    log.info('AdminTest.componentWillMount');
    this.getTests(this.props.testId);
    this.getTags();
  };

  getTests = (testId) => {
    log.info('AdminTest.getTests/testId =>', testId);
    if (testId)
      Meteor.call('AdminTestsGet', { _id: testId }, { limit: 1 }, (err, docs) => {
        if (err) snack({ message: 'Erro ao encontrar test' });
        else {
          const doc = _.head(docs);
          const { collections } = this.state;
          collections.test = { handler: false };
          this.setState({
            doc,
            collections,
            title: doc.name,
          });
        };

      });
  };

  getTags = () => {
    const { tags, tags: { query, options } } = this.state.collections;

    Meteor.call('AdminTagsGet', query, options,  (err, docs) => {
      if (err) snack({ message: 'Erro ao encontrar tags' });
      tags.handler = false;
      tags.docs = docs;
      this.setState({ collections: { tags } });
    });
  };

  // Handlers

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleSubmit = () => {
    const { doc } = this.state;
    log.info('AdminTest.handleSubmit');

    doc.validate({ fields: ['name'] }, (err) => {
      if (err) snack({ message: err.reason });
      else
        Meteor.call('AdminTestSave', doc, (err, res) => {
          if (err) {
            snack({ message: 'Erro ao salvar test' });
            log.error(err);
          } else {
            log.debug('Test criada! =>', res);
            snack({ message: 'Test salva' });
            this.setState({ doc: res });
            FlowRouter.go('AdminTest', { testId: res._id });
          };
        });
    });
  };

  render() {
    log.info('AdminTest.render =>', this.state);
    const { title, collections, errors, doc, activeStep } = this.state;
    const { tags } = collections;
    const { classes, testId } = this.props;

    const actionButtons = (field) => {
      const stepsLenght = 10;
      let error = _.get(this, `state.errors.${field}.error`);

      return (
        <div className={classes.actionsContainer}>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={this.handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              disabled={error}
              variant='raised'
              color='primary'
              onClick={activeStep === stepsLenght - 1 ? this.handleSubmit : this.handleNext}
              className={classes.button}
            >
              {activeStep === stepsLenght - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      );

    };

    return (
      <div>
        <Layout.Bar title={title} crumbs={[{ label: 'Tests', path: 'AdminTests' }]} />

        {
          !_.every(collections, c => !c.handler)
            ? <LinearProgress color='secondary' />
            : (
              <Grid container className={classes.root} justify='center'>

                <Grid item xs={12} md={10} lg={8} className={classes.grid}>

                  <form autoComplete='off'>

                    <Grid container spacing={24}>

                      <Stepper
                        className={classes.stepper}
                        activeStep={activeStep}
                        orientation='vertical'>

                        {/* doc.name */}

                        <Step key='name'>
                          <StepLabel>Name</StepLabel>

                          <StepContent>

                            <Grid item xs={12}>

                              <Paper className={classes.paper}>

                                <AdminTestText
                                  doc={doc}
                                  field='name'
                                  error={_.get(errors, 'name')}
                                  parent={this}
                                />

                                {actionButtons()}
                              </Paper>

                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.name */}
                        {/* doc.cover */}

                        <Step key='image'>
                          <StepLabel>Cover Image</StepLabel>

                          <StepContent>

                            <Grid item xs={12}>

                              <Paper className={classes.paper}>

                                <AdminTestImage
                                  doc={doc}
                                  parent={this}
                                />

                                {actionButtons()}
                              </Paper>

                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.cover */}
                        {/* doc.description */}

                        <Step key='description'>
                          <StepLabel>Description</StepLabel>

                          <StepContent>

                            <Grid item xs={12}>

                              <Paper className={classes.paper}>

                                <ContentCreate
                                  Schema={Content}
                                  doc={doc}
                                  form={this}
                                  contentTypes={StaticCollections.ContentTypes}
                                />

                              </Paper>

                            </Grid>

                            <Grid item xs={12}>
                              {
                                _.isEmpty(doc.description)
                                  ? undefined
                                  : <Paper className={classes.paper}>
                                    {
                                      _.map(doc.description, (description, index) =>
                                        [
                                          <ContentShow
                                            doc={description}
                                            form={this}
                                            index={index}
                                            canRemove={true}
                                            key={`descriptionShow${index}`}
                                          />,
                                          <Divider key={`descriptionDivider${index}`} />,
                                        ]
                                      )
                                    }
                                  </Paper>
                              }
                            </Grid>

                            <Grid item xs={12}>
                              {actionButtons()}
                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.description */}
                        {/* doc.help */}

                        <Step key='help'>
                          <StepLabel>Help</StepLabel>

                          <StepContent>

                            <Grid item xs={12}>

                              <Paper className={classes.paper}>

                                <ContentCreate
                                  Schema={Content}
                                  doc={doc}
                                  field='help'
                                  form={this}
                                  contentTypes={StaticCollections.ContentTypes}
                                />

                              </Paper>

                            </Grid>

                            <Grid item xs={12}>
                              {
                                _.isEmpty(doc.help)
                                  ? undefined
                                  : <Paper className={classes.paper}>
                                    {
                                      _.map(doc.help, (help, index) =>
                                        [
                                          <ContentShow
                                            doc={help}
                                            form={this}
                                            index={index}
                                            canRemove={true}
                                            key={`helpShow${index}`}
                                          />,
                                          <Divider key={`helpDivider${index}`} />,
                                        ]
                                      )
                                    }
                                  </Paper>
                              }
                            </Grid>

                            <Grid item xs={12}>
                              {actionButtons()}
                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.help */}
                        {/* doc.resolution */}

                        <Step key='resolution'>
                          <StepLabel>Resolution</StepLabel>

                          <StepContent>

                            <Grid item xs={12}>

                              <Paper className={classes.paper}>

                                <AdminTestSelect
                                  options={StaticCollections.TestResolutions}
                                  doc={doc}
                                  field='resolution'
                                  error={errors.resolution}
                                  parent={this}
                                />

                                {
                                  doc.resolution !== 'sudoku'
                                  ? undefined
                                  : (
                                      <AdminTestSelect
                                        options={StaticCollections.SudokuLevel}
                                        doc={doc}
                                        field='level'
                                        error={errors.level}
                                        parent={this}
                                      />
                                  )
                                }

                              </Paper>

                              {actionButtons('resolution')}

                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.resolution */}
                        {/* doc.time */}

                        <Step key='time'>
                          <StepLabel>Time</StepLabel>

                          <StepContent>

                            <Grid item xs={12}>

                              <Paper className={classes.paper}>

                                <AdminTestTime
                                  doc={doc}
                                  field='time'
                                  errors={errors}
                                  parent={this}
                                />

                              </Paper>

                              {actionButtons('time')}

                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.time */}
                        {/* doc.timeout */}

                        <Step key='timeout'>
                          <StepLabel>Timeout</StepLabel>

                          <StepContent>

                            <Grid item xs={12}>

                              <Paper className={classes.paper}>

                                <AdminTestTimeout
                                  doc={doc}
                                  field='timeout'
                                  errors={errors}
                                  parent={this}
                                />

                              </Paper>

                              {actionButtons('timeout')}

                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.timeout */}
                        {/* doc.pages */}

                        <Step key='pages'>
                          <StepLabel>Pages</StepLabel>

                          <StepContent>

                            <Grid item xs={12} style={{ width: '100%' }}>

                              <Paper className={classes.paper}>

                                <AdminTestPages
                                  doc={doc}
                                  field='pages'
                                  errors={errors}
                                  parent={this}
                                />

                              </Paper>

                              {actionButtons('pages')}

                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.pages */}
                        {/* doc.scores */}

                        <Step key='scores'>
                          <StepLabel>Scores</StepLabel>

                          <StepContent>

                            <Grid item xs={12}>

                              <Paper className={classes.paper}>

                                <AdminTestScores
                                  doc={doc}
                                  scores={doc.scores}
                                  tags={tags.docs}
                                  errors={errors}
                                  parent={this}
                                />

                              </Paper>

                              {actionButtons('scores')}

                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.scores */}
                        {/* doc.score */}

                        <Step key='score'>
                          <StepLabel>Score</StepLabel>

                          <StepContent>

                            <Grid item xs={12}>

                              <Paper className={classes.paper}>

                                <AdminTestNumber
                                  doc={doc}
                                  field='score'
                                  error={errors.score}
                                  parent={this}
                                />

                              </Paper>

                              {actionButtons('score')}

                            </Grid>

                          </StepContent>

                        </Step>

                        {/* End doc.score */}

                      </Stepper>

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

AdminTest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTest);
