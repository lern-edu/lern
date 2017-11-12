Tests = new Mongo.Collection('tests');

Tests.ContentSchema = Astro.Class({
  name: 'TestContent',
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

Tests.PageContentSchema = Astro.Class({
  name: 'TestPageContent',
  fields: {
    type: {
      type: 'string',
      validator: Validators.OneOf(PageContentTypes.all('keys')),
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
    title: {
      type: 'string',
      validator: Validators.or([
        Validators.String({ min: 1, max: 8192 }),
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
    document: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    question: {
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
    score: {
      type: 'number',
      optional: true,
    },
  },
});

Tests.PageSchema = Astro.Class({
  name: 'TestPage',
  fields: {
    content: {
      type: 'array',
      nested: 'TestPageContent',
      validator: Validators.minLength(1),
      default: () => [],
    },
    timeout: {
      type: 'number',
      validator: Validators.TestPageTimeout(),
      optional: true,
      immutable: true,
    },
  },
});

Tests.RequestSchema = Astro.Class({
  name: 'TestRequest',
  fields: {
    date: {
      type: 'date',
      validator: Validators.Date(),
    },
    name: {
      type: 'string',
      validator: Validators.String({ min: 1, max: 1024 }),
    },
    size: {
      type: 'number',
      validator: Validators.and([Validators.lt(11), Validators.gt(0)]),
    },
  },
  behaviors: [
    'tagable',
    'singleSubject',
  ],
});

Tests.Schema = Astro.Class({
  name: 'Test',
  collection: Tests,
  fields: {
    plan: {
      type: 'string',
      validator: Validators.TestPlan(),
    },
    course: {
      type: 'string',
      validator: Validators.TestCourse(),
      optional: true,
    },
    students: {
      validator: Validators.TestStudents(),
    },
    name: {
      type: 'string',
      validator: Validators.String(),
    },
    text: {
      type: 'string',
      optional: true,
    },
    info: {
      type: 'array',
      nested: 'TestContent',
      validator: Validators.minLength(1),
      default: () => [],
    },
    help: {
      type: 'array',
      nested: 'TestContent',
      validator: Validators.minLength(0),
      default: () => [],
    },
    type: {
      type: 'string',
      validator: Validators.OneOf(TestTypes.all('keys')),
    },
    pages: {
      type: 'array',
      nested: 'TestPage',
      validator: Validators.minLength(1),
      default: () => [],
    },
    questions: {
      type: 'array',
      validator: Validators.and([
        Validators.References(),
        Validators.minLength(1),
      ]),
      immutable: true,
      default: () => [],
    },
    timeout: {
      type: 'number',
      validator: Validators.TestTimeout(),
      immutable: true,
    },
    timeoutType: {
      type: 'string',
      validator: Validators.OneOf(TestTimeoutTypes.all('keys')),
      immutable: true,
    },
    resolution: {
      type: 'string',
      validator: Validators.OneOf(TestResolutionTypes.all('keys')),
      default: 'AttemptDefault',
    },
  },
  behaviors: [
    'creatable',
    'timestamp',
    'tagable',
    'multiSubject',
    'timeBounds',
  ],
});
