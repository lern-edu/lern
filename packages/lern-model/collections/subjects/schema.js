Subjects = new Mongo.Collection('subjects');

Subjects.ContentSchema = Astro.Class({
  name: 'SubjectContent',
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

Subjects.Schema = Astro.Class({
  name: 'Subject',
  collection: Subjects,
  fields: {
    name: {
      type: 'string',
      validator: Validators.String(),
    },
    info: {
      type: 'array',
      nested: 'SubjectContent',
      validator: Validators.minLength(0),
      optional: true,
    },
    text: {
      type: 'string',
      optional: true,
    },
    area: {
      type: 'string',
      validator: Validators.OneOf(SubjectAreas.all('keys')),
      optional: true,
    },
  },
  behaviors: [
    'timestamp',
  ],
});
