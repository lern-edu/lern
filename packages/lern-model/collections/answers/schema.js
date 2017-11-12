Answers = new Mongo.Collection('answers');

Answers.Schema = Astro.Class({
  name: 'Answer',
  collection: Answers,
  fields: {
    question: {
      type: 'string',
      validator: Validators.Reference(),
    },
    attempt: {
      type: 'string',
      validator: Validators.Reference(),
    },
    answer: {
      validator: Validators.AnswerAnswer(),
      optional: true,
    },
    type: {
      type: 'string',
      validator: Validators.OneOf(QuestionTypes.all('keys')),
      immutable: true,
    },
    grade: {
      type: 'number',
      validator: Validators.Float({ min: 0, max: 1 }),
      optional: true,
    },
    comment: {
      type: 'string',
      validator: Validators.String(),
      optional: true,
    },
  },
  behaviors: [
    'timeTracked',
    'creatable',
  ],
});
