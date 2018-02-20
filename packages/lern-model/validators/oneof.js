import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

/**
 * @namespace Oneof()
 * @memberof LernModel
 */

 /**
   * @memberof LernModel.Oneof()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('OneofValidator.create');
   * @public
   * @param {String} name - Validator Oneof
   * @param {Object} isValid - Validator isValid
   * @return {Object} - newOneofValidator
   */
Validator.create({
  name: 'OneOf',

  validate({ value, param }) {
    return (
      !_.isNull(value) &&
      _.includes(param, value)
    );
  },

  // resolveError({ name, param }) {
  //   return `Length of "${name}" has to be at most ${param}`;
  // },

});
