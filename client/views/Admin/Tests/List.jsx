// Libs
import React from 'react';
import _ from 'lodash';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { Delete } from 'material-ui-icons';

class AdminTestsList extends React.Component {

  render() {
    const { tests, handleDelete } = this.props;

    return (
      <Paper>
        <List>

          {
            _.map(tests, ({ _id, name }) =>
              <ListItem
                button
                key={_id}
                onClick={() => FlowRouter.go('AdminTest', { testId: _id })}>
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => handleDelete(_id)}
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

export default AdminTestsList;
