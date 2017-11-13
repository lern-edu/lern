import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

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
