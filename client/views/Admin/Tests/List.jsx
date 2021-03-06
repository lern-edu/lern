// Libs
import React from 'react';
import _ from 'lodash';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

class AdminTestsList extends React.Component {

  render() {
    const { tests } = this.props;

    return (
      <Paper>
        <List>

          {
            _.map(tests, ({ _id, name }) =>
              <ListItem button key={_id} onClick={() => FlowRouter.go('AdminTest', { testId: _id })}>
                <ListItemText primary={name} />
              </ListItem>
            )
          }
        </List>
      </Paper>
    );
  }

};

export default AdminTestsList;
