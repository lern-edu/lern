Astro.createBehavior({
  name: 'timeBounds',
  createSchemaDefinition() {
    return {
      fields: {
        startDate: {
          type: 'date',
          validator: Validators.Date({ before: 'endDate' }),
          immutable: true,
        },
        endDate: {
          type: 'date',
          validator: Validators.Date({ after: 'startDate' }),
          immutable: true,
        },
      },
      methods: {
        getIntervalState() {
          const now = new Date();
          const { startDate, endDate } = this;
          if (!startDate || !endDate) return undefined;
          else return (
              now < startDate ? 'future'
            : now > endDate ? 'past'
            : 'present'
          );
        },
      },
    };
  },
});
