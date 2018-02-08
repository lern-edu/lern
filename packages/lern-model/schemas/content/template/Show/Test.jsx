// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { green500, red500 } from 'material-ui/styles/colors';
import { TextField, ListItem, Divider } from 'material-ui';
import { FlatButton } from 'material-ui';
import { FontIcon, CircularProgress } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const PublicContentShowTestView = React.createClass({

  // Context

  contextTypes: {
    user: PropTypes.object,
  },

  // Render

  render() {
    const { test, ready } = this.props;
    const { user } = this.context;

    return (
      !_.every(ready)
      ? <CircularProgress size={60} thickness={7} />
      :  <div className='row'>
          <FlatButton
            primary={true}
            label={test.get('name')}
            href={FlowRouter.path(
              `${
                _.capitalize(user.get('profile.role')
                || _.head(user.get('roles')))
              }Test`,
              { testId: test._id })
            }
          />
        </div>
    );
  },
});

export default PublicContentShowTestView;
