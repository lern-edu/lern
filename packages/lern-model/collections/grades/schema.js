Grades = new Mongo.Collection('grades');

Grades.DeatachedGradeSchema = Astro.Class({
  name: 'DeatachedGrade',
  fields: {
    name: {
      type: 'string',
      validator: Validators.String({ min:1, max: 1024 }),
    },
    score: {
      type: 'number',
      validator: Validators.Float({ min:1, max: 100 }),
    },
    grade: {
      type: 'number',
      validator: Validators.Float({ min:0, max: 1 }),
    },
  },
  behaviors: [
    'creatable',
  ],
});

// Grades
// Uniq by stundent and course
// Array with attemps to compose student score in course
// Grades can be compose with deatached grades
Grades.Schema = Astro.Class({
  name: 'Grade',
  collection: Grades,
  fields: {
    student: {
      type: 'string',
      validator: Validators.Reference(),
      immutable: true,
    },
    course: {
      type: 'string',
      validator: Validators.Reference(),
      immutable: true,
    },
    attempts: {
      type: 'array',
      validator: Validators.References(),
      default: () => [],
      optional: true,
    },
    deatachedGrades: {
      type: 'array',
      nested: 'DeatachedGrade',
      default: () => [],
      optional: true,
    },
  },
  behaviors: [
    'creatable',
  ],
});
