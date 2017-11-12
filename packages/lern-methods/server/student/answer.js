const [prefix, protect] = ['Student', 'student'];

Helpers.Methods({ prefix, protect }, {
  AnswersStart(testId) {
    Check.Regex(testId).id();
    const { userId } = this;

    let test = Fetch.General.tests({ _id: testId });
    Check.Cursor(test).some();
    test = _.first(test.fetch());

    let attempt = Fetch.User(userId).attempts({ test: testId, last: true, finished: null });
    Check.Cursor(attempt).some();
    attempt = _.first(attempt.fetch());

    let questions = test.findQuestions();
    Check.Cursor(questions).some();
    questions = questions.fetch();

    let answers = Fetch.General.answers({
      question: _.map(questions, '_id'),
      attempt: attempt._id,
    });
    Check.Cursor(answers).none();

    _.forEach(questions, ({ _id, type }) => {
      const answer = new Answers.Schema({
        question: _id,
        attempt: _.get(attempt, '_id'),
        type: type,
        maxDuration: test.timeoutType === 'global' ? test.timeout : null,
      });

      Check.Astro(answer).valid();
      answer.save();
    });

    return attempt.findAnswers({ author: userId }).fetch();
  },

  AnswersPageStart(testId, index) {
    Check.Regex(testId).id();
    const { userId } = this;

    let test = Fetch.General.tests({ _id: testId });
    Check.Cursor(test).some();
    test = _.first(test.fetch());

    const page = _.get(test.get('pages'), index);

    let attempt = Fetch.User(userId).attempts({ test: testId, last: true, finished: null });
    Check.Cursor(attempt).some();
    attempt = _.first(attempt.fetch());

    let questions = test.findPageQuestions(index);
    Check.Cursor(questions).some();
    questions = questions.fetch();

    let answers = Fetch.General.answers({
      question: _.map(questions, '_id'),
      attempt: attempt._id,
    });
    Check.Cursor(answers).none();

    _.forEach(page.content, content => {
      if (content.question) {
        const question = _.find(questions, { _id: content.question });

        const answer = new Answers.Schema({
          question: _.get(question, '_id'),
          attempt: _.get(attempt, '_id'),
          type: _.get(question, 'type'),
          maxDuration: test.timeoutType === 'page' ? page.timeout : null,
        });

        Check.Astro(answer).valid();
        answer.save();
      };
    });

    return attempt.findPageAnswers({ index, author: userId }).fetch();
  },

  AnswerUpdate(answerId, value) {
    const { userId } = this;

    let answer = Fetch.General.answers({ _id: answerId, finished: null, author: userId });
    Check.Cursor(answer).some();
    answer = _.first(answer.fetch());

    if (!answer.get('finished')) {
      answer.set('answer', value);
      answer.save();
    };

    return answer;
  },

  AnswersFinish(answersId) {
    Check.Regex(...answersId).id();
    const { userId } = this;
    let answers = Fetch.General.answers(
      { _id: answersId, finished: null, author: userId });
    Check.Cursor(answers).some();
    answers = answers.fetch();

    _.forEach(answers, answer => {
      if (answer.type === 'closed') {
        let question = Fetch.General.questions(answer.question);
        Check.Cursor(question).some();
        question = _.first(question.fetch());
        const grade = +(question.answer === answer.answer);
        question.inc({ answerCount: 1, hitCount: grade });
        question.save();
        answer.set('grade', grade);
      };

      answer.set('finished', true);
      Check.Astro(answer).valid();
      answer.save();
    });

    return answers;
  },
});
