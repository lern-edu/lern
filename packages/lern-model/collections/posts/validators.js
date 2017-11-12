Astro.createValidator({
  name: 'UniqAnswer',
  validate(value) {
    const { comments } = this;
    return !_.isEmpty(_.find(comments, { answer: true }));
  },
});
