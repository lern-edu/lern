// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by lern-check.js.
import { name as packageName } from "meteor/duckdodgerbrasl:lern-check";

// Write your tests here!
// Here is an example.
Tinytest.add('lern-check - example', function (test) {
  test.equal(packageName, "lern-check");
});
