Astro.createBehavior({
  name: 'tagable',
  createSchemaDefinition() {
    return {
      fields: {
        tags: {
          type: 'array',
          validator: Validators.and([Validators.Tags(), Validators.References()]),
          default: () => [],
        },
      },
      methods: {
        findTags() {
          const ids = this.get('tags');
          return Fetch.General.tags(ids);
        },
      },
    };
  },
});
