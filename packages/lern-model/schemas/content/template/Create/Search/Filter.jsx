import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Grid, TextField } from '@material-ui/core';
import _ from 'lodash';

import AutoComplete from './AutoComplete.jsx';

const styles = theme => ({
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class PublicContentSearchTaskFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collections: {
        tags: {
          docs: [],
          handler: true,
          query: {},
          options: {},
        },
      },
    };
  }

  componentWillMount() {
    this.getTags();
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

  render() {
    const { classes, updateFilter, deleteFilter, updateSearch, search, selectedTags } = this.props;
    const { collections: { tags: { docs: tags } } } = this.state;

    return (
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          <AutoComplete
            dataSource={
              _.map(_.filter(tags, t => !_.find(selectedTags, { value: t._id })), s =>
                _.zipObject(['label', 'value'], [s.name, s._id])
              )
            }
            onNewRequest={updateFilter}
          />
          <div className={classes.chips}>
            {_.map(selectedTags, t =>
              <Chip
                label={t.label}
                onDelete={() => deleteFilter(t)}
                key={`Chip-${t.value}`}
                className={classes.chip}/>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth={true}
            value={search}
            placeholder='Nome'
            onChange={updateSearch}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

PublicContentSearchTaskFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicContentSearchTaskFilter);
