// Libs
import React from 'react';
import _ from 'lodash';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class AdminTagsList extends React.Component {

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

export default AdminTagsList;
