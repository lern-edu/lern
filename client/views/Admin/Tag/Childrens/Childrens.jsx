// Libs
import React from 'react';
import log from 'loglevel';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Tag } from 'meteor/duckdodgerbrasl:lern-model';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input, { InputLabel } from '@material-ui/core/Input';
import { FormControl, FormHelperText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider/Divider';

import AdminTagChildrensList from './List.jsx';
import Tab from '@material-ui/core/Tab';

// Styles
const styles = theme => ({
  input: {
    width: '100%',
  },
});

class AdminTagChildrens extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);

    const { parent } = props;

    this.state = {
      collections: {
        tags: {
          handler: true,
          docs: null,
        },
      },
      doc: new Tag({ parent }),
      errors: {},
    };
  };

  componentWillMount() {
    this.getTags(this.props.tagId);
  };

  shouldComponentUpdate(props, state) {
    if (this.props.tagId !== props.tagId)
      this.getTags(props.tagId);
    return true;
  };

  getTags = (tagId) => {

    if (tagId)
      Meteor.call('AdminTagsGet', { 'parent._id': tagId }, {}, (err, docs) => {
        if (err) snack({ message: 'Erro ao encontrar tags' });
        this.setState({ collections: { tags: { handler: false, docs } } });
        log.debug(docs);
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

  handleSubmit = () => {
    const { parent, tagId } = this.props;
    const { doc } = this.state;

    log.debug(doc);

    doc.validate({ fields: ['name'] }, (err) => {
      if (err) snack({ message: err.reason });
      else
        Meteor.call('AdminTagSave', doc, (err, res) => {
          if (err) snack({ message: 'Erro ao salvar tag' });
          else {
            snack({ message: 'Tag salva' });
            this.setState({ doc: new Tag({ parent }), collections: { tags: { handler: true } } });
            this.getTags(tagId);
          };
        });
    });
  }

  render() {
    const { doc, errors, collections, collections: { tags: { docs } } } = this.state;
    const { classes } = this.props;

    return !_.every(collections, c => !c.handler)
      ? <LinearProgress color='secondary' />
      : (
      <Grid container spacing={24}>

        <Grid item xs={12}>
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
        </Grid>

        <Grid
          container
          alignItems='flex-end'
          direction='row'
          justify='flex-end'
        >

          <Grid item>
            <Button onClick={this.handleSubmit} color='primary'>
              Save
            </Button>
          </Grid>

        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <AdminTagChildrensList tags={docs} />
        </Grid>

      </Grid>
    );
  };

};

AdminTagChildrens.propTypes = {
  classes: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTagChildrens);
