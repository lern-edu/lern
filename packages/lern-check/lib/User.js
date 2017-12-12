import Cursor from './Cursor.js';
import { User as UserCollection } from 'meteor/duckdodgerbrasl:lern-model';

const User = (userId) => {
  let user = UserCollection.find(userId);
  Cursor(user).some();
  user = _.first(user.fetch());

  return {
    role(role) {
      if (!user.hasRole(role))
        throw new Meteor.Error('check.user.role: wrong-role');
    },
  };
};

export default User;
