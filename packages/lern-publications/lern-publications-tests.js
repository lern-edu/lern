// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by lern-publications.js.
import { name as packageName } from "meteor/duckdodgerbrasl:lern-publications";

// Write your tests here!
// Here is an example.
Tinytest.add('lern-publications - example', function (test) {
  test.equal(packageName, "lern-publications");
});
