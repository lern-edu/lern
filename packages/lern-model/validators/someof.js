Astro.createValidator({
  name: 'SomeOf',
  validate(value, name, values) {
    return (
      !_.isNull(value) &&
      _.every(value, v => _.includes(values, v))
    );
  },
});
