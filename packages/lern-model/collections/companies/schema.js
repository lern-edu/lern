import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import User from '../users/schema.js';
import Author from '../../behaviors/author.js';

const Companies = new Mongo.Collection('companies');

const Company = Class.create({
  name: 'Company',
  collection: Companies,
  fields: {
    name: String,
    admins: {
      type: [String],
      validators: [{ type: 'References' }],
      default: () => [],
    },
    Plan: {
      type: Object,
      optional: true,
    },
    users: {
      type: [String],
      validators: [{ type: 'References' }],
      optional: true,
    },
    tags: {
      type: [String],
      validators: [{ type: 'References' }],
      optional: true,
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
  events: {
    afterSave({ currentTarget: company }) {
      const users = User.find({ 'profile.companies': company._id }).fetch();
      _.forEach(users, user => {
        if (user.profile.company._id == company._id)
          user.profile.company = company;
        const index = _.findIndex(user.profile.companies, comp => comp._id == company._id);
        user.profile.companies[index] = company;
        user.save();
      });
    },
  },
});

Author(Company);

export default Company;
