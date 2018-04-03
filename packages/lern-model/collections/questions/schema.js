import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import Author from '../../behaviors/author.js';
import Content from '../../schemas/content/schema.js';
import StaticCollections from '../static.js';
import log from 'loglevel';

const Questions = new Mongo.Collection('questions');

const QuestionRangeSchema = Class.create({
  name: 'QuestionRange',
  fields: {
    min: {
      type: Number,
      immutable: true,
      optional: true,
    },
    max: {
      type: Number,
      immutable: true,
      optional: true,
    },
  },
});

const QuestionScoreSchema = Class.create({
  name: 'QuestionTags',
  fields: {
    author: Object,
    name: {
      type: String,
      validators: [{ type: 'minLength', param: 1 }],
    },
    parent: {
      type: Object,
      optional: true,
    },
    description: {
      type: [Object],
      optional: true,
    },
    _id: {
      type: String,
      validators: [{ type: 'Reference' }],
    },
    score: {
      type: Number,
    },
  },
});

const QuestionAnswerSchema = Class.create({
  name: 'QuestionAnswer',
  fields: {
    open: {
      type: String,
      optional: true,
      validators: [
        {
          type: 'or',
          param: [
            { type: 'QuestionType' },
            { type: 'required' },
          ],
        },
      ],
    },
    singleAnswer: {
      type: Number,
      optional: true,
    },
  },
});

const Question = Class.create({
  name: 'Question',
  collection: Questions,
  validators: {
    type: [
      {
        type: 'choice',
        param: StaticCollections.QuestionTypes,
      },
    ],
    range: [{ type: 'QuestionRange' }],
    sudoku: [
      {
        type: 'or',
        param: [
          { type: 'QuestionType' },
          { type: 'required' },
        ],
      },
    ],
    level: [
      {
        type: 'or',
        param: [
          { type: 'QuestionType' },
          { type: 'required' },
        ],
      },
    ],
  },
  fields: {
    description: {
      type: [Content],
      default: () => [],
    },
    text: {
      type: String,
      optional: true,
    },
    type: {
      type: String,
      immutable: true,
    },
    answer: {
      type: QuestionAnswerSchema,
      optional: true,
      immutable: true,
      default: () => new QuestionAnswerSchema(),
    },
    range: {
      type: [QuestionRangeSchema],
      optional: true,
      immutable: true,
    },
    sudoku: {
      type: [Number],
      optional: true,
    },
    level: {
      type: String,
      optional: true,
    },
    score: {
      type: [QuestionScoreSchema],
      optional: true,
    },
    options: {
      type: [Content],
      optional: true,
    },
  },
  helpers: {
    validateGame(answer) {
      var conflict = false;
      var conflictRow = false;
      for (var row = 0; row < 9; row++) {
        var cRow = _.fill(new Array(9), false);
        for (var col = 0; col < 9; col++) {
          conflictRow = conflictRow || cRow[answer[row * 9 + col] - 1];
          cRow[answer[row * 9 + col] - 1] = true;
        }

        log.info('row: ' + row, cRow, conflictRow, _.every(cRow));
      }

      var conflictCol = false;
      for (var col = 0; col < 9; col++) {
        var cCol = _.fill(new Array(9), false);
        for (var row = 0; row < 9; row++) {
          conflictCol = conflictCol || cCol[answer[row * 9 + col] - 1];
          cCol[answer[row * 9 + col] - 1] = true;
        }

        log.info('col: ' + col, cCol, conflictCol, _.every(cCol));
      }

      var conflictGrid = false;
      for (var i = 0; i < 9; i += 3) {
        for (var j = 0; j < 9; j += 3) {
          var cGrid = _.fill(new Array(9), false);
          for (var row = i; row < i + 3; row++) {
            for (var col = j; col < j + 3; col++) {
              conflictGrid = conflictGrid || cGrid[answer[row * 9 + col] - 1];
              cGrid[answer[row * 9 + col] - 1] = true;
            }
          }

          log.info('grid: ' + i + ',' + j, cGrid, conflictGrid, _.every(cGrid));
        }
      }

      log.info(conflictRow, conflictCol, conflictGrid);

      conflict |= conflictRow || conflictCol || conflictGrid;

      return !conflict;
    },

    isComplete(answer) {
      return _.every(answer, a => a && a >= 1 && a <= 9);
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

Question.extend({
  fields: {
    answerCount: {
      type: Number,
      default: 0,
    },
    hitCount: {
      type: Number,
      default: 0,
    },
    hitRate: {
      type: Number,
      default: -1,
    },
  },
  events: {
    afterInc({ data: { fieldName }, currentTarget: sudoku }) {
      if (fieldName === 'answerCount' || fieldName === 'hitCount') {
        const { answerCount, hitCount } = sudoku;
        sudoku.set('hitRate', hitCount / answerCount);
      }
    },

    beforeSave({ currentTarget: question }) {
      const contentText = _.join(
        _.map(
          _.flatten(_.compact(_.map(question.get('description'), 'text.blocks'))),
        'text'),
      ' ') || '';
      const optionsText = _.join(
        _.map(
          _.flatten(_.compact(_.map(question.get('options'), 'text.blocks'))),
        'text'),
      ' ') || '';

      question.set('text', _.join([contentText, optionsText], ' '));

      if (question.get('range.min'))
        question.set('range.min', _.toNumber(question.get('range.min')));
      if (question.get('range.max'))
        question.set('range.max', _.toNumber(question.get('range.max')));
    },
  },
});

Author(Question);

Question.QuestionRangeSchema = QuestionRangeSchema;
Question.QuestionAnswerSchema = QuestionAnswerSchema;

export default Question;
