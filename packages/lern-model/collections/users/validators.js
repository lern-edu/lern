Astro.createValidator({
  name: 'UserName',
  validate(value) {
    return (
      !_.isNull(value) &&
      _.isString(value) &&
      _.inRange(value.length, 4, 1024)
    );
  },
});

Astro.createValidator({
  name: 'UserRoles',
  validate(value, name, { roles, validator }) {
    const hasRole = _.includes(roles, this.role);
    if (!hasRole) return _.isNull(value);
    else return validator.validate(this, name, value);
  },
});
