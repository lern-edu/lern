Plans.Schema.extend({
  methods: {
    getSubjects() {
      return _.map(this.get('weekJobs'), 'subject');
    },

    getAreas() {
      const { area0, area1, area2, area3 } = this;
      return [area0, area1, area2, area3];
    },

    findSubjects() {
      const subjects = this.getSubjects();
      return Fetch.General.subjects(subjects);
    },
  },
});
