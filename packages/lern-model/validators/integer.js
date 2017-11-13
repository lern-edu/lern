import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

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
