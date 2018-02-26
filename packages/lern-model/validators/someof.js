import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

/**
 * @namespace Someof()
 * @memberof LernModel
 */

 /**
   * @memberof LernModel.Someof()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('SomeofValidator.create');
   * @public
   * @param {String} name - Validator SomeOf
   * @param {Object} validate - Validator validate
   * @return {Object} - newSomeofValidator
   */
Validator.create({
  name: 'SomeOf',
  validate(value, name, values) {
    return (
      !_.isNull(value) &&
      _.every(value, v => _.includes(values, v))
    );
  },
});
