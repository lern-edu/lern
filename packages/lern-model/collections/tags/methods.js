Tags.Schema.extend({
  methods: {

    findSubject() {
      const id = this.get('subject');
      return Fetch.General.subjects(id);
    },
  },
});
