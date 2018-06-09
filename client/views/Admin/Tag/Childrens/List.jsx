// Libs
import React from 'react';
import _ from 'lodash';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

class AdminTagChildrensList extends React.Component {

  render() {
    const { tags } = this.props;

    return (
      <List>

        {
          _.map(tags, ({ _id, name }) =>
            <ListItem button key={_id} onClick={() => FlowRouter.go('AdminTag', { tagId: _id })}>
              <ListItemText primary={name} />
            </ListItem>
          )
        }
      </List>
    );
  }

};

export default AdminTagChildrensList;
