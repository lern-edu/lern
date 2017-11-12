Astro.createBehavior({
  name: 'timeTracked',
  createSchemaDefinition() {
    return {
      fields: {
        startedAt: {
          type: 'date',
          immutable: true,
          optional: true,
        },
        finishedAt: {
          type: 'date',
          immutable: true,
          optional: true,
        },
        finished: {
          type: 'boolean',
          immutable: true,
          optional: true,
        },
        maxDuration: {
          type: 'number',
          immutable: true,
          optional: true,
        },
      },
      events: {
        beforeInsert() {
          this.set('startedAt', new Date());
        },

        afterInsert() {
          if (this.get('maxDuration')) {
            const setFinished = () => {
              this.get('finished') ? undefined : this.set('finished', true);
              this.get('finishedAt') ? undefined : this.set('finishedAt', new Date());
              this.save();
            };

            const setFinishedFibers = Meteor.wrapAsync(setFinished, this);
            Meteor.setTimeout(setFinishedFibers, this.get('maxDuration') * 1000);
          };
        },

        beforeSet(e) {
          const { fieldName, setValue } = e.data;
          if (fieldName === 'finished' && setValue === true)
            this.set('finishedAt', new Date());
        },
      },

      methods: {
        getDuration() {
          const { startedAt, finishedAt } = this;
          if (!startedAt || !finishedAt) return undefined;
          else return finishedAt - startedAt;
        },

        didTimeout() {
          const { maxDuration } = this;
          const duration = this.getDuration();
          if (_.isUndefined(duration) || _.isNull(maxDuration)) return undefined;
          else return maxDuration * 1000 < duration;
        },
      },
    };
  },
});
