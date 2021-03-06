import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

/**
 * @namespace Float()
 * @memberof LernModel
 */

 /**
   * @memberof LernModel.Float()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('FloatValidator.create');
   * @public
   * @param {String} name - Validator Floats
   * @return {Object} - newFloatValidator
   */
Validator.create({
  name: 'Float',
  validate(value, name, { min=0, max=1 }) {
    return (
      !_.isNull(value) &&
      _.isNumber(value) &&
      (_.inRange(value, min, max) || _.isEqual(value, max))
    );
  },
});
