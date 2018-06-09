import { Question } from 'meteor/duckdodgerbrasl:lern-model';
import { easy, medium, hard } from './boards.js';

Meteor.startup(() => {

  if (!Question.findOne({ type: 'sudoku' })) {

    _.forEach(easy, sudoku => {
      const game = new Question({ type: 'sudoku', sudoku, level: 'easy' });
      game.save();
    });

    _.forEach(medium, sudoku => {
      const game = new Question({ type: 'sudoku', sudoku, level: 'medium' });
      game.save();
    });

    _.forEach(hard, sudoku => {
      const game = new Question({ type: 'sudoku', sudoku, level: 'hard' });
      game.save();
    });

  };
});
