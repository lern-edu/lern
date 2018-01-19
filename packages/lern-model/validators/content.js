import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

Validator.create({
  name: 'Content',
  isValidate({ value, name }) {
    const { type } = this;
    return type != name;
  },

  resolveError({ name }) {
    return name + ' is required!';
  },

});
