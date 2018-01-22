import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

/**
 * @namespace Integer()
 * @memberof LernModel
 */

 /**
   * @memberof LernModel.Integer()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('IntegerValidator.create');
   * @public
   * @param {String} name - Validator Integer
   * @param {Object} validate - Validator validate
   * @return {Object} - newIntegerValidator
   */
Validator.create({
  name: 'Integer',
  validate(value, name, { min, max }) {
    return (
      !_.isNull(value) &&
      _.isNumber(value) &&
      value % 1 === 0 &&
      _.inRange(value, min, max + 1)
    );
  },
});
