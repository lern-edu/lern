import _ from 'lodash';
import { Validator } from 'meteor/jagi:astronomy';
import StaticCollections from '../static.js';

Validator.create({
  name: 'UserRolesInRoles',

  isValid({ value: roles }) {
    return _.every(roles, role => _.includes(StaticCollections.UserRoles, role));
  },

  resolveError({ name }) {
    return `The field ${name} contains inappropriate roles`;
  },
});
