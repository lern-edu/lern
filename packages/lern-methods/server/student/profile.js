const [prefix, protect] = ['Student', 'student'];

Helpers.Methods({ prefix, protect }, {
  UserSave: Helpers.DefaultSave,

  PlanProfileSave(planProfile) {
    const user = Meteor.user();
    user.set('planProfile', planProfile.raw());

    Check.Astro(user).valid();
    user.save();
    return user;
  },

  CourseIngress({ courseId, userId }) {

    // Find course to update
    let course = Fetch.General.courses(courseId);
    Check.Cursor(course).some();
    course = _.head(course.fetch());

    // Ingress current student on course
    course.push('students', userId);
    Check.Astro(course).valid();
    course.save();

    // Find school document
    let author = Fetch.General.users(course.get('author'));
    Check.Cursor(author).some();
    author = _.head(author.fetch());

    // Remind! Not always course author is a user school
    if (_.includes(author.get('roles'), 'school')) {

      // Ingress student on school
      let student = Fetch.General.users(userId);
      Check.Cursor(student).some();
      student = _.head(student.fetch());

      student.set('profile.school', author.get('_id'));
      const studentSchools = student.get('profile.schools');

      studentSchools.push(author._id);
      student.set('profile.schools', _.uniq(studentSchools));

      Check.Astro(student).valid();
      student.save();
    };

    return course;
  },

  AddEmail(id, email) {
    Accounts.addEmail(id, email);
    return true;
  },

  SendVerificationEmail(id, email) {
    Accounts.sendVerificationEmail(id, email);
    return true;
  },
});
