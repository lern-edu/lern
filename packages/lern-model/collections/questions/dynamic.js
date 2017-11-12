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
    afterInc(e) {
      const { fieldName } = e.data;
      if (fieldName === 'answerCount' || fieldName === 'hitCount') {
        const { answerCount, hitCount } = this;
        this.set('hitRate', hitCount / answerCount);
      }
    },

    beforeSave(e) {
      const contentText = _.join(
        _.map(
          _.flatten(_.compact(_.map(this.get('content'), 'text.blocks'))),
        'text'),
      ' ') || '';
      const optionsText = _.join(
        _.map(
          _.flatten(_.compact(_.map(this.get('options'), 'text.blocks'))),
        'text'),
      ' ') || '';

      this.set('text', _.join([contentText, optionsText], ' '));

      if (this.get('range.min'))
        this.set('range.min', _.toNumber(this.get('range.min')));
      if (this.get('range.max'))
        this.set('range.max', _.toNumber(this.get('range.max')));
    },
  },
});
