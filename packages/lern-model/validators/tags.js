import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

/**
 * @namespace Tags()
 * @memberof LernModel
 */

 /**
   * @memberof LernModel.Tags()
   * @desc Self description
   * @example
   * const newValidator = Meteor.call('TagsValidator.create');
   * @public
   * @param {String} name - Validator Tags
   * @param {Object} validate - Validator validate
   * @return {Object} - newTagsValidator
   */
Validator.create({
  name: 'Tags',
  validate(values, e1, e2) {
    // TODO tagable can't verify like this bacause will bug automatic tests
    // return true;
    return _.get(this, '_isNew') ? !_.isEmpty(_.get(this, 'tags')) : true;
  },
});
