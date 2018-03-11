import _ from 'lodash';
import { User, Company, Tag, Test } from 'meteor/duckdodgerbrasl:lern-model';
import log from 'loglevel';
import Check from 'meteor/duckdodgerbrasl:lern-check';
import Helpers from '../../helpers.js';
import { convertToRaw, convertFromRaw, ContentState } from 'draft-js';
const [prefix, protect] = ['Admin', 'admin'];

// =================== Users METHODS ====================

/**
 * Meteor Methods for Admin user.
 * @namespace Admin()
 * @memberof LernMethods
 */
Helpers.Methods({ prefix, protect }, {
  /**
   * @memberof LernMethods.Admin()
   * @desc Self description
   * @example
   * const users = Meteor.call('AdminUsersGet');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Array} - Array of users
   */
  UsersGet(query, options) {
    _.assign(options, { fields: { services: 0 } });
    return User.find(query, options).fetch();
  },

  /**
   * @memberof LernMethods.Admin()
   * @desc Count number of users
   * @example
   * const numUsers = Meteor.call('AdminUsersCount');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Number} - Number of users
   */
  UsersCount(query, options) {
    return User.find(query, options).count();
  },

  /**
   * @memberof LernMethods.Admin()
   * @desc Save an user in collection
   * @example
   * const savedUser = Meteor.call('AdminUserSave', user);
   * @public
   * @param {Object} user - User to be saved
   * @return {Object} - Saved user (with _id)
   */
  UserSave(doc) {
    let user = null;

    if (doc._isNew) {
      const userId = Accounts.createUser({ email: doc.emails[0].address, profile: doc.profile });
      Accounts.sendEnrollmentEmail(userId);
      user = User.find({ _id: userId });
      Check.Cursor(user).some();
      user = _.head(user.fetch());
      user.roles = doc.roles;
    } else {
      user = doc;
    };

    user.save();

    return user;
  },

});

// =================== COMPANIES METHODS ====================

Helpers.Methods({ prefix, protect }, {
  /**
   * @memberof LernMethods.Admin()
   * @desc Retrieve companies from the database
   * @example
   * const companies = Meteor.call('AdminCompaniesGet');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Array} - Array of companies
   */
  CompaniesGet(query, options) {
    _.assign(options, { fields: { services: 0 } });
    return Company.find(query, options).fetch();
  },

  /**
   * @memberof LernMethods.Admin()
   * @desc Count companies that match the criteria
   * @example
   * const numCompanies = Meteor.call('AdminCompaniesCount');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Number} - Number of companies
   */
  CompaniesCount(query, options) {
    return Company.find(query, options).count();
  },

  /**
   * @memberof LernMethods.Admin()
   * @desc Save a company in collection
   * @example
   * const savedCompany = Meteor.call('AdminCompanySave', company);
   * @public
   * @param {Object} company - Company to be saved
   * @return {Object} - Saved company (with _id)
   */
  CompanySave: Helpers.DefaultSave,
});

// =================== TAGS METHODS ====================

Helpers.Methods({ prefix, protect }, {
  /**
   * @memberof LernMethods.Admin()
   * @desc Retrieve tags from the database
   * @example
   * const tags = Meteor.call('AdminTagsGet');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Array} - Array of tags
   */
  TagsGet(query, options) {
    return Tag.find(query, options).fetch();
  },

  /**
   * @memberof LernMethods.Admin()
   * @desc Count tags that match the criteria
   * @example
   * const numTags = Meteor.call('AdminTagsCount');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Number} - Number of tags
   */
  TagsCount(query, options) {
    return Tag.find(query, options).count();
  },

  /**
   * @memberof LernMethods.Admin()
   * @desc Save a tag in collection
   * @example
   * const savedTag = Meteor.call('AdminTagSave', company);
   * @public
   * @param {Object} tag - Company to be saved
   * @return {Object} - Saved company (with _id)
   */
  TagSave(tag) {
    let { parent } = tag;

    if (parent)
      tag.parent = _.pick(parent, ['name', '_id', 'author', 'description']);

    return Helpers.DefaultSave(tag);
  },

  /**
   * @memberof LernMethods.Admin()
   * @desc Delete a tag from collection
   * @example
   * Meteor.call('AdminTagDelete', _id);
   * @public
   * @param {Object} _id - Tag _id to be removed
   */
  TagDelete(_id) {
    Tag.remove(_id);
  },
});

// =================== TEST METHODS ====================

Helpers.Methods({ prefix, protect }, {
  /**
   * @memberof LernMethods.Admin()
   * @desc Retrieve tags from the database
   * @example
   * const tags = Meteor.call('AdminTagsGet');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Array} - Array of tags
   */
  TestsGet(query, options) {
    return Test.find(query, options).fetch();
  },

  /**
   * @memberof LernMethods.Admin()
   * @desc Count tests that match the criteria
   * @example
   * const numTests = Meteor.call('AdminTestsCount');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Number} - Number of tests
   */
  TestsCount(query, options) {
    return Test.find(query, options).count();
  },

  /**
   * @memberof LernMethods.Admin()
   * @desc Save a test in collection
   * @example
   * const savedTest = Meteor.call('AdminTestSave', company);
   * @public
   * @param {Object} test - Company to be saved
   * @return {Object} - Saved company (with _id)
   */
  TestSave: Helpers.DefaultSave,
});
