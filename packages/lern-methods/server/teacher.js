const [prefix, protect] = ['Teacher', 'teacher'];

Helpers.Methods({ prefix, protect }, {
  PostSave: Helpers.DefaultSave,
  QuestionSave: Helpers.DefaultSave,
  TestSave: Helpers.DefaultSave,
  LectureSave(lecture) {
    const { homework, course: courseId, tags, test: testId, startDate } = lecture;
    const { _id: course, endDate, subjects } = Courses.findOne(courseId);
    if (homework && _.isEmpty(testId)) {
      if (moment().isAfter(startDate))
        throw new Meteor.Error(500, 'This lecture already start');
      else {
        const questions = Helpers.GetQuestions({ tags, subjects, limit: 5 });
        const author = Meteor.userId();
        const test = new Tests.Schema({
          type: 'course',
          timeoutType: 'none',
          info: 'Atividade gerada automáticamente' +
            ' pelo sistema para sobre os assuntos da aula e revisão.',
          timeout: null,
          scores: null,
          name: `Atividade de casa aula ${moment(_.get(lecture, 'startDate')).format('DD/MM')}`,
          startDate: new Date(),
          endDate: new Date(endDate),
          author,
          course,
          questions,
          subjects,
          tags,
        });
        Check.Astro(test).valid();
        test.save();
        lecture.set('test', _.get(test, '_id'));
      }
    };

    Check.Astro(lecture).valid();
    lecture.save();
    return lecture;
  },

  LecturesSeriesCreate({ schedule, startDate, endDate, courseId }) {

    console.log(schedule, startDate, endDate, courseId);

    const lecturesCreated = [];

    _.forEach(schedule, s => {
      const lectureStartDate = moment(s.startDate);
      const lectureEndDate = moment(s.endDate);
      let lectureDays = moment().day(_.get(WeekDays.all('both'), s.day));
      if (lectureDays.isBefore(startDate))
        lectureDays.add(7, 'd');

      while (lectureDays.isSameOrBefore(endDate)) {
        const lecture = new Lectures.Schema({
          course: courseId,
          name: `Aula ${moment(lectureDays).format('DD/MM')}`,
          subjects: ['J6XyZxJMwyXo8Sw2E'],
          tags: ['mHPjPqjnnr9Npqupf'],
          startDate: new Date(lectureDays.hour(lectureStartDate.hour())
          .minute(lectureStartDate.minute())
            .second(lectureStartDate.second()).toDate()),
          endDate: new Date(lectureDays.hour(lectureEndDate.hour())
          .minute(lectureEndDate.minute())
            .second(lectureEndDate.second()).toDate()),
        });

        Check.Astro(lecture);
        Helpers.DefaultSave(lecture);
        lecturesCreated.push(lecture);
        lectureDays.add(7, 'd');
      };
    });

    return lecturesCreated;
  },

  // Save attempt on grade
  // gradesToSave @ object like { gradeId: attemptId }
  GradesAttemptSave(gradesToSave) {
    _.forEach(gradesToSave, (value, key) => {
      const grade = Grades.findOne(key);
      const { finished, _id, test } = Attempts.findOne(value);
      if (finished) {
        const newAttempts = _.clone(grade.attempts);

        const attemptToRemove = _.get(Attempts.findOne({
            _id: { $in: grade.attempts }, test, }), '_id');
        if (attemptToRemove)
          _.pull(newAttempts, attemptToRemove);

        grade.set('attempts', _.union(newAttempts, [value]));
        Check.Astro(grade).valid();
        grade.save();
      } else throw new Meteor.Error('Not finished',
          'Attempt ' + val + ' should be finished');
    });

    return true;
  },

  // Save deatachedGrade on grade
  // deatachedGrades @ object like { gradeId: deatachedGrade }
  GradesDeatachedGradesSave(deatachedGrades) {
    deatachedGrades.set('author', Meteor.userId);
    _.forEach(deatachedGrades, (deatachedGrade, gradeId) => {
      Grades.update(gradeId, { $push: { deatachedGrades: deatachedGrade } });
    });
    return true;
  },

  QuestionsCount({ subject, text, tags, type, onlyMine, course }={}) {
    const selector = {};

    if (!course) return 0;
    if (!_.isEmpty(tags)) _.assign(selector, { tags: { $in: tags } });
    if (subject) _.assign(selector, { subject });
    else _.assign(selector, { subject: {
        $in: _.get(Courses.findOne(course), 'subjects'), }, });
    if (onlyMine) _.assign(selector, { author: _.get(this, 'userId') });
    if (type) _.assign(selector, { type });
    if (text) _.assign(selector, { $text: { $search: text } });

    this.unblock();

    return Questions.find(selector).count();
  },

  AnswerGrade(answerId, grade) {
    Check.Regex(answerId).id();

    let answer = Fetch.General.answers({ _id: answerId, finished: true });
    Check.Cursor(answer).some();
    answer = _.first(answer.fetch());

    let question = Fetch.General.questions(answer.question);
    Check.Cursor(question).some();
    question = _.first(question.fetch());

    question.inc({
      answerCount: +_.isFinite(grade) + -_.isFinite(answer.grade),
      hitCount: +(grade >= 0.8) + -(answer.grade >= 0.8),
    }); question.save();

    answer.set('grade', grade);
    Check.Astro(answer).valid();
    answer.save();
    return answer;
  },

  AttemptGrade(attemptId, grade) {
    Check.Regex(attemptId).id();

    let attempt = Fetch.General.attempts({ _id: attemptId, finished: true });
    Check.Cursor(attempt).some();
    attempt = _.first(attempt.fetch());

    attempt.set('grade', grade);
    Check.Astro(attempt).valid();
    attempt.save();
    return attempt;
  },
});
