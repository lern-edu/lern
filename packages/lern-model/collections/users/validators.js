import { Validator } from 'meteor/jagi:astronomy';

Validator.create({
  name: 'UserRoles',
  validate(value, name, { roles, validator }) {
    const hasRole = _.includes(roles, this.role);
    if (!hasRole) return _.isNull(value);
    else return validator.validate(this, name, value);
  },
});
