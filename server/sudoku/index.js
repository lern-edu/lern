import { Sudoku } from 'meteor/duckdodgerbrasl:lern-model';
import { easy, medium, hard } from './boards.js';

Meteor.startup(() => {

  if (!Sudoku.findOne()) {

    _.forEach(easy, board => {
      const sudoku = new Sudoku({ board, level: 'easy' });
      sudoku.save();
    });

    _.forEach(medium, board => {
      const sudoku = new Sudoku({ board, level: 'medium' });
      sudoku.save();
    });

    _.forEach(hard, board => {
      const sudoku = new Sudoku({ board, level: 'hard' });
      sudoku.save();
    });

  };
});
