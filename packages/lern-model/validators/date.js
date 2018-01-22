import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

/**
 * @namespace Date()
 * @memberof LernModel
 */

 /**
   * @memberof LernModel.Date()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('DateValidator.create');
   * @public
   * @param {String} name - Validator Date
   * @param {Object} validate - Validator validate
   * @return {Object} - newDateValidator
   */
Validator.create({
  name: 'Date',
  validate(value, name, { before, after }={}) {
    if (_.isString(before)) before = this[before];
    if (_.isString(after)) after = this[after];
    return (
      _.isDate(value) &&
      !_.isNaN(value.getTime()) &&
      (!before || value < before) &&
      (!after || value > after)
    );
  },
});
