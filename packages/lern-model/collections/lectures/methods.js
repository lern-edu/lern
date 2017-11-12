Lectures.Schema.extend({
  methods: {
    findCourse() {
      const id = this.get('course');
      return Fetch.General.courses(id);
    },

    findAuthor() {
      const id = this.get('author');
      return Fetch.General.users(id);
    },

    findAttendants() {
      const ids = this.get('attendants');
      return Fetch.General.users(ids);
    },

    findSubjects() {
      return Fetch.General.subjects(_.map(this.subjects));
    },

    findTags() {
      return Fetch.General.tags(_.map(this.tags));
    },
  },
});
