// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from 'meteor/tinytest';

// Import and rename a variable exported by lern-games.js.
import { Sudoku } from 'meteor/duckdodgerbrasl:lern-games';

// Write your tests here!
// Here is an example.
Tinytest.add('lern-games - example', function (test) {
  test.equal(Sudoku, 'lern-games');
});
