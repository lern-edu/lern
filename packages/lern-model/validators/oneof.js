import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

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
