import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import _ from 'lodash';
import Author from '../../behaviors/author.js';
import TimeTracked from '../../behaviors/timetracked.js';
import Content from '../../schemas/content/schema.js';

const Attempts = new Mongo.Collection('attempts');

const AttemptScoreSchema = Class.create({
  name: 'AttemptScore',
  fields: {
    name: String,
    parent: {
      type: Object,
      optional: true,
    },
    description: {
      type: Object,
      optional: true,
    },
    _id: {
      type: String,
      validators: [
        { type: 'Reference' },
        { type: 'TagTestReference' },
      ],
      immutable: true,
    },
    score: Number,
  },
});

const Attempt = Class.create({
  name: 'Attempt',
  collection: Attempts,
  fields: {
    test: Object,
    finished: {
      type: Boolean,
      immutable: true,
    },
    score: {
      type: [AttemptScoreSchema],
    },
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt',
    },
  },
});

TimeTracked(Author(Attempt));

export default Attempt;
