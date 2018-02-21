import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

/**
 * @namespace String()
 * @memberof LernModel
 */

 /**
   * @memberof LernModel.String()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('StringValidator.create');
   * @public
   * @param {String} name - Validator String
   * @param {Object} validate - Validator validate
   * @return {Object} - newStringValidator
   */
Validator.create({
  name: 'String',
  validate(value, name, { min=4, max=1024 }={}) {
    return (
      !_.isNull(value) &&
      _.isString(value) &&
      _.inRange(value.length, min, max)
    );
  },
});
