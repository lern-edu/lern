Courses = new Mongo.Collection('courses');

Courses.ContentSchema = ContentSchema('CourseContent');

Courses.DaySchema = Astro.Class({
  name: 'CourseDay',
  fields: {
    day: {
      type: 'string',
      validator: Validators.OneOf(WeekDays.all('keys')),
    },
  },
  behaviors: [
    'timeBounds',
  ],
});

Courses.Schema = Astro.Class({
  name: 'Course',
  collection: Courses,
  fields: {
    name: {
      type: 'string',
      validator: Validators.String(),
    },
    info: {
      type: 'array',
      nested: 'CourseContent',
      validator: Validators.minLength(1),
      default: () => [],
    },
    text: {
      type: 'string',
      optional: true,
    },
    teachers: {
      type: 'array',
      validator: Validators.and([
        Validators.minLength(1),
        Validators.References(),
      ]),
    },
    students: {
      type: 'array',
      validator: Validators.References(),
      default: () => [],
    },
    school: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
    },
    schedule: {
      type: 'array',
      nested: 'CourseDay',
      validator: Validators.and([
        Validators.required(),
        Validators.minLength(0),
      ]),
      default: () => [],
    },
    initial: {
      type: 'object',
      validator: Validators.object(),
      optional: true,
    },
    alias: {
      type: 'string',
      validator: Validators.unique(),
    },
  },
  behaviors: [
    'creatable',
    'multiSubject',
    'tagable',
    'timeBounds',
  ],
});
