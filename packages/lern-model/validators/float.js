Astro.createValidator({
  name: 'Float',
  validate(value, name, { min=0, max=1 }) {
    return (
      !_.isNull(value) &&
      _.isNumber(value) &&
      (_.inRange(value, min, max) || _.isEqual(value, max))
    );
  },
});
