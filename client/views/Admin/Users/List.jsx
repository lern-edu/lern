// Libs
import React from 'react';
import _ from 'lodash';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

class AdminUsersList extends React.Component {

  render() {
    const { users, query } = this.props;

    const usersFiltered = _.filter(users, ({ profile: { name }, emails }) =>
      _.isEmpty(query)
      || _.deburr(name.toLowerCase()).includes(_.deburr(query.toLowerCase()))
      ||
        _.includes(
          _.join(_.map(emails, 'address'), ' '),
          query
        )
    );

    return (
      <List>

        {
          _.map(usersFiltered, ({ _id, profile: { profilePic, name }, roles, emails }) =>
            <ListItem button key={_id} onClick={() => FlowRouter.go('AdminUser', { userId: _id })}>
              <Avatar alt={name} src={profilePic} />
              <ListItemText
                primary={name}
                secondary={_.get(_.first(emails), 'address') + '-' + _.join(roles, ', ')}
              />
            </ListItem>
          )
        }
      </List>
    );
  }

};

export default AdminUsersList;
