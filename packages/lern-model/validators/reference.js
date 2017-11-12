Astro.createValidator({
  name: 'Reference',
  validate(value) {
    return (
      !_.isNull(value) &&
      _.isString(value) &&
      Regex.id.test(value)
    );
  },
});

Astro.createValidator({
  name: 'References',
  validate(value) {
    return (
      !_.isNull(value) &&
      _.every(value, _.isString) &&
      _.every(value, v => Regex.id.test(v))
    );
  },
});
