Attempts = new Mongo.Collection('attempts');

Attempts.PageTimeTrackedSchema = Astro.Class({
  name: 'AttemptsPageTimeTracked',
  fields: {
    startedAt: {
      type: 'date',
      immutable: true,
      optional: true,
    },
    finishedAt: {
      type: 'date',
      immutable: true,
      optional: true,
    },
    finished: {
      type: 'boolean',
      immutable: true,
      optional: true,
    },
    maxDuration: {
      type: 'number',
      immutable: true,
      optional: true,
    },
  },
});

Attempts.Schema = Astro.Class({
  name: 'Attempt',
  collection: Attempts,
  fields: {
    test: {
      type: 'string',
      validator: Validators.Reference(),
    },
    type: {
      type: 'string',
      validator: Validators.OneOf(TestTimeoutTypes.all('keys')),
      immutable: true,
    },
    timeTracked: {
      type: 'array',
      nested: 'AttemptsPageTimeTracked',
      validator: Validators.minLength(1),
      optional: true,
    },
    grade: {
      type: 'number',
      validator: Validators.Float({ min: 0, max: 100 }),
      optional: true,
    },
  },
  behaviors: [
    'timeTracked',
    'creatable',
  ],
});
