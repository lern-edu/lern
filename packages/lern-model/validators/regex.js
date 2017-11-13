import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

_.forEach(Regex, (v, k) => {

  Validator.create({
    name: k,

    isValid({ value, param }) {
      return (
        !_.isNull(value) &&
        v.test(value)
      );
    },

    // resolveError({ name, param }) {
    //   return `Length of "${name}" has to be at most ${param}`;
    // },

  });
});
