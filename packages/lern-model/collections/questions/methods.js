Questions.Schema.extend({
  methods: {

    getType() {
      const key = this.get('type');
      return QuestionTypes.getName(key);
    },

    findSubject() {
      const id = this.get('subject');
      return Fetch.General.subjects(id);
    },

    findTags() {
      const id = this.get('tags');
      return Fetch.General.tags(id);
    },

    findImage() {
      const id = this.get('image');
      return Fetch.General.images(id);
    },

    findOptionImages() {
      const opts = this.get('options');
      const ids = _.map(opts, 'image');
      return Fetch.General.images(ids);
    },

    findAllImages() {
      const id = this.get('image');
      const opts = this.get('options');
      const ids = _.map(opts, 'image');
      if (id) ids.push(id);
      return Fetch.General.images(ids);
    },

  },
});
