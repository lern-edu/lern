Astro.createBehavior({
  name: 'creatable',
  createSchemaDefinition() {
    return {
      fields: {
        author: {
          type: 'string',
          validator: Validators.Reference(),
          immutable: true,
          optional: true,
        },
      },
      events: {
        beforeInsert() {
          const userId = _.attempt(Meteor.userId);
          if (!_.isString(userId)) this.set({ author: null });
          else {
            const user = Meteor.user();
            if (_.includes(user.roles, 'admin') && this.get('author'));
            else this.set('author', userId);
          }
        },
      },
      methods: {
        findAuthor() {
          const id = this.get('author');
          return Fetch.General.users(id);
        },
      },
    };
  },
});
