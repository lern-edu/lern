// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from 'meteor/tinytest';

// Import and rename a variable exported by lern-form.js.
import { name as packageName } from 'meteor/lern-form';

// Write your tests here!
// Here is an example.
Tinytest.add('lern-form - example', function (test) {
  test.equal(packageName, 'lern-form');
});
