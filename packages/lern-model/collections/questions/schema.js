Questions = new Mongo.Collection('questions');

Questions.ContentSchema = Astro.Class({
  name: 'QuestionContent',
  fields: {
    type: {
      type: 'string',
      validator: Validators.OneOf(ContentTypes.all('keys')),
      immutable: true,
      default: 'text',
    },
    text: {
      validator: Validators.or([
        Validators.Content(),
        Validators.and([Validators.required(), Validators.object()]),
      ]),
      optional: true,
    },
    image: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    audio: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    video: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    document: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    link: {
      type: 'string',
      validator: Validators.or([Validators.url(), Validators.Content()]),
      optional: true,
    },
  },
});

Questions.OptionSchema = Astro.Class({
  name: 'QuestionOption',
  fields: {
    type: {
      type: 'string',
      validator: Validators.OneOf(QuestionOptionsContentTypes.all('keys')),
      immutable: true,
      default: 'text',
    },
    text: {
      validator: Validators.or([
        Validators.required(),
        Validators.Content(),
      ]),
      optional: true,
    },
    image: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    audio: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    video: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
  },
});

Questions.RangeSchema = Astro.Class({
  name: 'QuestionRange',
  fields: {
    min: {
      validator: Validators.decimal(),
      immutable: true,
      optional: true,
    },
    max: {
      validator: Validators.decimal(),
      immutable: true,
      optional: true,
    },
  },
});

Questions.Schema = Astro.Class({
  name: 'Question',
  collection: Questions,
  fields: {
    content: {
      type: 'array',
      nested: 'QuestionContent',
      validator: Validators.minLength(1),
      default: () => [],
    },
    text: {
      type: 'string',
      optional: true,
    },
    help: {
      type: 'array',
      nested: 'QuestionContent',
      validator: Validators.minLength(1),
      optional: true,
    },
    type: {
      type: 'string',
      validator: Validators.OneOf(QuestionTypes.all('keys')),
      immutable: true,
    },
    answer: {
      validator: Validators.QuestionAnswer({ min: 1, max: 2048 }),
      optional: true,
      immutable: true,
    },
    range: {
      type: 'object',
      nested: 'QuestionRange',
      validator: Validators.QuestionRange(),
      optional: true,
      immutable: true,
    },
    exams: {
      type: 'array',
      validator: Validators.array(),
      optional: true,
    },
    score: {
      type: 'number',
      validator: Validators.Float(),
      optional: true,
    },
    options: {
      type: 'array',
      nested: 'QuestionOption',
      validator: Validators.QuestionOptions(),
      optional: true,
    },
    school: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
      immutable: true,
    },
  },
  behaviors: [
    'tagable',
    'creatable',
    'timestamp',
    'singleSubject',
  ],
});
