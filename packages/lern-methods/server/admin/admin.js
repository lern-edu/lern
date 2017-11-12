import { convertToRaw, convertFromRaw, ContentState } from 'draft-js';
const [prefix, protect] = ['Admin', 'admin'];

Helpers.Methods({ prefix, protect }, {
  TestSave: Helpers.DefaultSave,
  PlanSave: Helpers.DefaultSave,
  SubjectSave: Helpers.DefaultSave,
  QuestionSave: Helpers.DefaultSave,
  TagSave: Helpers.DefaultSave,
  UserSave: Helpers.DefaultSave,
  UserPassword(userId, password) {
    Accounts.setPassword(userId, password, { logout: true });
  },

  UserAddEmail(id, email) {
    Accounts.addEmail(id, email);
    return true;
  },

  UserSendEnrollmentEmail(id, email) {
    Accounts.sendEnrollmentEmail(id, email);
    return true;
  },

  UserSendVerificationEmail(id, email) {
    Accounts.sendVerificationEmail(id, email);
    return true;
  },

  UserCreate(doc) {
    Check.Astro(doc).valid();

    doc.school ? doc.schools = [doc.school] : doc.schools = [];

    const { email, role } = doc;
    const profile = _.pick(
      doc,
      ['name', 'schoolType', 'cpf', 'cnpj', 'school', 'schools', 'role']
    );

    const userId = Accounts.createUser({ email });
    let user = Fetch.General.users(userId);
    Check.Cursor(user).some();
    user = _.head(user.fetch());

    user.set('profile', new Meteor.users.ProfileSchema(profile));
    user.set('roles', [role]);

    Check.Astro(user).valid();
    user.save();

    Accounts.sendEnrollmentEmail(userId);

    return user;
  },

  // Documentation finish here

  CourseSave(doc) {
    Helpers.DefaultSave(doc);

    const course = _.get(doc, '_id');

    _.forEach(doc.students, student => {
      if (!Grades.findOne({ student, course })) {
        const grade = new Grades.Schema({ student, course });
        Helpers.DefaultSave(grade);
      };
    });

    if (_.get(doc, '_isNew'))
    _.forEach(doc.schedule, s => {
      const startDate = moment(s.startDate);
      const endDate = moment(s.endDate);
      let lectureDays = moment().day(_.get(WeekDays.all('both'), s.day));
      if (lectureDays.isBefore(doc.startDate))
        lectureDays.add(7, 'd');

      while (lectureDays.isSameOrBefore(doc.endDate)) {
        const schedule = new Lectures.Schema({
          course,
          startDate: new Date(lectureDays.hour(startDate.hour())
          .minute(startDate.minute())
            .second(startDate.second()).toDate()),
          endDate: new Date(lectureDays.hour(endDate.hour())
          .minute(endDate.minute())
            .second(endDate.second()).toDate()),
        });

        Helpers.DefaultSave(schedule);
        lectureDays.add(7, 'd');
      };
    });

    if (_.includes(_.get(doc, 'subjects'), 'k5cvmFbgMcH7di52A')) {
      const newTest = new Tests.Schema(Tests.findOne('Chzxqg7yBpY3GdbzG'));
      newTest.set('course', _.get(doc, '_id'));
      newTest.set('_id', null);
      const test = newTest.save();
      doc.set('initial', { 1: { test } });
    };

    return doc;
  },

  UpdateProfileName({ name, userId=null }) {
    const user = Meteor.users.findOne(userId || Meteor.userId());
    user.set('profile.name', name);
    user.save();
  },

  TagsCount() {
    return Questions.aggregate([{
        $unwind: '$tags',
      }, {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
    ]);
  },

  QuestionsCount({ subject, text, tags }={}) {
    const selector = {};

    if (!_.isEmpty(tags)) _.assign(selector, { tags: { $in: tags } });
    if (subject) _.assign(selector, { subject });
    if (text) _.assign(selector, { $text: { $search: text } });

    this.unblock();

    return Questions.find(selector).count();
  },

  NamePosts() {
    _.forEach(Posts.find({ title: null }).fetch(), p => {
      p.set('title', 'Post');
      p.save();
    });
  },

  RemoveTag(id) {
    Tags.remove(_.isEmpty(id) ? null : id);
  },

  HigienizeTags(query) {
    _.forEach(Tags.find(query).fetch(), tag => {
      const names = tag.get('text').split('-');
      let parent = null;
      for (var i = 0; i < names.length; i++) {
        if (i === names.length - 1) {
          tag.set('text', names[i].trim());
          tag.set('parent', parent);
          tag.save();
        } else {
          const me = _.get(Tags.findOne({ text: names[i].trim(), parent,
              subject: _.get(tag, 'subject'), }), '_id');
          if (_.isEmpty(me)) {
            const t = new Tags.Schema({
              text: names[i].trim(),
              parent: _.isEmpty(parent) ? null : parent,
              subject: _.get(tag, 'subject'),
            });
            t.save((err, id) => {if (!err) parent = id;});
          } else { parent = me; };
        };
      };
    });
    return true;
  },

  RemoveUser(id) {
    Meteor.users.remove(id); },

  ClearCollection(collection, query) {
    DataManager.clearCollections(collection, query); },

  InsertData(path, collection, start) {
    DataManager.insertData(path, collection, start); },

  RemoveDuplicate(query) { DataManager.removeDuplicate(query); },

  CreateGrades() {
    _.forEach(Courses.find().fetch(), c => {
      _.forEach(c.students, student => {
        if (!Grades.findOne({ student, course: c._id }))
          new Grades.Schema({ student, course: c._id }).save();
      });
    });
  },

  ReplaceSchoolField() {
    let num = 0;
    _.forEach(Meteor.users.find({ roles: { $in: ['student', 'teacher'] } }).fetch(), u => {
      if (_.get(u, 'profile.school')) {
        u.set('profile.schools', [_.get(u, 'profile.school')]);
        u.save();
        num++;
      };
    });
    console.log('Users updated: ' + num);
  },

  RemoveDuplicatedGrades(query={}) {
    const grades = Grades.find(query).fetch();
    for (var i = 0; i < grades.length; i++) {
      for (var j = i + 1; j < grades.length; j++) {
        if (grades[i].course == grades[j].course && grades[i].student == grades[j].student)
          grades[j].remove();
      };
    };
  },

  RemoveDuplicatedLectures(query={}) {
    const lecture = Lectures.find(query).fetch();
    for (var i = 0; i < lecture.length; i++) {
      for (var j = i + 1; j < lecture.length; j++) {
        if (lecture[i].course == lecture[j].course &&
          lecture[i].startDate.toString() == lecture[j].startDate.toString() &&
          lecture[i].endDate.toString() == lecture[j].endDate.toString())
          lecture[j].remove();
      };
    };
  },

  CreateLectures(query) {
    const doc = Courses.findOne(query);
    const course = _.get(doc, '_id');

    if (_.get(doc, '_isNew'))
    _.forEach(doc.schedule, s => {
      const startDate = moment(s.startDate);
      const endDate = moment(s.endDate);
      let lectureDays = moment().day(_.get(WeekDays.all('both'), s.day));
      if (lectureDays.isBefore(doc.startDate))
        lectureDays.add(7, 'd');

      while (lectureDays.isSameOrBefore(doc.endDate)) {
        const schedule = new Lectures.Schema({
          course,
          startDate: new Date(lectureDays.hour(startDate.hour())
          .minute(startDate.minute())
            .second(startDate.second()).toDate()),
          endDate: new Date(lectureDays.hour(endDate.hour())
          .minute(endDate.minute())
            .second(endDate.second()).toDate()),
        });

        Helpers.DefaultSave(schedule);
        lectureDays.add(7, 'd');
      };
    });
  },

  SubjectsCount() {
    return Questions.aggregate([{
        $group: {
          _id: '$subject',
          count: { $sum: 1 },
        },
      },
    ]);
  },

  SubjectCreate(name) {
    const doc = new Subjects.Schema({ name });
    Check.Astro(doc).valid();
    doc.save();
    return doc;
  },

  TagCreate(text, subject) {
    const doc = new Tags.Schema({ text, subject });
    Check.Astro(doc).valid();
    doc.save();
    return doc;
  },

  // REMOVE Test and attempts

  TestRemove(_id) {
    _.forEach(Tests.find({ _id }).fetch(), t => t.remove());
    _.forEach(Attempts.find({ test: _id }).fetch(), a => a.remove());
  },

  // Update course

  UpdateCourse(obj, courseId) {
    const course = Courses.findOne(courseId);

    _.forEach(_.keys(obj), k => {
      course.set(k, _.get(obj, k));
    });

    Check.Astro(course).valid();
    course.save();
    return course;
  },

  UpdateTest(obj, testId) {
    const test = Tests.findOne(testId);

    _.forEach(_.keys(obj), k => {
      test.set(k, _.get(obj, k));
    });

    Check.Astro(test).valid();
    test.save();
    return test;
  },

  ExportData(courseId) {
    const course = Courses.findOne(courseId);
    const test = Tests.findOne({ course: courseId });
    const tags = test.findTags();
    const questions = test.findQuestions();
    const subjects = test.findSubjects();

    _.forEach(course.get('students'), sid => {
      const user = Meteor.users.findOne(sid);

      const attempt = Attempts.findOne({ author: sid, finished: true });

      if (!attempt || _.isEmpty(attempt)) return false;

      const answers = Answers.find({ attempt: _.get(attempt, '_id') }).fetch();

      // define label
      const orderedTags = _.orderBy(tags, ['text']);
      const labels = _.map(orderedTags, 'text');
      const tagsIds = _.map(orderedTags, '_id');

      // calc performance
      const groupedQuestions = _.groupBy(questions, ({ tags }) => _.head(tags));
      const avaregeQuestions = _.map(tagsIds, t =>
        _.mean(
          _.map(
            _.get(groupedQuestions, t),
            ({ _id }) =>
              _.toNumber(
                _.get(
                  _.find(answers, { question: _id }),
                'answer')
              )
          )
        )
      );

      const data = {
        labels,
        series: [avaregeQuestions],
      };

      console.log(data);
    });

  },

  AdaptQuestionsToNewContent() {
    const questions = Questions.find().fetch();
    _.forEach(questions, q => {
      const statement = [new Questions.ContentSchema({
          type: 'text',
          text: q.get('text'),
        }),
      ];
      q.set('statement', statement);
      q.save();
    });
    return 'success';
  },

  AdaptQuestionsToNewContentv2() {
    const questions = Questions.find().fetch();
    _.forEach(questions, q => {
      try {
        console.log(q._id);
        const content = [new Questions.ContentSchema({
            type: 'text',
            text: convertToRaw(ContentState.createFromText(q.get('text'))),
          }),
        ];
        q.set('content', content);
        q.save();
      } catch (e) { console.log(q._id + ' error'); };
    });
    return 'success';
  },

  CreateCafolUsers(names, courseId, defaulPassword) {
    let course = Fetch.General.courses(courseId);
    Check.Cursor(course).some();
    course = _.head(course.fetch());

    const replaceAll = (str) => {
      let newStr = str;
      while (newStr.search(' ') != -1)
       newStr = newStr.replace(' ', '');
      return newStr;
    };

    const emails = [];

    _.forEach(names, (name) => {

      console.log(name);

      const email = replaceAll(_.deburr(_.lowerCase(replaceAll(name))) + '@lern.com.br');
      const userId = Accounts.createUser({ email: replaceAll(email) });

      let user = Fetch.General.users(userId);
      Check.Cursor(user).some();
      user = _.head(user.fetch());

      user.set('profile', {
        name,
        firstName: name.split(' ')[0],
        lastName: name.substring(name.search(' ') + 1, name.length),
        school: course.author,
        schools: [course.author],
        role: 'student',
      });
      user.set('roles', ['student']);

      Check.Astro(user).valid();
      user.save();

      course.push('students', userId);
      Check.Astro(course).valid();
      course.save();

      Accounts.setPassword(user._id, defaulPassword, { logout: true });

      emails.push(email);
    });

    return emails;
  },

  TagUpdate() {
    const tags = Tags.find({ info: null }).fetch();

    _.forEach(tags, tag => {
      tag.set('info', []);
      tag.save();
    });

    return true;
  },

});
