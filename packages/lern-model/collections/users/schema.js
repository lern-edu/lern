import { Class, Validator } from 'meteor/jagi:astronomy';

Meteor.users.ProfileSchema = Class.create({
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

Meteor.users.Schema = Class.create({
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
      type: Meteor.users.ProfileSchema,
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
});
