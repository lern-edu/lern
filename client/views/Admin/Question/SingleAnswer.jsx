import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Content, StaticCollections } from 'meteor/duckdodgerbrasl:lern-model';
import Input, { InputLabel } from 'material-ui/Input';
import { FormLabel, FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

const content = new Content();
const ContentCreate = _.get(content, 'templates.ContentCreate');
const ContentShow = _.get(content, 'templates.ContentShow');

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

class AdminQuestionSingleAnswer extends React.Component {

  handleChange = ({ target: { value: answer } }) => {
    const { parent } = this.props;
    parent.defaultHandler({ 'answer.singleAnswer': _.toNumber(answer) }, { doc: true });
  };

  render() {
    const { errors, doc, field, options, classes } = this.props;

    return [
      <Grid item xs={12} key='descriptionCreate'>
        <Paper className={classes.paper}>

          <ContentCreate
            Schema={Content}
            doc={doc}
            field='options'
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
          _.isEmpty(doc.options)
            ? undefined
            : <Grid container>

              {
                _.map(doc.options, (option, index) =>
                  [
                    <Grid item xs={1} key={`optionSelect${index}`}>
                      <Radio
                        value={_.toString(index)}
                        checked={index === _.toNumber(_.get(doc, 'answer.singleAnswer'))}
                        onChange={this.handleChange}
                      />
                    </Grid>,
                    <Grid item xs={11} key={`optionShow${index}`}>
                      <ContentShow
                        doc={option}
                        field='options'
                        form={this}
                        index={index}
                        canRemove={true}
                        afterUpdate={this.updateValidation}
                      />
                    </Grid>,
                  ]
                )
              }
            </Grid>
        }

      </Grid>,
    ];
  };

};

AdminQuestionSingleAnswer.propTypes = {
  doc: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminQuestionSingleAnswer);
