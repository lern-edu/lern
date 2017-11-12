Posts.Schema.extend({
  methods: {
    findAuthor() {
      const id = this.get('author');
      return id && Fetch.General.users(id);
    },

    findSubjects() {
      const ids = this.get('subjects');
      return ids && Fetch.General.subjects(ids);
    },

    findTags() {
      const ids = this.get('tags');
      return ids && Fetch.General.tags(ids);
    },

    findUsers() {
      const commenters = _.map(this.get('commenters'), 'author');
      return Fetch.General.users(_.concat(commenters, this.get('author')));
    },

    findCourse() {
      const id = this.get('course');
      return Fetch.General.courses(id);
    },
  },
});
