Check.Astro = function (doc) {
  return {
    valid(...args) {
      if (!doc.validate(...args))
        doc.throwValidationException();
    },
  };
};
