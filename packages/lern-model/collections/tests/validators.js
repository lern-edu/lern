Astro.createValidator({
  name: 'TestScore',
  validate(value) {
    const { pages } = this;
    return (
      _.isArray(questions) &&
      value.length === questions.length &&
      _.every(value, _.isObject)
    );
  },
});

Astro.createValidator({
  name: 'TestStudents',
  validate(value) {
    const { type } = this;
    if (type !== 'plans') return _.isNull(value);
    else return (
      _.isArray(value) &&
      _.every(value, v => Regex.id.test(v))
    );
  },
});

Astro.createValidator({
  name: 'TestCourse',
  validate(value) {
    const { type } = this;
    if (type !== 'course') return _.isNull(value);
    else return Regex.id.test(value);
  },
});

Astro.createValidator({
  name: 'TestPlan',
  validate(value) {
    const { type } = this;
    if (type !== 'plans') return _.isNull(value);
    else return Regex.id.test(value);
  },
});

Astro.createValidator({
  name: 'TestTimeout',
  validate(value) {
    const { timeoutType: type, content } = this;
    if (type === 'none') return _.isNull(value);
    else if (type === 'page') return _.every(content, ({ timeout }) =>
      !_.isNull(timeout) &&
      _.isNumber(timeout) &&
      _.isFinite(timeout) &&
      _.inRange(timeout, 60, 24 * 60 * 60));
    else return (
      !_.isNull(value) &&
      _.isNumber(value) &&
      _.isFinite(value) &&
      _.inRange(value, 60, 24 * 60 * 60)
    );
  },
});

Astro.createValidator({
  name: 'TestPageTimeout',
  validate(value) {
    const { timeoutType: type } = this;
    if (type === 'none' || type === 'global') return _.isNull(value);
    else return (
      !_.isNull(value) &&
      _.isNumber(value) &&
      _.isFinite(value) &&
      _.inRange(value, 60, 24 * 60 * 60)
    );
  },
});
