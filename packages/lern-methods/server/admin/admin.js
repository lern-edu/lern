import _ from 'lodash';
import { User, Company } from 'meteor/duckdodgerbrasl:lern-model';
import Check from 'meteor/duckdodgerbrasl:lern-check';
import Helpers from '../../helpers.js';
import { convertToRaw, convertFromRaw, ContentState } from 'draft-js';
const [prefix, protect] = ['Admin', 'admin'];

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
  UsersGet(query={}, options={}) {
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
  UsersCount(query={}, options={}) {
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
  CompaniesGet(query={}, options={}) {
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
  CompaniesCount(query={}, options={}) {
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
