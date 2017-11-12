Astro.createValidator({
  name: 'Date',
  validate(value, name, { before, after }={}) {
    if (_.isString(before)) before = this[before];
    if (_.isString(after)) after = this[after];
    return (
      _.isDate(value) &&
      !_.isNaN(value.getTime()) &&
      (!before || value < before) &&
      (!after || value > after)
    );
  },
});
