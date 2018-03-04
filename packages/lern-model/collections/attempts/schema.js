import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import _ from 'lodash';
import Author from '../../behaviors/author.js';
import TimeTracked from '../../behaviors/timetracked.js';
import Content from '../../schemas/content/schema.js';
import User from '../users/schema.js';

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
      type: [Object],
      optional: true,
    },
    _id: String,
    score: Number,
  },
});

const Attempt = Class.create({
  name: 'Attempt',
  collection: Attempts,
  fields: {
    test: {
      type: Object,
      immutable: true,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    scores: {
      type: [AttemptScoreSchema],
      optional: true,
      default: () => [],
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
  events: {
    afterUpdate({ currentTarget: attempt }) {
      const author = User.findOne({ _id: _.get(attempt, 'author._id') });
      const { test } = attempt;

      _.forEach(attempt.scores, score => {
        const index = _.findIndex(author.report, { _id: score._id });

        let parent = score.parent;
        while (parent) {
          const parentIndex = _.findIndex(author.report, { _id: parent._id });

          if (parentIndex < 0) {
            author.report.push(
              new User.UserReportSchema({
                ...parent,
                tests: { [attempt.test._id]: [attempt._id] },
              })
            );
          }

          parent = parent.parent;
        };

        if (index >= 0) {
          const report = author.report[index];
          report.score += score.score;

          if (report.tests[test._id])
            report.tests[test._id].push(attempt._id);
          else
            report.tests[test._id] = [attempt._id];
        }
        else {
          author.report.push(
            new User.UserReportSchema({
              ...score.raw(),
              tests: { [attempt.test._id]: [attempt._id] },
            })
          );
        }
      });

      author.save();
    },
  },
});

Author(Attempt);
TimeTracked(Attempt);

Attempt.AttemptScoreSchema = AttemptScoreSchema;

export default Attempt;
