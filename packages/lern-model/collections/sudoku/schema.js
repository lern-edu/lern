import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import _ from 'lodash';

const _Sudoku = new Mongo.Collection('sudoku');

const Sudoku = Class.create({
  name: 'Sudoku',
  collection: _Sudoku,
  fields: {
    board: [Number],
    level: {
      type: String,
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

        // console.log('row: ' + row, cRow, conflictRow, _.every(cRow));
      }

      var conflictCol = false;
      for (var col = 0; col < 9; col++) {
        var cCol = _.fill(new Array(9), false);
        for (var row = 0; row < 9; row++) {
          conflictCol = conflictCol || cCol[answer[row * 9 + col] - 1];
          cCol[answer[row * 9 + col] - 1] = true;
        }

        // console.log('col: ' + col, cCol, conflictCol, _.every(cCol));
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

          // console.log('grid: ' + i + ',' + j, cGrid, conflictGrid, _.every(cGrid));
        }
      }

      // console.log(conflictRow, conflictCol, conflictGrid);

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

// Dynamic update dificulty
Sudoku.extend({
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
  },
});

export default Sudoku;
