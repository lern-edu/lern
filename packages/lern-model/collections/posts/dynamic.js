Posts.Schema.extend({
  events: {
    beforeSave(e) {
      const contentText = _.join(
        _.map(
          _.flatten(
            _.compact(
              _.map(this.get('content'), 'text.blocks')
            )
          ),
        'text'),
      ' ')
      || '';

      this.set('text', _.join([contentText, this.get('name')], ' '));
    },
  },
});
