Astro.createValidator({
  name: 'Content',
  validate(value, fieldName) {
    const { type } = this;
    return type != fieldName;
  },

  events: {
    validationError(e) {
      var fieldName = e.data.fieldName;
      e.setMessage(fieldName + ' is required!');
    },
  },
});
