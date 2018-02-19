import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

/**
 * @namespace Content()
 * @memberof LernModel
 */

 /**
   * @memberof LernModel.Content()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('ContentValidator.create');
   * @public
   * @param {String} name - Validator Content
   * @param {Object} validate - Validator validate
   * @param {Object} events - Validator events
   * @return {Object} - newContentValidator
   */
Validator.create({
  name: 'Content',
  validate(value, fieldName) {
    const { type } = this;
    return type != fieldName;
  },

  events: {
    validationError(e) {
      var fieldName = e.data.fieldName;
      e.setMessage(fieldName + ' is required!');
    },
  },
});
