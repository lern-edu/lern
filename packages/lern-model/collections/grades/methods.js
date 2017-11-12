Grades.Schema.extend({
  methods: {
    findAttempts() {
      const ids = this.get('attempts');
      return Fetch.General.attempts(ids);
    },

  },
});
