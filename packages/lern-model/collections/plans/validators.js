Astro.createValidator({
  name: 'PlanSizeSmall',
  validate(value) {
    return (
      !_.isNull(value) &&
      _.isFinite(value) &&
      _.inRange(value, 1, 60)
    );
  },
});

Astro.createValidator({
  name: 'PlanSizeBig',
  validate(value) {
    return (
      !_.isNull(value) &&
      _.isFinite(value) &&
      value % 4 === 0
    );
  },
});
