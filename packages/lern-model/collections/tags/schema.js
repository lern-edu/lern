Tags = new Mongo.Collection('tags');

Tags.ContentSchema = Astro.Class({
  name: 'TagContent',
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

Tags.Schema = Astro.Class({
  name: 'Tag',
  collection: Tags,
  fields: {
    text: {
      type: 'string',
      validator: Validators.String(),
    },
    info: {
      type: 'array',
      nested: 'TagContent',
      validator: Validators.minLength(0),
      default: () => [],
      optional: true,
    },
    parent: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
    },
  },
  behaviors: [
    'singleSubject',
  ],
});
