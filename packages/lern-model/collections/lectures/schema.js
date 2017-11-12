Lectures = new Mongo.Collection('lectures');

Lectures.ContentSchema = ContentSchema('LectureContent');

Lectures.Schema = Astro.Class({
  name: 'Lecture',
  collection: Lectures,
  fields: {
    name: {
      type: 'string',
      validator: Validators.String({ min: 1, max: 1024 }),
    },
    course: {
      type: 'string',
      validator: Validators.Reference(),
    },
    info: {
      type: 'array',
      nested: 'LectureContent',
      optional: true,
      default: () => [],
    },
    attendants: {
      type: 'array',
      validator: Validators.References(),
      optional: true,
    },
    homework: {
      type: 'boolean',
      validator: Validators.boolean(),
      optional: true,
    },
    test: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
    },
  },
  behaviors: [
    'multiSubject',
    'tagable',
    'creatable',
    'timeBounds',
  ],
});
