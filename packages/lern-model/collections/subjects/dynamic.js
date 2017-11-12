Subjects.Schema.extend({
  events: {
    beforeSave(e) {
      const contentText = _.join(
        _.map(
          _.flatten(
            _.compact(
              _.map(this.get('info'), 'text.blocks')
            )
          ),
        'text'),
      ' ')
      || '';

      this.set('text', _.join([contentText], ' '));
    },
  },
});
