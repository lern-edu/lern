Courses.Schema.extend({
  methods: {

    findAuthor() {
      return Fetch.General.users(this.get('author'));
    },

    findSubjects() {
      return Fetch.General.subjects(_.map(this.subjects));
    },

    findTags() {
      return Fetch.General.tags(_.map(this.tags));
    },

    findUsers() {
      const { students, teachers } = this;
      return Fetch.General.users(_.union(students, teachers));
    },

    findStudents() {
      const ids = this.get('students');
      return Fetch.General.users(ids);
    },

    findGrades() {
      const { students, _id } = this;
      return Fetch.General.grades({ student: { $in: students }, course: _id });
    },

    findTeachers() {
      const ids = this.get('teachers');
      return Fetch.General.users(ids);
    },

    findTests() {
      const course = this.get('_id');
      return Fetch.General.tests({ course });
    },

    findCurrentTests() {
      const course = this.get('_id');
      const now = new Date();
      return Fetch.General.tests({ course, startDate: { $lte: now } });
    },

    findPosts() {
      const course = this.get('_id');
      return Fetch.General.posts({ course });
    },

    findLectures() {
      const course = this.get('_id');
      return Fetch.General.lectures({ course });
    },

    generateAlias() {
      this.set('alias', Random.hexString(5));
      while (!this.validate())
        this.set('alias', Random.hexString(5));
    },
  },
});
