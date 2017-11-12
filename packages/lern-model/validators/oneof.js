Astro.createValidator({
  name: 'OneOf',
  validate(value, name, values) {
    return (
      !_.isNull(value) &&
      _.includes(values, value)
    );
  },
});
