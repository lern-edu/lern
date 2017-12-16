import _ from 'lodash';
import { Validator } from 'meteor/jagi:astronomy';
import StaticCollections from '../static.js';

/**
 * @namespace Validators
 * @memberof LernModel.User
 * @public
 */

/**
 * Verify all user roles are included in UserRoles in [StaticCollections]{@link LernModel}
 * @func
 * @memberof LernModel.User.Validators
 * @public
 * @return {String|undefined} Error message or undefined
 */
const UserRolesInRoles = {
  name: 'UserRolesInRoles',

  isValid({ value: roles }) {
    return _.every(roles, role => _.includes(StaticCollections.UserRoles, role));
  },

  resolveError({ name }) {
    return `The field ${name} contains inappropriate roles`;
  },
};

Validator.create(UserRolesInRoles);
