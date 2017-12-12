const [prefix, protect] = ['Public', 'public'];

Helpers.Methods({ prefix, protect }, {
  QuestionSave: Helpers.DefaultSave,
  SendEmail({ email, text }) {
    Email.send({
      from: email,
      to: Meteor.settings.emails.default,
      subject: 'Informação',
      text: text,
    });

  },

  StudentRegister({ name, email }) {
    const userId = Accounts.createUser({ email });
    const user = _.first(Fetch.General.users(userId).fetch());

    user.set('profile', new Meteor.users.ProfileSchema({
      name,
      schools: ['fFNyCwTZXy5Xff7Wr'],
      school: 'fFNyCwTZXy5Xff7Wr',
    }));
    user.set('roles', ['student']);

    Check.Astro(user).valid();
    user.save();

    Accounts.sendEnrollmentEmail(userId);

    return user;
  },

  QuestionsCount({ subjectId, text, tagsIds, type, onlyMine, notQuestions }={}) {
    const selector = {};

    if (!_.isEmpty(tagsIds)) _.assign(selector, { tags: { $in: tagsIds } });
    if (subjectId) _.assign(selector, { subject: subjectId });
    if (onlyMine) _.assign(selector, { author: _.get(this, 'userId') });
    if (notQuestions) _.assign(selector, { _id: { $nin: notQuestions } });
    if (type) _.assign(selector, { type });
    if (text) _.assign(selector, { $text: { $search: text } });

    this.unblock();

    return Questions.find(_.isEmpty(selector) ? null : selector).count();
  },

  PostsCount(query={}) {
    const selector = _.omit(query, ['text']);
    if (query.text)
      _.assign(selector, { $text: { $search: query.text } });

    return Fetch.General.posts(selector).count();
  },

  TestsCount({ subjectsIds, tagsIds, type, onlyMine, course }={}) {

    this.unblock();

    return Fetch.General.tests({
        type,
        $or: [{ course: null }, { course }],
        tags: tagsIds,
        subjects: subjectsIds,
        author: onlyMine ? _.get(this, 'userId') : undefined,
      }).count();
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
});
