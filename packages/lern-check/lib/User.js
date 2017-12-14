import Cursor from './Cursor.js';
import { User as UserCollection } from 'meteor/duckdodgerbrasl:lern-model';

/**
 * Check user roles (Check.Cursor()).
 * @namespace User()
 * @memberof Check
 */

/**
 * @memberof Check.User()
 * @desc Self description
 * @example
 * const checkUser = Check.User('8MZekqrgCkhQqaNty')
 * @public
 * @param {String} userId - User uniq identification (_id)
 * @throws {Meteor.Error} none-cursor - if user not found
 */
const User = (userId) => {
  let user = UserCollection.find(userId);
  Cursor(user).some();
  user = _.first(user.fetch());

  return {

    /**
     * Check Mongo user role match (Check.Cursor().role()).
     * @memberof Check.User()
     * @public
     * @example
     * Check.User('8MZekqrgCkhQqaNty').role('admin')
     * @param {String} role - some role to check [admin, school, student, teacher]
     * @throws {Meteor.Error} wrong-role - if user role not garanteed
     */
    role(role) {
      if (!user.hasRole(role))
        throw new Meteor.Error('check.user.role: wrong-role');
    },
  };
};

export default User;
