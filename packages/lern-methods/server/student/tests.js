import _ from 'lodash';
import { Test, Attempt } from 'meteor/duckdodgerbrasl:lern-model';
import Check from 'meteor/duckdodgerbrasl:lern-check';
import log from 'loglevel';
import Helpers from '../../helpers.js';
const [prefix, protect] = ['Student', 'student'];

/**
 * Meteor Methods for Student user.
 * @namespace Student()
 * @memberof LernMethods
 */
Helpers.Methods({ prefix, protect }, {
  /**
   * @memberof LernMethods.Student()
   * @desc Retrieve tags from the database
   * @example
   * const tags = Meteor.call('StudentTagsGet');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Array} - Array of tags
   */
  TestsGet(query, options) {
    return Test.find(query, options).fetch();
  },

  /**
   * @memberof LernMethods.Student()
   * @desc Count tests that match the criteria
   * @example
   * const numTests = Meteor.call('StudentTestsCount');
   * @public
   * @param {Object} [query] - Query to mongo
   * @param {Object} [options] - Options to mongo
   * @return {Number} - Number of tests
   */
  TestsCount(query, options) {
    return Test.find(query, options).count();
  },

  /**
   * @memberof LernMethods.Student()
   * @desc Retrieve attempt (find or create) and test from the database
   * @example
   * const testAndAttempt0 = Meteor.call('StudentTestAttemptStart');
   * @public
   * @param {String} [testId] - Test id
   * @return {Array} - Array of tags
   */
  TestAttemptStart(testId) {

    let test = Test.find({ _id: testId });
    Check.Cursor(test).some();
    test = _.head(test.fetch());

    let attempt = Attempt.find({ testId });
    let hasAttempt = true;
    try {
      Check.Cursor(attempt).some();
    }
    catch (err) {
      hasAttempt = false
    }

    if (hasAttempt)
      return {
        attempt: _.head(attempt.fetch()),
        test,
      };
    else {
      attempt = new Attempt({
        testId,
        scores: _.map(test.scores, score => new Attempt.AttemptScoreSchema(score.raw())),
        startedAt: new Date(),
      });
      const attemptId = attempt.save();
      return {
        attempt: Attempt.findOne(attemptId),
        test,
      };
    }

  },

});
