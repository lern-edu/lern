// Wrong yet

Questions.Schema.extend({
  fields: {
    answerCount: {
      type: 'number',
      default: 0,
    },
    hitCount: {
      type: 'number',
      default: 0,
    },
    hitRate: {
      type: 'number',
      default: NaN,
    },
  },
  events: {
    beforeRemove(e) {
      const { _id } = this;
      const attempts = Attempts.find({ test: _id }).fetch();
      _.forEach(attempts, a => a.remove());
    },

    beforeSave() {
      const infoText = _.join(
        _.map(
          _.flatten(
            _.compact(
              _.map(this.get('info'), 'text.blocks')
            )
          ),
          'text'
        ), ' ')
      || '';

      const helpText = _.join(
        _.map(
          _.flatten(
            _.compact(
              _.map(this.get('help'), 'text.blocks')
            )
          ),
          'text'
        ), ' ')
      || '';

      this.set('text', _.join([infoText, helpText, this.get('name')], ' '));
    },

  },
});
