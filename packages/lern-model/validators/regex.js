import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';
import Regex from '../regex.js';

/**
 * @namespace Regex()
 * @memberof LernModel
 */
_.forEach(Regex, (v, k) => {

/**
   * @memberof LernModel.Regex()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('RegexValidator.create');
   * @public
   * @param {String} name - Validator 'k'
   * @param {Object} isValid - Validator isValid
   * @return {Object} - newRegexValidator
   */
  Validator.create({
    name: k,

    validate({ value, param }) {
      return (
        !_.isNull(value) &&
        v.test(value)
      );
    },

    // resolveError({ name, param }) {
    //   return `Length of "${name}" has to be at most ${param}`;
    // },

  });
});
