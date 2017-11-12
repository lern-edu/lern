const [prefix, protect] = ['Student', 'student'];

Helpers.Methods({ prefix, protect }, {
  TestRedoWrongs({ attemptId }) {
    Check.Regex(attemptId).id();

    const now = moment();
    const userId = Meteor.userId();

    let attempt = Fetch.General.attempts(attemptId);
    Check.Cursor(attempt).some();
    attempt = _.first(attempt.fetch());

    let test = attempt.findTest();
    Check.Cursor(test).some();
    test = _.first(test.fetch());

    const doc = new Tests.Schema({
      // Static
      course: null,
      info: 'Boa sorte!',
      type: 'personal',
      scores: null,
      timeout: null,
      timeoutType: 'none',
      plan: null,
      students: null,

      // Dynamic
      startDate: now.clone().toDate(),
      endDate: now.clone().add(1, 'minute').toDate(),
      name: `${test.name}[erradas]`,
      author: userId,

      // Generated
      questions: null,
      subjects: null,
      tags: null,
    });

    let answers = attempt.findAnswers();
    Check.Cursor(answers).some();
    answers = _.filter(answers.fetch(), { grade: 0 });

    let questions = Fetch.General.questions(_.map(answers, 'question'));
    Check.Cursor(questions).some();
    questions = questions.fetch();

    doc.set({
      questions: _.map(questions, '_id'),
      subjects: _.uniq(_.map(questions, 'subject')),
      tags: _.uniq(_.flatten(_.map(questions, 'tags'))),
    });

    Check.Astro(doc).valid();
    doc.save();
    return doc;
  },

  TestRequest({ name, subject, size, date }) {
    // Validation
    Check(name, String);
    Check(size, Number);
    Check(subject, String);
    Check(date, Date);

    // Get Data
    const userId = Meteor.userId();
    const test = new Tests.Schema({
      // Static
      type: 'personal',
      timeoutType: 'none',
      info: 'Boa prova!',
      timeout: null,
      scores: null,
      course: null,

      // Dynamic
      name: name,
      author: userId,
      startDate: date,
      endDate: new Date(date.getTime() + 1),

      // Generated
      questions: null,
      subjects: [subject],
      tags: null,
    });

    // Generate Questions
    let tags = [];
    let tries = 30;
    const questions = [];

    const total = Questions.find({ subject, type: 'closed' }).count();

    while (questions.length < size && tries) {
      const question = Questions.findOne({ subject, type: 'closed' },
        { skip: _.random(true) * total, fields: { _id: 1, tags: 1 } });
      if (!_.includes(questions, _.get(question, '_id'))) {
        questions.push(_.get(question, '_id'));
        tags = _.union(tags, _.get(question, 'tags'));
      };

      tries--;
    };

    // Setting
    test.set({ questions, tags: _.compact(_.uniq(tags)) });

    // Saving
    Check.Astro(test).valid();

    test.save();
    return test;
  },
});
