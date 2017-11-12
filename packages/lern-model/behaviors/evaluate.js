Astro.createBehavior({
  name: 'evaluate',
  createSchemaDefinition() {
    return {
      fields: {
        like: {
          type: 'array',
          validator: Validators.References(),
          optional: true,
          default: () => [],
        },
        useless: {
          type: 'array',
          validator: Validators.References(),
          optional: true,
          default: () => [],
        },
      },
      events: {
        beforeInsert() {
          // TODO Update user score
        },
      },
      methods: {
        findEvaluators() {
          return Fetch.General.users(_.union(
              this.get('like'), this.get('useless')));
        },
      },
    };
  },
});
