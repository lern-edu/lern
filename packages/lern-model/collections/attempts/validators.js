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
  name: 'TagTestReference',

  isValid({ doc, value: scores }) {
    return _.every(_.map(scores, '_id'), tagId => _.includes(_.map(doc, 'test.scores._id'), tagId));
  },

  resolveError({ doc, value }) {
    return `This tag ${value.name} are not definided on test ${_.get(doc, 'test.name')}`;
  },
};

Validator.create(UserRolesInRoles);
