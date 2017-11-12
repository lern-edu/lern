Astro.createBehavior({
  name: 'singleSubject',
  createSchemaDefinition() {
    return {
      fields: {
        subject: {
          type: 'string',
          validator: Validators.Reference(),
          immutable: true,
        },
      },
      methods: {
        findSubject() {
          const id = this.get('subject');
          return Fetch.General.subjects(id);
        },
      },
    };
  },
});

Astro.createBehavior({
  name: 'multiSubject',
  createSchemaDefinition() {
    return {
      fields: {
        subjects: {
          type: 'array',
          validator: Validators.and([Validators.minLength(1), Validators.References()]),
          default: () => [],
          immutable: true,
        },
      },
      methods: {
        findSubjects() {
          const ids = this.get('subjects');
          return Fetch.General.subjects(ids);
        },
      },
    };
  },
});
