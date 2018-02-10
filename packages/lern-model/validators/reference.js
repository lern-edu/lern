import { Validator } from 'meteor/jagi:astronomy';
import Regex from '../regex.js';
import _ from 'lodash';

Validator.create({
  name: 'Reference',

  validate({ value }) {
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
