import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

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
