import Check from 'meteor/duckdodgerbrasl:lern-check';
import _ from 'lodash';

/**
 * lern-methods package
 * @namespace
 */
const LernMethods = {
  /**
   * @memberof LernMethods
   * @desc Check witch functions to publish by user role
   * @public
   */
  Function(func) {
    return {
      protect(role) {
        return function (...args) {
          if (_.isEqual(role, 'public'))
            return func.apply(this, args);
          Check.User(this.userId).role(role);
          return func.apply(this, args);
        };
      },
    };
  },

  /**
   * @memberof LernMethods
   * @desc Publish methods to Meteor
   * @public
   */
  Methods({ prefix='', protect }={}, funcs) {
    let methods = funcs;

    if (prefix) methods = _.mapKeys(methods, (v, k) => prefix + k);
    if (protect) methods = _.mapValues(methods, (v, k) => this.Function(v).protect(protect));

    Meteor.methods(methods);
  },

  /**
   * @memberof LernMethods
   * @desc Default save a doc
   * @public
   * @param {Object} [doc] - Document to save
   * @return {Object} - Saved document
   */
  DefaultSave(doc) {
    doc.validate();
    doc.save();
    return doc;
  },

};

const Helpers = LernMethods;

export default Helpers;
