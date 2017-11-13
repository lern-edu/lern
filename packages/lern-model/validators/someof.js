import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

Validator.create({
  name: 'SomeOf',
  validate(value, name, values) {
    return (
      !_.isNull(value) &&
      _.every(value, v => _.includes(values, v))
    );
  },
});
