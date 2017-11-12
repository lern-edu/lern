Answers.Schema.extend({
  methods: {

    findAttempt() {
      const id = this.get('attempt');
      return Fetch.General.attempts(id);
    },

    findQuestion(opts) {
      const id = this.get('question');
      return Fetch.General.questions(id, opts);
    },

  },
});
