import _ from 'lodash';
import { Test, Attempt, Sudoku } from 'meteor/duckdodgerbrasl:lern-model';
import Check from 'meteor/duckdodgerbrasl:lern-check';
import log from 'loglevel';
import Future from 'fibers/future';
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
   * const testAndAttempt = Meteor.call('StudentTestAttemptStart');
   * @public
   * @param {String} [testId] - Test id
   * @return {Object} - test and attempt
   */
  TestAttemptStart(testId) {
    const userId = Meteor.userId();

    let test = Test.find({ _id: testId });
    Check.Cursor(test).some();
    test = _.head(test.fetch());

    let attempt = Attempt.find({ 'test._id': testId, finished: false, 'author._id': userId });
    let hasAttempt = true;
    try {
      Check.Cursor(attempt).some();
    }
    catch (err) {
      hasAttempt = false;
    }

    if (hasAttempt)
      return _.head(attempt.fetch());
    else {

      attempt = new Attempt({
        test: test.raw(),
        pages: _.map(test.pages, p => (
            {
              finished: false,
              answers: _.map(
                _.filter(p.description, { type: 'question' }),
                ({ question }) => ({ _id: question._id, answer: null })
              ),
            }
          )
        ),
        startedAt: new Date(),
      });

      attempt.pages[0].startedAt = new Date();

      // const future = new Future();
      // let rawSudokuDb = Sudoku.getCollection();
      // rawSudokuDb = rawSudokuDb.rawCollection();
      // rawSudokuDb.aggregate([
      //   {
      //     $match: {
      //       $and: [
      //         { level: test.level || 'easy' },
      //       ],
      //     },
      //   },
      //   { $sample: { size: 1 } },
      // ])
      // .toArray((err, docs) => {

      //   if (err && !_.isEmpty(docs))
      //     throw new Meteor.Error('Problem to start game');
      //   else
      //     future.return(_.head(docs));
      // });

      // attempt.sudoku = future.wait();
      // attempt.sudoku.answer = attempt.sudoku.board;

      const attemptId = attempt.save();
      return Attempt.findOne(attemptId);
    }
  },

  /**
   * @memberof LernMethods.Student()
   * @desc set attempt to finish
   * @example
   * Meteor.call('StudentTestAttemptChangePage');
   * @public
   * @param {String} [attemptId] - attempt id
   * @param {String} [oldPage] - oldPage
   * @param {String} [newPage] - newPage
   * @return {bool} - true if setted
   */
  TestAttemptChangePage(attemptId, oldPage, newPage) {
    const user = Meteor.user();

    let attempt = Attempt.find({ _id: attemptId });
    Check.Cursor(attempt).some();
    attempt = _.head(attempt.fetch());

    attempt.pages[oldPage].set('finished', true);
    attempt.pages[oldPage].set('finishedAt', new Date());
    attempt.pages[newPage].set('startedAt', new Date());

    attempt.save();
    return attempt;
  },

  /**
   * @memberof LernMethods.Student()
   * @desc set attempt to finish
   * @example
   * Meteor.call('StudentTestAttemptFinish');
   * @public
   * @param {String} [attemptId] - attempt id
   * @return {bool} - true if setted
   */
  TestAttemptFinish(attemptId, dismiss) {
    const user = Meteor.user();

    let attempt = Attempt.find({ _id: attemptId });
    Check.Cursor(attempt).some();
    attempt = _.head(attempt.fetch());

    const { test } = attempt;

    // Function to create one attempt score
    const scoreSchema = score => {
      const userReportIndex = _.findIndex(user.report, { _id: score._id });
      const doneThisTestBefore = _.get(user, `report.${userReportIndex}.tests.${test._id}`);
      return new Attempt.AttemptScoreSchema({
        ...score,
        score: score.score * (doneThisTestBefore ? 0 : test.score),
      });
    };

    // DONE THIS ON ATTEMPT SCHEMA
    const lastPage = _.last(attempt.pages);
    lastPage.set('finished', true);
    lastPage.set('finishedAt', new Date());
    attempt.set('finished', true);
    attempt.set('finishedAt', new Date());

    if (dismiss) {
      return attempt.save();
    }

    else if (test.resolution === 'all') {
      attempt.set('scores', _.map(test.scores, scoreSchema));
    }
    else if (test.resolution === 'perPage') {
      attempt.set('scores', _.map(test.scores, scoreSchema));
    }
    else if (test.resolution === 'perQuestion') {

      _.forEach(attempt.test.pages, ({ description }, index) => {

        _.forEach(description, content => {

          // For each question, one resolution
          if (content.type === 'question') {

            // Get question
            const question = content.question;

            // Get answer
            const questionAnswer = _.get(
              _.find(
                _.get(attempt, `pages[${index}].answers`),
                { _id: question._id }
              ), 'answer'
            );

            // Verify if correct
            const isCorrect = question.type == 'singleAnswer'
              ? question.answer.singleAnswer === questionAnswer
              : question.type == 'sudoku'
              ? question.validateGame(questionAnswer)
              : null;

            // console.log(question.type);

            // console.log(isCorrect);

            // Set scores
            _.forEach(question.scores, score => {
              const setScore = score;

              if (question.type == 'open') {
                setScore.score = score.score * (content.score || 0);
              } else if (question.type == 'singleAnswer') {
                // console.log('singleAnswer', question.answer.singleAnswer, questionAnswer);
                if (isCorrect)
                  setScore.score = score.score * (content.score || 0);
                else setScore.score = 0;
              } else if (question.type == 'sudoku') {
                if (isCorrect)
                  setScore.score = score.score * (content.score || 0);
                else setScore.score = 0;
              }

              const attemptScoresIndex = _.findIndex(attempt.scores, { _id: score._id });

              // console.log('attemptScoresIndex', attemptScoresIndex);

              if (attemptScoresIndex >= 0) {
                const attemptScore = attempt.scores[attemptScoresIndex];
                // console.log('setScore.score', setScore.score);

                // console.log('sum', attemptScore.score + setScore.score);

                attempt.set(`scores.${attemptScoresIndex}.score`, attemptScore.score + setScore.score);

                // console.log('finally', attempt.scores[attemptScoresIndex].score);
              } else {
                // console.log('push new');
                attempt.scores.push(setScore);
              }

              // console.log("==============================");

            });
          }

        });

      });

    }

    return attempt.save();

  },

  TestAttemptUpdate: Helpers.DefaultSave,

});
