// Libs
import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import _ from 'lodash';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { Question, Content, StaticCollections } from 'meteor/duckdodgerbrasl:lern-model';
import { Regex } from 'meteor/duckdodgerbrasl:lern-check';
import LernForm from 'meteor/duckdodgerbrasl:lern-form';

import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Divider from 'material-ui/Divider/Divider';

const content = new Content();
const ContentCreate = _.get(content, 'templates.ContentCreate');
const ContentShow = _.get(content, 'templates.ContentShow');

import AdminQuestionSelect from './Select.jsx';
import AdminQuestionOpen from './Open.jsx';
import AdminQuestionSingleAnswer from './SingleAnswer.jsx';

const fieldsToValidate = ['type', 'description'];

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

class AdminQuestion extends LernForm(Question, 'AdminQuestionSave') {

  // Lifecycle

  constructor(props) {
    log.info('AdminQuestion', props);
    const { questionId } = props;

    const state = {
      title: !questionId ? 'Criar' : 'Editar',
      crumbs: [{ label: 'Questions', path: 'AdminQuestions' }],
      collections: {
        question: {
          handler: !_.isEmpty(questionId),
        },
      },
      doc: !questionId ? new Question() : null,
    };

    super(state, props);
  };

  componentWillMount() {
    log.info('AdminQuestion.componentWillMount');
    this.getQuestion(this.props.questionId);
  };

  // Data

  getQuestion = (questionId) => {
    log.info('AdminQuestion.getQuestion/questionId =>', questionId);
    if (questionId)
      Meteor.call('AdminQuestionsGet', { _id: questionId }, { limit: 1 }, (err, docs) => {
        if (err) snack({ message: 'Erro ao encontrar questão' });
        else {
          const doc = _.head(docs);
          this.setState({
            doc,
            title: doc.name,
            crumbs: doc.parent
              ? [{ label: doc.parent.name, path: FlowRouter.path('AdminQuestion', { questionId: doc.parent._id }) }]
              : [{ label: 'Questions', path: 'AdminQuestions' }],
            collections: { question: { handler: false } },
          });
        };

      });
  };

  // Handlers

  handleSubmit = () => {
    const { doc } = this.state;
    log.info('AdminQuestion.handleSubmit');

    doc.validate({ fields: ['name'] }, (err) => {
      if (err) snack({ message: err.reason });
      else
        Meteor.call('AdminQuestionSave', doc, (err, res) => {
          if (err) {
            snack({ message: 'Erro ao salvar questão' });
            log.error(err);
          } else {
            log.debug('Questão criada! =>', res);
            snack({ message: 'Questão salva' });
            this.setState({ doc: res });
            FlowRouter.go('AdminQuestion', { questionId: res._id });
          };
        });
    });
  };

  // Validators

  validate = (index) => {
    const { errors } = this.state;
    const validateHere = _.slice(fieldsToValidate, 0, index);
    return _.every(validateHere, field => _.isEmpty(errors[field]));
  };

  // Render

  render() {
    log.info('AdminQuestion.render =>', this.state);
    const { title, collections, errors, doc, crumbs } = this.state;
    const { classes, questionId } = this.props;

    return (
      <div>
        <Layout.Bar title={title} crumbs={crumbs}/>

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

                        <AdminQuestionSelect
                          options={StaticCollections.QuestionTypes}
                          doc={doc}
                          field='type'
                          error={errors.type}
                          parent={this}
                        />

                      </Paper>

                    </Grid>

                    {
                      !this.validate(1)
                      ? undefined
                      : [
                        <Grid item xs={12} key='descriptionCreate'>
                          <Paper className={classes.paper}>

                            <ContentCreate
                              Schema={Content}
                              doc={doc}
                              form={this}
                              contentTypes={StaticCollections.ContentTypes}
                              afterUpdate={this.updateValidation}
                            />

                            <FormControl error={!!errors.description}>
                              {
                                !errors.description
                                ? undefined
                                : <FormHelperText>{errors.description}</FormHelperText>
                              }
                            </FormControl>

                          </Paper>
                        </Grid>,
                        <Grid item xs={12} key='descriptionShow'>
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
                                        afterUpdate={this.updateValidation}
                                      />,
                                      <Divider key={`descriptionDivider${index}`} />,
                                    ]
                                  )
                                }
                              </Paper>
                          }
                        </Grid>,
                      ]
                    }

                    {
                      !this.validate(2)
                      ? undefined
                      : _.get({
                        open: <AdminQuestionOpen parent={this} doc={doc} errors={errors} />,
                        singleAnswer: <AdminQuestionSingleAnswer parent={this} doc={doc} errors={errors} />,
                      }, doc.type)
                    }

                    <Grid item xs={12}>

                    </Grid>

                    <Grid item xs={12}>

                      <Grid
                        container
                        alignItems='flex-end'
                        direction='row'
                        justify='flex-end'
                      >
                        <Grid item>
                          <Button href={FlowRouter.path('AdminQuestions')} raised>
                            Cancel
                          </Button>
                        </Grid>

                        <Grid item>

                        </Grid>

                        <Grid item>
                          <Button onClick={this.handleSubmit} disabled={_.some(errors)} raised color='primary'>
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

AdminQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminQuestion);