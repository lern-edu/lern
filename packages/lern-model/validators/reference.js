import { Validator } from 'meteor/jagi:astronomy';
import Regex from '../regex.js';
import _ from 'lodash';

/**
 * @namespace Reference()
 * @memberof LernModel
 */

 /**
   * @memberof LernModel.Reference()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('ReferenceValidator.create');
   * @public
   * @param {String} name - Validator Reference
   * @param {Object} isValid - Validator isValid
   * @return {Object} - newReferenceValidator
   */
Validator.create({
  name: 'Reference',

  isValid({ value }) {
    return (
      !_.isNull(value) &&
      _.isString(value) &&
      Regex.id.test(value)
    );
  },

  // resolveError({ name, param }) {
  //   return `Length of "${name}" has to be at most ${param}`;
  // },

});

/**
   * @memberof LernModel.Reference()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('ReferencesValidator.create');
   * @public
   * @param {String} name - Validator References
   * @param {Object} validate - Validator validate
   * @return {Object} - newReferencesValidator
   */
Validator.create({
  name: 'References',
  validate(value) {
    return (
      !_.isNull(value) &&
      _.every(value, _.isString) &&
      _.every(value, v => Regex.id.test(v))
    );
  },
});
