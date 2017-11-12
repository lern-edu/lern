Attempts.Schema.extend({
  methods: {
    getGrade() {
      const score = this.get('score');
      const grade = this.get('grade');
      return !_.isNull(score) && score * grade;
    },

    findTest() {
      const id = this.get('test');
      return Fetch.General.tests(id);
    },

    findAnswers(author) {
      const attempt = this.get('_id');
      return Fetch.General.answers({ attempt, author });
    },

    findPageAnswers({ index, author }) {
      const attempt = this.get('_id');
      const test = _.head(Fetch.General.tests(this.get('test')).fetch());
      const questionsId = _.compact(_.map(_.get(test, `pages[${index}].content`), 'question'));
      return Fetch.General.answers({ attempt, author, question: questionsId });
    },

    findAuthor(author) {
      return Meteor.users.find(this.get('author'));
    },

    finishTimeoutPage() {
      const timeTracked = _.find(this.get('timeTracked'), { finished: null });
      if (timeTracked) {

        const setPageFinished = () => {
          timeTracked.get('finished') ? undefined : timeTracked.set('finished', true);
          timeTracked.get('finishedAt') ? undefined : timeTracked.set('finishedAt', new Date());
          this.save();
          this.startTimeoutPage();
        };

        const setPageFinishedFibers = Meteor.wrapAsync(setPageFinished, this);
      };
    },

    startTimeoutPage() {
      const timeTracked = _.find(this.get('timeTracked'), { finished: null });

      const setPageFinished = () => {
        timeTracked.get('finished') ? undefined : timeTracked.set('finished', true);
        timeTracked.get('finishedAt') ? undefined : timeTracked.set('finishedAt', new Date());
        this.save();
        this.startTimeoutPage();
      };

      if (timeTracked) {
        const setPageFinishedFibers = Meteor.wrapAsync(setPageFinished, this);
        if (timeTracked.get('startedAt'))
          setPageFinishedFibers();
        else {
          timeTracked.set('startedAt', new Date());
          this.save();
          Meteor.setTimeout(setPageFinishedFibers, timeTracked.get('maxDuration') * 1000);
        };
      } else {
        const setFinished = () => {
          this.get('finished') ? undefined : this.set('finished', true);
          this.get('finishedAt') ? undefined : this.set('finishedAt', new Date());
          this.save();
        };

        const setFinishedFibers = Meteor.wrapAsync(setFinished, this);
        setFinishedFibers();
      };
    },

  },
});
