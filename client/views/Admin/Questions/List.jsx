// Libs
import React from 'react';
import _ from 'lodash';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { Delete } from 'material-ui-icons';

class AdminQuestionsList extends React.Component {

  render() {
    const { questions, handleDelete } = this.props;

    return (
      <Paper>
        <List>
          {
            _.map(questions, question =>
              <ListItem
                button
                key={question._id}
                onClick={() => FlowRouter.go('AdminQuestion', { questionId: question._id })}>
                <ListItemText primary={question.type} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => handleDelete(question._id)}
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

export default AdminQuestionsList;
