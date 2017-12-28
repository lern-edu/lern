import { Class, Validator } from 'meteor/jagi:astronomy';
import StaticCollections from '../static.js';
import _ from 'lodash';

import Templates from './templates.jsx';

/**
 * User profile
 * @memberof LernModel.User
 * @class
 * @public
 * @return {AstroClass} An User profile
 */
const UserProfileSchema = Class.create({
  name: 'UserProfile',
  fields: {
    name: {
      type: String,
    },
    profilePic: {
      type: String,
      optional: true,
    },
    gender: {
      type: String,
      validators: [{ type: 'choice', param: ['male', 'female'] }],
      optional: true,
    },
    firstName: {
      type: String,
      validators: [{ type: 'minLength', param: 1 }],
    },
    lastName: {
      type: String,
      validators: [{ type: 'minLength', param: 1 }],
    },
    company: {
      type: String,
      validators: [{ type: 'Reference' }],
      optional: true,
    },
    companies: {
      type: [Object],
      optional: true,
      default: () => [],
    },
    role: {
      type: String,
      validators: [{ type: 'OneOf', param: StaticCollections.UserRoles }],
      optional: true,
    },
  },
});

const UserEmailsSchema = Class.create({
  name: 'UserEmails',
  fields: {
    address: {
      type: String,
      validators: [{ type: 'email' }],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
});

/**
 * User collection
 * @memberof LernModel
 * @class
 * @public
 * @return {AstroClass} An User model
 * @example
 * import { User } from 'meteor/duckdodgerbrasl:lern-model'
 */
const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    emails: {
      type: [Object],
    },
    services: {
      type: Object,
      optional: true,
      immutable: true,
    },
    roles: {
      type: [String],
      validators: [
        { type: 'UserRolesInRoles' },
        { type: 'minLength', param: 1 },
        { type: 'maxLength', param: 3 },
      ],
      default: () => [],
    },
    profile: {
      type: UserProfileSchema,
      default() {
        return { firstName: '', lastName: '' };
      },
    },
  },

  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt',
    },
  },

  helpers: {

    /**
     * Return a unique role
     * @memberof LernModel.User
     * @return {String} userRole
     */
    getRole() {
      return this.get('profile.role') || _.first(this.get('roles'));
    },

    /**
     * Return all roles
     * @memberof LernModel.User
     * @return {Array} userRoles
     */
    getRoles() {
      return this.get('roles');
    },

    /**
     * Get first user email
     * @memberof LernModel.User
     * @return {String} email
     */
    getEmail() {
      return _.get(_.first(this.emails), 'address');
    },

    /**
     * Get user email from social network
     * @memberof LernModel.User
     * @return {String} email
     */
    getSocialEmail() {
      return _.get(this, 'services.facebook.email')
        || _.get(this, 'services.google.email');
    },

    /**
     * Verify user roles contains certain role
     * @memberof LernModel.User
     * @param {String} role - role to verify
     * @return {Boolean} includes
     */
    hasRole(r) {
      const role = this.getRoles();
      return _.includes(role, r);
    },

    /**
     * Get settings route
     * @memberof LernModel.User
     * @return {String} FlowRouter route
     */
    getSettingsRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Settings';
    },

    /**
     * Get Home route
     * @memberof LernModel.User
     * @return {String} FlowRouter route
     */
    getHomeRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Home';
    },

    /**
     * Get setup route
     * @memberof LernModel.User
     * @return {String} FlowRouter route
     */
    getSetupRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Setup';
    },

    getFullName() {
      const { firstName, lastName } = this.profile;
      return firstName + ' ' + lastName;
    },
  },

  events: {
    beforeSave(e) {
      console.log(e.currentTarget);
      if (!e.currentTarget.profile.name)
        e.currentTarget.profile.name = e.currentTarget.getFullName();
    },
  },

});

if (Meteor.isClient)
User.extend({
  fields: {
    templates: {
      type: Object,
      default() {
        return Templates;
      },
    },
  },
});

export default User;
