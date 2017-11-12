import { convertToRaw, convertFromRaw, ContentState } from 'draft-js';
const [prefix, protect] = ['School', 'school'];

Helpers.Methods({ prefix, protect }, {
  CourseSave: Helpers.DefaultSave,
  TestSave: Helpers.DefaultSave,

  CourseCreate(doc) {
    doc.generateAlias();
    const schoolId = Meteor.userId();

    doc.set('school', schoolId);

    Helpers.DefaultSave(doc);

    const course = _.get(doc, '_id');

    _.forEach(doc.students, student => {
      if (!Grades.findOne({ student, course })) {
        const grade = new Grades.Schema({ student, course });
        Helpers.DefaultSave(grade);
      };
    });

    const teachers = doc.get('teachers');

    if (_.includes(doc.get('teachers'), schoolId)) {
      const school = _.head(Fetch.General.users(schoolId).fetch());
      school.push('roles', 'teacher');
      school.save();
    };

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

    return doc;
  },

  UserRemove(userId) {
    const user = _.first(Fetch.General.users(userId).fetch());
    const schools = user.get('profile.schools');
    const schoolId = Meteor.userId();

    // tira schoolId do schools do user

    _.pull(schools, schoolId);
    user.set('profile.schools', schools);
    Check.Astro(user).valid();
    user.save();

    return user;
  },

  SetTeacher(userId) {
    const user = _.first(Fetch.General.users(userId).fetch());

    const roles = user.get('roles');
    roles.push('teacher');
    user.set('roles', _.uniq(roles));
    Check.Astro(user).valid();
    user.save();

    return user;
  },
});
