Plans = new Mongo.Collection('plans');

Plans.TaskSchema = Astro.Class({
  name: 'PlansTask',
  fields: {
    day: {
      type: 'string',
      validator: Validators.OneOf(WeekDays.all('keys')),
    },
    subject: {
      type: 'string',
      validator: Validators.Reference(),
    },
    size: {
      type: 'number',
      validator: Validators.Integer({ min: 1, max: 300 }),
    },
    mistakes: {
      type: 'boolean',
      default: false,
    },
  },
});

Plans.Schema = Astro.Class({
  name: 'Plans',
  collection: Plans,
  fields: {
    name: {
      type: 'string',
      validator: Validators.String(),
    },
    weekJobs: {
      type: 'array',
      nested: 'PlansTask',
      validator: Validators.and([
        Validators.required(),
        Validators.minLength(1),
      ]),
    },
  },
});
