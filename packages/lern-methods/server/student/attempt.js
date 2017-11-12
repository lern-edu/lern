import { Meteor } from 'meteor/meteor';
const [prefix, protect] = ['Student', 'student'];

Helpers.Methods({ prefix, protect }, {
  AttemptStart(testId) {
    Check.Regex(testId).id();
    const { userId } = this;

    // TODO: check if user can attempt

    let test = Fetch.General.tests(testId);

    Check.Cursor(test).some();
    test = _.first(test.fetch());

    let attempt = Fetch.User(userId).attempts({ test: testId, finished: null });
    Check.Cursor(attempt).none();

    attempt = new Attempts.Schema({
      test: testId,
      score: _.sum(test.scores) || null,
      type: test.timeoutType,
      maxDuration: test.timeoutType === 'global' ? test.timeout : null,
      timeTracked: test.timeoutType === 'page'
        ? _.map(test.pages,
          ({ timeout }) => new Attempts.PageTimeTrackedSchema({ maxDuration: timeout }))
        : null,
    });

    Check.Astro(attempt).valid();
    attempt.save();

    return attempt;
  },

  AttemptStartTimeoutPage(attemptId) {
    let attempt = Fetch.General.attempts(attemptId);
    Check.Cursor(attempt).some();
    attempt = _.head(attempt.fetch());

    attempt.startTimeoutPage();

    return true;
  },

  AttemptFinish(testId) {
    Check.Regex(testId).id();
    const { userId } = this;

    let test = Fetch.General.tests(testId);
    Check.Cursor(test).some();
    test = _.first(test.fetch());

    let attempt = Fetch.User(userId).attempts({ test: testId, last: true, finished: null });
    Check.Cursor(attempt).some();
    attempt = _.first(attempt.fetch());

    let answers = Fetch.General.answers({
      author: userId,
      question: { $in: test.questions },
      attempt: attempt._id,
    });

    Check.Cursor(answers).some();
    answers = answers.fetch();

    if (attempt.score && _.every(answers, a => a.type === 'closed')) {
      const grades = _.map(test.questions, (q, index) => {
        let answer = _.first(_.filter(answers, a => _.isEqual(a.question, q)));
        return answer.grade * _.get(test.scores, index);
      });
      attempt.set('grade', (_.sum(grades) / attempt.score));
    };

    attempt.set('finished', true);
    Check.Astro(attempt).valid();

    attempt.save();
    return attempt;
  },
});
