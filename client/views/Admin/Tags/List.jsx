// Libs
import React from 'react';
import _ from 'lodash';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { Delete } from 'material-ui-icons';

class AdminTagsList extends React.Component {

  render() {
    const { tags, handleDelete } = this.props;

    return (
      <Paper>
        <List>
          {
            _.map(tags, tag =>
              <ListItem
                button
                key={tag._id}
                onClick={() => FlowRouter.go('AdminTag', { tagId: tag._id })}>
                <ListItemText primary={tag.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => handleDelete(tag._id)}
                    aria-label="Delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
        </List>
      </Paper>
    );
  }

};

export default AdminTagsList;
