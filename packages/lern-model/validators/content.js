import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

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
