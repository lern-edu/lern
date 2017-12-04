import { Class, Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

const UserProfileSchema = Class.create({
  name: 'UserProfile',
  fields: {
    name: {
      type: String,
      validators: [
        { type: 'minLength', param: 3 },
        { type: 'maxLength', param: 1024 },
      ],
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
      optional: true,
    },
    lastName: {
      type: String,
      optional: true,
    },
    cnpj: {
      type: String,
      validators: [{ type: 'cnpj' }],
      optional: true,
    },
    school: {
      type: String,
      validators: [{ type: 'Reference' }],
      optional: true,
    },
    schools: {
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

const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    emails: {
      type: [Object],
      optional: true,
    },
    services: {
      type: Object,
      optional: true,
    },

    roles: {
      type: [String],
      validators: [
        { type: 'OneOf', param: StaticCollections.UserRoles },
        { type: 'maxLength', param: 4 },
      ],
    },

    profile: {
      type: UserProfileSchema,
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

    getRole() {
      return this.get('profile.role') || _.first(this.get('roles'));
    },

    getRoles() {
      return this.get('roles');
    },

    getEmail() {
      return _.get(_.first(this.emails), 'address');
    },

    getSocialEmail() {
      return _.get(this, 'services.facebook.email')
        || _.get(this, 'services.google.email');
    },

    hasRole(r) {
      const role = this.getRoles();
      return _.includes(role, r);
    },

    getSettingsRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Settings';
    },

    getHomeRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Home';
    },
  },
});

export default User;
