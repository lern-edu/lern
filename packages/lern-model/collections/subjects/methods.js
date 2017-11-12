Subjects.Schema.extend({
  methods: {
    getArea() {
      const key = this.get('area');
      return SubjectAreas.getName(key);
    },

    findTags() {
      const subject = this.get('_id');
      return Tags.find({ subject });
    },
  },
});
